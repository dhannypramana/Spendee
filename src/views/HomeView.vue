<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue'
import NavBar from '@/components/partials/NavBar.vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faArrowTrendDown,
  faArrowTrendUp,
  faGripLines,
} from '@fortawesome/free-solid-svg-icons'
import { useTransactionStore } from '@/stores/transaction'
import { storeToRefs } from 'pinia'
import TransactionCard from '@/components/partials/TransactionCard.vue'
import FloatingButton from '@/components/partials/FloatingButton.vue'
import CreateSheet from '@/components/partials/create/CreateSheet.vue'

/**
 * Body DOM Scroll Handler
 */
const bodyDOM = useTemplateRef<HTMLElement>('body')
const handleScroll = (): void => {
  if (!bodyDOM.value) throw new Error(`DOM for key bodyDOM is undefined`)
  const rect: DOMRect = bodyDOM.value.getBoundingClientRect()

  bodyDOM.value.style.overflowY = rect.top <= 20 ? 'auto' : 'hidden'
}
onMounted<void>(() => {
  window.addEventListener('scroll', handleScroll)
})
onBeforeUnmount<void>(() => {
  window.removeEventListener('scroll', handleScroll)
})

/**
 * Transaction Data
 */

const transactionStore = useTransactionStore()
const { transactions } = storeToRefs(transactionStore)

/**
 * Sheet UI Control
 */

const isSheetActive = ref<boolean>(false)
</script>

<template>
  <!-- <Header> -->
  <header class="bg-sky-500 text-white px-5 py-5 pb-10 sticky top-0">
    <!-- <User Info> -->
    <section class="flex justify-between items-center">
      <div>
        <h2 class="font-bold text-lg">Hi, Dhanny Adhi Pramana</h2>
        <p>Uang kamu tersisa</p>
        <h2 class="font-bold text-lg">Rp. 2.500.000</h2>
      </div>
      <img
        alt="dani"
        class="w-16 rounded-full border border-white"
        src="/images/dani.jpg"
      />
    </section>
    <!-- </User Info> -->

    <section class="flex text-black gap-4 pt-4">
      <!-- <Income> -->
      <section class="basis-1/2 bg-white rounded-md p-4">
        <div class="flex justify-between items-center">
          <h4 class="font-semibold">Pemasukan</h4>
          <span class="text-green-500">
            <FontAwesomeIcon :icon="faArrowTrendUp" />
          </span>
        </div>
        <h4 class="font-semibold text-green-400 pt-0.5">Rp. 3.500.000</h4>
      </section>
      <!-- </Income> -->

      <!-- <Expense> -->
      <section class="basis-1/2 bg-white rounded-md p-4">
        <div class="flex justify-between items-center">
          <h4 class="font-semibold">Pengeluaran</h4>
          <span class="text-red-400">
            <FontAwesomeIcon :icon="faArrowTrendDown" />
          </span>
        </div>
        <h4 class="font-semibold text-red-400 pt-0.5">Rp. 1.000.000</h4>
      </section>
      <!-- </Expense> -->
    </section>
  </header>
  <!-- </Header> -->

  <!-- <Body> -->
  <section
    ref="body"
    class="-mt-3 rounded-t-xl px-5 bg-slate-50 z-10 sticky top-0 overflow-hidden max-h-[calc(100vh-110px)]"
  >
    <!-- <Top bar Body> -->
    <section class="sticky top-0 bg-slate-50">
      <span class="grid place-items-center pt-2">
        <FontAwesomeIcon :icon="faGripLines" />
      </span>

      <div class="flex justify-between items-center py-3">
        <h3 class="font-semibold text-lg">Transaksi Terakhir</h3>
        <RouterLink
          class="hover:text-sky-500 hover:font-medium transition-colors"
          to="/transaction"
          >Lihat Semua</RouterLink
        >
      </div>
    </section>
    <!-- </Top bar Body> -->

    <!-- <Content> -->
    <TransactionCard
      v-for="transaction in transactions"
      :key="transaction.id"
      :title="transaction.title"
      :amount="transaction.amount"
      :date="transaction.date"
      :id="transaction.id"
      :type="transaction.type"
    />
    <!-- </Content> -->
  </section>
  <!-- </Body> -->

  <!-- <Floating Button> -->
  <FloatingButton v-model="isSheetActive" />
  <!-- </Floating Button> -->

  <!-- <Create Sheet> -->
  <CreateSheet v-model:toogler="isSheetActive" />
  <!-- </Create Sheet> -->

  <!-- Navbar -->
  <NavBar />
  <!-- Navbar -->
</template>
