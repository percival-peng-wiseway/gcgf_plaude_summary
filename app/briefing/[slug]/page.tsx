import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Reader from '@/components/reader';
import briefings from '@/lib/data/briefings.json';
import { resolveLanguage } from '@/lib/language';
type Props={params:Promise<{slug:string}>;searchParams:Promise<{lang?:string|string[]}>};
export function generateStaticParams(){return briefings.map(({slug})=>({slug}));}
export async function generateMetadata({params,searchParams}:Props):Promise<Metadata>{
 const {slug}=await params;const lang=process.env.STATIC_EXPORT === 'true' ? 'en' : resolveLanguage((await searchParams).lang);const b=briefings.find(b=>b.slug===slug);
 return {title:b?`${b.content[lang].title} | GCGF`:'Report not found | GCGF',description:b?.content[lang].brief.split('\n')[0]};
}
export default async function Page({params,searchParams}:Props){
 const {slug}=await params;const briefing=briefings.find(b=>b.slug===slug);if(!briefing)notFound();
 return <Reader briefing={briefing} initialLanguage={process.env.STATIC_EXPORT === 'true' ? 'en' : resolveLanguage((await searchParams).lang)}/>;
}
