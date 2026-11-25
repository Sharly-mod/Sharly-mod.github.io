import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { lien } from './urls';

/* Vérifie si un document a bien été déposé dans public/.
   Le test se fait au build : si le fichier manque, l'interface affiche
   « À déposer » au lieu d'un bouton qui renverrait une 404. */
export function documentExiste(fichier: string): boolean {
  return existsSync(join(process.cwd(), 'public', fichier));
}

export function urlDocument(fichier: string): string {
  return lien(`/${fichier}`);
}
