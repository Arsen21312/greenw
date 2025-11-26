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
      <!-- Изображение -->
      <div class="lg:w-1/2 flex justify-center mb-8 lg:mb-0">
        <img :src="imageSrc" alt="Реклама в лифтах Караганды" class="w-full h-auto lg:max-w-md" />
      </div>
    </div>

    <!-- Статистика -->
    <div ref="statsSection" class="bg-custom-green py-12 mt-12">
      <div class="container mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-white">
        <div v-for="item in stats" :key="item.label" class="stat-item">
          <h3 class="text-3xl font-bold border-b-4 border-white w-[150px] mx-auto pb-2">
            {{ Math.round(formattedStats[item.label]) }}
          </h3>
          <p class="mt-2">{{ item.label }}</p>
        </div>
      </div>
    </div>

    <!-- Модальное окно для заказа -->
    <OrderModal v-if="isOrderModalOpen" :block="block" @close-order-modal="closeOrderModal" />
  </section>
</template>

<script setup>
import { ref } from 'vue';
import imageSrc from '@/assets/s.webp'; // Импорт изображения
import OrderModal from '@/components/OrderModal.vue'; // Импортируем OrderModal напрямую

const isOrderModalOpen = ref(false);

const openOrderModal = () => {
  isOrderModalOpen.value = true;
};

const closeOrderModal = () => {
  isOrderModalOpen.value = false;
};

// Объект block для передачи в OrderModal
const block = {
  name: 'Рекламную кампанию',
};

// Статистика
const stats = ref([
  { label: 'лифтов', value: 600  },
  { label: 'жилых домов', value: 225   },
  { label: 'ежедневный охват аудитории', value: 55000 },
  { label: 'ежемесячный охват аудитории', value: 1650000 },
]);

// Форматирование статистики (анимация чисел)
const formattedStats = ref({});
const animateNumbers = () => {
  stats.value.forEach((item) => {
    formattedStats.value[item.label] = 0;
    const target = item.value;
    const increment = target / 200;
    const updateCount = () => {
      formattedStats.value[item.label] += increment;
      if (formattedStats.value[item.label] < target) {
        requestAnimationFrame(updateCount);
      } else {
        formattedStats.value[item.label] = target;
      }
    };
    updateCount();
  });
};

// Использование Intersection Observer для запуска анимации при видимости
const statsSection = ref(null);
import { useIntersectionObserver } from '@vueuse/core';

useIntersectionObserver(
  statsSection,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      animateNumbers();
    }
  },
  {
    threshold: 0.5,
  }
);
</script>

<style scoped>
/* Tailwind CSS используется для стилей, дополнительные стили можно добавить здесь */

.text-custom-green {
  color: #98C850;
}
.bg-custom-green {
  background-color: #98C850;
}
</style>
