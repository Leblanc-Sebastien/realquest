<template>
  <LogoTopLayout :title="register">
    <template #content>
      <NuxtLink to="/login" class="text-[0.8em] pb-[15px] text-blue-800"
        >J'ai déjà un compte ...</NuxtLink
      >
      <form @submit.prevent="validateFormRegister" class="w-full">
        <input
          type="text"
          v-model="userName"
          placeholder="Nom d'utilisateur"
          class="w-full p-2 border mb-2 text-text"
        />
        <input
          v-model="mail"
          type="email"
          placeholder="Email"
          class="w-full p-2 border mb-2 text-text"
        />
        <div class="relative w-full mb-2">
          <input
            required
            minlength="5"
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            placeholder="Mot de passe"
            class="w-full p-2 border border-gray-300 rounded text-text"
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
          >
            <Icon
              :name="showPassword ? 'mdi:eye-off' : 'mdi:eye'"
              class="w-5 h-5"
            />
          </button>
        </div>
        <div class="relative w-full mb-2">
          <input
            required
            :type="showConfirmPassword ? 'text' : 'password'"
            v-model="confirmPassword"
            placeholder="Confirmation"
            class="w-full p-2 border border-gray-300 rounded text-text"
          />
          <button
            type="button"
            @click="showConfirmPassword = !showConfirmPassword"
            class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
          >
            <Icon
              :name="showConfirmPassword ? 'mdi:eye-off' : 'mdi:eye'"
              class="w-5 h-5"
            />
          </button>
        </div>
        <button type="submit" class="bg-success text-white p-2 rounded w-full">
          S'inscrire
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

const register = ref<string>('Enregistrez-vous');

const userName = ref<string>('');
const mail = ref<string>('');
const password = ref<string>('');
const confirmPassword = ref<string>('');
const showPassword = ref<boolean>(false);
const showConfirmPassword = ref<boolean>(false);

const showAlert = ref<boolean>(false);
const showMessageAlert = ref<string>('');
const showStateAlert = ref<StateAlert | undefined>(undefined);

const config = useRuntimeConfig();

const showAlertTrigger = (state: StateAlert, message: string) => {
  if (state === StateAlert.success) {
    showMessageAlert.value = 'Votre compte à été créé !';
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

const validateFormRegister = async () => {
  if (
    password.value !== '' &&
    confirmPassword.value !== '' &&
    password.value === confirmPassword.value
  ) {
    try {
      await $fetch('/api/auth/register', {
        baseURL: config.public.apiBase,
        method: 'POST',
        body: {
          userName: userName.value,
          mail: mail.value,
          password: password.value,
          confirmPassword: confirmPassword.value,
        },
      });
      showAlertTrigger(StateAlert.success, showMessageAlert.value);
      setTimeout(() => {
        navigateTo('/login');
      }, 1000);
    } catch (err: any) {
      showAlertTrigger(StateAlert.fail, err?.data?.statusMessage);
    }
  }
};
</script>
