import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Reader from '@/components/reader';
import briefings from '@/lib/data/briefings.json';
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const b=briefings.find(b=>b.slug===slug);return {title:b?`${b.content.zh.title} | GCGF`:'Briefing | GCGF',description:b?.content.en.brief.split('\n')[0]}}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const briefing=briefings.find(b=>b.slug===slug);if(!briefing)notFound();return <Reader briefing={briefing}/>}
