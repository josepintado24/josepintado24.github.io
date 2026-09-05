import { getEntry } from 'astro:content';
import type { Locale } from './i18n';

export async function getSite(locale: Locale) {
  const entry = await getEntry('site', `${locale}/site`);
  if (!entry) throw new Error(`Missing site content for ${locale}`);
  return entry.data;
}

export async function getProfile(locale: Locale) {
  const entry = await getEntry('profile', `${locale}/profile`);
  if (!entry) throw new Error(`Missing profile content for ${locale}`);
  return entry.data;
}