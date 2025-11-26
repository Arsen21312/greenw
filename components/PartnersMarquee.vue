<template>
  <div class="relative overflow-hidden">
    <!-- Градиенты по краям -->
    <div class="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />
    <div class="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />

    <!-- Вся движущаяся лента -->
    <div class="flex w-max animate-marquee">
      <!-- Первый комплект логотипов -->
      <div class="flex space-x-8">
        <div
          v-for="(logo, idx) in logos"
          :key="'row1-' + idx"
          class="flex h-24 w-48 items-center justify-center"
        >
          <img
            :src="logo"
            alt="Логотип партнёра"
            class="max-h-20 w-auto object-contain"
          />
        </div>
      </div>

      <!-- Второй такой же комплект для бесшовного скролла -->
      <div class="flex space-x-8" aria-hidden="true">
        <div
          v-for="(logo, idx) in logos"
          :key="'row1-' + idx"
          class="flex h-24 w-48 items-center justify-center"
        >
          <img
            :src="logo"
            alt="Логотип партнёра"
            class="h-16 w-auto object-contain"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// забираем все лого, можно сразу и svg и png
const logos = Object.values(
  import.meta.glob('@/assets/partners/*.{svg,png,jpg,jpeg,webp}', {
    eager: true,
    as: 'url'
  })
) as string[]
</script>

<style scoped>
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.animate-marquee {
  animation: marquee 120s linear infinite;
}
</style>
