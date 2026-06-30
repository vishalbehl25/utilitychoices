import { stripHtml } from '../credit-card-table-parser.mjs'; // scripts/lib/
import { formatMoney, parseMoney } from '../nbn-merge-utils.mjs';

const DEFAULT_TECH = 'FTTP FTTB FTTN FTTC HFC';

/** Kogan Internet public tier table (evening speeds) — Jun 2026 */
const KOGAN_TIERS = {
  bronze: { dl: 25, ul: 8, maxDl: 25, maxUl: 10, promo: 46.9, ongoing: 68.9 },
  silver: { dl: 50, ul: 17, maxDl: 50, maxUl: 20, promo: 59.9, ongoing: 78.9 },
  gold: { dl: 100, ul: 17, maxDl: 100, maxUl: 20, promo: 65.9, ongoing: 83.9 },
  platinum: { dl: 250, ul: 21, maxDl: 250, maxUl: 25, promo: 84.9, ongoing: 94.9 },
  diamond: { dl: 800, ul: 42, maxDl: 1000, maxUl: 50, promo: 98.9, ongoing: 108.9 },
};

function planInfoFromSpeeds(tier) {
  return {
    'Connection Type': 'NBN',
    'Typical download speed (Mbps)': String(tier.dl),
    'Typical upload speed (Mbps)': String(tier.ul),
    'Technology type': tier.tech || DEFAULT_TECH,
    'Plan length': 'Month-to-month',
    'Maximum upload speed (Mbps)': String(tier.maxUl),
    'Maximum download speed (Mbps)': String(tier.maxDl),
    'Data Allowance': 'Unlimited Data',
    'Plan type': 'N/A',
  };
}

function costFromTier(tier, modem = 'BYO modem') {
  return {
    'Promotional Cost': formatMoney(tier.promo),
    'Minimum cost': formatMoney(tier.promo),
    'Setup fee': '$0',
    'Modem description': modem,
    'Modem T&Cs': 'N/A',
    'Ongoing cost': formatMoney(tier.ongoing),
    'Modem delivery fee': '$0',
  };
}

function detailFromTier(tier, modem) {
  return {
    planInfo: planInfoFromSpeeds(tier),
    cost: costFromTier(tier, modem),
    bundles: {
      'Home phone included': 'No',
      'Entertainment included': 'No',
    },
    sidebarDownloadMbps: String(tier.maxDl),
    sidebarUploadMbps: String(tier.maxUl),
  };
}

function extractKogan(providerPlanName) {
  const key = providerPlanName.toLowerCase();
  if (key.includes('bronze')) return detailFromTier(KOGAN_TIERS.bronze);
  if (key.includes('silver')) return detailFromTier(KOGAN_TIERS.silver);
  if (key.includes('gold') && !key.includes('platinum')) return detailFromTier(KOGAN_TIERS.gold);
  if (key.includes('platinum')) return detailFromTier(KOGAN_TIERS.platinum);
  if (key.includes('diamond')) return detailFromTier(KOGAN_TIERS.diamond);
  return null;
}

function findPricesNear(text, anchor, windowSize = 800) {
  const idx = text.toLowerCase().indexOf(anchor.toLowerCase());
  if (idx < 0) return [];
  const chunk = text.slice(Math.max(0, idx - 200), idx + windowSize);
  return [...chunk.matchAll(/\$\s?(\d+(?:\.\d{2})?)/g)].map((m) => Number.parseFloat(m[1]));
}

function findSpeedsNear(text, anchor) {
  const idx = text.toLowerCase().indexOf(anchor.toLowerCase());
  if (idx < 0) return [];
  const chunk = text.slice(idx, idx + 600);
  return [...chunk.matchAll(/(\d{2,4})\s*(?:Mbps|\/)/gi)].map((m) => Number.parseInt(m[1], 10));
}

/**
 * Generic extraction: locate plan name / keywords on provider page and infer tier.
 */
export function extractFromProviderHtml(html, meta) {
  const { company, providerPlanName, speedTier, keywords = [], snapshot } = meta;

  if (snapshot?.planInfo) {
    return {
      planInfo: snapshot.planInfo,
      cost: snapshot.cost,
      bundles: snapshot.bundles || {
        'Home phone included': 'No',
        'Entertainment included': 'No',
      },
      sidebarDownloadMbps: snapshot.sidebarDownloadMbps || snapshot.planInfo['Maximum download speed (Mbps)'],
      sidebarUploadMbps: snapshot.sidebarUploadMbps || snapshot.planInfo['Maximum upload speed (Mbps)'],
    };
  }

  if (company === 'Kogan') {
    const kogan = extractKogan(providerPlanName);
    if (kogan) return kogan;
  }

  const text = stripHtml(html);
  const anchors = [providerPlanName, ...keywords].filter(Boolean);
  let prices = [];
  let speeds = [];

  for (const anchor of anchors) {
    prices = prices.concat(findPricesNear(text, anchor));
    speeds = speeds.concat(findSpeedsNear(text, anchor));
  }

  if (!prices.length && speedTier) {
    prices = findPricesNear(text, `${speedTier}`);
    speeds = findSpeedsNear(text, `${speedTier}`);
  }

  if (!prices.length && !speeds.length) return null;

  const sortedPrices = [...new Set(prices)].sort((a, b) => a - b);
  const promo = sortedPrices[0] ?? null;
  const ongoing = sortedPrices.length > 1 ? sortedPrices[sortedPrices.length - 1] : promo;
  const dl = speeds.find((s) => s >= 20) || speedTier || speeds[0] || 25;
  const ul =
    dl >= 250 ? 21 : dl >= 100 ? 17 : dl >= 50 ? 17 : dl >= 25 ? 8 : 5;
  const maxUl = dl >= 250 ? 25 : dl >= 100 ? 20 : dl >= 50 ? 20 : dl >= 25 ? 10 : 5;

  const tier = {
    dl,
    ul,
    maxDl: dl,
    maxUl,
    promo: promo ?? 0,
    ongoing: ongoing ?? promo ?? 0,
  };

  return detailFromTier(tier);
}
