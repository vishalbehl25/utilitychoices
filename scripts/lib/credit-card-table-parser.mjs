/** Parse Product Details / Fees & Charges / Eligibility / Rewards from Wix credit card pages */

export const DETAILS_PRODUCT_LABELS = [
  'Product Name',
  'Balance transfer rate p.a.',
  'Balance transfer limit',
  'Purchase rate p.a.',
  'Interest-free days',
  'Cash advance rate p.a.',
  'Min credit limit',
  'Card type',
];

export const DETAILS_FEES_LABELS = [
  'Annual fee',
  'Minimum monthly repayment',
  'Late payment fee',
  'Foreign currency conversion fee',
  'Cash advance fee',
  'Overseas cash advance fee',
  'Additional cardholder fee',
  'Number of additional cardholders',
];

export const ELIGIBILITY_LABELS = [
  'Available to temporary residents',
  'Minimum income',
  'Joint application',
];

export const REWARDS_LABELS = [
  'Rewards program',
  'Bonus points',
  'Rewards points per $ spent',
  'Rewards points cap',
];

/** Split prose without breaking decimals or "p.a." */
export function splitSentences(text) {
  return text
    .replace(/^Pros\.|^Cons\./i, '')
    .trim()
    .split(/(?<!\d)\.(?!\d)\s+(?=[A-Z])/g)
    .map((s) => s.trim().replace(/\.$/, ''))
    .filter((s) => s.length > 12);
}

