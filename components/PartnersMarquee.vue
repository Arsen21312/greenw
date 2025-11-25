<template>
  <div class="relative overflow-hidden">
    <div class="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />
    <div class="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />

    <div class="flex animate-marquee space-x-8 whitespace-nowrap">
      <div
        v-for="(logo, idx) in duplicatedLogos"
        :key="idx"
        class="flex h-24 w-36 flex-shrink-0 items-center justify-center"
      >
        <img :src="logo" alt="Логотип партнёра" class="max-h-full max-w-full object-contain" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Vite соберёт все SVG и отдаст URL
const logos = Object.values(
  import.meta.glob('@/assets/partners/*.svg', { eager: true, as: 'url' })
) as string[]

// Дублируем, чтобы анимация была бесшовной
const duplicatedLogos = [...logos, ...logos]
</script>

<style scoped>
@keyframes marquee {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.animate-marquee {
  animation: marquee 30s linear infinite;
}
</style>
