import {
  extractProsConsFromHtml,
  splitSentences,
  stripHtml,
} from './credit-card-table-parser.mjs';

export const DETAILS_LABELS = [
  'Product Name',
  'Interest Rate Type',
  'Repayment Type',
  'Interest Rate p.a.',
  'Comp. Rate p.a.',
  'Minimum Loan Amount',
  'Maximum Loan Amount',
  'Maximum Loan Term',
  'Maximum LVR',
  'Loan Redraw Facility',
  'Offset Account',
  'Split Loan Facility',
  'Fixed Interest Option',
  'Loan Portable',
  'Extra Repayments',
];

export const FEES_LABELS = [
  'Application Fee',
  "Lender's Legal Fee",
  "Lender&#39;s Legal Fee",
  'Valuation Fee',
  'Ongoing Fees',
  'Settlement Fee',
  'Discharge Fee',
];

const TAB_MARKERS = ['Details', 'Fees', 'Pros & Cons', 'Pros &amp; Cons'];

function cleanValue(value) {
  return value
    .replace(/\s+/g, ' ')
    .replace(/&#39;/g, "'")
    .trim();
}

function truncateAtStops(value) {
  const stops = [
    ' Pros ',
    ' Cons ',
    'Application Fee',
    'Connecting to better',
    'Loan Fee ',
    'Interest Rate ',
    'Max loan tenure',
  ];
  let out = value;
  for (const stop of stops) {
    const i = out.indexOf(stop);
    if (i > -1) out = out.slice(0, i);
  }
  return cleanValue(out);
}

export function extractPageTitle(html) {
  const match = html.match(/<title>([^<|]+)/i);
  return match ? cleanValue(match[1]) : '';
}

function extractBodySection(html, productName) {
  const text = stripHtml(html).replace(/&#39;/g, "'");
  const markers = ['< Back', '&lt; Back', 'Back '];
  let backIdx = -1;
  for (const m of markers) {
    const i = text.indexOf(m);
    if (i > -1 && (backIdx === -1 || i < backIdx)) backIdx = i;
  }
  const searchFrom = backIdx > -1 ? backIdx : 0;
  const nameIdx = text.indexOf(productName, searchFrom);
  const title = extractPageTitle(html);
  const titleIdx = title ? text.indexOf(title, searchFrom) : -1;
  const start =
    nameIdx > -1 ? nameIdx : titleIdx > -1 ? titleIdx : searchFrom;
  const footerIdx = text.indexOf('Connecting to better', start);
  return text.slice(start, footerIdx > -1 ? footerIdx : start + 8000);
}

function parseOrderedRows(section, labels) {
  const positions = labels
    .map((label) => ({ label, pos: section.indexOf(label) }))
    .filter((x) => x.pos !== -1)
    .sort((a, b) => a.pos - b.pos);

  const rows = {};
  for (let i = 0; i < positions.length; i++) {
    const { label, pos } = positions[i];
    const start = pos + label.length;
    const end =
      i + 1 < positions.length ? positions[i + 1].pos : section.length;
    let value = truncateAtStops(section.slice(start, end));
    if (label === 'Minimum Loan Amount' && !value.match(/\$/)) {
      const before = section.slice(Math.max(0, pos - 24), pos);
      const amt = before.match(/\$[\d,]+(?:\.\d+)?/);
      if (amt) value = amt[0];
    }
    if (value) rows[label] = value;
  }
  return rows;
}

function parseProsConsFromSection(section) {
  const appIdx = section.indexOf('Application Fee');
  const block = appIdx > -1 ? section.slice(0, appIdx) : section;
  const extraIdx = block.indexOf('Extra Repayments');
  if (extraIdx === -1) return { pros: [], cons: [] };

  const afterExtra = block.slice(extraIdx + 'Extra Repayments'.length);
  const prosIdx = afterExtra.search(/\bPros\b/);
  const consIdx = afterExtra.search(/\bCons\b/);

  if (prosIdx > -1 && consIdx > prosIdx) {
    return {
      pros: splitSentences(afterExtra.slice(prosIdx + 4, consIdx)),
      cons: splitSentences(afterExtra.slice(consIdx + 4)),
    };
  }

  if (consIdx > -1) {
    const prosText = afterExtra
      .slice(0, consIdx)
      .replace(/^(Yes|No|N\/A)\s*/i, '')
      .trim();
    return {
      pros: prosText ? splitSentences(prosText) : [],
      cons: splitSentences(afterExtra.slice(consIdx + 4)),
    };
  }

  return { pros: [], cons: [] };
}

function parseSidebar(section) {
  const loanFeeMatch = section.match(
    /Loan Fee\s+(\$[\d,]+(?:\.\d+)?)/i,
  );
  const tenureMatch = section.match(/Max loan tenure\s+([^C]+?)(?:\s+Connecting|$)/i);
  const rateMatches = [
    ...section.matchAll(
      /(?:^|\s)Interest Rate\s+([\d.]+%)(?:\s+Max loan tenure|\s+Loan Fee|$)/gi,
    ),
  ];
  const lastRate = rateMatches.at(-1)?.[1];
  return {
    loanFee: loanFeeMatch?.[1] ?? null,
    interestRate: lastRate ?? null,
    maxTenure: tenureMatch?.[1]?.trim() ?? '30 years',
  };
}

/** Primary product image from Wix (filename before /v1/fill). */
export function extractHomeLoanLogoMediaId(html) {
  const matches = [
    ...html.matchAll(
      /static\.wixstatic\.com\/media\/([a-z0-9_]+~mv2\.(?:png|jpg|webp|jpeg))/gi,
    ),
  ];
  const skip = /d029b565386e|favicon|logo-140px/i;
  for (const m of matches) {
    const id = m[1].replace(/%7E/gi, '~');
    if (!skip.test(id)) return id;
  }
  const fillMatch = html.match(
    /static\.wixstatic\.com\/media\/([^"'\s]+~mv2\.(?:png|jpg|webp))/i,
  );
  if (fillMatch) {
    const raw = decodeURIComponent(fillMatch[1].split('/v1/')[0]);
    if (!skip.test(raw)) return raw;
  }
  return null;
}

export function parseHomeLoanDetail(html, productName) {
  const section = extractBodySection(html, productName);
  const details = parseOrderedRows(section, DETAILS_LABELS);
  const feesRaw = parseOrderedRows(section, FEES_LABELS);
  const fees = {};
  for (const [k, v] of Object.entries(feesRaw)) {
    const key = k.replace("Lender&#39;s Legal Fee", "Lender's Legal Fee");
    if (key === "Lender's Legal Fee" || !fees[key]) fees[key] = v;
  }
  const textProsCons = parseProsConsFromSection(section);
  const htmlProsCons = extractProsConsFromHtml(html);
  const pros =
    textProsCons.pros.length > 0 ? textProsCons.pros : htmlProsCons.pros;
  const cons =
    textProsCons.cons.length > 0 ? textProsCons.cons : htmlProsCons.cons;
  const sidebar = parseSidebar(section);

  return {
    details,
    fees,
    sidebar,
    pros,
    cons,
    logoMediaId: extractHomeLoanLogoMediaId(html),
  };
}