function listItemsFromUl(htmlSlice) {
  const ul = htmlSlice.match(/<ul[^>]*>([\s\S]*?)<\/ul>/i);
  if (!ul) return [];
  const items = [];
  for (const m of ul[1].matchAll(/<li[^>]*>[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/gi)) {
    const t = stripHtml(m[1]).trim();
    if (t) items.push(t);
  }
  return items;
}

/** Prefer Wix <ul><li> lists; fall back to sentence split on flattened text. */
export function extractProsConsFromHtml(html) {
  const prosIdx = html.indexOf('Pros.');
  const consIdx = prosIdx > -1 ? html.indexOf('Cons.', prosIdx + 5) : -1;
  if (prosIdx === -1 || consIdx === -1) {
    return extractProsConsFromText(stripHtml(html));
  }

  const pros = listItemsFromUl(html.slice(prosIdx, consIdx));
  const detailsIdx = html.indexOf('Product Details', consIdx);
  const consEnd = detailsIdx > consIdx ? detailsIdx : consIdx + 2500;
  const cons = listItemsFromUl(html.slice(consIdx, consEnd));

  if (pros.length && cons.length) return { pros, cons };
  const fallback = extractProsConsFromText(stripHtml(html));
  return {
    pros: pros.length ? pros : fallback.pros,
    cons: cons.length ? cons : fallback.cons,
  };
}

export function extractProsConsFromText(fullText) {
  const prosStart = fullText.indexOf('Pros.');
  const consStart = fullText.indexOf('Cons.');
  const detailsStart = fullText.indexOf('Product Details');
  if (prosStart === -1 || consStart === -1) {
    return { pros: [], cons: [] };
  }
  const prosBlock = fullText.slice(prosStart + 5, consStart).trim();
  const consEnd =
    detailsStart > consStart ? detailsStart : consStart + 1200;
  const consBlock = fullText.slice(consStart + 5, consEnd).trim();
  return {
    pros: splitProsConsBlock(prosBlock),
    cons: splitProsConsBlock(consBlock),
  };
}

function splitProsConsBlock(block) {
  const bySentence = splitSentences(`X. ${block}`);
  if (bySentence.length > 1) return bySentence;
  return block
    .split(/\.(?!\d)\s+(?=[A-Z])/)
    .map((s) => s.trim().replace(/\.$/, ''))
    .filter((s) => s.length > 8);
}

function findBackLinkIndex(fullText) {
  const markers = ['< Back', '&lt; Back'];
  let idx = -1;
  for (const m of markers) {
    const i = fullText.indexOf(m);
    if (i > -1 && (idx === -1 || i < idx)) idx = i;
  }
  return idx;
}

export function extractSummaryFromText(fullText, cardName) {
  const backIdx = findBackLinkIndex(fullText);
  const searchFrom = backIdx > -1 ? backIdx : 0;
  const prosIdx = fullText.indexOf('Pros.', searchFrom);
  const bonusIdx = fullText.indexOf('Bonus Point', searchFrom);
  let end = prosIdx > searchFrom ? prosIdx : bonusIdx > searchFrom ? bonusIdx : searchFrom + 2000;

  let start = searchFrom;
  if (backIdx > -1) {
    const afterBack = fullText.slice(backIdx);
    const nameIdx = afterBack.indexOf(cardName);
    if (nameIdx > -1) start = backIdx + nameIdx + cardName.length;
  } else {
    const nameIdx = fullText.indexOf(cardName);
    if (nameIdx > -1) start = nameIdx + cardName.length;
  }

  let chunk = fullText.slice(start, end).trim();

  const patterns = [
    /(This credit card[\s\S]{40,2200}?)(?=\s+Bonus Point|\s+Pros\.)/i,
    /(The\s+[\s\S]{60,2200}?)(?=\s+Bonus Point|\s+Pros\.|\s+Read more)/,
  ];
  for (const pattern of patterns) {
    const m = chunk.match(pattern);
    if (m?.[1] && m[1].length > 60) return m[1].trim();
  }

  if (chunk.length > 80 && !/^(Menu|Home|Credit Cards)/i.test(chunk)) {
    return chunk.slice(0, 2200).trim();
  }
  return '';
}

export function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&#8203;/g, '')
    .replace(/\u00a0/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseLabelSection(sectionText, labels, stopMarkers = []) {
  const rows = {};
  for (let i = 0; i < labels.length; i++) {
    const label = labels[i];
    const pos = sectionText.indexOf(label);
    if (pos === -1) continue;

    const valueStart = pos + label.length;
    let valueEnd = sectionText.length;

    for (let j = i + 1; j < labels.length; j++) {
      const nextPos = sectionText.indexOf(labels[j], valueStart);
      if (nextPos !== -1 && nextPos < valueEnd) valueEnd = nextPos;
    }

    for (const stop of stopMarkers) {
      const sp = sectionText.indexOf(stop, valueStart);
      if (sp !== -1 && sp < valueEnd) valueEnd = sp;
    }

    const value = sectionText.slice(valueStart, valueEnd).trim();
    if (value) rows[label] = value;
  }
  return rows;
}

/**
 * Extract structured tables from a live utilitychoices.com.au credit card detail page.
 */
export function parseCreditCardDetailTables(html) {
  const fullText = stripHtml(html);
  const detailsStart = fullText.indexOf('Product Details');
  if (detailsStart === -1) {
    return {
      detailsProduct: {},
      detailsFees: {},
      eligibility: {},
      rewards: {},
    };
  }

  // End at first "How to Apply" after rewards (skip nav duplicates earlier on page)
  const rewardsCap = fullText.indexOf('Rewards points cap', detailsStart);
  let sectionEnd = fullText.length;
  const howToApplyStart = fullText.indexOf(
    'How to Apply',
    rewardsCap > -1 ? rewardsCap : detailsStart
  );
  if (howToApplyStart !== -1) sectionEnd = howToApplyStart;

  const section = fullText.slice(detailsStart, sectionEnd);
  const feesMatch = section.match(/Fees & Charges/i);
  const feesStart = feesMatch?.index ?? -1;

  const productText =
    feesStart > 0 ? section.slice(0, feesStart) : section.replace(/Fees.*/, '');
  const feesText = feesStart > 0 ? section.slice(feesStart) : '';

  const detailsProduct = parseLabelSection(productText, DETAILS_PRODUCT_LABELS, [
    'Fees & Charges',
  ]);
  const detailsFees = parseLabelSection(feesText, DETAILS_FEES_LABELS, [
    'Eligibility',
  ]);
  const eligibility = parseLabelSection(section, ELIGIBILITY_LABELS, ['Rewards']);
  const rewards = parseLabelSection(section, REWARDS_LABELS, []);

  return { detailsProduct, detailsFees, eligibility, rewards };
}
