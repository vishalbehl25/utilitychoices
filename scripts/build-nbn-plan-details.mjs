/**
 * Scrape live NBN detail pages and write src/data/nbn-plan-details.ts
 *
 * Usage: node scripts/build-nbn-plan-details.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseNBNPlanDetail } from './lib/nbn-detail-parser.mjs';
import { sanitizeCostFields } from './lib/nbn-merge-utils.mjs';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const PLANS_PATH = path.join(ROOT, 'src/data/nbn-plans.ts');
const ROUTES_PATH = path.join(ROOT, 'src/data/nbn-routes.json');
const SCRAPED_JSON = path.join(ROOT, 'src/data/nbn-plan-details-scraped.json');
const OUT_TS = path.join(ROOT, 'src/data/nbn-plan-details.ts');
const OVERRIDES_PATH = path.join(
  ROOT,
  'scripts/data/nbn-plan-detail-overrides.json',
);
const RESEARCH_PATH = path.join(
  ROOT,
  'scripts/data/nbn-plan-research-recommended.json',
);

/** Live Wix routes that return the wrong dynamic page. */
const SCRAPE_URL_OVERRIDES = {
  'iprimus-standard-plus':
    'https://www.utilitychoices.com.au/nbn/kogan-nbn-gold-',
};

const MANUAL_OVERRIDES = JSON.parse(fs.readFileSync(OVERRIDES_PATH, 'utf8'));
const RESEARCH_RECOMMENDED = fs.existsSync(RESEARCH_PATH)
  ? JSON.parse(fs.readFileSync(RESEARCH_PATH, 'utf8'))
  : {};

function loadPlans() {
  const src = fs.readFileSync(PLANS_PATH, 'utf8');
  const plans = [];
  const slugRe = /slug: '([^']+)',[\s\S]*?name: '([^']+)'/g;
  let m;
  while ((m = slugRe.exec(src))) {
    plans.push({ slug: m[1], name: m[2].replace(/\\'/g, "'") });
  }
  return plans;
}

function loadListingPrice(slug) {
  const src = fs.readFileSync(PLANS_PATH, 'utf8');
  const re = new RegExp(
    `slug: '${slug.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}'[\\s\\S]*?price: '([^']+)'`,
  );
  const m = src.match(re);
  return m?.[1] ?? '';
}

function loadRoutes() {
  return JSON.parse(fs.readFileSync(ROUTES_PATH, 'utf8'));
}

function normalizeSlug(slug) {
  return slug.replace(/^-/, '').replace(/-$/, '').replace(/%C2%AE/g, '');
}

function resolveUrl(slug, routes) {
  const clean = normalizeSlug(slug);
  const match = routes.find((r) => {
    const routeSlug = normalizeSlug(r.slug);
    return (
      r.slug === slug ||
      routeSlug === clean ||
      r.slug === `-${clean}` ||
      r.slug === `${clean}-` ||
      routeSlug === `${clean}®`
    );
  });
  if (match?.fullUrl) return match.fullUrl;
  return `https://www.utilitychoices.com.au/nbn/${encodeURIComponent(slug)}`;
}

function esc(str) {
  return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function rowsToTs(rows, indent) {
  return Object.entries(rows)
    .map(([k, v]) => `${indent}    '${esc(k)}': '${esc(v)}',`)
    .join('\n');
}

async function fetchPage(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; UtilityChoiceScraper/1.0)' },
  });
  if (!res.ok) throw new Error(`${res.status}`);
  return res.text();
}

async function main() {
  const plans = loadPlans();
  const routes = loadRoutes();
  const scraped = { scrapedAt: new Date().toISOString(), plans: {} };
  const details = [];

  for (const plan of plans) {
    const override = MANUAL_OVERRIDES[plan.slug];
    const research = RESEARCH_RECOMMENDED[plan.slug];
    const listingPrice = loadListingPrice(plan.slug);

    if (override) {
      console.log('Override', plan.slug, '(file)');
      const parsed = sanitizeCostFields(override, listingPrice);
      scraped.plans[plan.slug] = {
        slug: plan.slug,
        name: plan.name,
        sourceUrl: 'override',
        ...parsed,
      };
      details.push({ plan, parsed });
      continue;
    }

    let parsed = null;
    let sourceUrl = 'research';

    if (research && Object.keys(research.planInfo || {}).length >= 5) {
      parsed = sanitizeCostFields(research, listingPrice);
      console.log('  using research recommended');
    } else {
      const url = SCRAPE_URL_OVERRIDES[plan.slug] ?? resolveUrl(plan.slug, routes);
      sourceUrl = url;
      try {
        console.log('Fetching', plan.slug, '→', url);
        const html = await fetchPage(url);
        parsed = parseNBNPlanDetail(html, plan.name);
        parsed = sanitizeCostFields(parsed, listingPrice);
      } catch (err) {
        console.error('  FAIL', plan.slug, err.message);
      }
    }

    if (!parsed || Object.keys(parsed.planInfo).length === 0) {
      console.error('  SKIP empty', plan.slug);
      await new Promise((r) => setTimeout(r, 350));
      continue;
    }

    scraped.plans[plan.slug] = {
      slug: plan.slug,
      name: plan.name,
      sourceUrl,
      ...parsed,
    };

    details.push({ plan, parsed });
    console.log(
      '  ok',
      sourceUrl,
      `planInfo=${Object.keys(parsed.planInfo).length}`,
      `cost=${Object.keys(parsed.cost).length}`,
    );

    await new Promise((r) => setTimeout(r, 350));
  }

  fs.writeFileSync(SCRAPED_JSON, `${JSON.stringify(scraped, null, 2)}\n`);

  const entries = details
    .map(({ plan, parsed }) => {
      return `  {
    ...getNBNBySlug('${esc(plan.slug)}')!,
    planInfo: {
${rowsToTs(parsed.planInfo, '    ')}
    },
    cost: {
${rowsToTs(parsed.cost, '    ')}
    },
    bundles: {
${rowsToTs(parsed.bundles, '    ')}
    },
    sidebarDownloadMbps: '${esc(parsed.sidebarDownloadMbps)}',
    sidebarUploadMbps: '${esc(parsed.sidebarUploadMbps)}',
  }`;
    })
    .join(',\n');

  const ts = `/**
 * Auto-generated — UC scrape + provider research merge. Do not edit by hand.
 * Regenerate: node scripts/apply-nbn-research.mjs
 * Generated: ${scraped.scrapedAt}
 */
import { nbnPlans, getNBNBySlug, type NBNProduct } from '@/data/nbn-plans';

export interface NBNPlanDetail extends NBNProduct {
  planInfo: Record<string, string>;
  cost: Record<string, string>;
  bundles: Record<string, string>;
  sidebarDownloadMbps: string;
  sidebarUploadMbps: string;
}

export const nbnPlanDetails: NBNPlanDetail[] = [
${entries}
];

export function getNBNPlanDetailBySlug(slug: string): NBNPlanDetail | undefined {
  return nbnPlanDetails.find((plan) => plan.slug === slug);
}

export function getAllNBNPlanDetails(): NBNPlanDetail[] {
  return nbnPlanDetails;
}
`;

  fs.writeFileSync(OUT_TS, ts);
  console.log(`\nWrote ${details.length} plans → ${OUT_TS}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
