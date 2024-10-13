<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faExclamationCircle,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons'
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const { user } = storeToRefs(authStore)
const { login } = authStore

const passwordToogler = ref<boolean>(false)

const validationSchema = toTypedSchema(
  z.object({
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email('Must international email format'),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(8),
  }),
)

const { errors, defineField, handleSubmit } = useForm({
  validationSchema,
})

const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')

const onSubmit = handleSubmit((values, ctx) => {
  login({
    email: values.email,
    password: values.password,
  })
  ctx.resetForm()
})
</script>

<template>
  <section class="h-dvh flex flex-col justify-center gap-8">
    <section class="text-center">
      <h2 class="font-bold text-xl">Selamat Datang Kembali</h2>
      <p class="font-semibold">
        Masukkan email dan password untuk mengakses akun
      </p>
    </section>

    <form class="px-7 mt-10" @submit.prevent="onSubmit">
      <div class="flex flex-col gap-2 mb-4">
        <label for="email" class="font-semibold block">Email</label>
        <section class="flex items-center relative">
          <input
            type="text"
            name="email"
            id="email"
            class="w-full rounded bg-slate-100 py-2.5 px-3 border transition-colors focus:bg-white focus:outline-sky-500"
            :class="[
              errors.email ? 'focus:outline-red-500 ring-1 ring-red-500' : null,
            ]"
            autocomplete="off"
            placeholder="name@company.com"
            v-model="email"
            v-bind="emailAttrs"
          />
          <div
            class="absolute h-full right-0 w-10 grid place-items-center"
            v-show="errors.email"
          >
            <span class="text-red-500">
              <FontAwesomeIcon :icon="faExclamationCircle" />
            </span>
          </div>
        </section>
        <p class="text-red-500 font-semibold text-xs">{{ errors.email }}</p>
      </div>

      <div class="flex flex-col gap-2 mb-4">
        <label for="password" class="font-semibold block">Password</label>

        <section class="relative">
          <input
            :type="passwordToogler ? 'text' : 'password'"
            name="password"
            id="password"
            class="w-full rounded bg-slate-100 py-2.5 px-3 border transition-colors focus:bg-white focus:outline-sky-500"
            :class="[
              errors.password
                ? 'focus:outline-red-500 ring-1 ring-red-500'
                : null,
            ]"
            autocomplete="off"
            placeholder="••••••••"
            v-model="password"
            v-bind="passwordAttrs"
          />
          <button
            type="button"
            class="absolute right-0 top-0 h-full w-10 grid place-items-center"
            @click="passwordToogler = !passwordToogler"
          >
            <span
              class="text-slate-500 text-md"
              :class="[errors.password ? '!text-red-500' : null]"
            >
              <FontAwesomeIcon :icon="passwordToogler ? faEye : faEyeSlash" />
            </span>
          </button>
        </section>

        <p class="text-red-500 font-semibold text-xs">{{ errors.password }}</p>
      </div>

      <section class="flex justify-between items-center">
        <div class="flex items-center gap-1">
          <input type="checkbox" name="remember-me" id="remember-me" />
          <label for="remember-me">Remember me</label>
        </div>

        <RouterLink to="#" class="text-sky-500 hover:text-sky-600 font-bold"
          >Lupa password?</RouterLink
        >
      </section>

      <button
        type="submit"
        class="transition-colors rounded py-2 mt-4 shadow-lg w-full font-bold text-white"
        :class="[
          Object.keys(errors).length > 0
            ? 'bg-slate-300'
            : 'bg-sky-500 hover:bg-sky-600',
        ]"
        :disabled="Object.keys(errors).length > 0"
      >
        Masuk Sekarang
      </button>
    </form>

    <p class="text-center font-semibold mt-4">
      Belum punya akun?
      <RouterLink
        to="/register"
        class="text-sky-500 hover:text-sky-600 font-bold"
        >Daftar Sekarang</RouterLink
      >
    </p>

    <pre>{{ user }}</pre>
  </section>
</template>
