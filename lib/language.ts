export type Language = 'en' | 'zh';
export function resolveLanguage(value: string | string[] | undefined): Language {
  return value === 'zh' ? 'zh' : 'en';
}
