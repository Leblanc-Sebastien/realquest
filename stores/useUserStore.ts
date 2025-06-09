import { defineStore } from 'pinia';
import type { User } from '~/types/user';

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null);

  const authStore = useAuthStore();

  const config = useRuntimeConfig();

  const fetchUser = async (): Promise<void> => {
    const token = authStore.token;
    if (!token) {
      throw new Error('No token found !');
    }

    try {
      user.value = (await $fetch('/api/me', {
        baseURL: config.public.apiBase,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })) as User;
    } catch (err) {
      console.warn('Erreur fetchUser:', err);
      user.value = null;
      authStore.clearToken();
      throw err;
    }
  };

  const userLevel = computed(() => user.value?.level ?? 0);

  return {
    user,
    userLevel,
    fetchUser,
  };
});
