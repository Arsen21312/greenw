<template>
  <header
    :class="[
      'bg-white shadow-xl fixed top-0 inset-x-0 w-full z-50 transition-transform duration-300',
      isCollapsed ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
    ]"
  >
    <div class="container mx-auto flex items-center justify-between p-4">
      <NuxtLink to="/" class="flex items-center space-x-2">
        <img :src="logo" alt="GreenW" class="h-16" />
      </NuxtLink>
      <!-- Mobile actions -->
      <div class="flex items-center gap-3 md:hidden mt-2">
        <button
          @click="isMenuOpen = !isMenuOpen"
          class="menu-toggle text-gray-800 focus:outline-none"
          :class="{ open: isMenuOpen }"
          aria-label="Меню"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <a
          href="https://wa.me/77086755846"
          class="w-10 h-10 rounded-full border border-custom-green text-custom-green hover:bg-custom-green hover:text-white transition grid place-items-center"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Написать в WhatsApp"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path
              d="M12.04 2a9.93 9.93 0 0 0-9.94 9.93c0 1.75.46 3.43 1.34 4.92L2 22l5.26-1.38a9.96 9.96 0 0 0 4.78 1.21h.01a9.93 9.93 0 0 0 9.94-9.93A9.94 9.94 0 0 0 12.04 2Zm0 17.97h-.01a8.04 8.04 0 0 1-4.1-1.12l-.29-.17-3.12.82.83-3.04-.19-.31a7.97 7.97 0 0 1-1.18-4.23 8.04 8.04 0 0 1 8.05-8.03 8.03 8.03 0 0 1 5.7 13.73 8 8 0 0 1-5.69 2.35Z"
            />
            <path
              d="M16.29 14.45c-.25-.13-1.47-.73-1.7-.81-.23-.08-.4-.12-.57.13-.17.25-.65.81-.8.98-.15.17-.3.19-.55.06-.25-.13-1.05-.43-2-1.36-.74-.71-1.24-1.58-1.38-1.84-.15-.25-.02-.38.11-.51.11-.11.25-.3.38-.45.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.57-1.37-.78-1.88-.21-.5-.42-.43-.57-.44h-.49c-.17 0-.45.06-.69.32-.24.25-.91.9-.91 2.2 0 1.3.93 2.55 1.06 2.73.13.17 1.82 2.77 4.4 3.9.62.27 1.1.43 1.48.55.62.2 1.18.17 1.63.1.5-.08 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.17-.06-.1-.23-.16-.48-.29Z"
            />
          </svg>
        </a>
      </div>
      <!-- Desktop nav -->
      <nav class="hidden md:flex items-center gap-6 text-base lg:text-lg ml-auto">
        <div class="flex items-center gap-5 lg:gap-6">
          <NuxtLink to="/lift" class="text-gray-800 hover:text-custom-green">Реклама в лифтах</NuxtLink>
          <NuxtLink to="/led-screens" class="text-gray-800 hover:text-custom-green">LED наружные большие</NuxtLink>
          <NuxtLink to="/led-indoor" class="text-gray-800 hover:text-custom-green">LED в помещениях</NuxtLink>
          <NuxtLink to="/owners" class="hidden lg:inline-flex text-gray-800 hover:text-custom-green">Для владельцев</NuxtLink>
          <NuxtLink to="/we" class="hidden lg:inline-flex text-gray-800 hover:text-custom-green">О нас</NuxtLink>
        </div>

        <div class="flex items-center gap-4">
          <NuxtLink
            to="/otzyvy"
            class="px-4 py-2 rounded-full border border-custom-green text-custom-green font-semibold hover:bg-custom-green hover:text-white transition"
          >
            Отзывы
          </NuxtLink>
          <a href="tel:+77086755846" class="hidden lg:inline-flex font-normal text-lg text-black hover:text-custom-green">+7 708 675 5846</a>
          <a
            href="https://wa.me/77086755846"
            class="w-10 h-10 rounded-full border border-custom-green text-custom-green hover:bg-custom-green hover:text-white transition grid place-items-center"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="???????? ? WhatsApp"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
    </div>

    <!-- Mobile menu -->
    <Transition name="mobile-menu">
      <nav
        v-if="isMenuOpen"
        class="md:hidden fixed top-20 right-4 w-[74%] max-w-sm p-4 space-y-4 bg-gray-50 shadow-xl rounded-2xl z-40 flex flex-col items-end text-right"
      >
      <NuxtLink to="/lift" class="block text-gray-800 hover:text-custom-green">Реклама в лифтах</NuxtLink>
      <NuxtLink to="/led-screens" class="block text-gray-800 hover:text-custom-green">LED наружные большие</NuxtLink>
      <NuxtLink to="/led-indoor" class="block text-gray-800 hover:text-custom-green">LED в помещениях</NuxtLink>
      <NuxtLink to="/owners" class="block text-gray-800 hover:text-custom-green">Для владельцев</NuxtLink>
      <NuxtLink to="/we" class="block text-gray-800 hover:text-custom-green">О нас</NuxtLink>
      <NuxtLink
        to="/otzyvy"
        class="inline-flex w-fit items-center justify-center px-4 py-2 rounded-full border border-custom-green text-custom-green font-semibold hover:bg-custom-green hover:text-white transition"
      >
        Отзывы
      </NuxtLink>

        <div class="flex items-center gap-3 pt-2 ml-auto">
        <a href="tel:+77086755846" class="block text-gray-800 hover:text-custom-green font-bold text-lg">+7 708 675 5846</a>
        <a
          href="https://wa.me/77086755846"
          class="w-10 h-10 rounded-full border border-custom-green text-custom-green hover:bg-custom-green hover:text-white transition grid place-items-center"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="???????? ? WhatsApp"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
    </Transition>
  </header>

  <!-- Back to top -->
  <button
    v-if="isCollapsed"
    @click="scrollToTop"
    class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-12 h-12 rounded-full bg-custom-green text-white shadow-lg ring-2 ring-white transition hover:-translate-y-1"
    aria-label="Вернуться вверх"
  >
    <svg class="w-6 h-6 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import logo from '@/assets/svg/loggo.svg'

const isMenuOpen = ref(false)
const isCollapsed = ref(false)

const handleScroll = () => {
  const y = window.scrollY || 0
  const shouldCollapse = y > 120
  if (shouldCollapse !== isCollapsed.value) {
    isCollapsed.value = shouldCollapse
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  isCollapsed.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
  transform-origin: top right;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
}

.menu-toggle {
  position: relative;
  width: 32px;
  height: 28px;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  transition: transform 0.3s ease;
}

.menu-toggle span {
  display: block;
  width: 100%;
  height: 2px;
  background: currentColor;
  border-radius: 999px;
  transition: transform 0.3s ease, opacity 0.2s ease;
}

.menu-toggle.open span:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.menu-toggle.open span:nth-child(2) {
  opacity: 0;
}

.menu-toggle.open span:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}
</style>
