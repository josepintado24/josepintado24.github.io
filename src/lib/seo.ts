import type { Locale } from './i18n';

export const SITE_ORIGIN = 'https://josepintado24.github.io';

export function canonical(path: string, locale: Locale): string {
  return `${SITE_ORIGIN}/${locale}${path === '/' ? '' : path}`;
}

export function personJsonLd(profile: { author: string; linkedin: string; github: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.author,
    sameAs: [profile.linkedin, profile.github],
  };
}