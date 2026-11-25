/* ---------------------------------------------------------------------------
 * Documents attendus pour l'épreuve E5.
 *
 * Les fichiers ne sont pas fournis dans ce dépôt : ils sont déposés dans
 * public/documents/ avant l'oral. Le site vérifie leur présence au build et
 * affiche « À déposer » si le fichier manque, pour éviter un lien mort devant
 * le jury.
 * ------------------------------------------------------------------------- */

export interface DocumentE5 {
  id: string;
  titre: string;
  description: string;
  fichier: string; // chemin relatif à public/
  type: 'PDF' | 'XLSX';
  obligatoire: boolean;
}

export const documentsE5: DocumentE5[] = [
  {
    id: 'tableau-synthese',
    titre: 'Tableau de synthèse E5',
    description:
      "Réalisations professionnelles, compétences couvertes et preuves associées. Version PDF ou XLSX à déposer.",
    fichier: 'documents/tableau-synthese-e5.pdf',
    type: 'PDF',
    obligatoire: true,
  },
  {
    id: 'attestation-stage',
    titre: 'Attestation de stage',
    description:
      "Attestation DydyITServices / TIS-INGÉ pour le stage du 29 juin au 31 juillet 2026 (projet GestioParc / client DITS).",
    fichier: 'documents/attestation-stage.pdf',
    type: 'PDF',
    obligatoire: true,
  },
  {
    id: 'convention-stage',
    titre: 'Convention de stage',
    description:
      "Convention signée par l'établissement, DydyITServices / TIS-INGÉ et l'étudiant.",
    fichier: 'documents/convention-stage.pdf',
    type: 'PDF',
    obligatoire: false,
  },
  {
    id: 'rapport-stage',
    titre: 'Rapport de stage',
    description:
      "Rapport DydyITServices / TIS-INGÉ 2026 : infrastructure, application GestioParc, tests et bilan.",
    fichier: 'documents/rapport-stage.pdf',
    type: 'PDF',
    obligatoire: false,
  },
  {
    id: 'cv',
    titre: 'CV — Sharly Farag',
    description:
      "Version PDF du CV, adaptée à une candidature en alternance ou en poursuite d'études.",
    fichier: 'documents/cv-sharly-farag.pdf',
    type: 'PDF',
    obligatoire: true,
  },
];
