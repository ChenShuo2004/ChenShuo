import { get, list, put } from "@vercel/blob";

const rangeToDays = {
  "7d": 7,
  "30d": 30,
  "90d": 90,
};

export function toDateString(date) {
  return date.toISOString().slice(0, 10);
}

export function getDateRange(range) {
  const days = rangeToDays[range] ?? rangeToDays["7d"];
  const until = new Date();
  const since = new Date(until);
  since.setUTCDate(until.getUTCDate() - days + 1);

  return {
    days,
    since: toDateString(since),
    until: toDateString(until),
  };
}

export function getDaysBetween(since, days) {
  return Array.from({ length: days }, (_, index) => {
    const date = new Date(`${since}T00:00:00.000Z`);
    date.setUTCDate(date.getUTCDate() + index);
    return toDateString(date);
  });
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

  try {
    return new URL(referrer).hostname.replace(/^www\./, "") || "Direct";
  } catch {
    return "Direct";
  }
}

export async function recordPageView(event) {
  const now = new Date();
  const day = toDateString(now);
  const random = Math.random().toString(36).slice(2, 10);
  const pathname = `views/${day}/${now.getTime()}-${random}.json`;

  await put(pathname, JSON.stringify(event), {
    access: "private",
    allowOverwrite: false,
    contentType: "application/json",
  });
}

async function readJsonBlob(pathname) {
  const result = await get(pathname, {
    access: "private",
    useCache: false,
  });

  if (!result?.stream) return null;

  const text = await new Response(result.stream).text();
  return JSON.parse(text);
}

async function listDayEvents(day) {
  const events = [];
  let cursor;

  do {
    const result = await list({
      prefix: `views/${day}/`,
      limit: 1000,
      cursor,
    });

    const batch = await Promise.all(
      result.blobs.map((blob) => readJsonBlob(blob.pathname).catch(() => null)),
    );

    events.push(...batch.filter(Boolean));
    cursor = result.cursor;
  } while (cursor);

  return events;
}

function increment(map, key, event) {
  const label = key || "Unknown";
  const current = map.get(label) || { label, pageviews: 0, visitors: 0 };

  current.pageviews += 1;
  current.visitors += 1;
  map.set(label, current);
}

function toRankedRows(map, fieldName) {
  return Array.from(map.values())
    .sort((a, b) => b.pageviews - a.pageviews)
    .slice(0, 8)
    .map((item) => ({
      [fieldName]: item.label,
      pageviews: item.pageviews,
      visitors: item.visitors,
    }));
}

export async function getAnalyticsSummary(range) {
  const { days, since, until } = getDateRange(range);
  const dayKeys = getDaysBetween(since, days);
  const eventsByDay = await Promise.all(dayKeys.map((day) => listDayEvents(day)));
  const pageMap = new Map();
  const referrerMap = new Map();
  const countryMap = new Map();
  const deviceMap = new Map();

  const daily = dayKeys.map((day, index) => {
    const events = eventsByDay[index];

    events.forEach((event) => {
      increment(pageMap, event.path || "/", event);
      increment(referrerMap, event.referrer || "Direct", event);
      increment(countryMap, event.country || "Unknown", event);
      increment(deviceMap, event.deviceType || "Unknown", event);
    });

    return {
      timestamp: `${day}T00:00:00.000Z`,
      pageviews: events.length,
      visitors: events.length,
    };
  });

  const totals = daily.reduce(
    (sum, item) => ({
      pageviews: sum.pageviews + item.pageviews,
      visitors: sum.visitors + item.visitors,
    }),
    { pageviews: 0, visitors: 0 },
  );

  const todayKey = toDateString(new Date());
  const today = daily.find((item) => item.timestamp.startsWith(todayKey)) || {
    pageviews: 0,
    visitors: 0,
  };

  return {
    range,
    days,
    since,
    until,
    totals,
    today: {
      pageviews: today.pageviews,
      visitors: today.visitors,
    },
    daily,
    topPages: toRankedRows(pageMap, "requestPath"),
    referrers: toRankedRows(referrerMap, "referrerHostname"),
    countries: toRankedRows(countryMap, "country"),
    devices: toRankedRows(deviceMap, "deviceType"),
    updatedAt: new Date().toISOString(),
  };
}
