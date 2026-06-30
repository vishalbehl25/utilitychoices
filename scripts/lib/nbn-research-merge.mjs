import {
  sanitizeCostFields,
  mergeDetailRecord,
  isDetailComplete,
  diffFields,
  parseMoney,
} from './nbn-merge-utils.mjs';

export function normalizeParsed(detail, listingPrice = '') {
  if (!detail) return null;
  const merged = mergeDetailRecord([detail]);
  merged.cost = sanitizeCostFields(merged.cost, listingPrice);
  if (!merged.bundles['Home phone included']) {
    merged.bundles['Home phone included'] = 'No';
    merged.bundles['Entertainment included'] = 'No';
  }
  return merged;
}

function providerExtractPlausible(provNorm, speedTier, company) {
  if (!provNorm) return false;
  const ongoing = parseMoney(provNorm.cost?.['Ongoing cost']);
  if (ongoing != null && ongoing < 30) return false;
  if (!speedTier) return true;
  const dl = Number.parseInt(
    provNorm.planInfo?.['Typical download speed (Mbps)'] || '',
    10,
  );
  if (Number.isNaN(dl)) return false;
  if (company === 'Kogan') return true;
  return Math.abs(dl - speedTier) <= 35;
}

export function chooseRecommended({
  provider,
  uc,
  snapshot,
  listingPrice,
  speedTier,
  company,
  trustProvider = false,
}) {
  const ucNorm = normalizeParsed(uc, listingPrice);
  const provNorm = normalizeParsed(provider, listingPrice);
  const snapNorm = normalizeParsed(snapshot, listingPrice);

  const diffs = [];

  if (snapNorm && isDetailComplete(snapNorm)) {
    if (provNorm) {
      diffs.push(
        ...diffFields(snapNorm.planInfo, provNorm.planInfo, [
          'Typical download speed (Mbps)',
          'Typical upload speed (Mbps)',
        ]),
      );
    }
    return { recommended: snapNorm, source: 'catalog_snapshot', diffs };
  }

  const provOk =
    provNorm &&
    isDetailComplete(provNorm) &&
    (trustProvider || providerExtractPlausible(provNorm, speedTier, company));

  if (provOk) {
    if (ucNorm) {
      diffs.push(
        ...diffFields(provNorm.cost, ucNorm.cost, [
          'Promotional Cost',
          'Ongoing cost',
          'Minimum cost',
        ]),
        ...diffFields(provNorm.planInfo, ucNorm.planInfo, [
          'Typical download speed (Mbps)',
        ]),
      );
    }
    return { recommended: provNorm, source: 'provider', diffs };
  }

  if (ucNorm && isDetailComplete(ucNorm)) {
    return { recommended: ucNorm, source: 'utilitychoice', diffs };
  }

  if (snapNorm) return { recommended: snapNorm, source: 'catalog_snapshot', diffs };

  return { recommended: provNorm || ucNorm || emptyDetail(), source: 'partial', diffs };
}

function emptyDetail() {
  return {
    planInfo: {},
    cost: {},
    bundles: { 'Home phone included': 'No', 'Entertainment included': 'No' },
    sidebarDownloadMbps: '',
    sidebarUploadMbps: '',
  };
}

export function classifyStatus({ ucTitle, planName, recommended, uc, provider, diffs }) {
  const norm = (s) => s.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 12);
  const titleMismatch =
    ucTitle && planName && !norm(ucTitle).includes(norm(planName).slice(0, 8)) && !norm(planName).includes(norm(ucTitle).slice(0, 8));

  if (!isDetailComplete(recommended)) return 'needs_manual';
  if (titleMismatch && isDetailComplete(provider)) return 'uc_broken';
  if (titleMismatch && !isDetailComplete(provider)) return 'uc_broken';
  if (diffs.length > 0) return 'mismatch';
  if (!isDetailComplete(uc) && isDetailComplete(provider)) return 'provider_only';
  return 'ok';
}
