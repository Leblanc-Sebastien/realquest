<template>
    <div class="userSummaryContainer  flex flex-col justify-center items-center p-3">
        <img class="h-32" :src="`/avatars/${slugFromTitle(user.title)}.png`" />
        <h1 class="text-[1.2em]">{{ user.userName }} - {{ user.title }}</h1>
        <div class="relative w-full h-4 bg-gray-300 rounded">
            <div class="absolute top-0 left-0 h-4 bg-bar rounded" :style="{ width: `${xpProgress.percentage}%` }"></div>
        </div>
            <p class="text-sm mt-1 text-gray-600">{{ xpProgress.current }} / {{ xpProgress.needed }} XP</p>
    </div>
</template>
<script setup lang="ts">
import type { User } from '~/types/user';

const userStore = useUserStore()
const xpProgress = computed(() => getXpProgress(userStore.user?.xp || 0))

defineProps<{
    user : User
}>()

const slugFromTitle = (title : String) => {
    return title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_') 
}
</script>
