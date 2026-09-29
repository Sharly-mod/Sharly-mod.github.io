/*
 * Détermine l'URL publique et le préfixe de base selon le dépôt, puis écrit le
 * résultat au format attendu par $GITHUB_OUTPUT.
 *
 * Un dépôt nommé <utilisateur>.github.io est un site utilisateur : il est
 * servi à la racine du domaine. Tout autre dépôt est un site projet, servi
 * sous son nom : https://utilisateur.github.io/nom-du-depot/
 *
 * Ce fichier existe parce que l'interpolation de GitHub Actions casse sur la
 * syntaxe bash de découpe de variable (le signe dièse suivi de l'étoile).
 */
const [compte, depot] = (process.argv[2] ?? '').split('/');

if (!compte || !depot) {
  console.error('usage: node set-build-env.mjs <compte>/<depot>');
  process.exit(1);
}

const estSiteUtilisateur = depot === `${compte}.github.io`;
const base = estSiteUtilisateur ? '/' : `/${depot}`;
// Les URL doivent rester en minuscules : le nom de domaine est insensible à la
// casse, mais GitHub redirige, ce qui casserait les URL canoniques du sitemap.
const site = `https://${compte.toLowerCase()}.github.io${estSiteUtilisateur ? '' : `/${depot.toLowerCase()}`}`;

// Le message informatif part sur stderr : stdout est redirigé vers $GITHUB_OUTPUT,
// où GitHub n'accepte que des lignes au format clé=valeur.
console.error(
  estSiteUtilisateur
    ? `Site utilisateur détecté : publication à la racine.`
    : `Site projet détecté : publication sous ${base}`
);
console.log(`base=${base}`);
console.log(`site=${site}`);
