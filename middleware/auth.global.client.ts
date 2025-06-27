import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app';
import { useUserStore } from '~/stores/useUserStore';

export default defineNuxtRouteMiddleware((to) => {
  const userStore = useUserStore();
  if (!userStore.user && to.path !== '/login') {
    return navigateTo('/login');
  }
});
