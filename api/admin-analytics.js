import { getAnalyticsSummary } from "./_analytics-store.js";

function isValidCustomRange(from, to) {
  if (!from || !to || !/^\d{4}-\d{2}-\d{2}$/.test(from) || !/^\d{4}-\d{2}-\d{2}$/.test(to) || from > to) return false;
  const days = Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 86400000) + 1;
  return days >= 1 && days <= 366;
}

export default async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed." });
  }

  const adminPassword = process.env.ADMIN_ANALYTICS_PASSWORD;
  const providedPassword = request.headers["x-admin-password"];

  if (!adminPassword) {
    return response.status(500).json({
      error: "Missing ADMIN_ANALYTICS_PASSWORD environment variable.",
    });
  }

  if (providedPassword !== adminPassword) {
    return response.status(401).json({ error: "Invalid admin password." });
  }

  try {
    const range = typeof request.query.range === "string" ? request.query.range : "7d";
    const from = typeof request.query.from === "string" ? request.query.from : undefined;
    const to = typeof request.query.to === "string" ? request.query.to : undefined;

    if (!["1d", "7d", "30d", "90d", "custom"].includes(range)) {
      return response.status(400).json({ error: "Invalid analytics range." });
    }

    if (range === "custom" && !isValidCustomRange(from, to)) {
      return response.status(400).json({ error: "自定义分析区间必须是 1 至 366 天。" });
    }

    const summary = await getAnalyticsSummary(range, from, to);
    response.setHeader("Cache-Control", "private, no-store");
    return response.status(200).json(summary);
  } catch (error) {
    return response.status(502).json({
      error: error.message || "Failed to load analytics.",
    });
  }
}
