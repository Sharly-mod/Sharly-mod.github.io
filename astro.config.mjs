// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

/*
 * Déploiement GitHub Pages.
 *
 * Les deux variables d'environnement sont définies par le workflow
 * .github/workflows/deploy.yml. En local elles valent par défaut :
 *   - un site utilisateur  -> https://sharly-mod.github.io
 *   - un site projet       -> BASE_PATH='/portfolio'
 *
 * Si tu passes à un nom de domaine personnalisé, change SITE_URL ici
 * (ou dans le workflow) : le sitemap, le flux RSS et robots.txt en dépendent.
 */
const site = process.env.SITE_URL ?? 'https://sharly-mod.github.io';
const base = process.env.BASE_PATH ?? '/';

// https://astro.build/config
export default defineConfig({
  site,
  base,
  trailingSlash: 'ignore',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: 'github-dark-dimmed', wrap: true },
  },
});
