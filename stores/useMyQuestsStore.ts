import { defineStore } from 'pinia';
import type { Quest } from '~/types/quest';

export const useMyQuestsStore = defineStore('myQuests', () => {
  const authStore = useAuthStore();
  const myQuests = ref<Quest[]>([]);

  const config = useRuntimeConfig();

  const fetchMyQuests = async () => {
    const token = authStore.token;
    if (!token) {
      console.warn('🚫 Pas de token dispo pour fetchMyQuests');
      throw new Error('No token found huhu');
    }

    try {
      const res = await $fetch('/api/quests/all-quests', {
        baseURL: config.public.apiBase,
        headers: { Authorization: `Bearer ${token}` },
      });
      myQuests.value = res.myQuests;
    } catch (err) {
      console.warn('API failed, loading mock quests', err);
    }
  };

  return {
    myQuests,
    fetchMyQuests,
  };
});
