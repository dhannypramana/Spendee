<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faBank,
  faBook,
  faHome,
  faUser,
} from '@fortawesome/free-solid-svg-icons'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'

type Nav = {
  name: string
  to: string
  icon: IconDefinition
}
const navs: ReadonlyArray<Nav> = [
  { name: 'home', to: '/', icon: faHome },
  { name: 'notes', to: '/notes', icon: faBook },
  { name: 'transaction', to: '/transaction', icon: faBank },
  { name: 'account', to: '/account', icon: faUser },
]
</script>

<template>
  <nav
    class="bg-white shadow-[0_-1px_7px_rgba(0,0,0,0.1)] max-w-mobile mx-auto fixed bottom-0 left-0 right-0 z-10 py-4 flex rounded"
  >
    <RouterLink
      v-for="nav in navs"
      :key="nav.name"
      :to="nav.to"
      class="basis-1/4 grid place-items-center gap-3"
      exact-active-class="text-sky-500 font-bold"
    >
      <FontAwesomeIcon :icon="nav.icon" />
      <h3 class="capitalize">{{ nav.name }}</h3>
    </RouterLink>
  </nav>
</template>
