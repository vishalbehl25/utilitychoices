import type { CreditCardDetail } from '@/data/credit-card-details';

const ELIGIBILITY_LABELS = [
  'Available to temporary residents',
  'Minimum income',
  'Joint application',
] as const;

const REWARDS_LABELS = [
  'Rewards program',
  'Bonus points',
  'Rewards points per $ spent',
  'Rewards points cap',
] as const;

const FEE_PAIR_LABELS = [
  ['Min credit limit', 'Card type'],
  ['Additional cardholder fee', 'Number of additional cardholders'],
] as const;

export const DETAILS_PRODUCT_LABELS = [
  'Product Name',
  'Balance transfer rate p.a.',
  'Balance transfer limit',
  'Purchase rate p.a.',
  'Interest-free days',
  'Cash advance rate p.a.',
  'Min credit limit',
  'Card type',
] as const;

export const DETAILS_FEES_LABELS = [
  'Annual fee',
  'Minimum monthly repayment',
  'Late payment fee',
  'Foreign currency conversion fee',
  'Cash advance fee',
  'Overseas cash advance fee',
  'Additional cardholder fee',
  'Number of additional cardholders',
] as const;

export function splitSummaryParagraphs(summary: string): string[] {
  const trimmed = summary.trim();
  if (!trimmed) return [];

  const sentences = trimmed.split(/(?<!\d)\.(?!\d)\s+(?=[A-Z])/g);
  if (sentences.length <= 1) return [trimmed];

  const mid = Math.ceil(sentences.length / 2);
  return [
    sentences
      .slice(0, mid)
      .join('. ')
      .trim()
      .replace(/\.$/, ''),
    sentences
      .slice(mid)
      .join('. ')
      .trim(),
  ].filter(Boolean);
}

/** Approximate visible hero copy before “Read more” on the live site. */
export const SUMMARY_TEASER_CHAR_LIMIT = 380;

export function hasExpandableSummary(summary: string): boolean {
  const paragraphs = splitSummaryParagraphs(summary);
  if (paragraphs.length > 1) return true;
  return (paragraphs[0]?.length ?? 0) > SUMMARY_TEASER_CHAR_LIMIT;
}

export function getSummaryParagraphsForDisplay(
  summary: string,
  expanded: boolean
): string[] {
  const paragraphs = splitSummaryParagraphs(summary);
  if (expanded) return paragraphs;

  if (paragraphs.length > 1) {
    return [paragraphs[0]];
  }

  const first = paragraphs[0] ?? '';
  if (first.length <= SUMMARY_TEASER_CHAR_LIMIT) {
    return paragraphs;
  }

  const cut = first.slice(0, SUMMARY_TEASER_CHAR_LIMIT);
  const lastSpace = cut.lastIndexOf(' ');
  const end =
    lastSpace > SUMMARY_TEASER_CHAR_LIMIT * 0.6 ? lastSpace : SUMMARY_TEASER_CHAR_LIMIT;
  return [`${first.slice(0, end).trim()}…`];
}

export function pickDetailRows(
  details: Record<string, string>,
  labels: readonly string[]
): Record<string, string> {
  const rows: Record<string, string> = {};
  for (const label of labels) {
    if (details[label]) rows[label] = details[label];
  }
  return rows;
}

export function getFeePairSections(
  details: Record<string, string>
): Array<[Record<string, string>, Record<string, string>]> {
  const pairs: Array<[Record<string, string>, Record<string, string>]> = [];
  for (const pair of FEE_PAIR_LABELS) {
    const left: Record<string, string> = {};
    const right: Record<string, string> = {};
    if (details[pair[0]]) left[pair[0]] = details[pair[0]];
    if (details[pair[1]]) right[pair[1]] = details[pair[1]];
    if (Object.keys(left).length > 0 || Object.keys(right).length > 0) {
      pairs.push([left, right]);
    }
  }
  return pairs;
}

