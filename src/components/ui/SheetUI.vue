<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'

/**
 * Props
 */
defineProps<{
  modelValue: boolean
  title: string
}>()

/**
 * Emits
 */
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

/**
 * DOM Control
 */
const sheetDOM = ref<null>(null)
onClickOutside(sheetDOM, () => emit('update:modelValue', false))
</script>

<template>
  <Transition name="fade">
    <div
      v-if="modelValue"
      class="bg-slate-50 bg-opacity-70 fixed inset-0 z-20"
    />
  </Transition>

  <Transition name="slide">
    <aside
      v-if="modelValue"
      ref="sheetDOM"
      class="w-full max-w-mobile fixed right-0 top-0 bottom-0 bg-white z-20 border-l border-slate-100 overflow-scroll"
    >
      <header class="h-16 grid place-items-center sticky top-0 bg-white">
        <button
          class="text-2xl py-4 px-5 rounded-full absolute left-0 top-0 font-semibold"
          @click="emit('update:modelValue', false)"
        >
          <FontAwesomeIcon :icon="faXmark" />
        </button>
        <h3 class="font-bold tracking-wider uppercase">
          {{ title }}
        </h3>
      </header>
      <slot />
    </aside>
  </Transition>
</template>
