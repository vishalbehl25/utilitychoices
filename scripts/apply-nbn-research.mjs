/**
 * Apply research report → overrides, listing (nbn-plans.ts), then rebuild details
 * Usage: node scripts/apply-nbn-research.mjs
 */
import fs from 'node:fs';
import { execSync } from 'node:child_process';
import { PATHS, loadJson, writeJson } from './lib/nbn-plan-utils.mjs';

const report = loadJson(PATHS.researchReport);
if (!report?.plans) {
  console.error('Run: node scripts/research-nbn-providers.mjs');
  process.exit(1);
}

const existingOverrides = loadJson(PATHS.overrides, {});
const overrides = { ...existingOverrides };
let overrideCount = 0;

for (const [slug, row] of Object.entries(report.plans)) {
  if (!row.recommended || Object.keys(row.recommended.planInfo || {}).length < 5) continue;
  const needsOverride =
    row.status !== 'ok' ||
    row.mergeSource === 'provider' ||
    row.mergeSource === 'catalog_snapshot' ||
    (row.diffs && row.diffs.length > 0);

  if (needsOverride) {
    overrides[slug] = {
      planInfo: row.recommended.planInfo,
      cost: row.recommended.cost,
      bundles: row.recommended.bundles,
      sidebarDownloadMbps: row.recommended.sidebarDownloadMbps,
      sidebarUploadMbps: row.recommended.sidebarUploadMbps,
    };
    overrideCount++;
  }
}

writeJson(PATHS.overrides, overrides);
console.log('Wrote overrides:', overrideCount, 'plans →', PATHS.overrides);

// Rebuild listing fields from research (safe codegen — no regex on TS source)
execSync('node scripts/rebuild-nbn-plans-ts.mjs', { cwd: PATHS.root, stdio: 'inherit' });

console.log('\nRunning build-nbn-plan-details.mjs ...');
execSync('node scripts/build-nbn-plan-details.mjs', {
  cwd: PATHS.root,
  stdio: 'inherit',
});

console.log('\nDone. Run: node scripts/validate-nbn-data.mjs');
