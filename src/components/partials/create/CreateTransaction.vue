<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import moment from 'moment'
import { useTransactionStore } from '@/stores/transaction'

const transactionStore = useTransactionStore()
const { createTransaction } = transactionStore

const validationSchema = toTypedSchema(
  z.object({
    amount: z.preprocess(
      (val) => Number(val),
      z
        .number({ message: 'Amount only accept number' })
        .min(1000, { message: 'Minimum amount is 1000' })
    ),
    category: z.string({ required_error: 'Category is required' }).default('game'),
    type: z.string({ required_error: 'Type is required' }).default('income'),
    title: z.string({ required_error: 'Title is required' }).min(4).max(20),
    date: z.preprocess(
      (val) => {
        if (!val) return undefined

        const date = moment(val, true)

        if (!date.isValid()) return undefined

        return date.toISOString()
      },
      z.string({
        required_error: 'Date is required'
      })
    ),
    note: z.string({ required_error: 'Note is required' }).min(4).max(250)
  })
)

const { defineField, errors, handleSubmit } = useForm({
  validationSchema
})

const [amount, amountAttrs] = defineField('amount')
const [category, categoryAttrs] = defineField('category')
const [type, typeAttrs] = defineField('type')
const [title, titleAttrs] = defineField('title')
const [date, dateAttrs] = defineField('date')
const [note, noteAttrs] = defineField('note')

const onSubmit = handleSubmit((values, ctx) => {
  createTransaction({
    amount: values.amount,
    category: values.category,
    type: values.type as 'income' | 'expense',
    title: values.title,
    date: values.date,
    note: values.note
  })
  ctx.resetForm()
})
</script>

<template>
  <form @submit.prevent="onSubmit">
    <!--<Amount>-->
    <section
      class="border-b-2 border-dashed border-gray-300 pt-4 pb-3 flex justify-between items-center"
    >
      <label for="amount" class="font-semibold">Amount</label>
      <input
        type="text"
        id="amount"
        placeholder="Enter Transaction Amount"
        class="text-right py-4 basis-3/4 focus:outline-0"
        autocomplete="off"
        autocapitalize="off"
        v-model="amount"
        v-bind="amountAttrs"
      />
    </section>
    <p class="text-red-500 font-semibold text-xs mt-2">{{ errors.amount }}</p>
    <!--</Amount>-->

    <!--<Category>-->
    <section
      class="border-b-2 border-dashed border-gray-300 pt-4 pb-3 flex justify-between items-center"
    >
      <label for="category" class="font-semibold">Category</label>
      <select
        id="category"
        class="basis-3/4 text-right focus:outline-0 py-4"
        v-model="category"
        v-bind="categoryAttrs"
      >
        <option value="game">Game</option>
        <option value="entertaint">Entertaint</option>
        <option value="food">Food</option>
      </select>
    </section>
    <p class="text-red-500 font-semibold text-xs mt-2">{{ errors.category }}</p>
    <!--</Category>-->

    <!--<Type>-->
    <section
      class="border-b-2 border-dashed border-gray-300 pt-4 pb-3 flex justify-between items-center"
    >
      <label for="type" class="font-semibold">Type</label>
      <select
        id="type"
        class="basis-3/4 text-right focus:outline-0 py-4"
        v-model="type"
        v-bind="typeAttrs"
      >
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
    </section>
    <p class="text-red-500 font-semibold text-xs mt-2">{{ errors.type }}</p>
    <!--</Type>-->

    <!--<Title>-->
    <section
      class="border-b-2 border-dashed border-gray-300 pt-4 pb-3 flex justify-between items-center"
    >
      <label for="title" class="font-semibold">Title</label>
      <input
        type="text"
        id="title"
        placeholder="Enter Transaction Title"
        class="text-right py-4 basis-3/4 focus:outline-0"
        autocomplete="off"
        autocapitalize="off"
        v-model="title"
        v-bind="titleAttrs"
      />
    </section>
    <p class="text-red-500 font-semibold text-xs mt-2">{{ errors.title }}</p>
    <!--</Title>-->

    <!--<Date>-->
    <section
      class="border-b-2 border-dashed border-gray-300 pt-4 pb-3 flex justify-between items-center"
    >
      <label for="date" class="font-semibold">Date</label>
      <input
        type="date"
        id="date"
        class="text-right py-4 basis-3/4 focus:outline-0"
        v-model="date"
        v-bind="dateAttrs"
      />
    </section>
    <p class="text-red-500 font-semibold text-xs mt-2">{{ errors.date }}</p>
    <!--</Date>-->

    <!--<Transaction Notes>-->
    <textarea
      class="w-full h-20 pt-7 focus:outline-0"
      placeholder="Enter Transaction Note"
      autocomplete="off"
      autocapitalize="off"
      v-model="note"
      v-bind="noteAttrs"
    />
    <p class="text-red-500 font-semibold text-xs mt-2">{{ errors.note }}</p>
    <!--</Transaction Notes>-->

    <!--<Submit>-->
    <section class="flex justify-end">
      <button
        type="submit"
        class="bg-sky-500 hover:bg-sky-600 transition-colors px-4 py-2 text-white shadow-md font-bold rounded-lg"
      >
        Submit
      </button>
    </section>
    <!--</Submit>-->
  </form>
</template>
