import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const locale = z.enum(['es', 'en']);
const audience = z.enum(['commerce', 'education', 'both']);

const siteSchema = z.object({ locale, title: z.string(), description: z.string(), author: z.string() });
const profileSchema = z.object({
  locale,
  headline: z.string(),
  summary: z.string(),
  email: z.string(),
  phone: z.string(),
  linkedin: z.string().url(),
  github: z.string().url(),
  cvPdf: z.string().optional(),
  cvLabel: z.string().optional(),
  cvDetail: z.string().optional(),
});

const caseStudySchema = z.object({
  locale,
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  role: z.string(),
  period: z.string(),
  client: z.string(),
  audience,
  context: z.string(),
  challenges: z.array(z.string()).min(1),
  approach: z.array(z.string()).min(1),
  outcomes: z.array(z.string()),
  stack: z.array(z.string()),
  pendingAssets: z.array(z.string()).default([]),
  confidential: z.boolean().default(false),
});

const site = defineCollection({ loader: glob({ pattern: '{es,en}/site.json', base: './src/content' }), schema: siteSchema });
const profile = defineCollection({ loader: glob({ pattern: '{es,en}/profile.json', base: './src/content' }), schema: profileSchema });
const caseStudies = defineCollection({
  loader: glob({
    pattern: 'case-studies/*.json',
    base: './src/content',
    generateId: ({ entry }) => entry.split('/').pop()!.replace(/\.json$/, ''),
  }),
  schema: caseStudySchema,
});

export const collections = { site, profile, caseStudies };
export const APPROVED_CASE_STUDY_SLUGS = ['movistar', 'crepier', 'radioshack', 'desly', 'cepre-uni'] as const;