<script setup lang="ts">
import SheetUI from '@/components/ui/SheetUI.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBook, faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import { ref, watch } from 'vue'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import CreateTransaction from '@/components/partials/create/CreateTransaction.vue'
import CreateNote from '@/components/partials/create/CreateNote.vue'

const { toogler } = defineProps<{
  toogler: boolean
}>()
const emit = defineEmits<{
  (e: 'update:toogler', value: boolean): void
}>()

const tooglerLocal = ref<boolean>(toogler)

watch<boolean>(
  () => toogler,
  newValue => {
    tooglerLocal.value = newValue
  },
)

watch<boolean>(tooglerLocal, newValue => emit('update:toogler', newValue))

/**
 * Create Tabs Definition
 */
type CreateTabsMeta = {
  name: 'Transaction' | 'Note'
  icon: IconDefinition
  borderColor: string
  textColor: string
}
const createTabs = {
  Transaction: CreateTransaction,
  Note: CreateNote
}
const createTabsMeta: ReadonlyArray<CreateTabsMeta> = [
  {
    name: 'Transaction',
    icon: faMoneyBill,
    borderColor: 'border-green-300',
    textColor: 'text-green-500'
  },
  {
    name: 'Note',
    icon: faBook,
    borderColor: 'border-yellow-300',
    textColor: 'text-yellow-500'
  }
]
const currentCreateTab = ref<string>('Transaction')

</script>

<template>
  <SheetUI v-model="tooglerLocal" title="Create New">
    <section class="pt-4 px-6 grid grid-cols-2 gap-3">
      <button
        v-for="(tab, idx) in createTabsMeta"
        :key="idx"
        class="inline-flex items-center justify-center gap-2 font-medium transition-colors border h-10 py-2 rounded-3xl px-6 shadow tracking-wide hover:bg-slate-50"
        :class="{ [tab.borderColor]: tab.name === currentCreateTab }"
        @click="currentCreateTab = tab.name"
      >
        <span :class="{ [tab.textColor]: tab.name === currentCreateTab }">
          <FontAwesomeIcon :icon="tab.icon" />
        </span>
        <span>{{ tab.name }}</span>
      </button>
    </section>

    <section class="px-6 py-4">
      <KeepAlive>
        <Component :is="createTabs[currentCreateTab]" />
      </KeepAlive>
    </section>
  </SheetUI>
</template>
