<!-- components/FaqItem.vue -->
<template>
    <div class="mb-4 accordion" :class="{ active }">
      <div
        class="faq-header flex justify-between items-center px-4 py-2 cursor-pointer"
        @click="toggle"
        @keydown.enter.space.prevent="toggle"
        tabindex="0"
        role="button"
        :aria-expanded="active"
        :aria-controls="`faq-body-${id}`"
        :id="`faq-header-${id}`"
      >
        <h3 class="text-2xl font-semibold">{{ question }}</h3>
        <span>
          <!-- SVG для круга с крестом/плюсом с вращением -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="faq-icon"
            :class="{ rotated: active }"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="11" fill="#98C850" stroke="none"></circle>
            <line x1="12" y1="6" x2="12" y2="18" stroke="white" stroke-width="2"></line>
            <line x1="6" y1="12" x2="18" y2="12" stroke="white" stroke-width="2"></line>
          </svg>
        </span>
      </div>
      <transition name="fade">
  <div
    v-show="active"
    class="faq-body px-4 py-2 bg-light"
    :id="`faq-body-${id}`"
    role="region"
    :aria-labelledby="`faq-header-${id}`"
  >
    <p>{{ answer }}</p>
  </div>
</transition>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // Определение пропсов
  const props = defineProps({
    id: {
      type: Number,
      required: true
    },
    question: {
      type: String,
      required: true
    },
    answer: {
      type: String,
      required: true
    }
  })
  
  // Определение эмитов
  const emit = defineEmits(['toggle'])
  
  // Состояние открытия
  const active = ref(false)
  
  // Функция для переключения состояния
  const toggle = () => {
    active.value = !active.value
    emit('toggle', props.id, active.value)
  }
  </script>
  
  <style scoped>
  .accordion {
    background: #ffffff; /* белый фон */
    border-radius: 4px;
    transition: transform 0.6s ease-in-out, box-shadow 0.6s ease-in-out;
    overflow: hidden;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.08);
    border: 1px solid #f0f2f5;
  }
  
  .accordion.active {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  }
  
  .faq-header {
    font-size: 46px; /* увеличен шрифт для заголовков */
    color: #333;
    background: #ffffff;
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
  
