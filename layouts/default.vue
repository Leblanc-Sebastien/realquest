<template>
  <div class="min-h-screen  overflow-x-hidden">
    <header class="relative flex justify-center items-center px-4 py-3">
        <h1 class="text-[1.7em] font-bold text-text">RealQuest</h1>
        <div class="absolute right-4 flex justify-center items-center">
            <BurgerMenu v-if="isConnected"/>
        </div>
    </header>
    <main class="p-6">
      <slot />
    </main>
  </div>
</template>
<script setup lang="ts">
    import BurgerMenu from '~/components/layout/BurgerMenu.vue';
  
    const userStore = useUserStore()

    const isConnected = computed<boolean>(() => {
       return !!userStore.user
    })

    watch(isConnected, () => {
      console.log(isConnected.value)
    })

</script>

