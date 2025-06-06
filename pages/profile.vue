<template>
  <div v-if="userStore.user">
    <UserSummary :user="userStore.user" />
    <div class="flex flex-col justify-center items-center">
      <p v-if="userStore.user?.logs && userStore.user.logs.length < 1">
        Tu n'as pas encore achevé de quête !
      </p>
      <p v-else>
        Bravo <span class="text-evidence">{{ userStore.user?.userName }}</span
        >, tu as déjà achevé
        <span class="text-evidence">{{ userStore.user?.logs.length }}</span>
        quête{{ userStore.user?.logs.length > 1 ? 's' : '' }} !
      </p>
    </div>
    <div class="mt-[20px] bg-surface p-5 rounded-lg">
      <h2 class="text-[1.3em] mb-[20px]">Informations personnelles :</h2>
      <ul>
        <li>Pseudo : {{ userStore.user.userName }}</li>
        <li>Mail : {{ userStore.user.mail }}</li>
        <li class="mt-[15px]">
          <span class="text-green-600">
            <button
              @click="formVisible"
              class="flex flex-row justify-center items-start gap-2"
            >
              Éditer ses informations
              <Icon name="mdi:pencil" class="w-5 h-5 text-green-600" />
            </button>
          </span>
        </li>
        <li>
          <span class="text-red-600"
            ><button
              @click="openDeleteModal"
              class="flex flex-row justify-center items-start gap-2"
            >
              Supprimer son compte
              <Icon name="mdi:delete" class="w-5 h-5 text-red-600" /></button
          ></span>
        </li>
      </ul>
      <form
        v-if="editFormVisible"
        @submit.prevent="editUser"
        class="w-full mt-[20px]"
      >
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
        <button type="submit" class="bg-success text-white p-2 rounded w-full">
          Editer
        </button>
      </form>
      <ShowAlerts
        v-if="showAlert"
        :message="showMessageAlert"
        :state="showStateAlert"
      />
    </div>
  </div>
  <Modal
    :show="deleteModalVisible"
    title="Suppression du compte"
    confirm-text="Valider"
    @confirm="deleteAccount"
    @cancel="cancelModal"
  >
    <p class="text-text">
      Êtes-vous sur de vouloir supprimer votre compte ? Cette action est
      irréversible.
    </p>
  </Modal>
</template>
<script setup lang="ts">
import Modal from '@/components/common/Modal.vue';
import ShowAlerts from '@/components/common/ShowAlerts.vue';
import { StateAlert } from '@/types/alert';

const authStore = useAuthStore();
const userStore = useUserStore();

const userName = ref<string | undefined>(undefined);
const mail = ref<string | undefined>(undefined);

const deleteModalVisible = ref<boolean>(false);
const editFormVisible = ref<boolean>(false);

const showAlert = ref<boolean>(false);
const showMessageAlert = ref<string>('');
const showStateAlert = ref<StateAlert | undefined>(undefined);

onMounted(async () => {
  try {
    authStore.loadToken();
    await userStore.fetchUser();
  } catch (err) {
    console.warn('🚫 Non authentifié, redirection...');
    authStore.clearToken();
    navigateTo('/login');
  }
});

const openDeleteModal = () => {
  deleteModalVisible.value = true;
};

const cancelModal = () => {
  deleteModalVisible.value = false;
};

const deleteAccount = async () => {
  try {
    await $fetch('api/user/delete', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
    });
    authStore.clearToken();
    userStore.user = null;
    navigateTo('/login');
  } catch (err) {
    console.error('Erreur suppression :', err);
  }
};

const formVisible = () => {
  userName.value = userStore.user?.userName;
  mail.value = userStore.user?.mail;
  editFormVisible.value = !editFormVisible.value;
};

const editUser = async () => {
  try {
    const res = await $fetch('/api/user/edit', {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${authStore.token}`,
      },
      body: {
        userName: userName.value,
        mail: mail.value,
      },
    });
    await userStore.fetchUser();
    editFormVisible.value = false;
    showStateAlert.value = StateAlert.success;
    showMessageAlert.value = 'Informations éditées avec succès !';
    showAlert.value = false;
    await nextTick();
    showAlert.value = true;
  } catch (err: any) {
    showAlert.value = true;
    showStateAlert.value = StateAlert.fail;
    showMessageAlert.value = err?.data?.statusMessage;
    showAlert.value = false;
    await nextTick();
    showAlert.value = true;
  }
};
</script>
