import fs from 'node:fs';

const pages = [
  'https://www.utilitychoices.com.au/',
  'https://www.utilitychoices.com.au/credit-cards',
  'https://www.utilitychoices.com.au/personal-loan',
  'https://www.utilitychoices.com.au/solar-pannel',
  'https://www.utilitychoices.com.au/nbn',
  'https://www.utilitychoices.com.au/Inverters',
];

async function extract(url) {
  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    },
  });
  const html = await res.text();

  const imgRegex = /<img[^>]+>/g;
  const imgMatches = html.match(imgRegex) || [];
  const imgData = [];

  for (const img of imgMatches) {
    const srcMatch = img.match(/src="([^"]+)"/);
    const src = srcMatch ? srcMatch[1] : '';
    if (src.includes('wixstatic.com/media')) {
      const altMatch = img.match(/alt="([^"]*)"/);
      const alt = altMatch ? altMatch[1] : '';
      imgData.push({ src, alt });
    }
  }

  return imgData;
}

async function main() {
  const allImages = {};
  for (const page of pages) {
    console.log(`Extracting from ${page}...`);
    try {
      const data = await extract(page);
      allImages[page] = data;
    } catch (err) {
      console.error(`Error on ${page}: ${err.message}`);
    }
  }
  fs.writeFileSync('extracted-logos.json', JSON.stringify(allImages, null, 2));
  console.log('Saved to extracted-logos.json');
}

main().catch(console.error);
