/**
 * Build src/data/home-loan-details.ts from scraped JSON + home-loans.ts
 *
 * Usage: node scripts/build-home-loan-details.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { splitSentences } from './lib/credit-card-table-parser.mjs';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const SCRAPED_PATH = path.join(ROOT, 'src/data/home-loan-details-scraped.json');
const OFFICIAL_PATH = path.join(ROOT, 'src/data/home-loan-official-rates.json');
const LOANS_PATH = path.join(ROOT, 'src/data/home-loans.ts');
const OUT_PATH = path.join(ROOT, 'src/data/home-loan-details.ts');

function esc(str) {
  return String(str).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function normalizeSlug(slug) {
  return decodeURIComponent(slug);
}

function cleanCompRate(value) {
  if (!value) return value;
  return value.replace(/\s+\$[\d,]+(?:\.\d+)?\s*$/, '').trim();
}

function cleanExtraRepayments(value) {
  if (!value) return 'N/A';
  const yesNo = value.match(/^(Yes|No|N\/A)\b/i);
  if (!yesNo) return value;
  const rest = value.slice(yesNo[0].length).trim();
  if (!rest || rest.startsWith('Pros ') || /\bCons\b/.test(rest)) return yesNo[0];
  return `${yesNo[0]} — ${rest}`;
}

function sentenceFilter(items) {
  return items.filter(
    (t) => t.length > 8 && t.length < 280 && !/Product Name|Interest Rate Type/i.test(t),
  );
}

function parseProsConsFromScraped(scraped) {
  const { pros: rawPros, cons: rawCons } = scraped;
  const validPros = sentenceFilter(rawPros ?? []);
  const validCons = sentenceFilter(rawCons ?? []);
  if (validPros.length > 0 || validCons.length > 0) {
    return { pros: validPros, cons: validCons };
  }
  return { pros: validPros, cons: validCons };
}

function loadOfficial() {
  if (!fs.existsSync(OFFICIAL_PATH)) return { products: {} };
  return JSON.parse(fs.readFileSync(OFFICIAL_PATH, 'utf8'));
}

function getOfficialProduct(official, slug) {
  const key = normalizeSlug(slug);
  return official.products?.[slug] ?? official.products?.[key];
}

function applyOfficialToDetails(details, official, loan) {
  if (!official) return details;
  const next = { ...details };
  next['Interest Rate p.a.'] = official.interestRate;
  next['Comp. Rate p.a.'] = official.comparisonRate;
  next['Interest Rate Type'] = official.interestRateType ?? next['Interest Rate Type'];
  if (official.rateNote) {
    next['Rate note'] = official.rateNote;
  }
  return next;
}

function loadLoans() {
  const src = fs.readFileSync(LOANS_PATH, 'utf8');
  const loans = [];
  const seen = new Set();
  const blockRe =
    /slug:\s*'([^']+)'[\s\S]*?name:\s*'([^']+)'[\s\S]*?lender:\s*'([^']+)'[\s\S]*?interestRate:\s*'([^']+)'[\s\S]*?loanFee:\s*'([^']+)'/g;
  let m;
  while ((m = blockRe.exec(src))) {
    const slug = m[1];
    const key = normalizeSlug(slug);
    if (seen.has(key)) continue;
    seen.add(key);
    loans.push({
      slug,
      name: m[2].replace(/\\'/g, "'"),
      lender: m[3].replace(/\\'/g, "'"),
      interestRate: m[4],
      loanFee: m[5],
    });
  }
  return loans;
}

function findScraped(plans, slug) {
  const key = normalizeSlug(slug);
  return (
    plans[slug] ??
    plans[key] ??
    Object.entries(plans).find(([k]) => normalizeSlug(k) === key)?.[1]
  );
}

function rowsToTs(rows, indent) {
  return Object.entries(rows)
    .filter(([, v]) => v != null && v !== '')
    .map(([k, v]) => `${indent}    '${esc(k)}': '${esc(v)}',`)
    .join('\n');
}

function main() {
  const scraped = JSON.parse(fs.readFileSync(SCRAPED_PATH, 'utf8')).plans ?? {};
  const official = loadOfficial();
  const loans = loadLoans();
  const generatedAt = new Date().toISOString();

  const blocks = loans.map((loan) => {
    const s = findScraped(scraped, loan.slug);
    const o = getOfficialProduct(official, loan.slug);
    let details = { ...(s?.details ?? {}) };
    if (details['Comp. Rate p.a.']) {
      details['Comp. Rate p.a.'] = cleanCompRate(details['Comp. Rate p.a.']);
    }
    if (details['Extra Repayments']) {
      details['Extra Repayments'] = cleanExtraRepayments(
        details['Extra Repayments'],
      );
    }
    details = applyOfficialToDetails(details, o, loan);

    const fees = { ...(o?.fees ?? s?.fees ?? {}) };
    let { pros, cons } = s ? parseProsConsFromScraped(s) : { pros: [], cons: [] };
    if (o?.pros?.length) pros = o.pros;
    if (o?.cons?.length) cons = o.cons;

    const interestRate = o?.interestRate ?? loan.interestRate;
    const comparisonRate =
      o?.comparisonRate ?? details['Comp. Rate p.a.'] ?? loan.interestRate;
    const maxLoanTerm = details['Maximum Loan Term'] ?? '30 years';
    const loanFee = o?.loanFee ?? loan.loanFee;

    return `  {
    ...getHomeLoanBySlug('${esc(loan.slug)}')!,
    comparisonRate: '${esc(comparisonRate)}',
    minLoanAmount: '${esc(details['Minimum Loan Amount'] ?? '$150,000')}',
    maxLoanAmount: '${esc(details['Maximum Loan Amount'] ?? 'N/A')}',
    maxLoanTerm: '${esc(maxLoanTerm)}',
    maxLvr: '${esc(details['Maximum LVR'] ?? '95%')}',
    sidebarLoanFee: '${esc(loanFee)}',
    sidebarInterestRate: '${esc(interestRate)}',
    sidebarMaxTenure: '${esc(maxLoanTerm)}',
    details: {
${rowsToTs(details, '      ')}
    },
    fees: {
${rowsToTs(fees, '      ')}
    },
    pros: [${pros.map((p) => `'${esc(p)}'`).join(', ')}],
    cons: [${cons.map((c) => `'${esc(c)}'`).join(', ')}],
  }`;
  });

  const ratesNote = official.ratesAsAt
    ? ` Official lender rates merged (${official.ratesAsAt}).`
    : '';
  const ts = `/**
 * Auto-generated — do not edit by hand.
 * Regenerate: node scripts/apply-official-home-loan-data.mjs
 * (or: node scripts/scrape-home-loan-details.mjs && node scripts/build-home-loan-details.mjs)
 * Generated: ${generatedAt}.${ratesNote}
 */
import {
  getHomeLoanBySlug,
  normalizeHomeLoanSlug,
  type HomeLoanProduct,
} from '@/data/home-loans';

export interface HomeLoanDetail extends HomeLoanProduct {
  comparisonRate: string;
  minLoanAmount: string;
  maxLoanAmount: string;
  maxLoanTerm: string;
  maxLvr: string;
  sidebarLoanFee: string;
  sidebarInterestRate: string;
  sidebarMaxTenure: string;
  details: Record<string, string>;
  fees: Record<string, string>;
  pros: string[];
  cons: string[];
}

export const homeLoanDetails: HomeLoanDetail[] = [
${blocks.join(',\n')}
];

export function getAllHomeLoanDetails(): HomeLoanDetail[] {
  return homeLoanDetails;
}

export function getHomeLoanDetailBySlug(slug: string): HomeLoanDetail | undefined {
  const normalized = normalizeHomeLoanSlug(slug);
  return homeLoanDetails.find(
    (h) =>
      h.slug === slug ||
      h.slug === normalized ||
      normalizeHomeLoanSlug(h.slug) === normalized,
  );
}
`;

  fs.writeFileSync(OUT_PATH, ts);
  console.log(`Wrote ${loans.length} details → ${OUT_PATH}`);
}

main();
