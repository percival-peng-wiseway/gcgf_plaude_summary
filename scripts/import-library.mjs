import fs from 'node:fs';
import path from 'node:path';
import { marked } from 'marked';
const root=path.resolve('../Plaud_Library');
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const manifest=read('manifest.json'),digests=read('_translations/digests.json');
const translations=Object.assign({},...fs.readdirSync(path.join(root,'_translations')).filter(p=>p.startsWith('highlights_')).map(p=>read('_translations/'+p)));
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
marked.use({renderer:{html({text}){return /^<\/?mark>$/.test(text.trim())?text:escape(text)}}});
// Separate punctuation-ending bold labels from adjacent prose for CommonMark.
const renderMarkdown=md=>marked.parse(md.replace(/(\*\*[^*\n]+[：:]\*\*)(?=\S)/g,'$1 '));
// Source AI Suggestions are trailing editorial sections, not meeting content.
const withoutAISuggestions=md=>{
 const heading=/^[ \t]*(?:>[ \t]*)?(?:#{1,6}[ \t]+)?(?:\*\*)?AI[ \t]*(?:Suggestions|建议)(?:\*\*)?[ \t]*$/im.exec(md);
 return heading?md.slice(0,heading.index).trimEnd():md;
};
const result=manifest.map((m,i)=>{
 const base=path.join(root,m.folder),dest=path.join('public/library',m.folder);fs.mkdirSync(dest,{recursive:true});fs.cpSync(path.join(base,'assets'),path.join(dest,'assets'),{recursive:true,filter:src=>path.basename(src)!=='mind-map.svg'});
 fs.rmSync(path.join(dest,'assets/mind-map.svg'),{force:true});
 const content={};
 for(const lang of ['en','zh']){
  const original=lang==='en'?'01_original.en.md':'03_original.zh.md';
  const md=fs.readFileSync(path.join(base,original),'utf8');
  const start=lang==='en'?'## Summary\n':'## Summary｜原摘要完整翻译\n';
  const end=lang==='en'?'## Highlights\n':'## Highlights｜亮点完整翻译\n';
  const source=md.split(start)[1].split(end)[0].replace(/\n### (?:Mind map|思维导图)\s*\n[\s\S]*$/, '').replaceAll('](assets/',`](/library/${m.folder}/assets/`);
  const highlights=m.highlights.map((h,j)=>{const v={...h,...(lang==='zh'?translations[String(m.index)][j]:{})};return {...v,image:h.image?`/library/${m.folder}/${h.image}`:null,html:renderMarkdown(v.body.replaceAll('• ','- '))}});
  content[lang]={title:lang==='zh'?digests[i].title:m.title.split(': ').slice(1).join(': '),brief:digests[i][lang],briefHtml:renderMarkdown(digests[i][lang]),summaryHtml:renderMarkdown(withoutAISuggestions(source)),highlights};
 }
 return {id:m.index,slug:m.folder,date:m.date,duration:m.duration,source:m.source_url,tags:m.tags.slice(2),photoCount:m.photo_count,content};
});
fs.writeFileSync('lib/data/briefings.json',JSON.stringify(result));
console.log(`Imported ${result.length} briefings, ${result.reduce((n,b)=>n+b.content.en.highlights.length,0)} highlights.`);
