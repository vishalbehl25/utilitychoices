# NBN plan data sources

Plan listing and detail tabs are built from a merge pipeline (provider research takes priority over Utility Choice scrape).

## Regenerate everything

```bash
node scripts/generate-nbn-catalog.mjs
node scripts/research-nbn-providers.mjs
node scripts/apply-nbn-research.mjs   # also runs rebuild-nbn-plans-ts.mjs
node scripts/validate-nbn-data.mjs
```

To refresh listing cards only (after editing the research report):

```bash
node scripts/rebuild-nbn-plans-ts.mjs
```

## Files

| File | Purpose |
|------|---------|
| `src/data/nbn-plans.ts` | Listing cards (price, speed, features) |
| `src/data/nbn-plan-details.ts` | Detail tabs (generated) |
| `scripts/data/nbn-provider-catalog.json` | Provider URLs + plan mapping |
| `scripts/data/nbn-plan-research-report.json` | Full audit (UC vs provider vs recommended) |
| `scripts/data/nbn-plan-research-recommended.json` | Merged detail used by build |
| `scripts/data/nbn-plan-detail-overrides.json` | Per-slug overrides applied before build |

## Merge priority

1. `nbn-plan-detail-overrides.json`
2. `nbn-plan-research-recommended.json` (from provider + UC research)
3. Live UC scrape (fallback if research missing)

## Provider pages

Company NBN plan URLs live in `scripts/data/nbn-provider-catalog.json` under `companies`.

Kogan tier speeds/prices use Kogan Internet public tier data when the provider HTML is not parseable.

## Known live UC issues (clone uses provider instead)

- `kogan-nbn-gold` — UC URL serves wrong page
- `iprimus-standard-plus-nbn` — UC URL serves iiNet page; listing name kept, detail from iPrimus/provider research
