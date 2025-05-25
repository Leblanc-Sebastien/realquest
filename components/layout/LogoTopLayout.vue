<template>
    <div class="logoTopLayout-container flex justify-center flex-col items-center w-full p-[5px]">
        <img src="/logos/realquest_logo.png" alt="realQuest logo" class="w-[200px]">
        <h3 class="text-[1.5em] font-bold text-gray-800 mb-[15px]">{{ props.title }}</h3>
        <slot name="content" />
    </div>
</template>
<script setup lang="ts">

const props = defineProps<{
    title : string
}>()
</script>