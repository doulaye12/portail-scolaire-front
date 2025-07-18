export interface Classe {
  id?: number;
  nom: string;
  niveau: string;
  effectif_max: number;
  description: string;
  // Liste des élèves dans cette classe (optionnel)
  eleves?: Eleve[];
}

export interface Bulletin {
  id?: number;
  eleve_id: number;           // FK → Eleve
  periode_id: number;         // FK → Periode
  moyenne_generale: number;
  mention: string;
  rang: number;
  appreciation_generale: string;
  fichier_pdf: string;
  eleve?: Eleve;
  periode?: Periode;
}

export interface Eleve {
  id?: number;
  user_id: number;             // FK → User
  classe_id: number;           // FK → Classe
  numero_etudiant: string;
  date_naissance: string;
  lieu_naissance: string;
  sexe: 'Masculin' | 'Féminin' | string;
  adresse: string;
  telephone: string;
  nom_tuteur: string;
  telephone_tuteur: string;
  email_tuteur: string;
  document_justificatif: string;
  classe?: Classe;
  bulletins?: Bulletin[];
}

export interface Enseignant {
  id?: number;
  user_id: number;             // FK → User
  numero_enseignant: string;
  specialite: string;
  date_embauche: string;
  telephone: string;
  diplomes: string;

  user?: User;
}

export interface Matiere {
  id?: number;
  nom: string;
  code: string;
  coefficient: number;
  niveau: string;
  description: string;

  // Optionnel : lien avec enseignant(s)
  enseignants?: Enseignant[];
}

export interface Parent {
  id?: number;
  user_id: number;             // FK → User
  profession: string;
  telephone: string;
  adresse: string;

  user?: User;
  enfants?: Eleve[];           // Liés par une logique métier (pas FK direct ici)
}

export interface Periode {
  id?: number;
  nom: string;
  date_debut: string;
  date_fin: string;
  active: boolean;
}

export interface User {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  password: string;
  role: 'admin' | 'enseignant' | 'eleve' | 'parent' | string;
  actif: boolean;
}
