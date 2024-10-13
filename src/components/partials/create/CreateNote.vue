<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { useNoteStore } from '@/stores/note'

const noteStore = useNoteStore()
const { createNote } = noteStore

const validationSchema = toTypedSchema(
  z.object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .min(4)
      .max(20),
    content: z
      .string({
        required_error: 'Note is required',
      })
      .min(4)
      .max(250),
  }),
)

const { defineField, handleSubmit, errors } = useForm({
  validationSchema,
})

const [title, titleAttrs] = defineField('title')
const [content, contentAttrs] = defineField('content')

const onSubmit = handleSubmit((values, ctx) => {
  createNote({
    title: values.title,
    content: values.content,
  })
  ctx.resetForm()
})
</script>

<template>
  <form @submit.prevent="onSubmit">
    <!--<Title>-->
    <section
      class="border-b-2 border-dashed border-gray-300 pt-4 pb-3 flex justify-between items-center"
    >
      <label for="title" class="font-semibold">Title</label>
      <input
        type="text"
        id="title"
        placeholder="Enter Title Note"
        class="text-right py-4 basis-3/4 focus:outline-0"
        autocomplete="off"
        autocapitalize="off"
        v-model="title"
        v-bind="titleAttrs"
      />
    </section>
    <p class="text-red-500 font-semibold text-xs mt-2">{{ errors.title }}</p>
    <!--</Title>-->

    <!--<Transaction Notes>-->
    <textarea
      class="w-full h-36 mt-5 focus:outline-0"
      placeholder="What are you thinking today?"
      v-model="content"
      v-bind="contentAttrs"
    />
    <p class="text-red-500 font-semibold text-xs mt-2">{{ errors.content }}</p>
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
