import { defineStore } from 'pinia';
import type { Quest } from '@/types/quest';

export const useQuestsStore = defineStore('quests', () => {
  const authStore = useAuthStore();
  const quests = ref<Quest[]>([]);

  const fetchQuests = async () => {
    const token = authStore.token;
    if (!token) {
      console.warn('🚫 Pas de token dispo pour fetchQuests');
      throw new Error('No token found huhu');
    }

    try {
      quests.value = await $fetch('/api/quests/actuals-quests', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (e) {
      console.warn('API failed, loading mock quests');
    }
  };

  const noneQuests = computed(() =>
    quests.value.filter((quest) => quest.frequency === 'NONE')
  );

  const dailyQuests = computed(() =>
    quests.value.filter((quest) => quest.frequency === 'DAILY')
  );

  const weeklyQuests = computed(() =>
    quests.value.filter((quest) => quest.frequency === 'WEEKLY')
  );

  const monthlyQuests = computed(() =>
    quests.value.filter((quest) => quest.frequency === 'MONTHLY')
  );

  return {
    quests,
    noneQuests,
    dailyQuests,
    weeklyQuests,
    monthlyQuests,
    fetchQuests,
  };
});
