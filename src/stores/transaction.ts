import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import type { ID } from '@/types'
import { v4 as uuid } from 'uuid'
import moment from 'moment'

type Transaction = {
  id: ID
  amount: number
  category: string
  type: 'income' | 'expense'
  title: string
  date: string
  note: string
}
interface TransactionStoreState {
  transactions: Ref<Array<Transaction>>
}
interface TransactionStoreAction {
  createTransaction: (newTransaction: Omit<Transaction, 'id'>) => void
}
type TransactionStore = TransactionStoreState & TransactionStoreAction

export const useTransactionStore = defineStore<'transaction', TransactionStore>(
  'transaction',
  (): TransactionStore => {
    const transactions = ref<Array<Transaction>>([
      {
        id: uuid(),
        amount: 10000,
        category: 'Features',
        type: 'income',
        title: 'Hello, World!',
        date: moment().toISOString(),
        note: 'Hello, World!',
      },
    ])

    const createTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
      transactions.value.push({ ...newTransaction, id: uuid() })
    }

    return {
      transactions,
      createTransaction,
    }
  },
)
