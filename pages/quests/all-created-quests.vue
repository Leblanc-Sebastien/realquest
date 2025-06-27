<template>
  <div>
    <div class="w-full max-w-4xl mx-auto p-4">
      <h1 class="text-2xl font-bold text-text mb-6">Vos Quêtes</h1>
      <div v-if="myQuestsStore.myQuests.length > 0" class="space-y-4">
        <details
          v-for="(quests, freq) in groupedQuests"
          :key="freq"
          class="group"
        >
          <summary
            class="cursor-pointer text-lg font-semibold text-text py-2 px-1 transition flex items-center justify-between"
          >
            <span>{{ freq }}</span>
            <span class="flex items-center gap-2">
              <span class="text-sm text-muted">({{ quests.length }})</span>
              <Icon
                name="mdi:chevron-down"
                class="w-5 h-5 transform transition-transform duration-300 group-open:rotate-180"
              />
            </span>
          </summary>

          <ul class="mt-2 flex flex-col gap-2">
            <li v-for="quest in quests" :key="quest.id">
              <QuestCard :quest="quest" @open-modal="openDeleteModal" />
            </li>
          </ul>
        </details>
      </div>
      <p v-else class="text-muted text-center mt-10">
        Aucune quête disponible.
      </p>
      <ShowAlerts
        v-if="showAlert"
        :message="showMessageAlert"
        :state="showStateAlert"
      />
    </div>
    <Modal
      :show="deleteModalVisible"
      title="Suppression de quête"
      confirm-text="Valider"
      @confirm="deleteQuest"
      @cancel="cancelModal"
    >
      <p class="text-text">Êtes-vous sur de vouloir supprimer cette quête ?</p>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Modal from '~/components/common/Modal.vue';
import ShowAlerts from '~/components/common/ShowAlerts.vue';
import { StateAlert } from '~/types/alert';
import QuestCard from '~/components/quest/QuestCard.vue';

const authStore = useAuthStore();
const userStore = useUserStore();
const myQuestsStore = useMyQuestsStore();

const deleteModalVisible = ref<boolean>(false);
const selectedQuestId = ref<number | null>(null);

const showAlert = ref(false);
const showMessageAlert = ref('');
const showStateAlert = ref<StateAlert | undefined>(undefined);

const config = useRuntimeConfig();

const openDeleteModal = (id: number) => {
  selectedQuestId.value = id;
  deleteModalVisible.value = true;
};

const cancelModal = () => {
  deleteModalVisible.value = false;
};

const handleAlert = (state: 'success' | 'fail', message: string) => {
  showStateAlert.value =
    state === 'success' ? StateAlert.success : StateAlert.fail;
  showMessageAlert.value = message;
  showAlert.value = true;

  setTimeout(() => {
    showAlert.value = false;
  }, 3000);
};

onMounted(async () => {
  authStore.loadToken();

  try {
    await userStore.fetchUser();
  } catch (err) {
    console.warn('🚫 Authentification échouée, redirection...', err);
    authStore.clearToken();
    navigateTo('/login');
    return;
  }

  try {
    await myQuestsStore.fetchMyQuests();
  } catch (err) {
    console.error('Erreur lors du chargement des quêtes :', err);
  }
});

const deleteQuest = async () => {
  try {
    await $fetch('/api/quests/delete', {
      baseURL: config.public.apiBase,
      method: 'POST',
      headers: { Authorization: `Bearer ${authStore.token}` },
      body: { id: selectedQuestId.value },
    });
    await handleAlert('success', 'Quête supprimée avec succès !');
    await myQuestsStore.fetchMyQuests();
    deleteModalVisible.value = false;
  } catch (err) {
    handleAlert('fail', 'Echec de suppression !');
    console.error('Erreur lors de la suppression de la quête :', err);
  }
};

const groupedQuests = computed(() => {
  const groups: Record<string, typeof myQuestsStore.myQuests> = {
    DAILY: [],
    WEEKLY: [],
    MONTHLY: [],
    NONE: [],
  };

  myQuestsStore.myQuests.forEach((quest) => {
    groups[quest.frequency]?.push(quest);
  });

  return groups;
});
</script>
