<!-- components/BlockCard.vue -->
<template>
    <div
      class="bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition-transform duration-300"
    >
      <img :src="block.image" loading="lazy" :alt="`Изображение ${block.name}`" class="w-full h-56 object-cover" />
      <div class="p-6">
        <h3 class="text-2xl font-semibold text-center text-gray-800 mb-4">{{ block.name }}</h3>
        <p v-if="block.summary" class="text-gray-700 text-center mb-2">{{ block.summary }}</p>
        <p v-if="block.details" class="text-gray-600 text-sm text-center mb-4">{{ block.details }}</p>
        <!-- Сетка с двумя колонками для статистики -->
        <div class="grid grid-cols-2 gap-4 text-gray-700 mb-4">
          <!-- Домов -->
          <div class="flex items-center justify-around">
            <span><strong>Домов:</strong> {{ block.houses }}</span>
            <!-- Иконка домов -->
            <svg
              class="w-8 h-8 text-custom-green"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 10L12 2L21 10V21H3V10Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9 21V15H15V21"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <!-- Лифтов -->
          <div class="flex items-center justify-around">
            <span><strong>Лифтов:</strong> {{ block.lifts }}</span>
            <!-- Иконка лифта -->
            <svg
              class="w-8 h-8 text-custom-green"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 0L3 2V14H1V16H15V14H13V2H11V14H9V0Z"
                fill="currentColor"
              />
              <circle cx="6.75" cy="8" r="1" fill="white" />
            </svg>
          </div>
          <!-- Квартир -->
          <div class="flex items-center justify-around">
            <span><strong>Квартир:</strong> {{ block.apartments }}</span>
            <!-- Иконка квартир -->
            <svg
              class="w-8 h-8 text-custom-green"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.25 0.75H1.75C1.19772 0.75 0.75 1.19772 0.75 1.75V22.25C0.75 22.8023 1.19772 23.25 1.75 23.25H22.25C22.8023 23.25 23.25 22.8023 23.25 22.25V1.75C23.25 1.19772 22.8023 0.75 22.25 0.75Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6 23.25V10.5C6 10.3011 6.07902 10.1103 6.21967 9.96967C6.36032 9.82902 6.55109 9.75 6.75 9.75H17.25C17.4489 9.75 17.6397 9.82902 17.7803 9.96967C17.921 10.1103 18 10.3011 18 10.5V23.25"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 9.75V23.25"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.0156 4.02124L15.4997 5.99999L16.9838 4.02124"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.04247 5.94302L8.49975 3.99999L9.95703 5.94302"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <!-- Население -->
          <div class="flex items-center justify-around">
            <span><strong>Население:</strong> {{ block.population }}</span>
            <!-- Иконка населения -->
            <svg
              class="w-8 h-8 text-custom-green"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 7.16C17.94 7.15 17.87 7.15 17.81 7.16C16.43 7.11 15.33 5.98 15.33 4.58C15.33 3.15 16.48 2 17.91 2C19.34 2 20.49 3.16 20.49 4.58C20.48 5.98 19.38 7.11 18 7.16Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M16.9699 14.44C18.3399 14.67 19.8499 14.43 20.9099 13.72C22.3199 12.78 22.3199 11.24 20.9099 10.3C19.8399 9.59004 18.3099 9.35003 16.9399 9.59003"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.96998 7.16C6.02998 7.15 6.09998 7.15 6.15998 7.16C7.53998 7.11 8.63998 5.98 8.63998 4.58C8.63998 3.15 7.48998 2 6.05998 2C4.62998 2 3.47998 3.16 3.47998 4.58C3.48998 5.98 4.58998 7.11 5.96998 7.16Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.99994 14.44C5.62994 14.67 4.11994 14.43 3.05994 13.72C1.64994 12.78 1.64994 11.24 3.05994 10.3C4.12994 9.59004 5.65994 9.35003 7.02994 9.59003"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 14.63C11.94 14.62 11.87 14.62 11.81 14.63C10.43 14.58 9.32996 13.45 9.32996 12.05C9.32996 10.62 10.48 9.46997 11.91 9.46997C13.34 9.46997 14.49 10.63 14.49 12.05C14.48 13.45 13.38 14.59 12 14.63Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.08997 17.78C7.67997 18.72 7.67997 20.26 9.08997 21.2C10.69 22.27 13.31 22.27 14.91 21.2C16.32 20.26 16.32 18.72 14.91 17.78C13.32 16.72 10.69 16.72 9.08997 17.78Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
        <!-- две кнопки по 50% -->
        <div class="mt-4 flex space-x-2">
          <!-- Заказать -->
          <a
            href="#contact"
            class="w-1/2 bg-custom-green text-white py-3 rounded-lg text-center hover:bg-green-600 transition duration-300 flex items-center justify-center"
          >
            Заказать
          </a>

          <!-- Скачать адреса -->
          <a
            :href="block.addressUrl || `/addresses/${block.id}-address.pdf`"
            download
            class="w-1/2 bg-white border-2 border-custom-green text-custom-green py-3 rounded-lg text-center hover:bg-custom-green hover:text-white transition duration-300 flex items-center justify-center"
          >
            Скачать адреса
          </a>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'
  
  const props = defineProps({
    block: {
      type: Object,
      required: true
    }
  })
  </script>
  
  <style scoped>
  .accordion {
    background: #e5e7eb; /* светлый серый фон аккордеона */
    border-radius: 4px;
    transition: transform 0.6s ease-in-out, box-shadow 0.6s ease-in-out;
    overflow: hidden;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  }
  
  .accordion.active {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  }
  
  .faq-header {
    font-size: 46px; /* увеличен шрифт для заголовков */
    color: #333;
    background: #f3f4f6;
    padding: 20px;
    cursor: pointer;
    transition: background 0.3s ease, color 0.3s ease;
  }
  
  .faq-header:hover {
    background-color: #98C850;
  }
  
  .faq-body {
    max-height: 0;
    opacity: 0;
    overflow: hidden;
    transition: max-height 0.6s ease, opacity 0.6s ease;
  }
  
  .accordion.active .faq-body {
    max-height: 500px; /* или любое максимальное значение, чтобы вместить текст */
    opacity: 1;
  }
  
  .faq-body p {
    padding: 20px;
    color: #4b5563; /* приглушённый серый для текста */
    font-size: 18px; /* увеличен размер текста для лучшей читаемости */
    animation: fadeIn 0.8s ease-in-out;
  }
  
  @keyframes fadeIn {
    0% { opacity: 0; transform: translateY(-10px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  
  /* Иконка */
  .faq-icon {
    width: 40px;
    height: 40px;
    transition: transform 0.4s ease-in-out;
  }
  
  /* Анимация вращения иконки при открытии */
  .rotated {
    transform: rotate(45deg);
  }
  </style>
  