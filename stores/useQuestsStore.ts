import { defineStore } from "pinia";
import type { Quest } from "~/types/quest";


export const useQuestsStore = defineStore('quests', () => {

    const quests = ref<Quest[]>([])

    const fetchQuests = async () => {
        try{
           quests.value = await $fetch('/api/quests') 
        }catch(e){
            console.warn('API failed, loading mock quests')
        }  
    }

     const noneQuests = computed(() =>
        quests.value.filter(quest => quest.frequency === 'NONE')
    )

    const dailyQuests = computed(() =>
        quests.value.filter(quest => quest.frequency === 'DAILY')
    )

    const weeklyQuests = computed(() =>
        quests.value.filter(quest => quest.frequency === 'WEEKLY')
    )

     const monthlyQuests = computed(() =>
        quests.value.filter(quest => quest.frequency === 'MONTHLY')
    )

    return {
        quests,
        noneQuests,
        dailyQuests,
        weeklyQuests,
        monthlyQuests,
        fetchQuests
    }
})