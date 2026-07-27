# Supabase analytics setup

The analytics table and RLS configuration are already applied to the existing Supabase project `team-manage` (`qtixjaeoclfxtuyacaur`) in `ap-southeast-1`.

Set these server-side environment variables in Vercel (and locally when running API functions):

```text
SUPABASE_URL=https://qtixjaeoclfxtuyacaur.supabase.co
SUPABASE_SECRET_KEY=<Supabase Secret key>
```

`SUPABASE_SECRET_KEY` is required only by the Vercel API functions. Never put it in `VITE_*` variables or browser code. The legacy `SUPABASE_SERVICE_ROLE_KEY` name is also supported for compatibility.

The public site sends analytics only to `/api/track-view`; the browser never talks to Supabase directly. The admin endpoint reads the table with the server key after validating `ADMIN_ANALYTICS_PASSWORD`.
