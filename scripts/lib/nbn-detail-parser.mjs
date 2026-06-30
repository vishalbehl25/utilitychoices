import { stripHtml } from './credit-card-table-parser.mjs';

export const PLAN_INFO_LABELS = [
  'Connection Type',
  'Typical download speed (Mbps)',
  'Typical upload speed (Mbps)',
  'Technology type',
  'Plan length',
  'Maximum upload speed (Mbps)',
  'Maximum download speed (Mbps)',
  'Data Allowance',
  'Plan type',
];

export const COST_LABELS = [
  'Promotional Cost',
  'Minimum cost',
  'Setup fee',
  'Modem description',
  'Modem T&Cs',
  'Ongoing cost',
  'Modem delivery fee',
];

export const BUNDLES_LABELS = [
  'Home phone included',
  'Entertainment included',
];

function cleanValue(value) {
  return value.replace(/\s+/g, ' ').trim();
}

function parseMoney(value) {
  if (!value || value === 'N/A') return null;
  const n = Number.parseFloat(String(value).replace(/[^0-9.]/g, ''));
  return Number.isNaN(n) ? null : n;
}

/** Fix Optus-style bleed: minimum total captured as Promotional Cost. */
export function sanitizeNbnCostFields(cost = {}) {
  const out = { ...cost };
  const promoNum = parseMoney(out['Promotional Cost']);
  const ongoingNum = parseMoney(out['Ongoing cost']);

  if (
    promoNum != null &&
    ongoingNum != null &&
    promoNum > ongoingNum * 2 &&
    promoNum >= 200
  ) {
    if (!out['Minimum cost'] || out['Minimum cost'] === 'N/A') {
      out['Minimum cost'] = out['Promotional Cost'];
    }
    out['Promotional Cost'] = 'N/A';
  }

  if (out['Promotional Cost'] === '$0' || out['Promotional Cost'] === '0') {
    if (ongoingNum != null && ongoingNum > 0) {
      out['Promotional Cost'] = 'N/A';
    }
  }

  return out;
}

/** Page `<title>` before the site suffix (e.g. "Superloop NBN Family"). */
export function extractPageTitle(html) {
  const match = html.match(/<title>([^<|]+)/i);
  return match ? cleanValue(match[1]) : '';
}

function extractPlanBodyText(html, planName) {
  const text = stripHtml(html);
  const markers = ['< Back', '&lt; Back'];
  let backIdx = -1;
  for (const m of markers) {
    const i = text.indexOf(m);
    if (i > -1 && (backIdx === -1 || i < backIdx)) backIdx = i;
  }
  const searchFrom = backIdx > -1 ? backIdx : 0;
  const nameIdx = text.indexOf(planName, searchFrom);
  if (nameIdx === -1) return '';

  const footerIdx = text.indexOf('Connecting to better', nameIdx);
  return text.slice(nameIdx, footerIdx > -1 ? footerIdx : nameIdx + 6000);
}

function parseLabelValue(section, label, stopLabels) {
  const pos = section.indexOf(label);
  if (pos === -1) return null;

  const start = pos + label.length;
  let end = section.length;
  for (const stop of stopLabels) {
    const stopPos = section.indexOf(stop, start);
    if (stopPos !== -1 && stopPos < end) end = stopPos;
  }

  const raw = cleanValue(section.slice(start, end));
  if (!raw) return null;

  for (const stop of stopLabels) {
    if (raw === stop || raw.startsWith(`${stop} `)) return null;
  }

  return raw;
}

function fixUploadSpeed(planInfo, section) {
  let upload = planInfo['Maximum upload speed (Mbps)'];
  const downloadLabel = 'Maximum download speed (Mbps)';
  const downloadPos = section.indexOf(downloadLabel);

  if (
    !upload ||
    upload.includes('Maximum download') ||
    upload === downloadLabel
  ) {
    if (downloadPos > -1) {
      const before = section.slice(0, downloadPos);
      const afterPlanLength = before.split('Plan length').pop() ?? before;
      const numMatch = afterPlanLength.match(/(\d+)\s*$/);
      if (numMatch) upload = numMatch[1];
    }
  }

  if (upload) planInfo['Maximum upload speed (Mbps)'] = upload;
}

function parseSection(section, labels, sectionStop) {
  const rows = {};
  const stops = [...labels, sectionStop].filter(Boolean);

  for (let i = 0; i < labels.length; i++) {
    const label = labels[i];
    const nextStops = [
      ...labels.slice(i + 1),
      sectionStop,
      'Download Speed (Mbps)',
      'Connecting to better',
    ].filter(Boolean);

    let value = parseLabelValue(section, label, nextStops);
    if (!value) continue;

    if (label === 'Plan length') {
      const split = value.match(/^(Month-to-month)\s+(\d+)$/i);
      if (split) {
        rows[label] = split[1];
        if (!rows['Maximum upload speed (Mbps)']) {
          rows['Maximum upload speed (Mbps)'] = split[2];
        }
        continue;
      }
    }

    rows[label] = value;
  }

  if (labels === PLAN_INFO_LABELS) {
    fixUploadSpeed(rows, section);
  }

  return rows;
}

/**
 * Parse Plan Info, Cost, and Bundles from utilitychoices.com.au NBN detail HTML.
 */
export function parseNBNPlanDetail(html, planName) {
  let body = extractPlanBodyText(html, planName);
  if (!body) {
    const pageTitle = extractPageTitle(html);
    if (pageTitle && pageTitle !== planName) {
      body = extractPlanBodyText(html, pageTitle);
    }
  }
  if (!body) {
    return {
      planInfo: {},
      cost: {},
      bundles: {},
      sidebarDownloadMbps: '',
      sidebarUploadMbps: '',
    };
  }

  const bundlesStart = body.indexOf('Home phone included');
  const costStart = body.indexOf('Promotional Cost');
  const sidebarStart = body.indexOf('Download Speed (Mbps)');

  const planSection =
    bundlesStart > 0
      ? body.slice(0, bundlesStart)
      : costStart > 0
        ? body.slice(0, costStart)
        : body;

  const bundlesSection =
    bundlesStart > 0 && costStart > bundlesStart
      ? body.slice(bundlesStart, costStart)
      : '';

  const costSection =
    costStart > 0
      ? body.slice(
          costStart,
          sidebarStart > costStart ? sidebarStart : body.length,
        )
      : '';

  const planInfo = parseSection(planSection, PLAN_INFO_LABELS, 'Home phone included');
  let cost = parseSection(costSection, COST_LABELS, 'Download Speed (Mbps)');
  const bundles = parseSection(
    bundlesSection,
    BUNDLES_LABELS,
    'Promotional Cost',
  );

  cost = sanitizeNbnCostFields(cost);

  const sidebarDownloadMbps = parseLabelValue(body, 'Download Speed (Mbps)', [
    'Upload Speed (Mbps)',
  ]) ||
    planInfo['Maximum download speed (Mbps)'] ||
    planInfo['Typical download speed (Mbps)'] ||
    '';

  const sidebarUploadMbps = parseLabelValue(body, 'Upload Speed (Mbps)', [
    'Data Allowances',
  ]) ||
    planInfo['Maximum upload speed (Mbps)'] ||
    '';

  return {
    planInfo,
    cost,
    bundles,
    sidebarDownloadMbps,
    sidebarUploadMbps,
  };
}
