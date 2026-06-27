# Performance Prompts

## Optimize a Slow Query
This database query is too slow: [PASTE QUERY or reference file]

Current performance: [execution time or explain plan output]
Table sizes: [approximate row counts]

Analyze and fix:
- Missing indexes
- N+1 patterns
- Unnecessary joins or subqueries
- Data fetched but not used

Explain each optimization before applying it.
Output the optimized query and any required index migrations.

---

## Optimize Bundle Size
Our client-side bundle is too large.
Analyze imports in [FILE PATH or /app/ directory].

Identify:
- Heavy libraries replaceable with lighter alternatives
- Imports that should be dynamic / lazy loaded
- Server-side code accidentally bundled on the client
- Duplicate dependencies

For each issue, provide the specific fix.
Output all modified files.

---

## Add Caching Layer
Add caching to [DESCRIBE WHAT NEEDS CACHING].
Cache system: [Redis / Vercel KV / Next.js unstable_cache / memory]

For each cached operation:
- Cache key strategy (unique, no collisions)
- TTL (how long until expiry)
- Invalidation strategy (when and how to bust the cache)
- Fallback if cache is unavailable

Output the full implementation including cache helpers and updated service functions.
