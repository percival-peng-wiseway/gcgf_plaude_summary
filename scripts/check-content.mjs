import fs from 'node:fs';
import assert from 'node:assert/strict';
const reports=JSON.parse(fs.readFileSync('lib/data/briefings.json','utf8'));
assert.equal(reports.length,12);
assert.equal(new Set(reports.map(r=>r.slug)).size,reports.length);
let highlights=0;
for(const report of reports){
 const {en,zh}=report.content;
 assert.equal(en.highlights.length,zh.highlights.length,report.slug);
 highlights+=en.highlights.length;
 for(const lang of ['en','zh']){
  const c=report.content[lang];
  assert.ok(c.title.trim()&&c.brief.trim()&&c.summaryHtml.trim(),`${report.slug}/${lang}: missing content`);
  assert.ok(!/AI\s*(Suggestions|建议)|mind-map|思维导图/i.test(c.summaryHtml),`${report.slug}/${lang}: removed section returned`);
  for(const html of [c.summaryHtml,c.briefHtml,...c.highlights.map(h=>h.html)]){
   assert.ok(!html.includes('**'),`${report.slug}/${lang}: raw bold delimiter`);
   assert.ok(!/<script|javascript:|X-Amz-/i.test(html),`${report.slug}/${lang}: invalid content`);
   for(const [,src] of html.matchAll(/src="([^"]+)"/g))assert.ok(src.startsWith('/library/')&&fs.existsSync('public'+src),src);
  }
 }
 en.highlights.forEach((h,i)=>{
  assert.equal(h.time,zh.highlights[i].time);
  assert.equal(h.image,zh.highlights[i].image);
  assert.ok(h.body.trim()&&zh.highlights[i].body.trim());
  if(h.image)assert.ok(fs.existsSync('public'+h.image));
 });
}
assert.equal(highlights,41);
console.log('PASS: 12 bilingual reports, 41 paired Highlights, local images, formatting and removed sections.');
