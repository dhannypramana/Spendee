<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faExclamationCircle,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons'
import { ref } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import moment from 'moment'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const { register } = authStore

const passwordToogler = ref<boolean>(false)
const confirmationPasswordToogler = ref<boolean>(false)

const validationSchema = toTypedSchema(
  z
    .object({
      firstName: z
        .string({
          required_error: 'First name is required',
        })
        .min(3),
      lastName: z
        .string({
          required_error: 'Last name is required',
        })
        .min(3),
      birthDate: z.preprocess(
        val => {
          if (!val) return undefined

          const date = moment(val, true)
          if (!date.isValid()) return undefined

          return date.toISOString()
        },
        z.string({
          required_error: 'Birth Date is required',
        }),
      ),
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
      confirmationPassword: z.string({
        required_error: 'Confirm password is required',
      }),
    })
    .superRefine((arg, ctx) => {
      if (arg.password !== arg.confirmationPassword) {
        ctx.addIssue({
          path: ['confirmationPassword'],
          message: 'Confirmation password does not match',
          code: z.ZodIssueCode.custom,
        })
      }
    }),
)

const { errors, defineField, handleSubmit } = useForm({
  validationSchema,
})

const [firstName, firstNameAttrs] = defineField('firstName')
const [lastName, lastNameAttrs] = defineField('lastName')
const [birthDate, birthDateAttrs] = defineField('birthDate')
const [email, emailAttrs] = defineField('email')
const [password, passwordAttrs] = defineField('password')
const [confirmationPassword, confirmationPasswordAttrs] = defineField(
  'confirmationPassword',
)

const onSubmit = handleSubmit((values, ctx) => {
  register({
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    password: values.password,
    birthDate: values.birthDate,
  })
  ctx.resetForm()
})
</script>

<template>
  <section class="h-dvh flex flex-col justify-center gap-8">
    <section class="text-center">
      <h2 class="font-bold text-xl">Selamat Datang!</h2>
      <p class="font-semibold">
        Bergabunglah dan Jadilah Bagian dari Komunitas Kami
      </p>
    </section>

    <form class="px-7 mt-10" @submit.prevent="onSubmit">
      <section class="flex items-center gap-2">
        <div class="flex flex-col gap-2 mb-4 w-full">
          <label for="first-name" class="font-semibold block">Nama Depan</label>
          <div class="flex items-center relative">
            <input
              type="text"
              name="first-name"
              id="first-name"
              class="rounded w-full bg-slate-100 py-2.5 px-3 border transition-colors focus:bg-white focus:outline-sky-500"
              :class="[
                errors.firstName
                  ? 'focus:outline-red-500 ring-1 ring-red-500'
                  : null,
              ]"
              autocomplete="off"
              placeholder="John"
              v-model="firstName"
              v-bind="firstNameAttrs"
            />
            <div
              class="absolute h-full right-0 w-10 grid place-items-center"
              v-show="errors.firstName"
            >
              <span class="text-red-500">
                <FontAwesomeIcon :icon="faExclamationCircle" />
              </span>
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-2 mb-4 w-full">
          <label for="last-name" class="font-semibold block"
            >Nama Belakang</label
          >
          <div class="flex items-center relative">
            <input
              type="text"
              name="last-name"
              id="last-name"
              class="rounded w-full bg-slate-100 py-2.5 px-3 border transition-colors focus:bg-white focus:outline-sky-500"
              :class="[
                errors.lastName
                  ? 'focus:outline-red-500 ring-1 ring-red-500'
                  : null,
              ]"
              autocomplete="off"
              placeholder="Doe"
              v-model="lastName"
              v-bind="lastNameAttrs"
            />
            <div
              class="absolute h-full right-0 w-10 grid place-items-center"
              v-show="errors.lastName"
            >
              <span class="text-red-500">
                <FontAwesomeIcon :icon="faExclamationCircle" />
              </span>
            </div>
          </div>
        </div>
      </section>

      <div class="mb-4 flex gap-2" v-show="errors.firstName || errors.lastName">
        <p class="text-red-500 font-semibold text-xs w-full">
          {{ errors.firstName }}
        </p>
        <p class="text-red-500 font-semibold text-xs w-full">
          {{ errors.lastName }}
        </p>
      </div>

      <div class="flex flex-col gap-2 mb-4">
        <label for="birth" class="font-semibold block">Tanggal Lahir</label>
        <div class="flex items-center relative">
          <input
            type="date"
            name="birth"
            id="birth"
            class="w-full rounded bg-slate-100 py-2.5 px-3 border transition-colors focus:bg-white focus:outline-sky-500"
            :class="[
              errors.birthDate
                ? 'focus:outline-red-500 ring-1 ring-red-500'
                : null,
            ]"
            v-model="birthDate"
            v-bind="birthDateAttrs"
          />
          <div
            class="absolute h-full right-0 w-10 grid place-items-center"
            v-show="errors.birthDate"
          >
            <span class="text-red-500">
              <FontAwesomeIcon :icon="faExclamationCircle" />
            </span>
          </div>
        </div>
        <p class="text-red-500 font-semibold text-xs">{{ errors.birthDate }}</p>
      </div>

      <div class="flex flex-col gap-2 mb-4">
        <label for="email" class="font-semibold block">Email</label>
        <div class="flex items-center relative">
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
        </div>
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

      <div class="flex flex-col gap-2 mb-4">
        <label for="confirmation-password" class="font-semibold block"
          >Konfirmasi Password</label
        >

        <section class="relative">
          <input
            :type="confirmationPasswordToogler ? 'text' : 'password'"
            name="confirmation-password"
            id="confirmation-password"
            class="w-full rounded bg-slate-100 py-2.5 px-3 border transition-colors focus:bg-white focus:outline-sky-500"
            :class="[
              errors.confirmationPassword
                ? 'focus:outline-red-500 ring-1 ring-red-500'
                : null,
            ]"
            autocomplete="off"
            placeholder="••••••••"
            v-model="confirmationPassword"
            v-bind="confirmationPasswordAttrs"
          />
          <button
            type="button"
            class="absolute right-0 top-0 h-full w-10 grid place-items-center"
            @click="confirmationPasswordToogler = !confirmationPasswordToogler"
          >
            <span
              class="text-slate-500 text-md"
              :class="[errors.confirmationPassword ? '!text-red-500' : null]"
            >
              <FontAwesomeIcon
                :icon="confirmationPasswordToogler ? faEye : faEyeSlash"
              />
            </span>
          </button>
        </section>

        <p class="text-red-500 font-semibold text-xs">
          {{ errors.confirmationPassword }}
        </p>
      </div>

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
        Daftar Sekarang
      </button>
    </form>

    <p class="text-center font-semibold mt-4">
      Sudah punya akun?
      <RouterLink to="/login" class="text-sky-500 hover:text-sky-600 font-bold"
        >Masuk Sekarang</RouterLink
      >
    </p>
  </section>
</template>
