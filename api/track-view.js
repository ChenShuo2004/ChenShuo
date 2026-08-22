import {
  getDeviceType,
  normalizeCampaign,
  normalizePath,
  normalizeReferrer,
  normalizeSource,
  recordAnalyticsEvent,
} from "./_analytics-store.js";

async function readBody(request) {
  const chunks = [];

  for await (const chunk of request) {
    chunks.push(chunk);
  }

  if (chunks.length === 0) return {};

  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return {};
  }
}

function normalizeEventId(value) {
  if (typeof value !== "string") return "";
  const eventId = value.trim();
  return /^[A-Za-z0-9_-]{16,120}$/.test(eventId) ? eventId : "";
}

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }

  try {
    const body = await readBody(request);
    const userAgent = request.headers["user-agent"] || "";
    const path = normalizePath(body.path);
    const eventId = normalizeEventId(body.eventId);

    if (path === "/admin") {
      return response.status(204).end();
    }

    if (!eventId) {
      return response.status(400).json({ error: "Invalid analytics event id." });
    }

    const eventType = body.eventType === "click" ? "click" : "pageview";
    const referrer = normalizeReferrer(body.referrer);
    await recordAnalyticsEvent({
      event_id: eventId,
      event_type: eventType,
      path,
      title: typeof body.title === "string" ? body.title.slice(0, 180) : "",
      referrer,
      source: normalizeSource(body.source, referrer),
      medium: normalizeCampaign(body.medium),
      campaign: normalizeCampaign(body.campaign),
      content: normalizeCampaign(body.content),
      event_name: normalizeCampaign(body.eventName),
      target_url: typeof body.targetUrl === "string" ? body.targetUrl.slice(0, 500) : "",
      visitor_id: typeof body.visitorId === "string" ? body.visitorId.slice(0, 80) : "",
      country: request.headers["x-vercel-ip-country"] || "Unknown",
      device_type: getDeviceType(userAgent),
      created_at: new Date().toISOString(),
    });

    return response.status(204).end();
  } catch (error) {
    return response.status(503).json({
      error: error.message || "Failed to track page view.",
    });
  }
}
