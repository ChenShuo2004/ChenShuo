import { createClient } from "@supabase/supabase-js";
import { get, list, put } from "@vercel/blob";

const rangeToDays = { "1d": 1, "7d": 7, "30d": 30, "90d": 90 };
const shanghaiOffset = "+08:00";

export function toDateString(date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Shanghai",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function addDays(dateString, amount) {
  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day + amount));
  return date.toISOString().slice(0, 10);
}

export function getDateRange(range = "7d", from, to) {
  const today = toDateString(new Date());
  if (from && to && /^\d{4}-\d{2}-\d{2}$/.test(from) && /^\d{4}-\d{2}-\d{2}$/.test(to) && from <= to) {
    return { days: Math.max(1, Math.min(366, Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 86400000) + 1)), since: from, until: to };
  }
  const days = rangeToDays[range] ?? 7;
  return { days, since: addDays(today, -days + 1), until: today };
}

export function getDaysBetween(since, days) {
  return Array.from({ length: days }, (_, index) => addDays(since, index));
}

export function getDeviceType(userAgent = "") {
  const value = userAgent.toLowerCase();
  if (/bot|crawler|spider|crawling/.test(value)) return "bot";
  if (/ipad|tablet/.test(value)) return "tablet";
  if (/mobile|iphone|android/.test(value)) return "mobile";
  return "desktop";
}

export function normalizePath(pathname) {
  if (typeof pathname !== "string" || !pathname.startsWith("/")) return "/";
  return pathname.split("?")[0].slice(0, 160) || "/";
}

export function normalizeReferrer(referrer) {
  if (!referrer || typeof referrer !== "string") return "Direct";
  try { return new URL(referrer).hostname.replace(/^www\./, "") || "Direct"; } catch { return "Direct"; }
}

export function normalizeCampaign(value) {
  return typeof value === "string" ? value.slice(0, 120) : "";
}

export function normalizeSource(value, referrer) {
  if (value) return normalizeCampaign(value).toLowerCase();
  const host = normalizeReferrer(referrer);
  if (host === "Direct") return "direct";
  if (/xiaohongshu|xhslink/.test(host)) return "xiaohongshu";
  if (/douyin|iesdouyin/.test(host)) return "douyin";
  if (/wechat|weixin|qq\.com/.test(host)) return "wechat";
  if (/google\./.test(host)) return "google";
  if (/bing\.com/.test(host)) return "bing";
  if (/baidu\.com/.test(host)) return "baidu";
  return host;
}

function getAnalyticsStorage() {
  const supabase = getSupabaseClient();
  if (supabase) {
    return {
      id: "supabase",
      label: "Supabase Postgres",
      supabase,
    };
  }

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    return {
      id: "vercel-blob",
      label: "Vercel Blob",
    };
  }

  const error = new Error("分析数据存储未配置：请设置 SUPABASE_URL 和 SUPABASE_SECRET_KEY。");
  error.code = "ANALYTICS_STORAGE_NOT_CONFIGURED";
  throw error;
}

export async function recordPageView(event) {
  const storage = getAnalyticsStorage();
  if (storage.id === "supabase") {
    const { error } = await storage.supabase
      .from("analytics_events")
      .upsert(event, { onConflict: "event_id", ignoreDuplicates: true });
    if (error) throw error;
    return;
  }

  const day = toDateString(new Date(event.created_at));
  await put(`views/${day}/${event.event_id}.json`, JSON.stringify(event), {
    access: "private",
    allowOverwrite: true,
    contentType: "application/json",
  });
}

export const recordAnalyticsEvent = recordPageView;

function getSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  return url && key ? createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } }) : null;
}

async function readJsonBlob(pathname) {
  const result = await get(pathname, { access: "private", useCache: false });
  if (!result?.stream) return null;
  return JSON.parse(await new Response(result.stream).text());
}

async function listDayEvents(day) {
  const events = [];
  let cursor;
  do {
    const result = await list({ prefix: `views/${day}/`, limit: 1000, cursor });
    const batch = await Promise.all(result.blobs.map((blob) => readJsonBlob(blob.pathname).catch(() => null)));
    events.push(...batch.filter(Boolean));
    cursor = result.cursor;
  } while (cursor);
  return events;
}