function omitEmptyRows(rows: Record<string, string>): Record<string, string> {
  return Object.fromEntries(
    Object.entries(rows).filter(([, v]) => v != null && String(v).trim().length > 0)
  );
}

export function getDetailsProductRows(card: CreditCardDetail): Record<string, string> {
  if (card.detailsProduct && Object.keys(card.detailsProduct).length > 0) {
    return omitEmptyRows(card.detailsProduct);
  }
  const fromDetails = pickDetailRows(card.productDetails, DETAILS_PRODUCT_LABELS);
  if (Object.keys(fromDetails).length > 0) return omitEmptyRows(fromDetails);
  return omitEmptyRows({
    'Product Name': card.name,
    'Purchase rate p.a.': card.productDetails['Purchase rate p.a.'] ?? card.interestRate,
    'Interest-free days':
      card.productDetails['Interest-free days'] ?? card.interestFree,
    'Min credit limit': card.productDetails['Min credit limit'] ?? '',
    'Card type': card.productDetails['Card type'] ?? '',
  });
}

export function getDetailsFeesRows(card: CreditCardDetail): Record<string, string> {
  if (card.detailsFees && Object.keys(card.detailsFees).length > 0) {
    return omitEmptyRows(card.detailsFees);
  }
  const fromDetails = pickDetailRows(card.productDetails, DETAILS_FEES_LABELS);
  if (Object.keys(fromDetails).length > 0) return omitEmptyRows(fromDetails);
  return omitEmptyRows({
    'Annual fee': card.productDetails['Annual fee'] ?? card.charges,
    'Additional cardholder fee': card.productDetails['Additional cardholder fee'] ?? '',
    'Number of additional cardholders':
      card.productDetails['Number of additional cardholders'] ?? '',
  });
}

export function getEligibilityRows(card: CreditCardDetail): Record<string, string> {
  if (card.eligibility) return card.eligibility;
  return pickDetailRows(card.productDetails, ELIGIBILITY_LABELS);
}

export function getRewardsRows(card: CreditCardDetail): Record<string, string> {
  if (card.rewards) return card.rewards;
  const fromDetails = pickDetailRows(card.productDetails, REWARDS_LABELS);
  if (Object.keys(fromDetails).length > 0) return fromDetails;
  return {
    'Rewards program': card.rewardPoints,
    'Bonus points': card.bonusPoints,
    'Rewards points per $ spent': card.rewardPoints,
  };
}

const HIDDEN_WHEN_RICH = new Set([
  'Product Name',
  'Purchase rate p.a.',
  'Interest-free days',
  'Annual fee',
  'Bonus points',
  'Rewards points per $ spent',
]);

export function getRemainingProductDetails(card: CreditCardDetail): Record<string, string> {
  const used = new Set<string>([
    ...ELIGIBILITY_LABELS,
    ...REWARDS_LABELS,
    ...FEE_PAIR_LABELS.flat(),
    ...DETAILS_PRODUCT_LABELS,
    ...DETAILS_FEES_LABELS,
  ]);
  const hideRich = Boolean(card.ratesSections?.length || card.cardBenefits);
  const rows: Record<string, string> = {};
  for (const [key, value] of Object.entries(card.productDetails)) {
    if (used.has(key)) continue;
    if (hideRich && HIDDEN_WHEN_RICH.has(key)) continue;
    rows[key] = value;
  }
  return rows;
}

export function parseRatesSections(
  text: string
): { title: string; body: string }[] {
  const trimmed = text.trim();
  if (!trimmed) return [];

  const parts = trimmed.split(/(?=\bAnnual fee\b|\bPurchase interest\b|\bInterest-free\b|\bCash advance\b|\bMinimum credit\b)/i);
  if (parts.length > 1) {
    return parts
      .map((p) => p.trim())
      .filter(Boolean)
      .map((p) => {
        const dot = p.indexOf('.');
        if (dot > 0 && dot < 40) {
          return { title: p.slice(0, dot).trim(), body: p.slice(dot + 1).trim() };
        }
        return { title: p.split(':')[0]?.trim() ?? 'Rates & fees', body: p };
      });
  }

  return [{ title: 'Overview', body: trimmed }];
}

