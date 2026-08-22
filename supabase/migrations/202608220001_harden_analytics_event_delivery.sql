alter table public.analytics_events
  add column if not exists event_id text;

update public.analytics_events
set event_id = concat('legacy-', id::text)
where event_id is null or event_id = '';

alter table public.analytics_events
  alter column event_id set not null;

create unique index if not exists analytics_events_event_id_key
  on public.analytics_events (event_id);