async function loadEvents(since, until, storage) {
  if (storage.id === "supabase") {
    const { data, error } = await storage.supabase.from("analytics_events").select("*").gte("created_at", `${since}T00:00:00${shanghaiOffset}`).lt("created_at", `${addDays(until, 1)}T00:00:00${shanghaiOffset}`).order("created_at", { ascending: true }).limit(50000);
    if (error) throw error;
    return data || [];
  }
  return (await Promise.all(getDaysBetween(since, Math.max(1, Math.round((Date.parse(`${until}T00:00:00Z`) - Date.parse(`${since}T00:00:00Z`)) / 86400000) + 1)).map(listDayEvents))).flat();
}

function addToMap(map, key, event) {
  const label = key || "Unknown";
  const current = map.get(label) || { label, pageviews: 0, clicks: 0, visitorIds: new Set() };
  if (event.event_type === "click" || event.type === "click") current.clicks += 1;
  else current.pageviews += 1;
  current.visitorIds.add(event.visitor_id || event.visitorId || `${event.created_at || event.createdAt}-${current.pageviews}-${current.clicks}`);
  map.set(label, current);
}

function toRankedRows(map, fieldName) {
  return Array.from(map.values()).sort((a, b) => (b.pageviews + b.clicks) - (a.pageviews + a.clicks)).slice(0, 10).map((item) => ({ [fieldName]: item.label, pageviews: item.pageviews, clicks: item.clicks, visitors: item.visitorIds.size }));
}

export async function getAnalyticsSummary(range, from, to) {
  const { days, since, until } = getDateRange(range, from, to);
  const dayKeys = getDaysBetween(since, days);
  const storage = getAnalyticsStorage();
  const events = await loadEvents(since, until, storage);
  const pageMap = new Map(), referrerMap = new Map(), sourceMap = new Map(), countryMap = new Map(), deviceMap = new Map(), clickMap = new Map();
  const eventsByDay = new Map(dayKeys.map((day) => [day, []]));
  for (const event of events) {
    const day = toDateString(new Date(event.created_at || event.createdAt));
    if (eventsByDay.has(day)) eventsByDay.get(day).push(event);
    addToMap(pageMap, event.path || "/", event);
    addToMap(referrerMap, event.referrer || "Direct", event);
    addToMap(sourceMap, event.source || "direct", event);
    addToMap(countryMap, event.country || "Unknown", event);
    addToMap(deviceMap, event.device_type || event.deviceType || "Unknown", event);
    if (event.event_type === "click" || event.type === "click") addToMap(clickMap, event.event_name || event.eventName || event.target_url || "Unknown", event);
  }
  const daily = dayKeys.map((day) => {
    const dayEvents = eventsByDay.get(day) || [];
    const visitors = new Set(dayEvents.map((event) => event.visitor_id || event.visitorId).filter(Boolean));
    return { timestamp: `${day}T00:00:00.000+08:00`, pageviews: dayEvents.filter((event) => (event.event_type || event.type || "pageview") === "pageview").length, clicks: dayEvents.filter((event) => (event.event_type || event.type) === "click").length, visitors: visitors.size };
  });
  const pageviews = events.filter((event) => (event.event_type || event.type || "pageview") === "pageview").length;
  const clicks = events.filter((event) => (event.event_type || event.type) === "click").length;
  const visitors = new Set(events.map((event) => event.visitor_id || event.visitorId).filter(Boolean)).size;
  const todayKey = toDateString(new Date());
  const today = daily.find((item) => item.timestamp.startsWith(todayKey)) || { pageviews: 0, clicks: 0, visitors: 0 };
  const lastRecordedAt = events.reduce((latest, event) => {
    const value = event.created_at || event.createdAt || "";
    return value > latest ? value : latest;
  }, "");
  return {
    range,
    days,
    since,
    until,
    totals: { pageviews, clicks, visitors },
    today,
    daily,
    topPages: toRankedRows(pageMap, "requestPath"),
    referrers: toRankedRows(referrerMap, "referrerHostname"),
    sources: toRankedRows(sourceMap, "source"),
    clickEvents: toRankedRows(clickMap, "eventName"),
    countries: toRankedRows(countryMap, "country"),
    devices: toRankedRows(deviceMap, "deviceType"),
    storage: { provider: storage.id, label: storage.label, persistent: true, deduplicated: true },
    lastRecordedAt,
    updatedAt: new Date().toISOString(),
  };
}
