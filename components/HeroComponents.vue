<!-- components/HeroSection.vue -->
<template>
  <section class="bg-[#efefef] py-12">
    <div class="container mx-auto flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-0">
      <!-- Текстовая часть -->
      <div class="text-center lg:text-left lg:w-1/2">
        <h1 class="text-2xl lg:text-4xl font-bold text-black leading-tight">
          Эффективная реклама в лифтах Караганды от GREENW
        </h1>
        <p class="text-gray-700 mt-4 text-lg">
          Разместите свою рекламу в 600 лифтах жилых домов и привлеките новых клиентов уже сегодня!
        </p>

        <!-- Кнопки -->
        <div class="flex justify-center lg:justify-start space-x-4 mt-8">
          <button @click="openOrderModal" class="bg-custom-green text-white py-3 px-6 rounded-full hover:bg-green-500 transition">
            Заказать рекламу
          </button>
          <a href="https://www.instagram.com/greenw.kz" target="_blank" rel="noopener" class="bg-custom-green text-white py-3 px-6 rounded-full hover:bg-green-500 transition">
            Смотреть видео
          </a>
        </div>
      </div>
      <!-- Слайдер вместо изображения (3 карточки, движение справа налево) -->
      <div class="w-full min-w-0 lg:w-1/2 flex justify-center mb-8 lg:mb-0">
        <div class="slider-viewport">
          <div class="slider-track">
            <div
              v-for="(image, index) in loopSlides"
              :key="`slide-${index}`"
              class="slider-card"
              :style="{ backgroundImage: `url(${image.preview})` }"
            >
              <img
                :src="image.src"
                :srcset="image.srcset"
                :sizes="imageSizes"
                :width="image.width"
                :height="image.height"
                loading="eager"
                :fetchpriority="index < 3 ? 'high' : 'low'"
                decoding="async"
                alt="Реклама в лифтах Караганды"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Статистика -->
    <div class="mt-12 px-4">
      <div class="container mx-auto">
        <div class="bg-custom-green py-12 rounded-3xl w-full">
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-white">
            <div
              v-for="item in stats"
              :key="item.label"
              class="stat-item flex flex-col items-center"
            >
              <h3 class="text-3xl font-bold">
                <CountUp
                  :to="item.value"
                  :duration="1.2"
                  separator=" "
                  class-name="block"
                />
              </h3>
              <div class="mt-3 h-1 w-24 bg-white rounded-full"></div>
              <p class="mt-2 text-sm sm:text-base">{{ item.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Модальное окно для заказа -->
    <OrderModal v-if="isOrderModalOpen" :block="block" @close-order-modal="closeOrderModal" />
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import OrderModal from '@/components/OrderModal.vue'
import CountUp from '@/components/CountUp.vue'
import { liftSlides } from '@/assets/lift/slides'

const imageSizes = '(min-width: 1025px) 280px, (min-width: 641px) 200px, 180px'

// Begin downloading visible photos from the document head, before hydration.
useHead({
  link: liftSlides.slice(0, 3).map(({ src, srcset }, index) => ({
    key: `lift-hero-${index}`,
    rel: 'preload', as: 'image', href: src, type: 'image/webp', fetchpriority: 'high',
    imagesrcset: srcset, imagesizes: imageSizes,
  })),
})

const isOrderModalOpen = ref(false)

const openOrderModal = () => {
  isOrderModalOpen.value = true
}

const closeOrderModal = () => {
  isOrderModalOpen.value = false
}

const block = {
  name: 'Рекламную кампанию',
}

// Удваиваем массив, чтобы движение было бесшовным
const loopSlides = computed(() => [...liftSlides, ...liftSlides])

const stats = ref([
  { label: 'лифтов', value: 600 },
  { label: 'жилых домов', value: 225 },
  { label: 'ежедневный охват аудитории', value: 55000 },
  { label: 'ежемесячный охват аудитории', value: 1650000 },
])
</script>

<style scoped>
.slider-viewport {
  position: relative;
  width: 100%;
  max-width: 780px;
  height: clamp(16rem, 24vw, 23.375rem);
  min-height: 16rem;
  overflow: hidden;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
}

.slider-track {
  display: flex;
  gap: 12px;
  width: max-content;
  height: 100%;
  animation: slide-left 36s linear infinite;
}

.slider-card {
  flex: 0 0 280px;
  min-width: 200px;
  max-width: 280px;
  height: 100%;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
  background: #fff;
  background-position: center;
  background-size: cover;
}

.slider-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Keep fallback text from covering the inline preview during loading. */
  color: transparent;
  font-size: 0;
}

@keyframes slide-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-50% - 6px));
  }
}

@media (max-width: 1024px) {
  .slider-viewport {
    max-width: 100%;
  }
  .slider-card {
    flex: 0 0 200px;
  }
}

@media (max-width: 640px) {
  .slider-card {
    flex: 0 0 180px;
    min-width: 180px;
  }
}

/* Tailwind CSS используется для стилей, дополнительные стили можно добавить здесь */

.text-custom-green {
  color: #98C850;
}
.bg-custom-green {
  background-color: #98C850;
}
</style>
