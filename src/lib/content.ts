import { getEntry, getCollection } from 'astro:content';
import type { Locale } from './i18n';
import { APPROVED_CASE_STUDY_SLUGS, APPROVED_EDUCATION_SLUGS } from '../content.config';

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

export interface EducationSummary {
  slug: string;
  institution: string;
  title: string;
  period: string;
  status: 'in-progress' | 'completed';
  pendingAssets: string[];
}

export interface EducationDetail extends EducationSummary {
  description?: string;
}

export interface CredentialSummary {
  slug: string;
  title: string;
  issuer: string;
  year: number;
  hours?: number;
  pdf?: string;
  pendingAssets: string[];
}

export interface CredentialDetail extends CredentialSummary {
  summary?: string;
}

async function loadValidatedPairsByCollection(
  collectionName: 'caseStudies',
  approved: readonly string[],
): Promise<{ slug: string; es: any; en: any }[]>;
async function loadValidatedPairsByCollection<K extends string>(
  collectionName: K,
  approved: readonly string[],
): Promise<{ slug: string; es: any; en: any }[]>;
async function loadValidatedPairsByCollection(collectionName: string, approved: readonly string[]) {
  const all = await getCollection(collectionName as any);
  const slugs = all.map((e) => (e as any).data.slug);
  const stray = slugs.filter((s: string) => !approved.includes(s));
  if (stray.length) throw new Error(`Unapproved ${collectionName} slugs: ${stray.join(', ')}. Approved: ${approved.join(', ')}`);
  const grouped = new Map<string, { es: any; en: any }>();
  for (const entry of all) {
    const data = (entry as any).data;
    const slug = data.slug;
    if (!grouped.has(slug)) grouped.set(slug, { es: null, en: null });
    const pair = grouped.get(slug)!;
    if (data.locale === 'es') pair.es = data;
    if (data.locale === 'en') pair.en = data;
  }
  const result: { slug: string; es: any; en: any }[] = [];
  for (const [slug, pair] of grouped) {
    if (!pair.es || !pair.en) {
      throw new Error(`${collectionName} entry "${slug}" missing locale pair: ${pair.es ? 'en' : 'es'} is absent.`);
    }
    result.push({ slug, es: pair.es, en: pair.en });
  }
  return result;
}

function sortByYearDesc<T extends { year?: number; period?: string }>(a: T, b: T): number {
  const ay = a.year ?? parseInt(a.period?.split(/\D+/).filter(Boolean).pop() ?? '0', 10);
  const by = b.year ?? parseInt(b.period?.split(/\D+/).filter(Boolean).pop() ?? '0', 10);
  return by - ay;
}

export async function getEducation(locale: Locale): Promise<EducationSummary[]> {
  const pairs = await loadValidatedPairsByCollection('education', APPROVED_EDUCATION_SLUGS);
  const order = APPROVED_EDUCATION_SLUGS as unknown as string[];
  const sorted = pairs.sort((a, b) => order.indexOf(a.slug) - order.indexOf(b.slug));
  return sorted.map((p) => ({
    slug: p.slug,
    institution: locale === 'es' ? p.es.institution : p.en.institution,
    title: locale === 'es' ? p.es.title : p.en.title,
    period: locale === 'es' ? p.es.period : p.en.period,
    status: (locale === 'es' ? p.es.status : p.en.status) as 'in-progress' | 'completed',
    pendingAssets: (locale === 'es' ? p.es.pendingAssets : p.en.pendingAssets) ?? [],
  }));
}

export async function getEducationDetail(locale: Locale, slug: string): Promise<EducationDetail | null> {
  const entry = await getEntry('education', `${slug}.${locale}`);
  if (!entry) return null;
  const d = entry.data as any;
  return {
    slug: d.slug,
    institution: d.institution,
    title: d.title,
    period: d.period,
    status: d.status,
    description: d.description,
    pendingAssets: d.pendingAssets ?? [],
  };
}

export async function getCredentials(locale: Locale): Promise<CredentialSummary[]> {
  const all = await getCollection('credentials');
  const pairs = new Map<string, { es: any; en: any }>();
  for (const entry of all) {
    const data = entry.data as any;
    const slug = data.slug;
    if (!pairs.has(slug)) pairs.set(slug, { es: null, en: null });
    const pair = pairs.get(slug)!;
    if (data.locale === 'es') pair.es = data;
    if (data.locale === 'en') pair.en = data;
  }
  for (const [slug, pair] of pairs) {
    if (!pair.es || !pair.en) {
      throw new Error(`Credential "${slug}" missing locale pair: ${pair.es ? 'en' : 'es'} is absent.`);
    }
  }
  const summaries: CredentialSummary[] = [];
  for (const [slug, pair] of pairs) {
    const d = locale === 'es' ? pair.es : pair.en;
    summaries.push({
      slug,
      title: d.title,
      issuer: d.issuer,
      year: d.year,
      hours: d.hours,
      pdf: d.pdf,
      pendingAssets: d.pendingAssets ?? [],
    });
  }
  return summaries.sort(sortByYearDesc);
}

export async function getCredentialDetail(locale: Locale, slug: string): Promise<CredentialDetail | null> {
  const entry = await getEntry('credentials', `${slug}.${locale}`);
  if (!entry) return null;
  const d = entry.data as any;
  return {
    slug: d.slug,
    title: d.title,
    issuer: d.issuer,
    year: d.year,
    hours: d.hours,
    summary: d.summary,
    pdf: d.pdf,
    pendingAssets: d.pendingAssets ?? [],
  };
}
