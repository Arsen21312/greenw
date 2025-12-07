<template>
  <div class="min-h-screen bg-gradient-to-b from-[#f6ffe9] via-white to-[#eef6ff] flex items-center justify-center px-6 py-16 text-gray-900">
    <div class="relative w-full max-w-4xl rounded-3xl bg-white/90 shadow-2xl ring-1 ring-white/40 overflow-hidden">
      <div class="absolute inset-0 opacity-60 blur-3xl bg-gradient-to-br from-[#a8cc55]/40 via-[#8ecb48]/30 to-[#4caf4f]/30" />
      <div class="relative grid gap-8 p-10 sm:p-12 lg:grid-cols-2 lg:items-center">
        <div class="space-y-4">
          <p class="inline-flex items-center gap-2 rounded-full bg-[#4caf4f]/10 px-4 py-2 text-sm font-semibold text-[#2e7d32]">
            {{ statusLabel }}
          </p>
          <h1 class="text-3xl sm:text-4xl font-extrabold leading-tight text-gray-900">
            Оops! Страница не найдена
          </h1>
          <p class="text-base sm:text-lg text-gray-700 leading-relaxed">
            Похоже, вы перешли по несуществующей ссылке. Давайте вернёмся к тем, что работают: уличные LED, indoor экраны или реклама в лифтах.
          </p>
          <div class="flex flex-wrap gap-3 pt-2">
            <NuxtLink
              to="/"
              class="btn btn-primary"
              @click.prevent="goHome"
            >
              На главную
            </NuxtLink>
            <NuxtLink to="/led-screens" class="btn btn-outline">Уличные LED</NuxtLink>
            <NuxtLink to="/led-indoor" class="btn btn-outline">Indoor LED</NuxtLink>
            <NuxtLink to="/lift" class="btn btn-outline">Реклама в лифтах</NuxtLink>
          </div>
          <p class="text-sm text-gray-500">
            Код ошибки: {{ error?.statusCode || 404 }}
          </p>
        </div>
        <div class="relative flex justify-center">
          <div class="relative h-56 w-full max-w-sm">
            <div class="absolute inset-0 rounded-full bg-gradient-to-br from-[#4caf4f]/15 via-[#8ecb48]/25 to-[#a8cc55]/10 blur-2xl" />
            <div class="relative flex h-full items-center justify-center">
              <div class="w-48 h-48 rounded-full bg-white shadow-lg ring-4 ring-[#4caf4f]/20 flex items-center justify-center">
                <div class="text-center">
                  <div class="text-5xl font-extrabold text-[#4caf4f]">404</div>
                  <p class="text-sm text-gray-600 mt-1">страница не найдена</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { clearError } from 'nuxt/app'

const props = defineProps<{
  error?: { statusCode?: number; message?: string }
}>()

const statusLabel = computed(() =>
  props.error?.statusCode === 404 ? '404 — Страница не найдена' : 'Что-то пошло не так'
)

const goHome = () => {
  clearError({ redirect: '/' })
}
</script>

<style scoped>
.btn {
  @apply inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200;
}

.btn-primary {
  @apply bg-[#4caf4f] text-white shadow hover:-translate-y-0.5 hover:shadow-lg;
}

.btn-outline {
  @apply border border-[#4caf4f] text-[#2e7d32] hover:bg-white/80 hover:-translate-y-0.5;
}
</style>
