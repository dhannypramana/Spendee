import { defineStore } from 'pinia'
import type { ID } from '@/types'
import { ref, type Ref } from 'vue'

export type User = {
  id: ID
  firstName: string
  lastName: string
  email: string
  password: string
  birthDate: string
}
export interface AuthStoreState {
  user: Ref<User | undefined>
}
export interface AuthStoreActions {
  login: (user: Omit<User, 'id' | 'firstName' | 'lastName' | 'birthDate'>) => void
  register: (user: Omit<User, 'id'>) => void
}
type AuthStore = AuthStoreState & AuthStoreActions

export const useAuthStore = defineStore<'auth', AuthStore>('auth', (): AuthStore => {
  const user = ref<User | undefined>(undefined)

  const login = (user: Omit<User, 'id' | 'firstName' | 'lastName' | 'birthDate'>) => {
    console.log(user)
  }

  const register = (user: Omit<User, 'id'>) => {
    login(user)
  }

  return {
    user,
    login,
    register
  }
})
