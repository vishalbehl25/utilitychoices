import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '..', 'public', 'assets', 'nbn');

/** Wix media IDs used on utilitychoices.com.au/nbn listing */
const LOGOS = [
  'ef42b6_f706fe8d1d444dcf8cff8206eb7e54c9~mv2.png',
  'ef42b6_cc71fae7d01e4958ae255ab08b2b50ae~mv2.png',
  'ef42b6_d24777d8ce9242d4b0c786f1df80f933~mv2.png',
  'ef42b6_db43d4d58a89455d8ac8be6866a4eb33~mv2.png',
  'ef42b6_e23fab8bc7944cddadebff776595886c~mv2.jpg',
  'ef42b6_a2a2e7ca454a4d109922fcfc96c78b5c~mv2.png',
  'ef42b6_99417270cb3148f7a2423d4e652c8aab~mv2.png',
  'ef42b6_9c31fe326dcb4dc68a1dc2d73471ad3c~mv2.png',
  'ef42b6_d225f137036e472486293ad210d03418~mv2.png',
  'ef42b6_d874c8344ce640a292de61bd504ff1a3~mv2.png',
  'ef42b6_91206f924cf74b609ef62aa6463bdfdc~mv2.png',
  'ef42b6_9adbcba1ac044db6a15058734c4a860c~mv2.png',
  '52d9c9_931deaa912984291803f98a9e5957805~mv2.png',
  '52d9c9_817bd66d87164a889072bdce7fae300d~mv2.png',
  '52d9c9_69f14949568c452e8780c0c70814f5bc~mv2.png',
  '52d9c9_4eeaddb8336b459b8fce6beddc734294~mv2.png',
  '52d9c9_254c5111aaf740b7b4eb672821b46e33~mv2.png',
  '52d9c9_f2d464c8710a466eaa3e1bc1ac5c0935~mv2.png',
];

async function download(file) {
  const url = `https://static.wixstatic.com/media/${file}`;
  const dest = path.join(OUT, file);
  if (fs.existsSync(dest)) {
    console.log(`Skip ${file}`);
    return;
  }
  const res = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; UtilityChoice/1.0)' },
  });
  if (!res.ok) throw new Error(`${file}: ${res.status}`);
  fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
  console.log(`OK ${file}`);
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  for (const file of LOGOS) {
    try {
      await download(file);
    } catch (err) {
      console.error(err.message);
    }
  }
}

main().catch(console.error);
