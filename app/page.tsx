import type { Metadata } from 'next';
import Home from '@/components/home';
import { resolveLanguage } from '@/lib/language';
type Props={searchParams:Promise<{lang?:string|string[]}>};
export async function generateMetadata({searchParams}:Props):Promise<Metadata>{const lang=resolveLanguage((await searchParams).lang);return {title:lang==='zh'?'会议记录报告 | GCGF':'Meeting Reports | GCGF',description:lang==='zh'?'澳大利亚清洁能源峰会会议报告、摘要和 Highlights。':'Meeting reports, summaries and highlights from the Australian Clean Energy Summit.'}}
export default async function Page({searchParams}:Props){return <Home initialLanguage={resolveLanguage((await searchParams).lang)}/>}
