import {defineStore} from 'pinia'
import type { User } from '~/types/User'

export const useUserStore = defineStore('user', () => {

    const user = ref<User | null>(null)

    const fetchUser = async (): Promise<void> => {
        user.value = await $fetch('/api/user') as User
    }

    const userLevel = computed(() => user.value?.level ?? 0)

    return {
        user,
        userLevel,
        fetchUser
    }
})