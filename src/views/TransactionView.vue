<script setup lang="ts">
import { ref } from 'vue'
import CreateSheet from '@/components/partials/create/CreateSheet.vue'
import FloatingButton from '@/components/partials/FloatingButton.vue'
import Transaction from '@/components/partials/TransactionCard.vue'
import Navbar from '@/components/partials/Navbar.vue'
import { storeToRefs } from 'pinia'
import { useTransactionStore } from '@/stores/transaction'

const isActiveSheet = ref<boolean>(false)

const transactionStore = useTransactionStore()
const { transactions } = storeToRefs(transactionStore)
</script>

<template>
  <header class="bg-white w-full py-5 sticky top-0">
    <h2 class="text-center font-bold tracking-wider">Transaction</h2>
  </header>

  <!--<Transaction>-->
  <div class="p-5">
    <Transaction
      v-for="transaction in transactions"
      :key="transaction.id"
      :title="transaction.title"
      :amount="transaction.amount"
      :date="transaction.date"
      :id="transaction.id"
      :type="transaction.type"
    />
  </div>
  <!--</Transaction>-->

  <!--<Floating Button>-->
  <FloatingButton v-model="isActiveSheet" />
  <!--</Floating Button>-->

  <!--<Create Sheet>-->
  <CreateSheet v-model:toogler="isActiveSheet" />
  <!--</Create Sheet>-->

  <!-- Navbar -->
  <Navbar />
  <!-- Navbar -->
</template>
