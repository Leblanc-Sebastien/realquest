import { defineStore } from 'pinia';
import type { Quest } from '@/types/quest';

export const useMyQuestsStore = defineStore('myQuests', () => {
  const authStore = useAuthStore();
  const myQuests = ref<Quest[]>([]);

  const fetchMyQuests = async () => {
    const token = authStore.token;
    if (!token) {
      console.warn('🚫 Pas de token dispo pour fetchMyQuests');
      throw new Error('No token found huhu');
    }

    try {
      const res = await $fetch('/api/quests/all-quests', {
        headers: { Authorization: `Bearer ${token}` },
      });
      myQuests.value = res.myQuests;
    } catch (e) {
      console.warn('API failed, loading mock quests');
    }
  };

  return {
    myQuests,
    fetchMyQuests,
  };
});
