<template>
    <p v-if="userStore.user === null" class="text-center text-gray-500 text-lg mt-10">
        Chargement du héros...
    </p>
    <div v-else>
        <UserSummary :user="userStore.user"/>
        <div class="flex flex-col gap-2">
            <QuestsCard :declinaison=1 :quests="questsStore.noneQuests" :checked-quests="checkedQuests"/>
            <QuestsCard :declinaison=2 :quests="questsStore.dailyQuests" :checked-quests="checkedQuests"/>
            <QuestsCard :declinaison=3 :quests="questsStore.weeklyQuests" :checked-quests="checkedQuests"/>
            <QuestsCard :declinaison=4 :quests="questsStore.monthlyQuests" :checked-quests="checkedQuests"/>
        </div>
        <div class="w-full flex flex-col align-center justify-center mt-[10px]">
            <button class="w-full h-[50px] bg-green-600 rounded-xl text-white text-[1.3em]">Valider</button>
        </div>
    </div>
    </template>
<script setup lang="ts">
import QuestsCard from '~/components/quest/questsCard.vue';
import UserSummary from '~/components/user/userSummary.vue';
import { useUserStore } from '~/stores/useUserStore'
import { useQuestsStore } from '~/stores/useQuestsStore';

const userStore = useUserStore()
const authStore = useAuthStore()
const questsStore = useQuestsStore()

const checkedQuests = reactive<Record<number, boolean>>({})

onMounted(async () => {
    try{
        authStore.loadToken()
        await userStore.fetchUser()
        await questsStore.fetchQuests()
        console.log('✅ Authentifié !')
    }
    catch(err){
        console.warn('🚫 Non authentifié, redirection...')
        authStore.clearToken()
        navigateTo('/login')
    }
})

    
</script>
<style scoped></style>