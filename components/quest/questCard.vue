<template>
  <div
    class="border border-bar/40 rounded-xl p-4 bg-gradient-to-br from-surface via-surface/70 to-surface/40 backdrop-blur-md flex flex-col gap-2 relative overflow-hidden hover:scale-[1.02] hover:border-bar/60 transition duration-300"
  >
    <h1 class="text-lg font-semibold text-text">{{ quest.title }}</h1>

    <div class="flex items-center justify-between text-sm text-muted">
      <span class="text-[0.9em]">{{ quest.frequency }}</span>
      <button @click="emit('openModal', props.quest.id)">
        <Icon
          name="mdi:delete"
          class="w-5 h-5 text-red-500 hover:text-red-700 transition"
        />
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Quest } from '~/types/quest';

const emit = defineEmits(['openModal']);

const props = defineProps<{
  quest: Quest;
}>();
</script>
