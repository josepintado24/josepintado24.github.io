import type { Locale } from './i18n';
import { detectAvatar } from './avatar';

export const SITE_ORIGIN = 'https://josepintado24.github.io';

export function canonical(path: string, locale: Locale): string {
  return `${SITE_ORIGIN}/${locale}${path === '/' ? '' : path}`;
}

export function personJsonLd(profile: { author: string; linkedin: string; github: string }) {
  const avatar = detectAvatar();
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.author,
    image: avatar.url ? `${SITE_ORIGIN}${avatar.url}` : undefined,
    sameAs: [profile.linkedin, profile.github],
    jobTitle: 'Full-stack e-commerce developer and IT educator',
    knowsAbout: [
      'Adobe Commerce',
      'Magento 2',
      'PHP',
      'JavaScript',
      'TypeScript',
      'React',
      'Angular',
      'Next.js',
      'Laravel',
      'WordPress',
      'IT education',
    ],
  };
}