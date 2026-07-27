import { getAnalyticsSummary } from "./_analytics-store.js";

export default async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed." });
  }

  const adminPassword = process.env.ADMIN_ANALYTICS_PASSWORD;
  const providedPassword = request.headers["x-admin-password"] || request.query.password;

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
    const summary = await getAnalyticsSummary(range, from, to);
    return response.status(200).json(summary);
  } catch (error) {
    return response.status(502).json({
      error: error.message || "Failed to load analytics.",
    });
  }
}
