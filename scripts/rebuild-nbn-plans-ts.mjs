/**
 * Rebuild src/data/nbn-plans.ts from catalog + research (fixes regex-corrupted listings)
 * Usage: node scripts/rebuild-nbn-plans-ts.mjs
 */
import fs from 'node:fs';
import { PATHS, loadJson } from './lib/nbn-plan-utils.mjs';
import {
  listingPriceFromDetail,
  listingSetupFees,
  speedFromDetail,
} from './lib/nbn-merge-utils.mjs';

const src = fs.readFileSync(PATHS.plans, 'utf8');
const catalog = loadJson(PATHS.catalog);
const report = loadJson(PATHS.researchReport);

const filterOptionsMatch = src.match(
  /export const nbnPlanFilterOptions = \[[\s\S]*?\] as const;/,
);
const filterOptions = filterOptionsMatch?.[0] ?? 'export const nbnPlanFilterOptions = [] as const;';

function extractBlock(slug) {
  const marker = `slug: '${slug}'`;
  const i = src.indexOf(marker);
  if (i < 0) return null;
  const end = src.indexOf('\n  },', i);
  return src.slice(i, end > i ? end : i + 2500);
}

function parseBlock(block) {
  const name = block.match(/name: '([^']+)'/)?.[1];
  const company = block.match(/company: '([^']+)'/)?.[1];
  const bfMatch = block.match(/bestFeatures: (\[[\s\S]*?\])/);
  const da = block.match(/dataAllowance: '([^']+)'/)?.[1] || 'Unlimited Data';
  const speedNote = block.match(/speedNote: '([^']+)'/)?.[1];
  let bestFeatures = ['Month-to-month', 'BYO modem'];
  if (bfMatch) {
    try {
      bestFeatures = Function(`"use strict"; return (${bfMatch[1]})`)();
    } catch {
      // keep default
    }
  }
  return { name, company, bestFeatures, dataAllowance: da, speedNote };
}

function escapeTs(str) {
  return String(str).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

const planLines = [];

for (const cp of catalog.plans) {
  const row = report.plans[cp.slug];
  const block = extractBlock(cp.slug);
  const meta = block ? parseBlock(block) : {};
  const rec = row?.recommended;
  const speed = rec
    ? speedFromDetail(rec)
    : {
        downloadSpeed: cp.speedTier ? `${cp.speedTier}Mbps` : null,
        speedMbps: cp.speedTier,
        nbnTier:
          cp.speedTier >= 800
            ? 'nbn™1000'
            : cp.speedTier >= 200
              ? 'nbn™250'
              : cp.speedTier >= 90
                ? 'nbn™100'
                : cp.speedTier >= 40
                  ? 'nbn™50'
                  : 'nbn™25',
      };

  const price = rec ? listingPriceFromDetail(rec) : '$0';
  const setupFees = rec ? listingSetupFees(rec) : '$0 setup fees';
  const name = meta.name || cp.utilityChoiceName;
  const company = meta.company || cp.company;
  const dl = speed.downloadSpeed ? `'${speed.downloadSpeed}'` : 'null';
  const sm = speed.speedMbps != null ? String(speed.speedMbps) : 'null';

  const lines = [
    '  {',
    `    slug: '${cp.slug}',`,
    `    name: '${escapeTs(name)}',`,
    `    company: '${escapeTs(company)}',`,
    `    bestFeatures: ${JSON.stringify(meta.bestFeatures || ['Month-to-month', 'BYO modem'])},`,
    `    dataAllowance: '${meta.dataAllowance || 'Unlimited Data'}',`,
    `    downloadSpeed: ${dl},`,
    `    nbnTier: '${speed.nbnTier}',`,
    `    speedMbps: ${sm},`,
    `    price: '${escapeTs(price)}',`,
    `    setupFees: '${escapeTs(setupFees)}',`,
  ];
  if (meta.speedNote) {
    lines.push(`    speedNote: '${escapeTs(meta.speedNote)}',`);
  }
  lines.push('  },');
  planLines.push(lines.join('\n'));
}

const header = `export interface NBNProduct {
  slug: string;
  name: string;
  company: string;
  bestFeatures: string[];
  dataAllowance: string;
  downloadSpeed: string | null;
  speedNote?: string;
  nbnTier: string;
  speedMbps: number | null;
  price: string;
  setupFees: string;
}

export const nbnSpeedFilterOptions = ['24', '25', '50', '99', '100', '220', '245', '250', '700', '780', '800', '860'] as const;

/** Filter value meaning “show all plans” in the company/plan dropdown. */
export const NBN_PLAN_FILTER_ALL = '__ALL__';

export const nbnPlans: NBNProduct[] = [
`;

const footer = `];

${filterOptions}

export function getNBNBySlug(slug: string): NBNProduct | undefined {
  return nbnPlans.find((n) => n.slug === slug);
}

export function getAllNBNPlans(): NBNProduct[] {
  return nbnPlans;
}
`;

const out = header + planLines.join('\n') + footer;
fs.writeFileSync(PATHS.plans, out);
console.log('Rebuilt', catalog.plans.length, 'plans →', PATHS.plans);
