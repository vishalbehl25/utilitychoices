/** Normalize parsed detail + fix known UC parser issues (e.g. Optus min total as promo). */

export function parseMoney(value) {
  if (!value || value === 'N/A') return null;
  const n = Number.parseFloat(String(value).replace(/[^0-9.]/g, ''));
  return Number.isNaN(n) ? null : n;
}

export function formatMoney(amount) {
  if (amount == null) return 'N/A';
  const fixed = Number.isInteger(amount) ? String(amount) : amount.toFixed(2);
  return `$${fixed}`;
}

/**
 * If Promotional Cost looks like a contract minimum (e.g. $632) while Ongoing is the
 * real monthly price, move it to Minimum cost.
 */
export function sanitizeCostFields(cost = {}, listingPrice = '') {
  const out = { ...cost };
  const promo = out['Promotional Cost'];
  const ongoing = out['Ongoing cost'];
  const minimum = out['Minimum cost'];
  const promoNum = parseMoney(promo);
  const ongoingNum = parseMoney(ongoing);
  const listingNum = parseMoney(listingPrice);

  if (
    promoNum != null &&
    ongoingNum != null &&
    promoNum > ongoingNum * 2 &&
    promoNum >= 200
  ) {
    if (!minimum || minimum === 'N/A') {
      out['Minimum cost'] = promo;
    }
    if (listingNum != null && Math.abs(listingNum - ongoingNum) < 1) {
      out['Promotional Cost'] = 'N/A';
    } else if (listingNum != null && Math.abs(listingNum - promoNum) > 1) {
      out['Promotional Cost'] = 'N/A';
    }
  }

  if (
    (out['Promotional Cost'] === '$0' || out['Promotional Cost'] === '0') &&
    ongoing &&
    listingNum != null &&
    ongoingNum != null &&
    Math.abs(listingNum - ongoingNum) < 1
  ) {
    out['Promotional Cost'] = 'N/A';
  }

  return out;
}

export function emptyDetail() {
  return {
    planInfo: {},
    cost: {},
    bundles: {
      'Home phone included': 'No',
      'Entertainment included': 'No',
    },
    sidebarDownloadMbps: '',
    sidebarUploadMbps: '',
  };
}

export function isDetailComplete(detail) {
  return (
    detail &&
    Object.keys(detail.planInfo || {}).length >= 5 &&
    Object.keys(detail.cost || {}).length >= 3
  );
}

export function mergeDetailRecord(parts) {
  const base = emptyDetail();
  for (const part of parts) {
    if (!part) continue;
    Object.assign(base.planInfo, part.planInfo || {});
    Object.assign(base.cost, part.cost || {});
    Object.assign(base.bundles, part.bundles || {});
    if (part.sidebarDownloadMbps) base.sidebarDownloadMbps = part.sidebarDownloadMbps;
    if (part.sidebarUploadMbps) base.sidebarUploadMbps = part.sidebarUploadMbps;
  }
  return base;
}

export function diffFields(a, b, keys) {
  const diffs = [];
  for (const key of keys) {
    const av = a?.[key];
    const bv = b?.[key];
    if (av && bv && av !== bv) diffs.push({ field: key, a: av, b: bv });
  }
  return diffs;
}

export function listingPriceFromDetail(detail) {
  const promo = detail.cost?.['Promotional Cost'];
  const ongoing = detail.cost?.['Ongoing cost'];
  const min = detail.cost?.['Minimum cost'];
  if (promo && promo !== 'N/A' && promo !== '$0') return promo;
  if (ongoing && ongoing !== 'N/A') return ongoing;
  return promo || ongoing || '$0';
}

export function listingSetupFees(detail) {
  const promo = listingPriceFromDetail(detail);
  const min = detail.cost?.['Minimum cost'];
  const minNum = parseMoney(min);
  const promoNum = parseMoney(promo);
  if (min && min !== 'N/A' && minNum != null && promoNum != null && minNum > promoNum) {
    return `$0 setup fees, ${min} min. total cost`;
  }
  return `$0 setup fees, ${promo} min. total cost`;
}

export function speedFromDetail(detail) {
  const dl =
    detail.planInfo?.['Typical download speed (Mbps)'] ||
    detail.sidebarDownloadMbps ||
    '';
  const n = Number.parseInt(String(dl), 10);
  if (Number.isNaN(n)) return { downloadSpeed: null, speedMbps: null, nbnTier: 'nbn™25' };
  let tier = 'nbn™25';
  if (n >= 800) tier = 'nbn™1000';
  else if (n >= 200) tier = 'nbn™250';
  else if (n >= 90) tier = 'nbn™100';
  else if (n >= 40) tier = 'nbn™50';
  return {
    downloadSpeed: `${n}Mbps`,
    speedMbps: n,
    nbnTier: tier,
  };
}
