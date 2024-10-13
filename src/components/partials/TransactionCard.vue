<script setup lang="ts">
import { faClapperboard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import moment from 'moment'

defineProps<{
  title: string
  date: string
  type: 'income' | 'expense'
  amount: number
}>()
</script>

<template>
  <section
    class="flex justify-between items-center border-b-2 border-dashed border-gray-300 py-4"
  >
    <div class="flex items-center gap-4">
      <span
        class="bg-sky-500 text-lg p-3.5 text-white rounded-lg w-fit grid place-items-center"
      >
        <FontAwesomeIcon :icon="faClapperboard" />
      </span>
      <div>
        <h4 class="font-semibold pb-0.5">{{ title }}</h4>
        <p>{{ moment(date).format('dddd, DD MMMM YYYY') }}</p>
      </div>
    </div>
    <p
      :class="[type === 'income' ? 'text-green-500' : 'text-red-500']"
      class="font-semibold"
    >
      <span v-if="type === 'income'">+</span>
      <span v-else>-</span>
      <span>Rp. {{ amount.toLocaleString() }}</span>
    </p>
  </section>
</template>
