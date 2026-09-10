import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { join } from 'node:path';

const output = new URL('../dist/client/', import.meta.url);
const briefings = JSON.parse(await readFile(new URL('../lib/data/briefings.json', import.meta.url), 'utf8'));
const home = await readFile(new URL('index.html', output), 'utf8');
assert(home.includes('Meeting Reports'), 'Static homepage must contain rendered content');
await access(new URL('404.html', output));
for (const briefing of briefings) {
  const html = await readFile(new URL(`briefing/${briefing.slug}.html`, output), 'utf8');
  assert(html.includes('reading-paper'), `Missing rendered report: ${briefing.slug}`);
  assert(home.includes(`/briefing/${briefing.slug}`), `Missing homepage link: ${briefing.slug}`);
}
// Check all original images and local JS/CSS referenced by the exported homepage.
const assets = new Set(['/media/logo.png', ...briefings.flatMap(b =>
  Object.values(b.content).flatMap(c => c.highlights.map(h => h.image).filter(Boolean)))]);
for (const match of home.matchAll(/(?:src|href)="(\/(?:assets|_next)\/[^"?#]+)"/g)) assets.add(match[1]);
for (const asset of assets) await access(join(output.pathname, asset.slice(1)));
console.log(`Static export verified: homepage, ${briefings.length} reports, 404 page, and ${assets.size} assets.`);
