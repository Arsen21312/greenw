<!-- components/NavBar.vue -->
<template>
  <!-- ①: фиксируем только на mobile -->
  <header class="bg-white shadow-xl fixed top-0 inset-x-0 w-full z-50 md:relative">
    <div class="container mx-auto flex items-center justify-between p-4">
      <!-- Логотип — ссылка на главную -->
      <NuxtLink to="/" class="flex items-center space-x-2">
        <img
          :src="logo"
          alt="Логотип рекламного агентства GreenW в Караганде"
          class="h-16"
        />
        <span class="font-bold text-lg text-custom-green">
         
        </span>
      </NuxtLink>

      <!-- Бургер только на mobile -->
      <div class="md:hidden">
        <button
          @click="isMenuOpen = !isMenuOpen"
          class="text-gray-800 focus:outline-none"
        >
          <svg
            class="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      <!-- Навигация десктоп -->
      <nav
        class="hidden md:flex space-x-8 flex-grow justify-center text-lg items-center"
      >
        <NuxtLink to="/lift"  class="text-gray-800 hover:text-custom-green">Реклама в лифтах</NuxtLink>
        <NuxtLink to="/led"   class="text-gray-800 hover:text-custom-green">Реклама на экранах</NuxtLink>
        <NuxtLink to="/owners" class="text-gray-800 hover:text-custom-green">Собственникам лифтов</NuxtLink>
        <NuxtLink to="/we"     class="text-gray-800 hover:text-custom-green">О нас</NuxtLink>
        <NuxtLink
          to="/otzyvy"
          class="px-4 py-2 rounded-full border border-custom-green text-custom-green font-semibold hover:bg-custom-green hover:text-white transition"
        >
          Отзывы
        </NuxtLink>
      </nav>

      <!-- Телефон десктоп + отдельный WhatsApp -->
      <div class="hidden md:flex items-center gap-3">
        <a
          href="tel:+77086755846"
          class="font-normal text-lg text-black hover:text-custom-green"
        >
          +7 708 675 5846
        </a>
        <a
          href="https://wa.me/77086755846"
          class="w-10 h-10 rounded-full border border-custom-green text-custom-green hover:bg-custom-green hover:text-white transition grid place-items-center"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Написать в WhatsApp"
        >
          <svg
            class="w-5 h-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M12.04 2a9.93 9.93 0 0 0-9.94 9.93c0 1.75.46 3.43 1.34 4.92L2 22l5.26-1.38a9.96 9.96 0 0 0 4.78 1.21h.01a9.93 9.93 0 0 0 9.94-9.93A9.94 9.94 0 0 0 12.04 2Zm0 17.97h-.01a8.04 8.04 0 0 1-4.1-1.12l-.29-.17-3.12.82.83-3.04-.19-.31a7.97 7.97 0 0 1-1.18-4.23 8.04 8.04 0 0 1 8.05-8.03 8.03 8.03 0 0 1 5.7 13.73 8 8 0 0 1-5.69 2.35Z"
            />
            <path
              d="M16.29 14.45c-.25-.13-1.47-.73-1.7-.81-.23-.08-.4-.12-.57.13-.17.25-.65.81-.8.98-.15.17-.3.19-.55.06-.25-.13-1.05-.43-2-1.36-.74-.71-1.24-1.58-1.38-1.84-.15-.25-.02-.38.11-.51.11-.11.25-.3.38-.45.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.57-1.37-.78-1.88-.21-.5-.42-.43-.57-.44h-.49c-.17 0-.45.06-.69.32-.24.25-.91.9-.91 2.2 0 1.3.93 2.55 1.06 2.73.13.17 1.82 2.77 4.4 3.9.62.27 1.1.43 1.48.55.62.2 1.18.17 1.63.1.5-.08 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.17-.06-.1-.23-.16-.48-.29Z"
            />
          </svg>
        </a>
      </div>
    </div>

    <!-- ②: мобильное меню — фиксируем под шапкой -->
    <nav
      v-if="isMenuOpen"
      class="md:hidden fixed top-16 inset-x-0 p-4 space-y-4 bg-gray-50 shadow-lg rounded-b-md z-40"
    >
      <NuxtLink to="/lift"  class="block text-gray-800 hover:text-custom-green">Реклама в лифтах</NuxtLink>
      <NuxtLink to="/led"   class="block text-gray-800 hover:text-custom-green">Реклама на экранах</NuxtLink>
      <NuxtLink to="/owners" class="block text-gray-800 hover:text-custom-green">Собственникам лифтов</NuxtLink>
      <NuxtLink to="/we"     class="block text-gray-800 hover:text-custom-green">О нас</NuxtLink>
      <NuxtLink
        to="/otzyvy"
        class="block text-center px-4 py-2 rounded-full border border-custom-green text-custom-green font-semibold hover:bg-custom-green hover:text-white transition"
      >
        Отзывы
      </NuxtLink>

      <div class="flex items-center gap-3 pt-2">
        <a
          href="tel:+77086755846"
          class="block text-gray-800 hover:text-custom-green font-bold text-lg"
        >
          +7 708 675 5846
        </a>
        <a
          href="https://wa.me/77086755846"
          class="w-10 h-10 rounded-full border border-custom-green text-custom-green hover:bg-custom-green hover:text-white transition grid place-items-center"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Написать в WhatsApp"
        >
          <svg
            class="w-5 h-5"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M12.04 2a9.93 9.93 0 0 0-9.94 9.93c0 1.75.46 3.43 1.34 4.92L2 22l5.26-1.38a9.96 9.96 0 0 0 4.78 1.21h.01a9.93 9.93 0 0 0 9.94-9.93A9.94 9.94 0 0 0 12.04 2Zm0 17.97h-.01a8.04 8.04 0 0 1-4.1-1.12l-.29-.17-3.12.82.83-3.04-.19-.31a7.97 7.97 0 0 1-1.18-4.23 8.04 8.04 0 0 1 8.05-8.03 8.03 8.03 0 0 1 5.7 13.73 8 8 0 0 1-5.69 2.35Z"
            />
            <path
              d="M16.29 14.45c-.25-.13-1.47-.73-1.7-.81-.23-.08-.4-.12-.57.13-.17.25-.65.81-.8.98-.15.17-.3.19-.55.06-.25-.13-1.05-.43-2-1.36-.74-.71-1.24-1.58-1.38-1.84-.15-.25-.02-.38.11-.51.11-.11.25-.3.38-.45.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.57-1.37-.78-1.88-.21-.5-.42-.43-.57-.44h-.49c-.17 0-.45.06-.69.32-.24.25-.91.9-.91 2.2 0 1.3.93 2.55 1.06 2.73.13.17 1.82 2.77 4.4 3.9.62.27 1.1.43 1.48.55.62.2 1.18.17 1.63.1.5-.08 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.17-.06-.1-.23-.16-.48-.29Z"
            />
          </svg>
        </a>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import logo from '@/assets/svg/loggo.svg'

const isMenuOpen = ref(false)
</script>
