import type { Quest, QuestLog } from "./Quest"

export type Title =  
    'NOOB'|
    'PORTE_CHAUSSETTES'|
    'RODEUR_TIMIDE'|
    'DISCIPLINAIRE_DEBUTANT'|
    'SCRIBE_DES_TACHES'|
    'MERCENAIRE_ORGANISE'|
    'TEMPLIER_DE_L_EFFORT'|
    'ELU_DES_HABITUDES'|
    'PALADIN_DU_QUOTIDIEN'|
    'ARCHIMAGE_DE_LA_CONSTANCE'

export interface User {
    id : number
    userName : string
    createdAt : string
    mail: string
    xp : number
    level : number
    title : Title 
    quests : Quest[] 
    logs : QuestLog[]
}



