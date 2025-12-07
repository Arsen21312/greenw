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

      <!-- Mobile burger -->
      <div class="md:hidden">
        <button @click="isMenuOpen = !isMenuOpen" class="text-gray-800 focus:outline-none">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>

      <!-- Desktop nav -->
      <nav class="hidden md:flex space-x-8 flex-grow justify-center text-lg items-center">
        <div class="relative flex items-center">
          <button
            @click="toggleSearch"
            class="w-10 h-10 rounded-full border border-custom-green text-custom-green hover:bg-custom-green hover:text-white transition grid place-items-center"
            aria-label="Поиск"
          >
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="7" />
              <line x1="16.65" y1="16.65" x2="21" y2="21" />
            </svg>
          </button>

          <div
            v-if="isSearchOpen"
            class="absolute left-0 top-12 w-80 bg-white border border-gray-200 rounded-xl shadow-lg p-3 z-50"
            ref="searchWrapper"
          >
            <div class="flex items-center gap-2 border border-gray-200 rounded-full px-3 py-2 bg-gray-50">
              <svg class="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="7" />
                <line x1="16.65" y1="16.65" x2="21" y2="21" />
              </svg>
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Поиск: цены, районы, экраны..."
                class="flex-1 bg-transparent text-sm focus:outline-none"
                @keydown.escape="closeSearch"
                ref="searchInput"
              />
              <button @click="clearSearch" class="text-gray-500 hover:text-gray-800" aria-label="Очистить поиск">×</button>
            </div>

            <ul class="mt-3 space-y-1">
              <li v-for="item in searchResults" :key="item.path">
                <NuxtLink
                  :to="item.path"
                  class="block px-3 py-2 rounded-lg hover:bg-gray-100 text-sm text-gray-800"
                  @click="handleResultClick"
                >
                  <p class="font-semibold">{{ item.title }}</p>
                  <p class="text-xs text-gray-500">{{ item.summary }}</p>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>

        <NuxtLink to="/lift" class="text-gray-800 hover:text-custom-green">Реклама в лифтах</NuxtLink>
        <NuxtLink to="/led" class="text-gray-800 hover:text-custom-green">Реклама на экранах</NuxtLink>
        <NuxtLink to="/owners" class="text-gray-800 hover:text-custom-green">Для владельцев</NuxtLink>
        <NuxtLink to="/we" class="text-gray-800 hover:text-custom-green">О нас</NuxtLink>
        <NuxtLink
          to="/otzyvy"
          class="px-4 py-2 rounded-full border border-custom-green text-custom-green font-semibold hover:bg-custom-green hover:text-white transition"
        >
          Отзывы
        </NuxtLink>
      </nav>

      <!-- Right actions -->
      <div class="hidden md:flex items-center gap-3">
        <a href="tel:+77086755846" class="font-normal text-lg text-black hover:text-custom-green">+7 708 675 5846</a>
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
    </div>

    <!-- Mobile menu -->
    <nav
      v-if="isMenuOpen"
      class="md:hidden fixed top-16 inset-x-0 p-4 space-y-4 bg-gray-50 shadow-lg rounded-b-md z-40"
    >
      <NuxtLink to="/lift" class="block text-gray-800 hover:text-custom-green">Реклама в лифтах</NuxtLink>
      <NuxtLink to="/led" class="block text-gray-800 hover:text-custom-green">Реклама на экранах</NuxtLink>
      <NuxtLink to="/owners" class="block text-gray-800 hover:text-custom-green">Для владельцев</NuxtLink>
      <NuxtLink to="/we" class="block text-gray-800 hover:text-custom-green">О нас</NuxtLink>
      <NuxtLink
        to="/otzyvy"
        class="block text-center px-4 py-2 rounded-full border border-custom-green text-custom-green font-semibold hover:bg-custom-green hover:text-white transition"
      >
        Отзывы
      </NuxtLink>

      <div class="flex items-center gap-3 pt-2">
        <a href="tel:+77086755846" class="block text-gray-800 hover:text-custom-green font-bold text-lg">+7 708 675 5846</a>
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

      <div class="pt-3 space-y-2">
        <div class="flex items-center gap-2 border border-gray-200 rounded-full px-3 py-2 bg-white shadow">
          <svg class="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="7" />
            <line x1="16.65" y1="16.65" x2="21" y2="21" />
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Поиск: цены, районы..."
            class="flex-1 bg-transparent text-sm focus:outline-none"
            ref="searchInput"
          />
          <button @click="clearSearch" class="text-gray-500 hover:text-gray-800" aria-label="Очистить поиск">×</button>
        </div>
        <ul class="space-y-1 bg-white rounded-lg shadow border border-gray-100 p-2">
          <li v-for="item in searchResults" :key="item.path + '-m'">
            <NuxtLink
              :to="item.path"
              class="block px-3 py-2 rounded-lg hover:bg-gray-100 text-sm text-gray-800"
              @click="handleResultClick"
            >
              <p class="font-semibold">{{ item.title }}</p>
              <p class="text-xs text-gray-500">{{ item.summary }}</p>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </nav>
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
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import Fuse from 'fuse.js'
import logo from '@/assets/svg/loggo.svg'

