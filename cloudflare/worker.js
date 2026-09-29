const rangeToDays = { "1d": 1, "7d": 7, "30d": 30, "90d": 90 };
const jsonHeaders = { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "private, no-store" };

function json(data, status = 200, headers = {}) {
  return new Response(JSON.stringify(data), { status, headers: { ...jsonHeaders, ...headers } });
}

function toDateString(date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai", year: "numeric", month: "2-digit", day: "2-digit",
  }).format(date);
}

function addDays(day, amount) {
  const [year, month, date] = day.split("-").map(Number);
  return new Date(Date.UTC(year, month - 1, date + amount)).toISOString().slice(0, 10);
}

function validDate(day) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day || "")) return false;
  const parsed = new Date(`${day}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === day;
}

function getDateRange(searchParams) {
  const range = searchParams.get("range") || "30d";
  if (![...Object.keys(rangeToDays), "custom"].includes(range)) return null;
  const today = toDateString(new Date());
  if (range !== "custom") {
    const days = rangeToDays[range];
    return { range, days, since: addDays(today, -days + 1), until: today };
  }
  const since = searchParams.get("from");
  const until = searchParams.get("to");
  if (!validDate(since) || !validDate(until) || since > until) return null;
  const days = Math.round((Date.parse(`${until}T00:00:00Z`) - Date.parse(`${since}T00:00:00Z`)) / 86400000) + 1;
  return days >= 1 && days <= 366 ? { range, days, since, until } : null;
}

function normalizePath(value) {
  return typeof value === "string" && value.startsWith("/") ? value.split("?")[0].slice(0, 160) || "/" : "/";
}

function normalizeCampaign(value) {
  return typeof value === "string" ? value.slice(0, 120) : "";
}

function normalizeReferrer(value) {
  if (!value || typeof value !== "string") return "Direct";
  try { return new URL(value).hostname.replace(/^www\./, "") || "Direct"; } catch { return "Direct"; }
}

function normalizeSource(value, referrer, siteHost = "") {
  const explicitSource = normalizeCampaign(value).trim().toLowerCase();
  if (explicitSource && explicitSource !== "direct") return explicitSource;
  const host = normalizeReferrer(referrer);
  if (host === "Direct") return "direct";
  if (host === siteHost.replace(/^www\./, "") || host === "everlightai.top") return "direct";
  if (/^(t\.co|x\.com|twitter\.com)$/.test(host)) return "x";
  if (/xiaohongshu|xhslink/.test(host)) return "xiaohongshu";
  if (/douyin|iesdouyin/.test(host)) return "douyin";
  if (/wechat|weixin|qq\.com/.test(host)) return "wechat";
  if (/google\./.test(host)) return "google";
  if (/bing\.com/.test(host)) return "bing";
  if (/baidu\.com/.test(host)) return "baidu";
  return host;
}

function getDeviceType(userAgent = "") {
  const value = userAgent.toLowerCase();
  if (/bot|crawler|spider|crawling/.test(value)) return "bot";
  if (/ipad|tablet/.test(value)) return "tablet";
  if (/mobile|iphone|android/.test(value)) return "mobile";
  return "desktop";
}

function passwordMatches(actual, provided) {
  if (typeof actual !== "string" || !actual || typeof provided !== "string") return false;
  const a = new TextEncoder().encode(actual);
  const b = new TextEncoder().encode(provided);
  let difference = a.length ^ b.length;
  for (let i = 0; i < Math.max(a.length, b.length); i += 1) difference |= (a[i] || 0) ^ (b[i] || 0);
  return difference === 0;
}

async function trackView(request, env) {
  if (request.method !== "POST") return json({ error: "Method not allowed." }, 405, { Allow: "POST" });
  if (!env.DB) return json({ error: "Analytics database is not configured." }, 503);
  const raw = await request.text();
  if (raw.length > 8192) return json({ error: "Analytics event is too large." }, 413);
  let body;
  try { body = JSON.parse(raw); } catch { return json({ error: "Invalid JSON." }, 400); }
  if (!body || typeof body !== "object" || Array.isArray(body)) return json({ error: "Invalid analytics event." }, 400);
  const path = normalizePath(body.path);
  if (path === "/admin") return new Response(null, { status: 204 });
  const eventId = typeof body.eventId === "string" ? body.eventId.trim() : "";
  if (!/^[A-Za-z0-9_-]{16,120}$/.test(eventId)) return json({ error: "Invalid analytics event id." }, 400);
  const eventType = body.eventType === "click" ? "click" : "pageview";
  const referrer = normalizeReferrer(body.referrer);
  const requestUrl = new URL(request.url);
  const country = requestUrl.searchParams.get("via") === "vercel"
    ? request.headers.get("x-vercel-ip-country") || "Unknown"
    : request.headers.get("cf-ipcountry") || "Unknown";
  const values = [
    eventId, eventType, path,
    typeof body.title === "string" ? body.title.slice(0, 180) : "",
    referrer, normalizeSource(body.source, body.referrer, requestUrl.hostname),
    normalizeCampaign(body.medium), normalizeCampaign(body.campaign), normalizeCampaign(body.content),
    normalizeCampaign(body.eventName), typeof body.targetUrl === "string" ? body.targetUrl.slice(0, 500) : "",
    typeof body.visitorId === "string" ? body.visitorId.slice(0, 80) : "",
    country,
    getDeviceType(request.headers.get("user-agent") || ""), new Date().toISOString(),
  ];
  try {
    await env.DB.prepare(`INSERT OR IGNORE INTO analytics_events
      (event_id, event_type, path, title, referrer, source, medium, campaign, content,
       event_name, target_url, visitor_id, country, device_type, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`).bind(...values).run();
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Analytics event write failed", error);
    return json({ error: "Failed to record analytics event." }, 503);
  }
}

async function rankedRows(db, expression, fieldName, lowerBound, upperBound, clickOnly = false) {
  const where = clickOnly ? "AND event_type = 'click'" : "";
  const { results } = await db.prepare(`SELECT ${expression} AS label,
    SUM(CASE WHEN event_type = 'pageview' THEN 1 ELSE 0 END) AS pageviews,
    SUM(CASE WHEN event_type = 'click' THEN 1 ELSE 0 END) AS clicks,
    COUNT(DISTINCT NULLIF(visitor_id, '')) AS visitors
    FROM analytics_events WHERE created_at >= ? AND created_at < ? AND path != '/__analytics_qa' ${where}
    GROUP BY label ORDER BY pageviews + clicks DESC LIMIT 10`).bind(lowerBound, upperBound).all();
  return results.map(({ label, pageviews, clicks, visitors }) => ({
    [fieldName]: label, pageviews, clicks, visitors,
  }));
}

async function analyticsSummary(db, period) {
  const { range, days, since, until } = period;
  const lowerBound = new Date(`${since}T00:00:00+08:00`).toISOString();
  const upperBound = new Date(`${addDays(until, 1)}T00:00:00+08:00`).toISOString();
  const bounds = [lowerBound, upperBound];
  const [totals, dailyResult, latest, topPages, referrers, sources, clickEvents, countries, devices] = await Promise.all([
    db.prepare(`SELECT COUNT(*) AS eventCount,
      SUM(CASE WHEN event_type = 'pageview' THEN 1 ELSE 0 END) AS pageviews,
      SUM(CASE WHEN event_type = 'click' THEN 1 ELSE 0 END) AS clicks,
      COUNT(DISTINCT NULLIF(visitor_id, '')) AS visitors,
      MAX(created_at) AS lastRecordedAt
      FROM analytics_events WHERE created_at >= ? AND created_at < ? AND path != '/__analytics_qa'`).bind(...bounds).first(),
    db.prepare(`SELECT date(created_at, '+8 hours') AS day,
      SUM(CASE WHEN event_type = 'pageview' THEN 1 ELSE 0 END) AS pageviews,
      SUM(CASE WHEN event_type = 'click' THEN 1 ELSE 0 END) AS clicks,
      COUNT(DISTINCT NULLIF(visitor_id, '')) AS visitors
      FROM analytics_events WHERE created_at >= ? AND created_at < ? AND path != '/__analytics_qa'
      GROUP BY day ORDER BY day`).bind(...bounds).all(),
    db.prepare("SELECT created_at FROM analytics_events WHERE path != '/__analytics_qa' ORDER BY created_at DESC LIMIT 1").first(),
    rankedRows(db, "COALESCE(NULLIF(path, ''), '/')", "requestPath", ...bounds),
    rankedRows(db, "COALESCE(NULLIF(referrer, ''), 'Direct')", "referrerHostname", ...bounds),
    rankedRows(db, "COALESCE(NULLIF(source, ''), 'direct')", "source", ...bounds),
    rankedRows(db, "COALESCE(NULLIF(event_name, ''), NULLIF(target_url, ''), 'Unknown')", "eventName", ...bounds, true),
    rankedRows(db, "COALESCE(NULLIF(country, ''), 'Unknown')", "country", ...bounds),
    rankedRows(db, "COALESCE(NULLIF(device_type, ''), 'Unknown')", "deviceType", ...bounds),
  ]);
  const dailyMap = new Map(dailyResult.results.map((item) => [item.day, item]));
  const daily = Array.from({ length: days }, (_, index) => {
    const day = addDays(since, index);
    const row = dailyMap.get(day);
    return { timestamp: `${day}T00:00:00.000+08:00`, pageviews: row?.pageviews || 0, clicks: row?.clicks || 0, visitors: row?.visitors || 0 };
  });
  const today = daily.find((item) => item.timestamp.startsWith(toDateString(new Date()))) || { pageviews: 0, clicks: 0, visitors: 0 };
  return {
    range, days, since, until,
    totals: { pageviews: totals?.pageviews || 0, clicks: totals?.clicks || 0, visitors: totals?.visitors || 0 },
    today, daily, topPages, referrers, sources, clickEvents, countries, devices,
    storage: { provider: "cloudflare-d1", label: "Cloudflare D1", persistent: true, deduplicated: true },
    retrieval: { eventCount: totals?.eventCount || 0, complete: true },
    lastRecordedAt: totals?.lastRecordedAt || "",
    tracking: { latestRecordedAt: latest?.created_at || "", eventIdReady: true },
    updatedAt: new Date().toISOString(),
  };
}

async function adminAnalytics(request, env) {
  if (request.method !== "GET") return json({ error: "Method not allowed." }, 405, { Allow: "GET" });
  if (!env.ADMIN_ANALYTICS_PASSWORD) return json({ error: "Admin password is not configured." }, 503);
  if (!passwordMatches(env.ADMIN_ANALYTICS_PASSWORD, request.headers.get("x-admin-password"))) {
    return json({ error: "Invalid admin password." }, 401);
  }
  if (!env.DB) return json({ error: "Analytics database is not configured." }, 503);
  const period = getDateRange(new URL(request.url).searchParams);
  if (!period) return json({ error: "分析区间无效；自定义范围应为 1 至 366 天。" }, 400);
  try { return json(await analyticsSummary(env.DB, period)); }
  catch (error) {
    console.error("Analytics summary failed", error);
    return json({ error: "Failed to load analytics." }, 503);
  }
}

export async function getPublicReadership(db) {
  const [totals, articleRows] = await Promise.all([
    db.prepare(`SELECT COUNT(*) AS pageviews,
      COUNT(DISTINCT NULLIF(visitor_id, '')) AS visitors,
      MIN(created_at) AS firstRecordedAt
      FROM analytics_events WHERE event_type = 'pageview' AND path != '/__analytics_qa'`).first(),
    db.prepare(`SELECT path, COUNT(*) AS views
      FROM analytics_events
      WHERE event_type = 'pageview' AND path LIKE '/blog/%' AND path != '/__analytics_qa'
      GROUP BY path`).all(),
  ]);
  return {
    visitors: totals?.visitors || 0,
    pageviews: totals?.pageviews || 0,
    firstRecordedAt: totals?.firstRecordedAt || "",
    articles: Object.fromEntries(articleRows.results.map(({ path, views }) => [path, views])),
    updatedAt: new Date().toISOString(),
  };
}

async function publicStats(request, env) {
  if (request.method !== "GET") return json({ error: "Method not allowed." }, 405, { Allow: "GET" });
  if (!env.DB) return json({ error: "Analytics database is not configured." }, 503);
  try {
    const stats = await getPublicReadership(env.DB);
    return json(stats, 200, { "Cache-Control": "public, max-age=60, s-maxage=300, stale-while-revalidate=600" });
  } catch (error) {
    console.error("Public readership summary failed", error);
    return json({ error: "Readership statistics are temporarily unavailable." }, 503);
  }
}

export default {
  async fetch(request, env) {
    const path = new URL(request.url).pathname;
    if (path === "/api/track-view") return trackView(request, env);
    if (path === "/api/admin-analytics") return adminAnalytics(request, env);
    if (path === "/api/public-stats") return publicStats(request, env);
    if (path.startsWith("/api/")) return json({ error: "Not found." }, 404);
    return env.ASSETS.fetch(request);
  },
};
