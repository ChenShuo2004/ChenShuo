# Supabase analytics setup

The analytics table and RLS configuration are already applied to the existing Supabase project `team-manage` (`qtixjaeoclfxtuyacaur`) in `ap-southeast-1`.

Set these server-side environment variables in Vercel (and locally when running API functions):

```text
SUPABASE_URL=https://qtixjaeoclfxtuyacaur.supabase.co
SUPABASE_SECRET_KEY=<Supabase Secret key>
```

`SUPABASE_SECRET_KEY` is required only by the Vercel API functions. Never put it in `VITE_*` variables or browser code. The legacy `SUPABASE_SERVICE_ROLE_KEY` name is also supported for compatibility.

The public site sends analytics only to `/api/track-view`; the browser never talks to Supabase directly. The admin endpoint reads the table with the server key after validating `ADMIN_ANALYTICS_PASSWORD`.

## Reliable event delivery

Apply `supabase/migrations/202608220001_harden_analytics_event_delivery.sql` in the Supabase SQL editor before deploying this version. It adds a unique event ID so browser retries cannot create duplicate records.

The browser now keeps up to 50 unsent analytics events locally and retries them whenever the connection returns. The API reports a storage failure as an error instead of silently accepting and dropping the event.

For production, configure both variables in every Vercel environment (Production, Preview, and Development):

```text
SUPABASE_URL=https://qtixjaeoclfxtuyacaur.supabase.co
SUPABASE_SECRET_KEY=<Supabase Secret key>
```

`BLOB_READ_WRITE_TOKEN` remains an optional fallback only. The admin dashboard shows the active storage provider and the latest recorded event so storage health is visible at a glance.
