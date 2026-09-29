CREATE TABLE IF NOT EXISTS analytics_events (
  event_id TEXT PRIMARY KEY,
  event_type TEXT NOT NULL CHECK (event_type IN ('pageview', 'click')),
  path TEXT NOT NULL,
  title TEXT NOT NULL DEFAULT '',
  referrer TEXT NOT NULL DEFAULT 'Direct',
  source TEXT NOT NULL DEFAULT 'direct',
  medium TEXT NOT NULL DEFAULT '',
  campaign TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  event_name TEXT NOT NULL DEFAULT '',
  target_url TEXT NOT NULL DEFAULT '',
  visitor_id TEXT NOT NULL DEFAULT '',
  country TEXT NOT NULL DEFAULT 'Unknown',
  device_type TEXT NOT NULL DEFAULT 'Unknown',
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS analytics_events_created_at_idx ON analytics_events(created_at);
CREATE INDEX IF NOT EXISTS analytics_events_visitor_id_created_at_idx ON analytics_events(visitor_id, created_at);