export function isDuplicateCardBenefits(
  howToApply: string,
  cardBenefits?: string
): boolean {
  if (!cardBenefits?.trim()) return true;
  const normalize = (text: string) => text.replace(/\s+/g, ' ').trim();
  return normalize(cardBenefits) === normalize(howToApply);
}

export function parseHowToApplySections(
  text: string
): { intro: string; sections: { heading: string; items: string[] }[] } {
  const normalized = text.replace(/\r\n/g, '\n').trim();

  // Match section headings on their own line only (not "…eligibility criteria and…" in prose).
  const intro =
    normalized.match(/^([\s\S]*?)\n\s*Eligibility Criteria\s*:?\s*\n/i)?.[1]?.trim() ??
    normalized;

  const eligibilityMatch = normalized.match(
    /\n\s*Eligibility Criteria\s*:?\s*\n([\s\S]*?)(?=\n\s*Required Documents\s*:?\s*\n|$)/i
  );
  const documentsMatch = normalized.match(
    /\n\s*Required Documents\s*:?\s*\n([\s\S]*?)$/i
  );

  const sections: { heading: string; items: string[] }[] = [];

  if (eligibilityMatch?.[1]) {
    sections.push({
      heading: 'Eligibility Criteria',
      items: splitBulletItems(eligibilityMatch[1]),
    });
  }
  if (documentsMatch?.[1]) {
    sections.push({
      heading: 'Required Documents',
      items: splitBulletItems(documentsMatch[1]),
    });
  }

  return { intro, sections };
}

/** Splits "Label: description" bullets (e.g. "Residency: You must…"). */
export function splitLabelledListItem(
  text: string
): { label: string; body: string } | null {
  const colonIndex = text.indexOf(':');
  if (colonIndex < 1 || colonIndex > 80) return null;
  const label = text.slice(0, colonIndex).trim();
  if (!label) return null;
  return { label, body: text.slice(colonIndex + 1).trimStart() };
}

function splitBulletItems(block: string): string[] {
  const lines = block
    .split(/\n+/)
    .map((s) => s.replace(/^[-•*]\s*/, '').trim())
    .filter(
      (s) =>
        s.length > 15 &&
        !/^Eligibility Criteria:?$/i.test(s) &&
        !/^Eligibility criteria:?$/i.test(s) &&
        !/^Required Documents:?$/i.test(s) &&
        !/^Required documents:?$/i.test(s)
    );
  if (lines.length >= 3) return lines;

  const byLabel = block.split(
    /(?=\b(?:ANZ GoBiz Application Requirements|New Cards Only|New Cardholder|New Customer|New customer|Velocity Member|New Amex Cardholder|New cardholder|New card member|ABN and ACN|Business Use|Business requirements|Credit history|Credit History|Exclusive Offer|Minimum Income|Minimum income|Residency status|Residency Requirement|Residency|Income|Age requirement|Age|Eligible balance transfer debt|Eligible Balance Transfer Debt|Eligible balance transfer|Balance transfer information|Balance transfer|First-year annual fee offer|Existing customers|Identification|Proof of identification|Personal information|Personal Information|Employment Information|Personal details|Personal Details|Employment details|Employment Details|Employment|Income details|Other financial information|Financial information|Financial Information|Financial details|Financial Details|Balance Transfer Details|Flybuys membership|Frequent flyer number|Business details|Business Details|Finances|Qantas Frequent Flyer details|Balance transfer details|Qantas Frequent Flyer):)/i
  );
  if (byLabel.length > 2) {
    return byLabel
      .map((s) => s.replace(/^[-•*]\s*/, '').trim())
      .filter((s) => s.length > 15);
  }

  return block
    .split(/(?<=[.!?])\s+(?=[A-Z])/)
    .map((s) => s.replace(/^[-•*]\s*/, '').trim())
    .filter((s) => s.length > 20);
}
