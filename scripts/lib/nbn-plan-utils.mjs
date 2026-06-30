import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '../..');

export const PATHS = {
  root: ROOT,
  plans: path.join(ROOT, 'src/data/nbn-plans.ts'),
  routes: path.join(ROOT, 'src/data/nbn-routes.json'),
  catalog: path.join(ROOT, 'scripts/data/nbn-provider-catalog.json'),
  aliases: path.join(ROOT, 'scripts/data/nbn-plan-name-aliases.json'),
  researchReport: path.join(ROOT, 'scripts/data/nbn-plan-research-report.json'),
  scraped: path.join(ROOT, 'src/data/nbn-plan-details-scraped.json'),
  overrides: path.join(ROOT, 'scripts/data/nbn-plan-detail-overrides.json'),
  researchRecommended: path.join(ROOT, 'scripts/data/nbn-plan-research-recommended.json'),
};

export const UC_SCRAPE_URL_OVERRIDES = {
  'iprimus-standard-plus': 'https://www.utilitychoices.com.au/nbn/kogan-nbn-gold-',
};

export function loadPlansFromTs() {
  const src = fs.readFileSync(PATHS.plans, 'utf8');
  const plans = [];
  const blockRe =
    /slug: '([^']+)',[\s\S]*?name: '([^']+)',[\s\S]*?company: '([^']+)',[\s\S]*?downloadSpeed: ([^,]+),[\s\S]*?speedMbps: ([^,]+),[\s\S]*?price: '([^']+)',[\s\S]*?setupFees: '([^']+)'/g;
  let m;
  while ((m = blockRe.exec(src))) {
    plans.push({
      slug: m[1],
      name: m[2].replace(/\\'/g, "'"),
      company: m[3],
      downloadSpeed: m[4] === 'null' ? null : m[4].replace(/'/g, ''),
      speedMbps: m[5] === 'null' ? null : Number(m[5]),
      price: m[6],
      setupFees: m[7].replace(/\\'/g, "'"),
    });
  }
  return plans;
}

export function loadRoutes() {
  return JSON.parse(fs.readFileSync(PATHS.routes, 'utf8'));
}

export function normalizeSlug(slug) {
  return slug.replace(/^-/, '').replace(/-$/, '').replace(/%C2%AE/g, '');
}

export function resolveUtilityChoiceUrl(slug, routes) {
  if (UC_SCRAPE_URL_OVERRIDES[slug]) return UC_SCRAPE_URL_OVERRIDES[slug];
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

export async function fetchHtml(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; UtilityChoiceNBN/1.0)' },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

export function loadJson(path, fallback = null) {
  if (!fs.existsSync(path)) return fallback;
  return JSON.parse(fs.readFileSync(path, 'utf8'));
}

export function writeJson(path, data) {
  fs.writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`);
}
