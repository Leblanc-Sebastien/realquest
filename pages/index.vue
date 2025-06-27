<template>
  <div>
    <p
      v-if="userStore.user === null"
      class="text-center text-gray-500 text-lg mt-10"
    >
      Chargement du héros...
    </p>
    <div v-else>
      <UserSummary :user="userStore.user" />
      <div class="flex flex-col gap-2">
        <QuestsCard
          :declinaison="1"
          :quests="questsStore.noneQuests"
          :checked-quests="checkedQuests"
        />
        <QuestsCard
          :declinaison="2"
          :quests="questsStore.dailyQuests"
          :checked-quests="checkedQuests"
        />
        <QuestsCard
          :declinaison="3"
          :quests="questsStore.weeklyQuests"
          :checked-quests="checkedQuests"
        />
        <QuestsCard
          :declinaison="4"
          :quests="questsStore.monthlyQuests"
          :checked-quests="checkedQuests"
        />
      </div>
      <div class="w-full flex flex-col align-center justify-center mt-[10px]">
        <button
          class="w-full h-[50px] bg-success rounded-xl text-white text-[1.3em]"
          @click="validateQuests"
        >
          Valider
        </button>
      </div>
    </div>
    <button
      class="fixed bottom-6 right-6 bg-evidence text-white rounded-full w-14 h-14 flex items-center justify-center text-3xl shadow-lg"
      @click="navigateTo('/quests/add')"
    >
      +
    </button>
  </div>
</template>
<script setup lang="ts">
import { useUserStore } from '~/stores/useUserStore';
import { useQuestsStore } from '~/stores/useQuestsStore';
import UserSummary from '~/components/user/UserSummary.vue';
import QuestsCard from '~/components/quest/QuestsCard.vue';

const config = useRuntimeConfig();

const authStore = useAuthStore();
const userStore = useUserStore();
const questsStore = useQuestsStore();

const checkedQuests = reactive<Record<number, boolean>>({});

onMounted(async () => {
  try {
    authStore.loadToken();
    await userStore.fetchUser();
    await questsStore.fetchQuests();
    console.log('✅ Authentifié !');
  } catch (err) {
    console.warn('🚫 Non authentifié, redirection...', err);
    authStore.clearToken();
    navigateTo('/login');
  }
});

const validateQuests = async () => {
  const questIds = Object.entries(checkedQuests)
    .filter(([_, isChecked]) => isChecked)
    .map(([id, _]) => Number(id));

  if (questIds.length === 0) {
    console.warn('Aucune quête sélectionnée.');
    return;
  }

  try {
    for (const questId of questIds) {
      await $fetch('/api/quests/validate', {
        baseURL: config.public.apiBase,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
        body: {
          questId,
        },
      });
    }

    authStore.loadToken();

    await questsStore.fetchQuests();

    await userStore.fetchUser();

    // Reset les quêtes cochées
    Object.keys(checkedQuests).forEach((key) => {
      checkedQuests[Number(key)] = false;
    });
  } catch (err) {
    console.error('Erreur lors de la validation des quêtes', err);
  }
};
</script>
