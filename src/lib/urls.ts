/*
 * Préfixe les liens internes par le `base` d'Astro.
 *
 * Astro n'ajoute le `base` ni aux liens écrits à la main (`href="/projets/"`)
 * ni aux chaînes construites dynamiquement. Sans cette aide, le site casse dès
 * qu'il est publié sous un sous-chemin, par exemple
 * https://sharly-mod.github.io/portfolio/projets/ qui renvoie un 404.
 *
 * Utilisation : <a href={lien('/projets/')}>
 */
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function lien(chemin: string): string {
  if (!chemin.startsWith('/')) return chemin;
  return `${base}${chemin}` || '/';
}
