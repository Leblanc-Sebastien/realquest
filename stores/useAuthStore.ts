import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null);

  const setToken = (newToken: string) => {
    token.value = newToken;
    localStorage.setItem('authToken', newToken);
  };

  const loadToken = () => {
    const savedToken = localStorage.getItem('authToken');
    if (savedToken) {
      token.value = savedToken;
    }
  };

  const clearToken = () => {
    token.value = null;
    localStorage.removeItem('authToken');
  };

  return {
    token,
    setToken,
    loadToken,
    clearToken,
  };
});
