import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {icons:{icon:'/media/logo.png'},title:'会议记录报告 | GCGF Meeting Reports',description:'澳大利亚清洁能源峰会双语资料：会议摘要、Highlights 与原始图片。 Bilingual briefings from the Australian Clean Energy Summit.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="zh-CN"><body>{children}</body></html>}
