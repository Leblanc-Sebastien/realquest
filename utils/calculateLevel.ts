import { levelConfig } from './levelConfig'

export const calculateLevel = (xp: number) => {

    let currentLevel = levelConfig[0]

    for(const level of levelConfig){
        if(xp >= level.minXp){
            currentLevel = level
        }else{
            break
        }
    }

    return {
        level: currentLevel.level,
        title: currentLevel.title
    } 
}