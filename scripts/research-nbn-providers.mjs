/**
 * Full NBN audit: UC detail + provider pages → research report
 * Usage: node scripts/research-nbn-providers.mjs
 */
import {
  PATHS,
  loadPlansFromTs,
  loadRoutes,
  resolveUtilityChoiceUrl,
  fetchHtml,
  loadJson,
  writeJson,
} from './lib/nbn-plan-utils.mjs';
import { parseNBNPlanDetail, extractPageTitle } from './lib/nbn-detail-parser.mjs';
import { extractFromProviderHtml } from './lib/nbn-providers/extract.mjs';
import { normalizeParsed, chooseRecommended, classifyStatus } from './lib/nbn-research-merge.mjs';

const catalog = loadJson(PATHS.catalog);
const aliases = loadJson(PATHS.aliases, {});
const routes = loadRoutes();
const plans = loadPlansFromTs();

const companyHtmlCache = new Map();

async function getCompanyHtml(company) {
  if (companyHtmlCache.has(company)) return companyHtmlCache.get(company);
  const url = catalog?.companies?.[company]?.nbnPlansUrl;
  if (!url) return '';
  try {
    const html = await fetchHtml(url);
    companyHtmlCache.set(company, html);
    return html;
  } catch (err) {
    console.warn('  provider fetch failed', company, err.message);
    companyHtmlCache.set(company, '');
    return '';
  }
}

function catalogEntry(slug) {
  return catalog?.plans?.find((p) => p.slug === slug);
}

async function main() {
  if (!catalog) {
    console.error('Run: node scripts/generate-nbn-catalog.mjs');
    process.exit(1);
  }

  const report = {
    researchedAt: new Date().toISOString(),
    plans: {},
  };

  for (const plan of plans) {
    const entry = catalogEntry(plan.slug) || {};
    const alias = aliases[plan.slug] || {};
    const ucUrl = resolveUtilityChoiceUrl(plan.slug, routes);

    console.log('Research', plan.slug);

    let uc = null;
    let ucTitle = '';
    try {
      const html = await fetchHtml(ucUrl);
      ucTitle = extractPageTitle(html);
      uc = parseNBNPlanDetail(html, plan.name);
      if (!Object.keys(uc.planInfo).length) {
        uc = parseNBNPlanDetail(html, ucTitle);
      }
      uc = normalizeParsed(uc, plan.price);
    } catch (err) {
      console.warn('  UC fail', err.message);
    }

    const providerHtml = await getCompanyHtml(plan.company);
    const providerMeta = {
      company: plan.company,
      providerPlanName: alias.providerPlanName || entry.providerPlanName || plan.name,
      speedTier: entry.speedTier ?? plan.speedMbps,
      keywords: entry.keywords || [],
      snapshot: entry.providerSnapshot,
    };
    let provider = extractFromProviderHtml(providerHtml, providerMeta);
    provider = normalizeParsed(provider, plan.price);

    const trustProvider =
      plan.company === 'Kogan' || Boolean(providerMeta.snapshot);
    const { recommended, source, diffs } = chooseRecommended({
      provider,
      uc,
      snapshot: providerMeta.snapshot,
      listingPrice: plan.price,
      speedTier: entry.speedTier ?? plan.speedMbps,
      company: plan.company,
      trustProvider,
    });

    const status = classifyStatus({
      ucTitle,
      planName: plan.name,
      recommended,
      uc,
      provider,
      diffs,
    });

    report.plans[plan.slug] = {
      slug: plan.slug,
      name: plan.name,
      company: plan.company,
      status,
      mergeSource: source,
      diffs,
      sources: [
        { type: 'utilitychoice', url: ucUrl, fetchedAt: report.researchedAt },
        {
          type: 'provider',
          url: catalog.companies[plan.company]?.nbnPlansUrl,
          fetchedAt: report.researchedAt,
        },
      ],
      ucTitle,
      listing: { price: plan.price, speedMbps: plan.speedMbps },
      uc,
      provider,
      recommended,
    };

    await new Promise((r) => setTimeout(r, 200));
  }

  writeJson(PATHS.researchReport, report);

  const recommendedOnly = {};
  for (const [slug, row] of Object.entries(report.plans)) {
    recommendedOnly[slug] = row.recommended;
  }
  writeJson(PATHS.researchRecommended, recommendedOnly);

  const counts = {};
  for (const row of Object.values(report.plans)) {
    counts[row.status] = (counts[row.status] || 0) + 1;
  }
  console.log('\nStatus summary:', counts);
  console.log('Wrote', PATHS.researchReport);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
