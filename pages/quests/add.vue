<template>
  <LogoTopLayout title="Ajouter une quête :">
    <template #content>
      <form class="w-full" @submit.prevent="validateFormQuest">
        <input
          v-model="title"
          type="text"
          placeholder="Titre"
          class="w-full p-2 border mb-2 text-text"
        />
        <input
          v-model="description"
          type="text"
          placeholder="Description"
          class="w-full p-2 border mb-2 text-text"
        />
        <select
          v-model="selectedFrequency"
          placeholder="Frequence"
          class="w-full p-2 border mb-2 text-text"
        >
          <option disabled :value="null">-- Choisissez une fréquence --</option>
          <option
            v-for="(frequency, key) in frequencies"
            :key="key"
            :value="key"
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

const config = useRuntimeConfig();

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
};

const validateFormQuest = async () => {
  if (
    title.value !== '' &&
    title.value.length >= 3 &&
    description.value !== '' &&
    description.value.length >= 3 &&
    selectedFrequency.value !== null
  ) {
    try {
      authStore.loadToken();

      await $fetch('/api/quests/add', {
        baseURL: config.public.apiBase,
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
  } else {
    if (title.value == '') {
      showAlertTrigger(StateAlert.fail, 'Votre titre est manquant !');
    } else if (title.value.length < 3) {
      showAlertTrigger(StateAlert.fail, 'Votre titre est trop court !');
    } else if (description.value == '') {
      showAlertTrigger(StateAlert.fail, 'Description manquante !');
    } else if (description.value.length < 3) {
      showAlertTrigger(StateAlert.fail, 'Description trop courte !');
    } else if (selectedFrequency.value == null) {
      showAlertTrigger(StateAlert.fail, 'Choisissez une frequence !');
    }
  }
};
</script>
