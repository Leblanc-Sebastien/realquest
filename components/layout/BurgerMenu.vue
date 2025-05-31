<template>
  <div>
    <button
      @click="open = true"
      class="p-2 focus:outline-none flex justify-center items-center"
    >
      <Icon name="mdi:menu" size="28" class="text-text" />
    </button>

    <transition name="fade">
      <div v-if="open" @click="close" class="fixed inset-0 bg-black/40 z-40" />
    </transition>

    <transition name="slide">
      <div
        v-if="open"
        class="fixed top-0 left-0 h-full w-64 bg-background z-50 shadow-lg p-6"
      >
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-bold text-text">RealQuest</h2>
          <button @click="close">
            <Icon name="mdi:close" size="24" class="text-gray-600" />
          </button>
        </div>

        <ul class="space-y-4">
          <li>
            <NuxtLink
              to="/"
              class="text-gray-700 hover:text-purple-700"
              @click="close"
              >Accueil</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/profile"
              class="text-gray-700 hover:text-purple-700"
              @click="close"
              >Profil</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              to="/quests/quests"
              class="text-gray-700 hover:text-purple-700"
              @click="close"
              >Mes quêtes</NuxtLink
            >
          </li>
          <li>
            <NuxtLink class="text-danger" @click="clearToken"
              >Se deconnecter</NuxtLink
            >
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup>
const authStore = useAuthStore();
const userStore = useUserStore();

const open = ref(false);

const close = () => {
  open.value = false;
};

const clearToken = () => {
  authStore.clearToken();
  userStore.user = null;
  navigateTo('/login');
  close();
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from {
  transform: translateX(-100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
