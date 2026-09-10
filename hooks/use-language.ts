'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Language } from '@/lib/language';
export function useLanguage(initialLanguage: Language) {
  const [language, setLanguage] = useState(initialLanguage);
  const router = useRouter();
  useEffect(() => { setLanguage(initialLanguage); }, [initialLanguage]);
  useEffect(() => { document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'; }, [language]);
  function changeLanguage(next: Language) {
    setLanguage(next);
    const url = new URL(window.location.href);
    url.searchParams.set('lang', next);
    router.replace(url.pathname + url.search + url.hash, { scroll: false });
  }
  return [language, changeLanguage] as const;
}
