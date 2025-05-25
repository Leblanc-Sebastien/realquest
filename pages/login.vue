<template>
    <LogoTopLayout title="Login">
        <template #content>  
        <NuxtLink to="/register" class="text-[0.8em] pb-[15px] text-blue-800">Je n'ai pas encore de compte ...</NuxtLink>
         <form @submit.prevent="validateFormLogin" class="w-full">
            <input type="text" v-model="userName" placeholder="Nom d'utilisateur" class="w-full p-2 border mb-2 text-gray-800" />
             <div class="relative w-full mb-2">
                <input
                    required
                    minlength="5"
                    :type="showPassword ? 'text' : 'password'"
                    v-model="password"
                    placeholder="Mot de passe"
                    class="w-full p-2 border border-gray-300 rounded text-gray-800"
                    />
                    <button
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
                >
                <Icon :name="showPassword ? 'mdi:eye-off' : 'mdi:eye'" class="w-5 h-5" />
                </button>
            </div>
            <button type="submit" class="bg-green-600 text-white p-2 rounded w-full">Se connecter</button> 
            </form>
            <ShowAlerts v-if="showAlert" :message="showMessageAlert" :state='showStateAlert' />
       </template>
    </LogoTopLayout>
</template>
<script setup lang="ts">
import ShowAlerts from '~/components/common/ShowAlerts.vue';
import LogoTopLayout from '~/components/layout/LogoTopLayout.vue';
import { StateAlert } from '~/types/alert';

    const authToken = useAuthStore()

    const userName = ref<string>('')
    const password = ref<string>('')
    const showPassword = ref<boolean>(false)

    const showAlert = ref<boolean>(false)
    const showMessageAlert = ref<string>('')
    const showStateAlert = ref<StateAlert | undefined>(undefined)

    const showAlertTrigger = (state : StateAlert, message : string) => {
            if(state === StateAlert.success){
                showMessageAlert.value = 'Vous êtes connecté !'
                showStateAlert.value = StateAlert.success
                showAlert.value = true
            }else{
                showMessageAlert.value = message
                showStateAlert.value = StateAlert.fail
                showAlert.value = true
            }    
            setTimeout(() => {
                showAlert.value = false
            }, 2000)
    }

    const validateFormLogin = async () => {
        if (userName.value !== '' && password.value !== '' ) {
            try {
            const res = await $fetch('/api/auth/login', {
                method: 'POST',
                body: {
                userName: userName.value,    
                password: password.value,
                }
            })
            showAlertTrigger(StateAlert.success, showMessageAlert.value)
            authToken.setToken(res.token)
            setTimeout(() => {
                navigateTo('/');
            }, 1000);
            } catch (err : any) {
                showAlertTrigger(StateAlert.fail, err?.data?.statusMessage);
            }
        }
    };
</script>

