<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center"
  >
    <div class="bg-white p-4 rounded-lg max-w-md w-full m-[20px]">
      <h2 class="text-lg font-semibold mb-3 text-text">{{ title }}</h2>
      <slot />
      <div class="mt-4 flex justify-end gap-2">
        <button @click="onCancel" class="text-gray-500">Annuler</button>
        <button
          @click="onConfirm"
          class="bg-green-600 text-white px-4 py-1 rounded"
        >
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  show: boolean;
  title: string;
  confirmText?: string;
}>();

const emit = defineEmits(['cancel', 'confirm']);

const onCancel = () => emit('cancel');
const onConfirm = () => {
  emit('confirm');
};
</script>
