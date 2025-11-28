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
      <div class="lg:w-1/2 flex justify-center mb-8 lg:mb-0">
        <div class="slider-viewport">
          <div class="slider-track">
            <div
              v-for="(image, index) in loopSlides"
              :key="`slide-${index}`"
              class="slider-card"
            >
              <img :src="image" alt="Реклама в лифтах Караганды" class="w-full h-full object-cover" />
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
import slide2 from '@/assets/2.jpeg'
import slide3 from '@/assets/3.jpeg'
import slide54 from '@/assets/54.jpeg'
import slide85 from '@/assets/85.jpg'
import slide89 from '@/assets/89.jpeg'
import slide102 from '@/assets/102.jpg'
import slide110 from '@/assets/110.jpeg'

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

// Изображения для слайдера (замените/добавьте свои JPEG при необходимости)
const slides = ref([
  slide2,
  slide3,
  slide54,
  slide85,
  slide89,
  slide102,
  slide110,
])

// Удваиваем массив, чтобы движение было бесшовным
const loopSlides = computed(() => [...slides.value, ...slides.value])

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
  height: 100%;
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
  flex: 0 0 calc((100% - 24px) / 3);
  min-width: 200px;
  max-width: 280px;
  height: 100%;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
  background: #fff;
}

.slider-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@keyframes slide-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@media (max-width: 1024px) {
  .slider-viewport {
    max-width: 100%;
  }
  .slider-card {
    flex: 0 0 calc((100% - 16px) / 2);
  }
}

@media (max-width: 640px) {
  .slider-card {
    flex: 0 0 75%;
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
