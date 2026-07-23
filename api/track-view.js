import {
  getDeviceType,
  normalizePath,
  normalizeReferrer,
  recordPageView,
  toDateString,
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

export default async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed." });
  }

  try {
    const body = await readBody(request);
    const userAgent = request.headers["user-agent"] || "";
    const path = normalizePath(body.path);

    if (path === "/admin") {
      return response.status(204).end();
    }

    await recordPageView({
      path,
      title: typeof body.title === "string" ? body.title.slice(0, 180) : "",
      referrer: normalizeReferrer(body.referrer),
      country: request.headers["x-vercel-ip-country"] || "Unknown",
      deviceType: getDeviceType(userAgent),
      day: toDateString(new Date()),
      createdAt: new Date().toISOString(),
    });

    return response.status(204).end();
  } catch (error) {
    return response.status(202).json({
      error: error.message || "Failed to track page view.",
    });
  }
}
