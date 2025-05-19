<template>
    <p v-if="userStore.user === null" class="text-center text-gray-500 text-lg mt-10">
        Chargement du héros...
    </p>
    <div v-else>
        <UserSummary :user="userStore.user"/>
        <div class="flex flex-col gap-2">
            <QuestsCard :declinaison=1 :quests="dailyQuest" :checked-quests="checkedQuests"/>
            <QuestsCard :declinaison=2 :quests="weeklyQuest" :checked-quests="checkedQuests"/>
            <QuestsCard :declinaison=3 :quests="monthlyQuest" :checked-quests="checkedQuests"/>
        </div>
        <div class="w-full flex flex-col align-center justify-center mt-[10px]">
            <button class="w-full h-[50px] bg-green-600 rounded-xl text-white text-[1.3em]">Valider</button>
        </div>
    </div>
    </template>
<script setup lang="ts">
import QuestsCard from '~/components/quest/questsCard.vue';
import UserSummary from '~/components/user/userSummary.vue';
import type { Quest } from '~/types/Quest';
import { useUserStore } from '~/stores/useUserStore'

const userStore = useUserStore()

onMounted(() => {
    userStore.fetchUser()
})

const quests = ref<Quest[]>([{
    id: 1,
    title: 'Faire 1h de scream',
    description: 'Gueuler le plus fort possible',
    createdAt: '18/05/2025',
    frequency: 'DAILY',
    repeat: true,
    userId: 1,
    logs: []
},
{
    id: 2,
    title: 'Faire 1h de sport',
    description: 'Avoir des bras énormes et secs',
    createdAt: '18/05/2025',
    frequency: 'DAILY',
    repeat: true,
    userId: 1,
    logs: []
},
{
    id: 3,
    title: 'Faire du yoga',
    description: 'Zen AHUMMMMM',
    createdAt: '18/05/2025',
    frequency: 'WEEKLY',
    repeat: true,
    userId: 1,
    logs: []
},
{
    id: 4,
    title: 'Apprendre le c++',
    description: 'Personne sait mais c\'est stylé',
    createdAt: '18/05/2025',
    frequency: 'WEEKLY',
    repeat: true,
    userId: 1,
    logs: []
},{
    id: 5,
    title: 'Perdre 3 kilos',
    description: 'Bah maigrir quoi',
    createdAt: '18/05/2025',
    frequency: 'MONTHLY',
    repeat: true,
    userId: 1,
    logs: []
},
{
    id: 6,
    title: 'Faire un ménage complet de la maison',
    description: 'Tout nettoyer... tout',
    createdAt: '18/05/2025',
    frequency: 'MONTHLY',
    repeat: true,
    userId: 1,
    logs: []
},])

const dailyQuest = computed(() => quests.value.filter((quest) => quest.frequency === 'DAILY'))
const weeklyQuest = computed(() => quests.value.filter((quest) => quest.frequency === 'WEEKLY'))
const monthlyQuest = computed(() => quests.value.filter((quest) => quest.frequency === 'MONTHLY'))

const checkedQuests = reactive<Record<number, boolean>>({})
    
</script>
<style scoped></style>