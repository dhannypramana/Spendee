<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

/**
 * Props
 */
defineProps<{
  modelValue: boolean
}>()

/**
 * Emits
 */
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()
</script>

<template>
  <section
    class="w-full max-w-mobile h-12 fixed bottom-[7rem] flex justify-end pr-5 z-10"
  >
    <button
      @click="emit('update:modelValue', true)"
      class="text-white bg-gradient-to-tr from-sky-400 via-sky-500 to-sky-600 transition-colors size-14 text-xl rounded-full border-2 border-gray-200 shadow-2xl grid place-items-center"
    >
      <FontAwesomeIcon :icon="faPlus" />
    </button>
  </section>
</template>
