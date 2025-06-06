<template>
  <div class="card-quests-container bg-gray-100 rounded-xl p-3">
    <h3 class="text-[1.2em] mb-[10px]">{{ title }}</h3>
    <ul>
      <li v-for="quest in quests" :key="quest.id">
        <label class="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            :checked="checkedQuests[quest.id] || false"
            @change="toggleQuest(quest.id)"
            class="peer hidden"
          />
          <div
            class="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-transparent peer-checked:bg-success flex items-center justify-center transition"
          >
            <!-- Check visible seulement si coché -->
            <svg
              v-if="checkedQuests[quest.id]"
              class="w-3 h-3 text-white"
              fill="none"
              stroke="currentColor"
              stroke-width="3"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <span class="ml-2 text-sm">{{ quest.title }}</span>
        </label>
      </li>
    </ul>
  </div>
</template>
<script setup lang="ts">
import type { Quest } from '~/types/quest';

const toggleQuest = (idQuest: number) => {
  props.checkedQuests[idQuest] = !props.checkedQuests[idQuest];
};

const props = defineProps<{
  declinaison: number;
  quests: Quest[];
  checkedQuests: Record<number, boolean>;
}>();

const title = computed(() => {
  if (props.declinaison === 1) {
    return 'Quêtes uniques';
  } else if (props.declinaison === 2) {
    return 'Quêtes quotidiennes';
  } else if (props.declinaison === 3) {
    return 'Quêtes hebdomadaires';
  } else if (props.declinaison === 4) {
    return 'Quêtes mensuelles';
  }
});
</script>
