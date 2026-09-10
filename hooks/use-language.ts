'use client';
import { useEffect, useState } from 'react';
import { resolveLanguage, type Language } from '@/lib/language';
export function useLanguage(initialLanguage: Language, titles: Record<Language, string>) {
  const [language, setLanguage] = useState(initialLanguage);
  useEffect(() => {
    const syncLanguage = () => setLanguage(resolveLanguage(new URLSearchParams(window.location.search).get('lang') ?? undefined));
    syncLanguage();
    window.addEventListener('popstate', syncLanguage);
    return () => window.removeEventListener('popstate', syncLanguage);
  }, [initialLanguage]);
  const title = titles[language];
  useEffect(() => {
    document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en';
    document.title = `${title} | GCGF`;
  }, [language, title]);
  function changeLanguage(next: Language) {
    setLanguage(next);
    const url = new URL(window.location.href);
    url.searchParams.set('lang', next);
    window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash);
  }
  return [language, changeLanguage] as const;
}
