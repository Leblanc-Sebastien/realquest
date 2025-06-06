export type Frequency = 'NONE' | 'DAILY' | 'WEEKLY' | 'MONTHLY'


export interface Quest{
    id: number
    title: string
    description: string
    createdAt : string
    scheduledAt? : string
    frequency : Frequency
    repeat : boolean
    userId : number
    logs : QuestLog[]
}

export interface QuestLog{
    id: number
    questId : number
    userId : number
    completedAt : string
}