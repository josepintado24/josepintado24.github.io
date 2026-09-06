// Avatar helper — checks at build time if the user dropped a photo in public/avatar/.
// Falls back to the infinity mark if no avatar is present.
import { existsSync } from 'node:fs';
import { resolve, fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..', '..');

const CANDIDATES = ['avatar.jpg', 'avatar.jpeg', 'avatar.png', 'avatar.webp', 'avatar.avif'];

export interface Avatar {
  available: boolean;
  url: string | null;
  type: string | null;
}

export function detectAvatar(): Avatar {
  for (const name of CANDIDATES) {
    const abs = resolve(projectRoot, 'public', 'avatar', name);
    if (existsSync(abs)) {
      return {
        available: true,
        url: `/avatar/${name}`,
        type: name.endsWith('.png') ? 'image/png' : name.endsWith('.webp') ? 'image/webp' : name.endsWith('.avif') ? 'image/avif' : 'image/jpeg',
      };
    }
  }
  return { available: false, url: null, type: null };
}
