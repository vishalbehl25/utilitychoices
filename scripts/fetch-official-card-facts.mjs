/**
 * Fetches official issuer product pages and prints key facts for manual/override sync.
 * Run: node scripts/fetch-official-card-facts.mjs
 */
const CARDS = [
  {
    slug: 'qantas-premier-titanium',
    url: 'https://www.qantasmoney.com/credit-cards/titanium/fees-and-rates',
  },
  {
    slug: 'american-express-business-gold-plus-card',
    url: 'https://www.americanexpress.com/en-au/credit-cards/business-gold-plus-card/',
  },
  {
    slug: 'westpac-altitude-platinum-card',
    url: 'https://www.westpac.com.au/personal-banking/credit-cards/reward/altitude-rewards-platinum/',
  },
  {
    slug: 'st.george-amplify-signature',
    url: 'https://www.stgeorge.com.au/personal/credit-cards/rewards/amplify-signature',
  },
  {
    slug: 'american-express-explorer-credit-card',
    url: 'https://www.americanexpress.com/en-au/credit-cards/explorer-credit-card/',
  },
  {
    slug: 'westpac-altitude-rewards-black',
    url: 'https://www.westpac.com.au/personal-banking/credit-cards/reward/altitude-rewards-black/',
  },
  {
    slug: 'anz-business-black',
    url: 'https://www.anz.com.au/business/credit-cards/business-black/',
  },
  {
    slug: 'david-jones-prestige-credit-card',
    url: 'https://www.davidjones.com/credit-card/prestige',
    note: 'May block bots; check Latitude/DJ site for promos',
  },
  {
    slug: 'nab-rewards-platinum-card',
    url: 'https://www.nab.com.au/personal/credit-cards/nab-rewards-cards/platinum-card',
  },
  {
    slug: 'virgin-money-anytime-rewards-credit-card-',
    url: 'https://virginmoney.com.au/credit-cards/anytime-rewards-credit-card',
  },
  {
    slug: 'coles-rewards-mastercard',
    url: 'https://www.coles.com.au/credit-cards/rewards',
  },
  {
    slug: 'westpac-altitude-qantas-black',
    url: 'https://www.westpac.com.au/personal-banking/credit-cards/qantas/altitude-qantas-black/',
  },
  {
    slug: 'anz-rewards-black-credit-card',
    url: 'https://www.anz.com.au/personal/credit-cards/rewards-black/',
  },
  {
    slug: 'nab-rewards-platinum-card-velocity-points',
    url: 'https://www.nab.com.au/personal/credit-cards/offers/velocity-bonus-points-redemption',
  },
  {
    slug: 'humm90-platinum-mastercard',
    url: 'https://www.humm90.com/',
  },
  {
    slug: 'american-express-velocity-platinum-card',
    url: 'https://www.americanexpress.com/en-au/credit-cards/velocity-platinum-card/',
  },
  {
    slug: 'qantas-american-express-ultimate-card',
    url: 'https://www.americanexpress.com/en-au/credit-cards/qantas-ultimate-card/',
  },
  {
    slug: 'bankwest-breeze-platinum-mastercard',
    url: 'https://www.bankwest.com.au/credit-cards/low-rate',
  },
  {
    slug: 'qantas-premier-platinum-creditcard',
    url: 'https://www.qantasmoney.com/credit-cards/platinum/fees-and-rates',
  },
  {
    slug: 'st.george-vertigo-card',
    url: 'https://www.stgeorge.com.au/personal/credit-cards/low-rate',
  },
];

function clean(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; UtilityChoiceFactCheck/1.0)' },
    signal: AbortSignal.timeout(25000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return await res.text();
}

function snippets(text, patterns) {
  const out = {};
  for (const [key, re] of Object.entries(patterns)) {
    const m = text.match(re);
    if (m) out[key] = (m[1] || m[0]).trim().slice(0, 280);
  }
  return out;
}

const PATTERNS = {
  annualFee: /\$\s?([\d,]+(?:\s+first year)?(?:\s*\([^)]+\))?)\s*(?:annual|p\.a\.|per year|card fee)/i,
  purchaseRate: /(20\.\d{2}|21\.\d{2}|23\.\d{2}|12\.\d{2}|13\.\d{2}|26\.\d{2}|0)%\s*p\.a\.[^.]{0,40}purchase/i,
  bonusPoints: /([\d,]+)\s*(?:bonus\s*)?(?:Qantas|Velocity|Membership Rewards|NAB Rewards|ANZ Reward|Altitude|Amplify|Flybuys|bonus points)/i,
  applyBy: /apply(?:\s+online)?\s+by\s+(\d{1,2}\s+\w+\s+\d{4})/i,
  btOffer: /(0%|6\.99%)[^.]{0,80}balance transfer/i,
};

for (const card of CARDS) {
  try {
    const html = await fetchText(card.url);
    const text = clean(html);
    const hits = snippets(text, PATTERNS);
    console.log('\n===', card.slug, '===');
    console.log('URL:', card.url);
    console.log(JSON.stringify(hits, null, 2));
    // First 400 chars around "bonus" if any
    const bi = text.toLowerCase().indexOf('bonus');
    if (bi >= 0) console.log('bonus ctx:', text.slice(Math.max(0, bi - 40), bi + 200));
  } catch (e) {
    console.log('\n===', card.slug, 'FAILED ===', e.message);
  }
}
