// Checks every external link and every public asset referenced by the content files.
// Run with: npm run check:links   (needs internet access; Node 18+).
import { access, readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const DATA_DIR = 'src/app/data';
const PUBLIC_DIR = 'public';
// Always required by index.html, whatever the content files say.
const REQUIRED_ASSETS = ['favicon.ico', 'favicon.svg', 'apple-touch-icon.png', 'images/og-image.png'];
// Sites that answer automated requests with these codes are blocking bots, not broken.
const BOT_BLOCKED = new Set([401, 403, 429, 999]);

const urls = new Map(); // url -> files that mention it
const assets = new Map(); // relative asset path -> files that mention it
const remember = (map, key, file) => map.set(key, [...(map.get(key) ?? []), file]);

for (const name of (await readdir(DATA_DIR)).filter((file) => file.endsWith('.data.ts'))) {
  const text = await readFile(join(DATA_DIR, name), 'utf8');
  for (const [url] of text.matchAll(/https?:\/\/[^\s'"`)<>]+/g)) {
    remember(urls, url, name);
  }
  for (const [, path] of text.matchAll(/(?:url|src):\s*'((?:resume|images)\/[^']+)'/g)) {
    remember(assets, path, name);
  }
}
for (const path of REQUIRED_ASSETS) {
  remember(assets, path, 'index.html');
}

let failures = 0;

for (const [path, files] of assets) {
  try {
    await access(join(PUBLIC_DIR, path));
    console.log(`OK    ${path}`);
  } catch {
    failures += 1;
    console.log(`FAIL  public/${path} is missing (used by ${files.join(', ')})`);
  }
}

async function status(url) {
  const options = { redirect: 'follow', headers: { 'user-agent': 'Mozilla/5.0 (portfolio link check)' }, signal: AbortSignal.timeout(15000) };
  try {
    const head = await fetch(url, { ...options, method: 'HEAD' });
    if (head.ok) return head.status;
  } catch {
    // Some servers reject HEAD; fall through and retry with GET.
  }
  return (await fetch(url, { ...options, method: 'GET' })).status;
}

for (const [url, files] of urls) {
  try {
    const code = await status(url);
    if (code >= 200 && code < 400) {
      console.log(`OK    ${code} ${url}`);
    } else if (BOT_BLOCKED.has(code)) {
      console.log(`WARN  ${code} ${url}  (site blocks automated checks; open it by hand)`);
    } else {
      failures += 1;
      console.log(`FAIL  ${code} ${url}  (used by ${files.join(', ')})`);
    }
  } catch (error) {
    failures += 1;
    console.log(`FAIL  ${url}  (${error instanceof Error ? error.message : error})`);
  }
}

console.log(failures === 0 ? '\nAll checks passed.' : `\n${failures} problem(s) found.`);
process.exitCode = failures === 0 ? 0 : 1;