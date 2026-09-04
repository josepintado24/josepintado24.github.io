import { getRelativeLocaleUrl } from 'astro:i18n';

export type Locale = 'es' | 'en';
export const locales: Locale[] = ['es', 'en'];
export const defaultLocale: Locale = 'es';

export function isLocale(value: string | undefined): value is Locale {
  return value === 'es' || value === 'en';
}

export function localePath(locale: Locale, path = '/'): string {
  return getRelativeLocaleUrl(locale, path);
}