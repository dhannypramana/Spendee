<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faArrowLeft,
  faBars, faCalendarDays,
  faEnvelope,
  faLayerGroup,
  faPencil,
  faSignOut,
  faUser
} from '@fortawesome/free-solid-svg-icons'
import { ref } from 'vue'
import SheetUI from '@/components/ui/SheetUI.vue'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { useRouter } from 'vue-router'
import moment from 'moment'

const isSheetActive = ref<boolean>(false)
type Nav = {
  name: string,
  to: string,
  icon: IconDefinition
}
const navs: ReadonlyArray<Nav> = [
  { name: 'categories', to: '/categories', icon: faLayerGroup },
  { name: 'profile', to: '/profile', icon: faUser }
]

const router = useRouter()
</script>

<template>
  <!--<Header>-->
  <header class="bg-sky-500 text-white w-full py-5 sticky top-0 flex items-center">
    <div class="basis-1/3">
      <button class="text-xl ml-4 font-semibold" @click="router.back()">
        <FontAwesomeIcon :icon="faArrowLeft" />
      </button>
    </div>
    <div class="basis-1/3">
      <h2 class="text-center font-bold tracking-wider">Your Profile</h2>
    </div>
    <div class="basis-1/3 flex justify-end">
      <button class="text-xl mr-4 font-semibold" @click="isSheetActive = true">
        <FontAwesomeIcon :icon="faBars" />
      </button>
    </div>
  </header>
  <!--</Header>-->

  <!--<Body>-->
  <section class="bg-sky-500 text-white rounded-b-3xl grid place-items-center py-10 tracking-wide">
    <img src="/images/dani.jpg" alt="dani" class="size-24 rounded-full border-2 border-white shadow-lg">
    <h2 class="font-bold mt-2 text-lg">Dhanny Adhi Pramana</h2>
    <p class="text-gray-300">Active since - July, 2019</p>
    <p class="font-bold text-lg">Rp. 2.500.000</p>
  </section>

  <section class="p-7">
    <div class="flex items-center justify-between">
      <h5 class="font-semibold">Personal Information</h5>
      <RouterLink to="#" class="text-sky-600 hover:text-sky-700 transition-colors font-bold">
        <span class="text-xs">
          <FontAwesomeIcon :icon="faPencil" />
        </span>
        <span class="pl-1">Edit</span>
      </RouterLink>
    </div>

    <section class="bg-sky-500 text-white rounded-lg mt-4 border-b">
      <div class="grid grid-cols-2 overflow-hidden items-center py-2 border-b border-gray-400">
        <div class="p-4 rounded flex items-center gap-2">
          <span>
            <FontAwesomeIcon :icon="faUser" />
          </span>
          <h5 class="font-bold">Full Name</h5>
        </div>
        <div class="p-2 rounded">
          <p class="font-semibold text-right">Dhanny Pramana</p>
        </div>
      </div>

      <div class="grid grid-cols-2 overflow-hidden items-center py-2 border-b border-gray-400">
        <div class="p-4 rounded flex items-center gap-2">
          <span>
            <FontAwesomeIcon :icon="faEnvelope" />
          </span>
          <h5 class="font-bold">Email</h5>
        </div>
        <div class="p-2 rounded">
          <p class="font-semibold text-right">dan@gm.com</p>
        </div>
      </div>

      <div class="grid grid-cols-2 overflow-hidden items-center py-2">
        <div class="p-4 rounded flex items-center gap-2">
          <span>
            <FontAwesomeIcon :icon="faCalendarDays" />
          </span>
          <h5 class="font-bold">Birth Date</h5>
        </div>
        <div class="p-2 rounded">
          <p class="font-semibold text-right">{{ moment().format('DD MMMM YYYY') }}</p>
        </div>
      </div>
    </section>

  </section>
  <!--</Body>-->

  <!--<Sidebar>-->
  <SheetUI title="Settings" v-model="isSheetActive">
    <section class="px-5">
      <!-- <Account Nav> -->
      <section class="mb-24">
        <nav>
          <ul>
            <li
              v-for="nav in navs"
              :key="nav.name"
              class="border-b py-6 hover:text-sky-500 font-semibold hover:font-bold transition-colors transition-duration-500 cursor-pointer"
            >
              <RouterLink :to="nav.to" class="flex gap-3">
                <span>
                  <FontAwesomeIcon :icon="nav.icon" />
                </span>
                <p class="capitalize">{{ nav.name }}</p>
              </RouterLink>
            </li>
            <li class="pt-4">
              <button
                class="rounded-lg bg-red-500 hover:bg-red-600 transition-colors text-white font-bold px-5 py-2.5 shadow-xl"
              >
                <span class="pr-2">
                  <FontAwesomeIcon :icon="faSignOut" />
                </span>
                <span>Sign out</span>
              </button>
            </li>
          </ul>
        </nav>
      </section>
      <!-- </ Account Nav> -->

      <!-- <Profile> -->
      <section
        class="flex items-center gap-4 bg-white py-4 fixed bottom-0 w-full max-w-mobile"
      >
        <img
          src="/images/dani.jpg"
          alt="profile"
          class="size-16 rounded-full border border-slate-100 shadow-lg"
        />

        <div>
          <h3 class="font-bold">Dhanny Adhi Pramana</h3>
          <p class="font-semibold">p.dhannypramana@gmail.com</p>
        </div>
      </section>
      <!-- </Profile> -->
    </section>
  </SheetUI>
  <!--</Sidebar>-->
</template>
