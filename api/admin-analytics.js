const DEFAULT_PROJECT_ID = "prj_iA9rqSl7WBMLjBv9U94aarwaeMSh";
const DEFAULT_TEAM_ID = "team_AhBkKRSV1eNjJ3oohpPgHdJR";

const rangeToDays = {
  "7d": 7,
  "30d": 30,
  "90d": 90,
};

function toDateString(date) {
  return date.toISOString().slice(0, 10);
}

function getDateRange(range) {
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

async function queryVercelAnalytics({ endpoint, token, projectId, teamId, params }) {
  const url = new URL(`https://api.vercel.com/v1/query/web-analytics/visits/${endpoint}`);
  url.searchParams.set("projectId", projectId);

  if (teamId) {
    url.searchParams.set("teamId", teamId);
  }

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, String(value));
    }
  });

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message = body?.error?.message || body?.message || "Failed to query Vercel Analytics.";
    throw new Error(message);
  }

  return body.data;
}

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

  const token = process.env.VERCEL_ANALYTICS_TOKEN || process.env.VERCEL_TOKEN;
  const projectId = process.env.VERCEL_ANALYTICS_PROJECT_ID || DEFAULT_PROJECT_ID;
  const teamId = process.env.VERCEL_ANALYTICS_TEAM_ID || DEFAULT_TEAM_ID;

  if (!token) {
    return response.status(500).json({
      error: "Missing VERCEL_ANALYTICS_TOKEN environment variable.",
    });
  }

  const range = typeof request.query.range === "string" ? request.query.range : "7d";
  const { days, since, until } = getDateRange(range);

  try {
    const [daily, topPages, referrers, countries, devices] = await Promise.all([
      queryVercelAnalytics({
        endpoint: "aggregate",
        token,
        projectId,
        teamId,
        params: { since, until, by: "day" },
      }),
      queryVercelAnalytics({
        endpoint: "aggregate",
        token,
        projectId,
        teamId,
        params: { since, until, by: "requestPath", limit: 8 },
      }),
      queryVercelAnalytics({
        endpoint: "aggregate",
        token,
        projectId,
        teamId,
        params: { since, until, by: "referrerHostname", limit: 8 },
      }),
      queryVercelAnalytics({
        endpoint: "aggregate",
        token,
        projectId,
        teamId,
        params: { since, until, by: "country", limit: 8 },
      }),
      queryVercelAnalytics({
        endpoint: "aggregate",
        token,
        projectId,
        teamId,
        params: { since, until, by: "deviceType", limit: 8 },
      }),
    ]);

    const totals = daily.reduce(
      (sum, item) => ({
        pageviews: sum.pageviews + (item.pageviews || 0),
        visitors: sum.visitors + (item.visitors || 0),
      }),
      { pageviews: 0, visitors: 0 },
    );

    const todayKey = toDateString(new Date());
    const today = daily.find((item) => item.timestamp?.startsWith(todayKey)) || {
      pageviews: 0,
      visitors: 0,
    };

    return response.status(200).json({
      range,
      days,
      since,
      until,
      totals,
      today: {
        pageviews: today.pageviews || 0,
        visitors: today.visitors || 0,
      },
      daily,
      topPages,
      referrers,
      countries,
      devices,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    return response.status(502).json({
      error: error.message || "Failed to load analytics.",
    });
  }
}
