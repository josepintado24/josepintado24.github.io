import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const locale = z.enum(['es', 'en']);
const siteSchema = z.object({ locale, title: z.string(), description: z.string(), author: z.string() });
const profileSchema = z.object({
  locale,
  headline: z.string(),
  summary: z.string(),
  email: z.string(),
  phone: z.string(),
  linkedin: z.string().url(),
  github: z.string().url(),
});

const site = defineCollection({ loader: glob({ pattern: '{es,en}/site.json', base: './src/content' }), schema: siteSchema });
const profile = defineCollection({ loader: glob({ pattern: '{es,en}/profile.json', base: './src/content' }), schema: profileSchema });

export const collections = { site, profile };