<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen bg-surface text-text text-center px-4"
  >
    <img
      src="/logos/realquest_logo.png"
      alt="RealQuest Logo"
      class="w-32 h-32 mb-6"
    />
    <h1 class="text-4xl font-bold mb-4">Oups...</h1>
    <p class="text-lg mb-6">Vous vous êtes trompé de quête !</p>
    <NuxtLink
      @click="handleError"
      class="bg-success text-white px-6 py-2 rounded hover:bg-success/90 transition"
    >
      Revenir à l'accueil
    </NuxtLink>
  </div>
</template>
<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps({
  error: Object as () => NuxtError,
});

const handleError = () => clearError({ redirect: '/' });
</script>
