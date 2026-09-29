import type { APIRoute } from 'astro';
import { lien } from '../lib/urls';

export const GET: APIRoute = () => {
  const sitemap = new URL(lien('/sitemap-index.xml'), import.meta.env.SITE).toString();
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
