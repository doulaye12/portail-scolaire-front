export interface Classe {
  id?: number;
  nom: string;
  niveau: string;
  effectif_max: number;
  description: string;
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
  document_justificatif: Document;
  user: User
  classe?: Classe;
  bulletins?: Bulletin[];
}

export interface Document {
  id?: number;
  name: string;
  type: number;
  data: string;
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











// New updates

export interface LoggedUser {
  success: boolean
  user: User
  token: string
  role: string
}

export interface User {
  id: number
  nom: string
  prenom: string
  email: string
  email_verified_at: any
  role: "administrateur" | "enseignant" | "eleve" | "parent"
  actif: boolean
  created_at: string
  updated_at: string
}

export interface UserDashboard {
  success: boolean
  statistiques_generales: StatistiquesGenerales
  statistiques_par_classe: StatistiquesParClasse[]
  repartition_mentions: any[]
  periode_active: PeriodeActive
}

export interface StatistiquesGenerales {
  nombre_eleves: number
  nombre_enseignants: number
  nombre_classes: number
  nombre_bulletins_generes: number
}

export interface StatistiquesParClasse {
  classe: string
  effectif: number
  moyenne_classe: any
}

export interface PeriodeActive {
  id: number
  nom: string
  date_debut: string
  date_fin: string
  active: boolean
  created_at: string
  updated_at: string
}
