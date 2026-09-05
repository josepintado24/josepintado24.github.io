import { getEntry, getCollection } from 'astro:content';
import type { Locale } from './i18n';
import { APPROVED_CASE_STUDY_SLUGS } from '../content.config';

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

export interface CaseStudyLocalePair {
  es: CaseStudySummary | null;
  en: CaseStudySummary | null;
}

export interface CaseStudySummary {
  slug: string;
  title: string;
  summary: string;
  client: string;
  role: string;
  period: string;
  audience: 'commerce' | 'education' | 'both';
  confidential: boolean;
  pendingAssets: string[];
}

export interface CaseStudyDetail extends CaseStudySummary {
  context: string;
  challenges: string[];
  approach: string[];
  outcomes: string[];
  stack: string[];
}

function summarize(entry: { data: any }): CaseStudySummary {
  return {
    slug: entry.data.slug,
    title: entry.data.title,
    summary: entry.data.summary,
    client: entry.data.client,
    role: entry.data.role,
    period: entry.data.period,
    audience: entry.data.audience,
    confidential: entry.data.confidential ?? false,
    pendingAssets: entry.data.pendingAssets ?? [],
  };
}

function detailize(entry: { data: any }): CaseStudyDetail {
  return {
    ...summarize(entry),
    context: entry.data.context,
    challenges: entry.data.challenges,
    approach: entry.data.approach,
    outcomes: entry.data.outcomes,
    stack: entry.data.stack,
  };
}

function assertApprovedSlugs(slugs: string[]) {
  const approved = new Set<string>(APPROVED_CASE_STUDY_SLUGS);
  const stray = slugs.filter((s) => !approved.has(s));
  if (stray.length) {
    throw new Error(`Unapproved case-study slugs in content: ${stray.join(', ')}. Approved: ${[...approved].join(', ')}`);
  }
}

function assertLocalePair(slugs: string[]) {
  const present = new Set(slugs);
  const missing: string[] = [];
  for (const s of APPROVED_CASE_STUDY_SLUGS) {
    if (present.has(s) && !present.has(s)) missing.push(s);
  }
  return missing;
}

async function loadValidatedPairs(): Promise<CaseStudyLocalePair[]> {
  const all = await getCollection('caseStudies');
  assertApprovedSlugs(all.map((e) => e.data.slug));
  const grouped = new Map<string, CaseStudyLocalePair>();
  for (const entry of all) {
    const slug = entry.data.slug;
    if (!grouped.has(slug)) grouped.set(slug, { es: null, en: null });
    const pair = grouped.get(slug)!;
    if (entry.data.locale === 'es') pair.es = summarize(entry);
    if (entry.data.locale === 'en') pair.en = summarize(entry);
  }
  const result: CaseStudyLocalePair[] = [];
  for (const [slug, pair] of grouped) {
    if (!pair.es || !pair.en) {
      throw new Error(`Case study "${slug}" missing locale pair: ${pair.es ? 'en' : 'es'} is absent.`);
    }
    result.push(pair);
  }
  return result;
}

export async function getCaseStudies(
  locale: Locale,
  filter?: { audience?: 'commerce' | 'education' | 'both' },
): Promise<CaseStudySummary[]> {
  const pairs = await loadValidatedPairs();
  const ordered = pairs.sort((a, b) => {
    const order = ['movistar', 'crepier', 'radioshack', 'desly', 'cepre-uni'];
    return order.indexOf(a.es!.slug) - order.indexOf(b.es!.slug);
  });
  const summaries = ordered
    .map((p) => (locale === 'es' ? p.es! : p.en!))
    .filter((s) => !filter?.audience || s.audience === filter.audience || s.audience === 'both');
  return summaries;
}

export async function getCaseStudyPair(slug: string): Promise<CaseStudyLocalePair | null> {
  const pairs = await loadValidatedPairs();
  return pairs.find((p) => p.es!.slug === slug) ?? null;
}

export async function getCaseStudyDetail(locale: Locale, slug: string): Promise<CaseStudyDetail | null> {
  const entry = await getEntry('caseStudies', `${slug}.${locale}`);
  if (!entry) return null;
  return detailize(entry);
}
