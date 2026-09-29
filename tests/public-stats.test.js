import assert from "node:assert/strict";
import test from "node:test";
import { getPublicReadership } from "../cloudflare/worker.js";

test("public readership exposes totals and article views without visitor IDs", async () => {
  const db = {
    prepare(sql) {
      if (sql.includes("GROUP BY path")) return { all: async () => ({ results: [{ path: "/blog/story", views: 2 }] }) };
      return { first: async () => ({ pageviews: 3, visitors: 2, firstRecordedAt: "2026-07-27T00:00:00Z" }) };
    },
  };
  const result = await getPublicReadership(db);
  assert.equal(result.pageviews, 3);
  assert.equal(result.visitors, 2);
  assert.equal(result.articles["/blog/story"], 2);
  assert.equal(result.firstRecordedAt, "2026-07-27T00:00:00Z");
  assert.equal(JSON.stringify(result).includes("visitor_id"), false);
});
