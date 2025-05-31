import type { Quest, QuestLog } from './quest';

export type Title =
  | 'NOOB'
  | 'PORTE_CHAUSSETTES'
  | 'RODEUR_TIMIDE'
  | 'DISCIPLINAIRE_DEBUTANT'
  | 'SCRIBE_DES_TACHES'
  | 'MERCENAIRE_ORGANISE'
  | 'TEMPLIER_DE_L_EFFORT'
  | 'ELU_DES_HABITUDES'
  | 'PALADIN_DU_QUOTIDIEN'
  | 'ARCHIMAGE_DE_LA_CONSTANCE';

export interface User {
  id: number;
  userName: string;
  createdAt: string;
  mail: string;
  xp: number;
  level: number;
  title: Title;
  quests: Quest[];
  logs: QuestLog[];
}

export enum UserTitle {
  NOOB = 'Noob',
  PORTE_CHAUSSETTES = 'Porte chaussette',
  RODEUR_TIMIDE = 'Rodeur timide',
  DISCIPLINAIRE_DEBUTANT = 'Disciplinaire débutant',
  SCRIBE_DES_TACHES = 'Scribe des taches',
  MERCENAIRE_ORGANISE = 'Mercenaire organisé',
  TEMPLIER_DE_L_EFFORT = "Templier de l'effort",
  ELU_DES_HABITUDES = 'Elu des habitudes',
  PALADIN_DU_QUOTIDIEN = 'Paladin du quotidien',
  ARCHIMAGE_DE_LA_CONSTANCE = 'Archimage de la constance',
}
