import { Title } from 'prisma-client'

export const levelConfig = [
  { level: 1, minXp: 0, title: Title.NOOB },
  { level: 2, minXp: 50, title: Title.PORTE_CHAUSSETTES },
  { level: 3, minXp: 150, title: Title.RODEUR_TIMIDE },
  { level: 4, minXp: 200, title: Title.DISCIPLINAIRE_DEBUTANT },
  { level: 5, minXp: 300, title: Title.SCRIBE_DES_TACHES },
  { level: 6, minXp: 400, title: Title.MERCENAIRE_ORGANISE },
  { level: 7, minXp: 600, title: Title.TEMPLIER_DE_L_EFFORT },
  { level: 8, minXp: 800, title: Title.ELU_DES_HABITUDES },
  { level: 9, minXp: 1000, title: Title.PALADIN_DU_QUOTIDIEN },
  { level: 10, minXp: 1500, title: Title.ARCHIMAGE_DE_LA_CONSTANCE }
]