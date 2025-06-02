<template>
  <LogoTopLayout title="Ajouter une quête :">
    <template #content>
      <form @submit.prevent="validateFormQuest" class="w-full">
        <input
          type="text"
          required
          minlength="3"
          v-model="title"
          placeholder="Titre"
          class="w-full p-2 border mb-2 text-text"
        />
        <input
          type="text"
          required
          minlength="3"
          v-model="description"
          placeholder="Description"
          class="w-full p-2 border mb-2 text-text"
        />
        <select
          v-model="selectedFrequency"
          required
          placeholder="Frequence"
          class="w-full p-2 border mb-2 text-text"
        >
          <option disabled :value="null">-- Choisissez une fréquence --</option>
          <option
            v-for="(frequency, key) in frequencies"
            :value="key"
            :key="key"
          >
            {{ frequency }}
          </option>
        </select>
        <button type="submit" class="bg-success text-white p-2 rounded w-full">
          Créer une quête !
        </button>
      </form>
      <ShowAlerts
        v-if="showAlert"
        :message="showMessageAlert"
        :state="showStateAlert"
      />
    </template>
  </LogoTopLayout>
</template>
<script setup lang="ts">
import ShowAlerts from '~/components/common/ShowAlerts.vue';
import LogoTopLayout from '~/components/layout/LogoTopLayout.vue';
import { StateAlert } from '~/types/alert';
import type { Frequency } from '~/types/quest';

const authStore = useAuthStore();
const userStore = useUserStore();

const frequencies = ref<Record<Frequency, string>>({
  NONE: 'Unique',
  DAILY: 'Journalière',
  WEEKLY: 'Hebdomadaire',
  MONTHLY: 'Mensuelle',
});

const title = ref<string>('');
const description = ref<string>('');
const selectedFrequency = ref<Frequency | null>(null);

const showAlert = ref<boolean>(false);
const showMessageAlert = ref<string>('');
const showStateAlert = ref<StateAlert | undefined>(undefined);

const repeatOrNot = computed(() => {
  return selectedFrequency.value === 'NONE' ? false : true;
});

const showAlertTrigger = (state: StateAlert, message: string) => {
  if (state === StateAlert.success) {
    showMessageAlert.value = 'Quête créée !';
    showStateAlert.value = StateAlert.success;
    showAlert.value = true;
  } else {
    showMessageAlert.value = message;
    showStateAlert.value = StateAlert.fail;
    showAlert.value = true;
  }
  setTimeout(() => {
    showAlert.value = false;
  }, 2000);
};

const validateFormQuest = async () => {
  if (
    title.value !== '' &&
    description.value !== '' &&
    selectedFrequency.value !== null
  ) {
    try {
      authStore.loadToken();
      await userStore.fetchUser();

      const res = await $fetch('/api/quests/add', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authStore.token}`,
        },
        body: {
          title: title.value,
          description: description.value,
          frequency: selectedFrequency.value,
          repeat: repeatOrNot.value,
        },
      });
      showAlertTrigger(StateAlert.success, showMessageAlert.value);
      setTimeout(() => {
        navigateTo('/');
      }, 1000);
    } catch (err: any) {
      showAlertTrigger(StateAlert.fail, err?.data?.statusMessage);
    }
  }
};
</script>