const isMenuOpen = ref(false)
const isSearchOpen = ref(false)
const isCollapsed = ref(false)
const searchQuery = ref('')
const searchInput = ref<HTMLInputElement | null>(null)
const searchWrapper = ref<HTMLElement | null>(null)

const searchItems = [
  {
    title: 'LED наружные экраны',
    path: '/led-screens',
    summary: '26 уличных экранов по городу, прайсы и трафик',
    keywords: 'led борды улица прайс трафик'
  },
  {
    title: 'LED indoor экраны',
    path: '/led-indoor',
    summary: '68 экранов внутри помещений, супермаркеты, ТЦ, вокзал',
    keywords: 'indoor led супермаркеты тц вокзал'
  },
  {
    title: 'Реклама в лифтах',
    path: '/lift',
    summary: '450+ подъездов, форматы A3–A9, быстрый запуск',
    keywords: 'лифты реклама подъезды'
  }
]

const fuse = new Fuse(searchItems, {
  includeScore: true,
  threshold: 0.38,
  keys: [
    { name: 'title', weight: 0.5 },
    { name: 'summary', weight: 0.3 },
    { name: 'keywords', weight: 0.2 }
  ]
})

const searchResults = computed(() => {
  if (!searchQuery.value.trim()) {
    return searchItems.slice(0, 3)
  }
  return fuse.search(searchQuery.value.trim()).map((r) => r.item).slice(0, 3)
})

const closeSearch = () => {
  isSearchOpen.value = false
  searchQuery.value = ''
}

const toggleSearch = () => {
  isSearchOpen.value = !isSearchOpen.value
  if (!isSearchOpen.value) {
    searchQuery.value = ''
  } else {
    nextTick(() => searchInput.value?.focus())
  }
}

const clearSearch = () => {
  searchQuery.value = ''
  nextTick(() => searchInput.value?.focus())
}

const handleResultClick = () => {
  closeSearch()
  isMenuOpen.value = false
}

const onClickOutside = (e: MouseEvent) => {
  if (!isSearchOpen.value) return
  const target = e.target as HTMLElement
  if (searchWrapper.value && !searchWrapper.value.contains(target)) {
    closeSearch()
  }
}

const handleScroll = () => {
  const y = window.scrollY || 0
  const shouldCollapse = y > 120
  if (shouldCollapse !== isCollapsed.value) {
    isCollapsed.value = shouldCollapse
    if (shouldCollapse) closeSearch()
  }
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  isCollapsed.value = false
}

onMounted(() => {
  document.addEventListener('mousedown', onClickOutside)
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onClickOutside)
  window.removeEventListener('scroll', handleScroll)
})
</script>
