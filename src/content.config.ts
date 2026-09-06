import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const locale = z.enum(['es', 'en']);
const audience = z.enum(['commerce', 'education', 'both']);

const siteSchema = z.object({ locale, title: z.string(), description: z.string(), author: z.string() });
const profileSchema = z.object({
  locale,
  name: z.string().optional(),
  headline: z.string(),
  summary: z.string(),
  email: z.string(),
  phone: z.string(),
  linkedin: z.string().url(),
  github: z.string().url(),
  website: z.string().url().optional(),
  cvPdf: z.string().optional(),
  cvLabel: z.string().optional(),
  cvDetail: z.string().optional(),
  cvDownloadName: z.string().optional(),
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
  documents: z.array(z.object({
    label: z.string(),
    url: z.string(),
    kind: z.enum(['certificate', 'reference', 'press', 'other']).default('certificate'),
  })).default([]),
});

const educationSchema = z.object({
  locale,
  slug: z.string(),
  institution: z.string(),
  title: z.string(),
  period: z.string(),
  status: z.enum(['in-progress', 'completed']),
  description: z.string().optional(),
  pendingAssets: z.array(z.string()).default([]),
});

const credentialSchema = z.object({
  locale,
  slug: z.string(),
  title: z.string(),
  issuer: z.string(),
  year: z.number().int().min(1900).max(2100),
  hours: z.number().int().optional(),
  summary: z.string().optional(),
  pdf: z.string().optional(),
  pdfs: z.array(z.string()).default([]),
  pendingAssets: z.array(z.string()).default([]),
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
const education = defineCollection({
  loader: glob({
    pattern: 'education/*.json',
    base: './src/content',
    generateId: ({ entry }) => entry.split('/').pop()!.replace(/\.json$/, ''),
  }),
  schema: educationSchema,
});
const credentials = defineCollection({
  loader: glob({
    pattern: 'credentials/*.json',
    base: './src/content',
    generateId: ({ entry }) => entry.split('/').pop()!.replace(/\.json$/, ''),
  }),
  schema: credentialSchema,
});

export const collections = { site, profile, caseStudies, education, credentials };
export const APPROVED_CASE_STUDY_SLUGS = ['movistar', 'crepier', 'radioshack', 'desly', 'cepre-uni', 'lactea'] as const;
export const APPROVED_EDUCATION_SLUGS = ['upc', 'esan', 'cibertec'] as const;