/**
 * Generate scripts/data/nbn-provider-catalog.json from nbn-plans.ts
 * Usage: node scripts/generate-nbn-catalog.mjs
 */
import fs from 'node:fs';
import { PATHS, loadPlansFromTs, loadRoutes, resolveUtilityChoiceUrl } from './lib/nbn-plan-utils.mjs';

const COMPANIES = {
  Tangerine: { nbnPlansUrl: 'https://www.tangerine.com.au/broadband' },
  Superloop: { nbnPlansUrl: 'https://www.superloop.com/nbn/' },
  Elevate: { nbnPlansUrl: 'https://www.elevateinternet.com.au/' },
  amaysim: { nbnPlansUrl: 'https://www.amaysim.com.au/broadband' },
  Exetel: { nbnPlansUrl: 'https://www.exetel.com.au/nbn' },
  AGL: { nbnPlansUrl: 'https://www.agl.com.au/energy/internet/nbn-plans' },
  Kogan: { nbnPlansUrl: 'https://www.koganinternet.com.au/plans/' },
  'Buddy Telco': { nbnPlansUrl: 'https://www.buddytelco.com.au/' },
  TPG: { nbnPlansUrl: 'https://www.tpg.com.au/nbn' },
  Optus: { nbnPlansUrl: 'https://www.optus.com.au/broadband-internet' },
  iiNet: { nbnPlansUrl: 'https://www.iinet.net.au/nbn/' },
  iPrimus: { nbnPlansUrl: 'https://www.iprimus.com.au/internet' },
  Belong: { nbnPlansUrl: 'https://www.belong.com.au/internet' },
  'Southern Phone': { nbnPlansUrl: 'https://www.southernphone.com.au/internet' },
  Dodo: { nbnPlansUrl: 'https://www.dodo.com/nbn' },
};

/** Curated when provider HTML is unavailable — verified Jun 2026 */
const PROVIDER_SNAPSHOTS = {
  'kogan-nbn-gold': {
    planInfo: {
      'Connection Type': 'NBN',
      'Typical download speed (Mbps)': '100',
      'Typical upload speed (Mbps)': '17',
      'Technology type': 'FTTP FTTB FTTN FTTC HFC',
      'Plan length': 'Month-to-month',
      'Maximum upload speed (Mbps)': '20',
      'Maximum download speed (Mbps)': '100',
      'Data Allowance': 'Unlimited Data',
      'Plan type': 'N/A',
    },
    cost: {
      'Promotional Cost': '$65.90',
      'Minimum cost': '$65.90',
      'Setup fee': '$0',
      'Modem description': 'BYO modem',
      'Modem T&Cs': 'N/A',
      'Ongoing cost': '$83.90',
      'Modem delivery fee': '$0',
    },
    bundles: { 'Home phone included': 'No', 'Entertainment included': 'No' },
    sidebarDownloadMbps: '100',
    sidebarUploadMbps: '20',
  },
  'iprimus-standard-plus': {
    planInfo: {
      'Connection Type': 'NBN',
      'Typical download speed (Mbps)': '50',
      'Typical upload speed (Mbps)': '17',
      'Technology type': 'FTTP FTTB FTTN FTTC HFC',
      'Plan length': 'Month-to-month',
      'Maximum upload speed (Mbps)': '20',
      'Maximum download speed (Mbps)': '50',
      'Data Allowance': 'Unlimited Data',
      'Plan type': 'N/A',
    },
    cost: {
      'Promotional Cost': 'N/A',
      'Minimum cost': '$264',
      'Setup fee': '$0',
      'Modem description': '$0 modem if you stay connected for 18 months',
      'Modem T&Cs':
        'Modem cost is $180 but iPrimus will cover the cost for each month you stay connected (at $10 per month). If you leave before 18 months, you must pay out the remaining in full.',
      'Ongoing cost': '$84',
      'Modem delivery fee': '$0',
    },
    bundles: { 'Home phone included': 'No', 'Entertainment included': 'No' },
    sidebarDownloadMbps: '50',
    sidebarUploadMbps: '20',
  },
};

function providerPlanNameFromSlug(slug, name) {
  const stripped = name
    .replace(/nbn®/gi, '')
    .replace(/NBN/gi, '')
    .trim();
  if (slug.includes('kogan-nbn-bronze')) return 'Bronze nbn 25';
  if (slug.includes('kogan-nbn-gold')) return 'Gold nbn 100';
  if (slug.includes('kogan-nbn-platinum')) return 'Platinum nbn 250';
  if (slug === 'iprimus-standard-plus') return 'Standard Plus 50';
  if (slug === 'iprimus-standard-plus-nbn') return 'Standard Plus 25';
  return stripped || name;
}

function keywordsFromSlug(slug, name) {
  const k = [name];
  if (slug.includes('nbn25')) k.push('NBN25', '25');
  if (slug.includes('nbn50')) k.push('NBN50', '50');
  if (slug.includes('ultrafast')) k.push('Ultrafast', '1000');
  if (slug.includes('lightspeed')) k.push('Lightspeed');
  if (slug.includes('family')) k.push('Family');
  return [...new Set(k)];
}

const plans = loadPlansFromTs();
const routes = loadRoutes();

const catalog = {
  generatedAt: new Date().toISOString(),
  companies: COMPANIES,
  plans: plans.map((p) => ({
    slug: p.slug,
    company: p.company,
    utilityChoiceName: p.name,
    utilityChoiceUrl: resolveUtilityChoiceUrl(p.slug, routes),
    providerPlanName: providerPlanNameFromSlug(p.slug, p.name),
    speedTier: p.speedMbps,
    keywords: keywordsFromSlug(p.slug, p.name),
    providerSnapshot: PROVIDER_SNAPSHOTS[p.slug] ?? null,
  })),
};

fs.writeFileSync(PATHS.catalog, `${JSON.stringify(catalog, null, 2)}\n`);
console.log('Wrote', PATHS.catalog, '—', catalog.plans.length, 'plans');
