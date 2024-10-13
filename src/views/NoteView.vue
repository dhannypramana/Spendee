<script setup lang="ts">
import { ref } from 'vue'
import FloatingButton from '@/components/partials/FloatingButton.vue'
import CreateSheet from '@/components/partials/create/CreateSheet.vue'
import Navbar from '@/components/partials/Navbar.vue'
import { storeToRefs } from 'pinia'
import moment from 'moment'
import Swal from 'sweetalert2'
import type { ID } from '@/types'
import { useNoteStore } from '@/stores/note'

const isActiveSheet = ref<boolean>(false)

const noteStore = useNoteStore()
const { notes } = storeToRefs(noteStore)
const { deleteNote, editNote } = noteStore

const onEdit = (id: ID) => {
  editNote(id)
}
const onDelete = (id: ID) => {
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteNote(id)
      Swal.fire({
        toast: true,
        timerProgressBar: true,
        timer: 1000,
        text: 'Your file has been deleted.',
        showConfirmButton: false,
        position: 'top-right',
        icon: 'success'
      })
    }
  })
}
</script>

<template>
  <!--<Header>-->
  <header class="bg-white w-full py-5 sticky top-0">
    <h2 class="text-center font-bold tracking-wider">Notes</h2>
  </header>
  <!--</Header>-->

  <!--<Content>-->
  <section class="p-5 bg-slate-50">
    <article class="bg-white rounded-lg mb-4" v-for="note in notes" :key="note.id">
      <div class="p-5">
        <div class="flex justify-between items-center mb-2">
          <h3 class="font-bold">{{ note.title }}</h3>
          <p class="text-xs italic">{{ moment(note.createdAt).format('DD MMM YYYY HH:mm:ss') }}</p>
        </div>
        <p class="text-justify leading-relaxed">{{ note.content }}</p>
      </div>
      <div class="grid grid-cols-2">
        <button
          @click="onEdit(note.id)"
          class="hover:bg-sky-400 py-2 text-blue-500 hover:text-white font-bold rounded-bl-lg transition-colors border-t border-r"
        >
          Edit
        </button>
        <button
          @click="onDelete(note.id)"
          class="hover:bg-red-400 py-2 text-blue-500 hover:text-white font-bold rounded-br-lg transition-colors border-t"
        >
          Delete
        </button>
      </div>
    </article>
  </section>
  <!--</Content>-->

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
