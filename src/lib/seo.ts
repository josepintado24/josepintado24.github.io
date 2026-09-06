import type { Locale } from './i18n';
import { detectAvatar } from './avatar';

export const SITE_ORIGIN = 'https://josepintado24.github.io';
export const OG_IMAGE = `${SITE_ORIGIN}/og/cover.png`;

export function canonical(path: string, locale: Locale): string {
  return `${SITE_ORIGIN}/${locale}${path === '/' ? '' : path}`;
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'José Luis Pintado Vásquez',
    url: SITE_ORIGIN,
    inLanguage: ['es', 'en'],
    publisher: {
      '@type': 'Person',
      name: 'José Luis Pintado Vásquez',
    },
  };
}

export function profilePageJsonLd(locale: Locale, profile: { author: string; linkedin: string; github: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    mainEntity: {
      '@type': 'Person',
      name: profile.author,
      sameAs: [profile.linkedin, profile.github],
    },
    inLanguage: locale,
  };
}

export function breadcrumbJsonLd(locale: Locale, items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
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