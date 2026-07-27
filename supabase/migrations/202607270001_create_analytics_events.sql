create table if not exists public.analytics_events (
  id bigint generated always as identity primary key,
  event_type text not null default 'pageview' check (event_type in ('pageview', 'click')),
  path text not null default '/',
  title text not null default '',
  referrer text not null default 'Direct',
  source text not null default 'direct',
  medium text not null default '',
  campaign text not null default '',
  content text not null default '',
  event_name text not null default '',
  target_url text not null default '',
  visitor_id text not null default '',
  country text not null default 'Unknown',
  device_type text not null default 'Unknown',
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists analytics_events_created_at_idx on public.analytics_events (created_at desc);
create index if not exists analytics_events_type_created_at_idx on public.analytics_events (event_type, created_at desc);
create index if not exists analytics_events_source_idx on public.analytics_events (source);

alter table public.analytics_events enable row level security;
revoke all on public.analytics_events from anon, authenticated;
