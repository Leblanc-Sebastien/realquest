<template>
    <div class="userSummaryContainer  flex flex-col justify-center items-center p-3">
        <img class="h-32" :src="`/avatars/${slugFromTitle(user.title)}.png`" />
        <h1 class="text-[1.2em]">{{ user.title }}</h1>
        <div class="xp bg-gray-300 h-[15px] w-[300px] rounded-xl ">
            <div class="bg-blue-300 w-[150px] h-[15px] rounded-xl"></div>
        </div>
        <span>{{ user.xp }} XP</span>
    </div>
</template>
<script setup lang="ts">
import type { User } from '~/types/User';

const props = defineProps<{
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
