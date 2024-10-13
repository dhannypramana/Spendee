import { defineStore } from 'pinia'
import type { ID } from '@/types'
import { ref, type Ref } from 'vue'
import { v4 as uuid } from 'uuid'
import moment from 'moment'

type Note = {
  id: ID
  title: string
  content: string
  createdAt: string
}
interface NoteStoreState {
  notes: Ref<Array<Note>>
}
interface NoteStoreAction {
  createNote: (newNote: Omit<Note, 'id' | 'createdAt'>) => void
  editNote: (id: ID) => void
  deleteNote: (id: ID) => void
}
type NoteStore = NoteStoreState & NoteStoreAction

export const useNoteStore = defineStore<'note', NoteStore>(
  'note',
  (): NoteStore => {

    const notes = ref<Array<Note>>([
      {
        id: uuid(),
        title: 'Need to add feature',
        content: '1. rich text, 2. search, 3. feeling category 4. read more/less',
        createdAt: moment().toISOString(),
      },
    ])

    const createNote = (newNote: Omit<Note, 'id' | 'createdAt'>) => {
      notes.value.push({ ...newNote, id: uuid(), createdAt: moment().toISOString() })
    }
    const editNote = (id: ID) => {
      console.log(id)
    }
    const deleteNote = (id: ID) => {
      const remainder = notes.value.find(note => note.id === id)
      notes.value = notes.value.filter(note => note.id !== remainder?.id)
    }

    return {
      notes,
      createNote,
      deleteNote,
      editNote
    }
  }
)
