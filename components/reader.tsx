'use client';
import { useLanguage } from '@/hooks/use-language';
import type { Language } from '@/lib/language';
import { ArrowLeft, Image as ImageIcon, Sparkles } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import briefings from '@/lib/data/briefings.json';
type Briefing=(typeof briefings)[number];
export default function Reader({briefing:b,initialLanguage}:{briefing:Briefing;initialLanguage:Language}){
 const [lang,changeLanguage]=useLanguage(initialLanguage);
 const c=b.content[lang],zh=lang==='zh';
 return <main className="shell reader-shell" lang={zh?'zh-CN':'en'}>
 <nav className="reader-nav"><a href={`/?lang=${lang}`}><ArrowLeft size={17}/>{zh?'全部报告':'All reports'}</a><div className="language" aria-label={zh?'阅读语言':'Reading language'}><button aria-pressed={zh} onClick={()=>changeLanguage('zh')}>中文</button><button aria-pressed={!zh} onClick={()=>changeLanguage('en')}>EN</button></div></nav>
 <header className="detail-header"><div className="detail-brand"><div className="logo-crop"><img src="/media/logo.png" alt="GCGF — Green Connect Green Future"/></div><span>REPORT {String(b.id).padStart(2,'0')} / 11</span></div><div className="detail-kicker">GCGF / MEETING REPORTS</div><h1>{c.title}</h1><div className="detail-meta"><span><Sparkles size={15}/>{c.highlights.length} {c.highlights.length===1?'Highlight':'Highlights'}</span></div></header>
 <Tabs defaultValue="brief" className="reading-tabs"><TabsList className="reading-tab-list" aria-label={zh?'内容版本':'Content view'}><TabsTrigger className="reading-tab" value="brief">{zh?'精简摘要':'Brief'}</TabsTrigger><TabsTrigger className="reading-tab" value="full">{zh?'完整 Summary':'Full summary'}</TabsTrigger><TabsTrigger className="reading-tab" value="highlights">Highlights <span>{c.highlights.length}</span></TabsTrigger></TabsList>
 <TabsContent value="brief"><section className="reading-paper"><div className="paper-label">{zh?'摘要速览':'AT A GLANCE'}</div><div className="prose-content" dangerouslySetInnerHTML={{__html:c.briefHtml}}/><p className="source-note">{zh?'根据原页面 Summary 整理。嘉宾观点及提案按来源呈现。':'Condensed from the source Summary. Speaker views and proposals are presented as recorded.'}</p></section></TabsContent>
 <TabsContent value="full"><section className="reading-paper"><div className="paper-label">{zh?'SUMMARY · 完整中文翻译':'SUMMARY · ORIGINAL TEXT'}</div><div className="prose-content" dangerouslySetInnerHTML={{__html:c.summaryHtml}}/></section></TabsContent>
 <TabsContent value="highlights"><div className="highlight-list">{c.highlights.length?c.highlights.map((h,i)=><article className="highlight-detail" key={h.time}><div className="highlight-order"><span>{String(i+1).padStart(2,'0')}</span><time>{h.time}</time></div><div className="highlight-main"><h2>{h.title}</h2>{h.image&&<figure><a href={h.image} target="_blank" rel="noreferrer" aria-label={zh?'打开原始图片':'Open original image'}><img src={h.image} alt={h.title} loading="lazy" width="1200" height="900"/></a><figcaption><ImageIcon size={13}/>{zh?'会议原图':'Original conference image'} · {h.time}</figcaption></figure>}<div className="prose-content" dangerouslySetInnerHTML={{__html:h.html}}/></div></article>):<section className="reading-paper no-highlights"><Sparkles size={27}/><h2>{zh?'此份资料未提供 Highlights':'No Highlights in this source'}</h2><p>{zh?'可阅读精简摘要和完整 Summary。':'The brief and full Summary are available in the other tabs.'}</p></section>}</div></TabsContent>
 </Tabs><footer>GCGF <span>GREEN CONNECT · GREEN FUTURE</span><small><a href={`/?lang=${lang}`}>{zh?'返回全部报告':'Back to all reports'} ↑</a></small></footer></main>
}
