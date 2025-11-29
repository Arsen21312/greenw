<!-- pages/screens/index.vue -->
<template>
  <div class="flex flex-col min-h-screen bg-gray-50 text-gray-900">
    <!-- ░░░ Навбар ░░░ -->
    <NavBar class="shadow-md bg-white z-10" />

    <main class="flex-grow">
      <!-- ░░░ Hero ░░░ -->
      <section
        class="relative overflow-hidden bg-gradient-to-b from-[#4caf4fcc] to-[#a8cc55]"
      >
        <div
          class="absolute inset-0 bg-[url('/pattern-screens.svg')] opacity-10 pointer-events-none"
        ></div>

        <div class="relative container mx-auto px-6 pt-12 pb-24 text-center">
          <span
            class="inline-block bg-white text-[#4caf4f] font-bold px-6 py-2 rounded-full mb-6 uppercase tracking-wide shadow-md"
          >
            −10 % на первый месяц
          </span>

          <h1
            class="text-5xl md:text-7xl font-extrabold leading-tight text-white mb-8 drop-shadow-lg max-w-5xl mx-auto"
          >
            Реклама на LED-экранах и мониторах<br class="hidden md:inline" />
            в Караганде
          </h1>

          <ul
            class="text-lg md:text-xl mb-10 space-y-3 max-w-3xl mx-auto text-left list-inside list-disc text-white/90"
          >
            <li>28 экрана по всему городу — ТЦ, улицы, вокзалы</li>
            <li>200–400 показов в день</li>
            <li>Хронометраж до 30 секунд</li>
            <li>Узнаваемость </li>
            <li>Охваты</li>
            <li>Эффект "вижу каждый день"</li>
          </ul>

          <p class="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-sm">
            От 20&nbsp;000&nbsp;₸/мес
          </p>
          <p class="text-sm text-white/80 mb-14">Более 50 клиентов уже с нами</p>

          <div class="flex flex-wrap justify-center gap-6">
            <NuxtLink
              to=""
              @click.prevent="openOrderModal('звонок')"
              class="cursor-pointer px-10 py-4 bg-white text-[#4caf4f] font-semibold rounded-lg shadow hover:scale-105 hover:shadow-lg transition-transform duration-200"
            >
              Заказать звонок
            </NuxtLink>

            <a
              href="https://wa.me/77086755846"
              target="_blank"
              class="px-10 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#4caf4f] transition-colors duration-200"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      <!-- ░░░ Типы экранов ░░░ -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-6">
          <h2
            class="text-4xl md:text-5xl font-extrabold text-center mb-20 text-transparent bg-clip-text bg-gradient-to-r from-[#4caf4f] via-[#8ecb48] to-[#a8cc55]"
          >
            Типы экранов
          </h2>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div
              v-for="(card, idx) in screenTypes"
              :key="idx"
              class="relative p-12 bg-gradient-to-br from-[#f0fbe6] via-[#e6f8d4]/60 to-[#f0fbe6] rounded-3xl shadow-xl ring-1 ring-[#a8cc55]/20 hover:ring-[#a8cc55]/40 transform transition-all duration-300 hover:scale-[1.04] flex flex-col animate-fade-up"
              :style="{ '--i': idx }"
            >
              <!-- Бейдж -->
              <div class="absolute -top-10 left-1/2 -translate-x-1/2">
                <div
                  class="w-20 h-20 bg-[#4caf4f] text-white rounded-full flex items-center justify-center text-3xl font-extrabold shadow-lg"
                >
                  {{ idx + 1 }}
                </div>
              </div>

              <h3
                class="mt-14 text-3xl font-extrabold text-[#2e7d32] mb-6 text-center uppercase leading-snug tracking-tight"
              >
                {{ card.title }}
              </h3>

              <ul class="flex-1 text-lg leading-relaxed space-y-4 text-gray-700 mb-8">
                <li class="font-semibold text-center">{{ card.line1 }}</li>
                <li>{{ card.line2 }}</li>
                <li>{{ card.line3 }}</li>
                <li>{{ card.line4 }}</li>
                <li v-if="card.line5" class="font-extrabold text-xl text-[#225c24]">
                  {{ card.line5 }}
                </li>
                <li v-if="card.line6">{{ card.line6 }}</li>
              </ul>

              <NuxtLink
                to=""
                @click.prevent="openOrderModal(card.title)"
                class="cursor-pointer mt-auto block text-center px-6 py-4 bg-[#4caf4f] text-white font-semibold rounded-xl shadow hover:bg-[#3c8e3f] transition-colors"
              >
                Заказать
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>

      <!-- ░░░ Галерея экранов ░░░ -->
      <section class="py-20 bg-gray-50">
    <div class="container mx-auto px-6">
      <h2
        class="text-3xl md:text-4xl font-extrabold text-center mb-12
               text-transparent bg-clip-text bg-gradient-to-r from-[#4caf4f] to-[#a8cc55]"
      >
        Галерея экранов
      </h2>

      <div
        class="flex space-x-6 overflow-x-auto snap-x snap-mandatory pb-4
               lg:grid lg:grid-cols-4 lg:gap-6 lg:space-x-0"
      >
        <div
         v-for="(img, idx) in galleryItems"
        :key="idx"
        class="snap-center flex-shrink-0 w-80 lg:w-full flex flex-col items-center cursor-pointer"
       >
          <!-- 1) подпись -->
          <p
            @click="openGalleryModal(img.type)"
            class="cursor-pointer text-center text-2xl font-semibold text-gray-800 mb-2"
          >
            {{ img.caption }}
          </p>

          <!-- 2) собственно картинка -->
           <div
          @click="openGalleryModal(img.type)"
          class="bg-gray-200 rounded-xl overflow-hidden
                 shadow-lg hover:shadow-2xl transition-shadow duration-300
                 w-full h-[28rem] "
        >
          <img
            :src="img.src"
            :alt="img.alt"
            class="object-cover w-full h-full"
            loading="lazy"
          />
        </div>
        </div>
      </div>
    </div>
  </section>

      <!-- ░░░ Почему это работает ░░░ -->
      <section class="py-24 bg-white">
        <div class="container mx-auto px-6">
          <h2
            class="text-4xl md:text-5xl font-extrabold text-center mb-20 text-transparent bg-clip-text bg-gradient-to-r from-[#4caf4f] via-[#8ecb48] to-[#a8cc55]"
          >
            Почему это работает
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div
              v-for="(point, idx) in whyPoints"
              :key="idx"
              class="relative p-10 bg-gradient-to-br from-[#f0fbe6] via-white/60 to-[#f0fbe6] rounded-3xl shadow-xl ring-1 ring-[#a8cc55]/20 hover:ring-[#a8cc55]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col animate-fade-up"
              :style="{ '--i': idx }"
            >
              <!-- Бадж -->
              <div class="absolute -top-6 left-6">
                <div
                  class="w-14 h-14 rounded-full bg-[#4caf4f] text-white flex items-center justify-center text-xl font-extrabold shadow-lg"
                >
                  {{ idx + 1 }}
                </div>
              </div>

              <h3 class="mt-8 text-xl font-semibold text-[#2e7d32] mb-3 leading-snug">
                {{ point.title }}
              </h3>
              <p class="text-gray-700 text-base leading-relaxed">{{ point.text }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ░░░ Когда полезно (полностью переработанный блок) ░░░ -->
      <section class="relative py-24 bg-gray-50 overflow-hidden">
        <!-- Декоративные пятна -->
        <svg
          class="absolute -top-24 -left-24 w-[480px] h-[480px] blur-3xl opacity-30 select-none pointer-events-none"
          viewBox="0 0 400 400"
          fill="none"
        >
          <circle cx="200" cy="200" r="200" fill="#8ecb48" />
        </svg>
        <svg
          class="absolute bottom-0 right-0 w-[380px] h-[380px] blur-3xl opacity-25 select-none pointer-events-none"
          viewBox="0 0 400 400"
          fill="none"
        >
          <circle cx="200" cy="200" r="200" fill="#4caf4f" />
        </svg>

        <div class="relative container mx-auto px-6">
          <h2
            class="text-4xl md:text-5xl font-extrabold text-center mb-20 text-transparent bg-clip-text bg-gradient-to-r from-[#4caf4f] via-[#8ecb48] to-[#a8cc55]"
          >
            Когда реклама на LED-экранах раскрывает максимум
          </h2>

          <ul
            class="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto"
            role="list"
          >
            <li
              v-for="(item, idx) in whenUsefulList"
              :key="idx"
              class="relative p-8 bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl ring-1 ring-[#a8cc55]/20 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
            >
              <div
                class="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#4caf4f] text-white flex items-center justify-center text-2xl font-bold shadow-lg"
              >
                {{ item.icon }}
              </div>

              <h3 class="mt-10 text-lg font-semibold text-gray-900 mb-2">
                {{ item.title }}
              </h3>
              <p class="text-gray-700 leading-relaxed">{{ item.text }}</p>
            </li>
          </ul>
        </div>
      </section>

      <!-- ░░░ Финальный CTA ░░░ -->
      <section class="py-24 bg-gradient-to-r from-[#4caf4f] to-[#8ecb48]">
        <div class="container mx-auto px-6 text-center text-white">
          <p class="text-3xl md:text-4xl font-extrabold mb-8">
            Рассчитать стоимость под ваш бизнес
          </p>

          <div class="flex flex-wrap justify-center gap-6">
            <NuxtLink
              to=""
              @click.prevent="openOrderModal('звонок')"
              class="cursor-pointer px-10 py-4 bg-white text-[#4caf4f] font-semibold rounded-lg shadow hover:scale-105 hover:shadow-lg transition-transform duration-200"
            >
              Заказать звонок
            </NuxtLink>

            <a
              href="https://wa.me/77086755846"
              target="_blank"
              class="px-10 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#4caf4f] transition-colors duration-200"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
      <ReviewsPreview />
      <FaqLed class="py-12 bg-gray-200" />
    </main>

    <!-- ░░░ Футер ░░░ -->
    <Footer class="mt-10 bg-white" />

    <!-- Модалка заказа -->
    <OrderModal
      v-if="showOrderModal"
      :block="modalBlock"
      @close-order-modal="closeOrderModal"
    />

    <!-- Модалка галереи -->
    <div
      v-if="showGalleryModal"
     class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4
            overflow-auto"  
    >
      <div  class="bg-white rounded-lg overflow-hidden max-w-4xl w-full
              max-h-[90vh]">
        <div class="flex justify-end p-2">
          <button
            @click="closeGalleryModal"
            class="text-gray-600 hover:text-gray-900 text-2xl leading-none"
          >&times;</button>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-2 p-4">
          <img
            v-for="(src, i) in galleryModalPhotos"
            :key="i"
            :src="src"
            class="object-cover w-full rounded-md"
            style="aspect-ratio:3/4;"
            alt="Gallery photo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import FaqLed from '@/components/FaqLed.vue'
import ReviewsPreview from '@/components/ReviewsPreview.vue'
import OrderModal from '@/components/OrderModal.vue'
import { ref, onMounted } from 'vue'

useSeoMeta({
  title: 'Реклама на LED-экранах в Караганде – 22 площадки | GreenW',
  description: 'Видео-реклама на экранах в ТРЦ, на вокзале и улицах Караганды. До 400 показов в сутки. От 20 000 ₸/мес.',
  ogTitle: 'LED-реклама Караганда',
  ogDescription: 'Динамичная цифровая наружная реклама по всему городу.',
  ogUrl: 'https://www.greenw.kz/led',
  twitterCard: 'summary_large_image',
  robots: 'index,follow'
})
useHead({
  link: [{ rel: 'canonical', href: 'https://www.greenw.kz/led' }],
  script: [
    {
      type:'application/ld+json',
      children: JSON.stringify({
        '@context':'https://schema.org',
        '@type':'Service',
        serviceType:'Реклама на LED-экранах',
        areaServed:{ '@type':'City', name:'Караганда' },
        provider:{ '@type':'Organization', name:'GreenW', url:'https://www.greenw.kz' }
      })
    },
    {
      type:'application/ld+json',
      children: JSON.stringify({
        '@context':'https://schema.org',
        '@type':'FAQPage',
        mainEntity: [
          { '@type':'Question', name:'Какой формат видео нужен?',
            acceptedAnswer:{ '@type':'Answer', text:'MP4, 1920×1080, до 15–30 c. Поможем адаптировать ролик.'}},
          { '@type':'Question', name:'Есть ли звук?',
            acceptedAnswer:{ '@type':'Answer', text:'Обычно без звука. Важен понятный визуальный посыл и субтитры.'}},
          { '@type':'Question', name:'Минимальный срок?',
            acceptedAnswer:{ '@type':'Answer', text:'Рекомендуем от 1 месяца для накопления контактов и узнаваемости.'}}
        ]
      })
    }
  ]
})


/* ───────────────────────────── Типы экранов ───────────────────────────── */
const screenTypes = [
  {
    title: '🔹 Внутренние экраны',
    line1: 'Восток-LED, GreenCity-LED, Вокзал-LED 1/2',
    line2: '📍 ТЦ и жилые комплексы, рядом с супермаркетами, аптеками и кассами',
    line3: '📐 Размер: 1,8 × 0,7 м',
    line4: '👀 Охват: до 22 000 чел./день',
    line5: '💰 От 20 000 ₸ в месяц'
  },
  {
    title: '🔹 Уличные Smart Eco',
    line1: 'Парк-SmartEco, Сквер-SmartEco',
    line2: '📍 Центральный парк, перекрёсток Абдирова — Ерубаева',
    line3: '📐 Размер: 1,8 × 1 м',
    line4: '👀 Охват: до 30 000 проходимость',
    line5: '💰 От 150 000 ₸',
    line6: ''
  },
  {
    title: '🔹 Большие уличные экраны SmartMedia',
    line1: 'Акнар, Цирк, 45 квартал, Юбилейка, Караганда Арена',
    line2: '📍 Вдоль дорог, на ключевых перекрёстках и трассах',
    line3: '📐 Размер: 6 × 2 м',
    line4: '🚗 Автоохват: до 10 000 в день',
    line5: '💰 От 50 000 ₸ до 350 000 ₸',
    line6: '🚀 Запуск от 7 дней'
  },
  {
    title: '🔹 Комплекс Таир (10 экранов)',
    line1: '2 LED + 8 мониторов в ТД Таир',
    line2: '📍 1, 2 и 4 этаж, рядом с фудкортом, бутиками, кассами',
    line3: '📐 FULL HD, до 30 сек, 3 показа в час',
    line4: '👀 Охват: до 22 000 чел./день',
    line5: '💰 40 000 ₸ / месяц за все 10 экранов'
  }
]

/* ───────────────────────────── Галерея ───────────────────────────── */
const galleryItems =[
  { type: 'GCP',      src: '/exampleled/GCP.jpg',      alt: 'Экран в ТЦ',      caption: 'Внутренние экраны' },
  { type: 'smarteco', src: '/exampleled/smarteco.jpg', alt: 'Уличный экран SmartEco', caption: 'Уличные Smart Eco' },
  { type: 'ledbig',   src: '/exampleled/ledbig.jpg',   alt: 'Большой экран SmartMedia', caption: 'Большие уличные' },
  { type: 'tair',     src: '/exampleled/tair.jpg',     alt: 'Экраны в комплексе Таир', caption: 'Комплекс Таир' },
]

/* Заглушки: по 5 изображений, кроме smarteco – там 3 */
const photosMap: Record<string, string[]> = {
  GCP: [
    '/exampleled/GCP1.png',
    '/exampleled/GCP2.png',
    '/exampleled/GCP3.jpg',
    '/exampleled/GCP4.jpg',
    '/exampleled/GCP5.png',
  ],
  smarteco: [
    '/exampleled/smarteco1.png',
    '/exampleled/smarteco2.png',
    '/exampleled/smarteco3.png',
  ],
  ledbig: [
    '/exampleled/ledbig1.png',
    '/exampleled/ledbig2.png',
    '/exampleled/ledbig3.png',
    '/exampleled/ledbig4.png',
    '/exampleled/ledbig5.png',
  ],
  tair: [
    '/exampleled/tair1.png',
    '/exampleled/tair2.png',
    '/exampleled/tair3.png',
    '/exampleled/tair4.png',
    '/exampleled/tair5.png',
  ],
}

/* ──────────────────────── Почему это работает ─────────────────────── */
const whyPoints = [
  { title: 'Экраны там, где взгляд прикован', text: 'Супермаркет, вокзал, фудкорт — люди вынужденно останавливаются.' },
  { title: 'Повтор — ключ к запоминанию', text: 'Несколько показов в день создают эффект знакомого бренда.' },
  { title: 'Видео = эмоция', text: 'Динамика и звук работают лучше, чем статичный баннер.' },
  { title: 'Масштабно и локально', text: 'Охват города и точечная настройка по районам.' },
  { title: 'Бренд — часть города', text: 'Экран не пролистать, не закрыть, не проигнорировать.' }
]

/* ────────────────────────── Когда полезно ────────────────────────── */
const whenUsefulList = [
  { icon: '🚀', title: 'Новая точка или бизнес', text: 'LED-экран мгновенно расскажет о вас всему району и создаст первые лиды.' },
  { icon: '⚡️', title: 'Короткая акция', text: 'Ролик можно показать 2 800 раз уже на этой неделе — максимум охвата за минимум времени.' },
  { icon: '🎯', title: 'Высокая конкуренция', text: 'Сочный ролик на экране выделит вас среди остальных предложений.' },
  { icon: '🤝', title: 'Рост доверия', text: 'Появление на большом экране в ТЦ или на вокзале повышает статус бренда.' },
  { icon: '📈', title: 'Сайт без заявок', text: 'Прямой call-to-action на экране направит аудиторию сразу в WhatsApp или Instagram.' },
  { icon: '💡', title: 'Альтернатива билбордам', text: 'LED-реклама ярче, динамичнее и при этом дешевле классической наружки.' }
]

// Прогрузка всех картинок модалки в кэш
onMounted(() => {
  Object.values(photosMap)
    .flat()
    .forEach(src => {
      const img = new Image()
      img.src = src
    })
})


// состояния модалок
const showOrderModal    = ref(false)
const modalBlock        = ref<{ name: string }>({ name: '' })

const showGalleryModal  = ref(false)
const galleryModalPhotos= ref<string[]>([])

// Заказ звонка
function openOrderModal(name: string) {
  modalBlock.value = { name }
  showOrderModal.value = true
}
function closeOrderModal() {
  showOrderModal.value = false
}

// Галерея
function openGalleryModal(type: string) {
  galleryModalPhotos.value = photosMap[type] || []
  showGalleryModal.value    = true
}
function closeGalleryModal() {
  showGalleryModal.value = false
}
</script>

<style scoped>
.container {
  max-width: 1280px;
}

/* Анимация появления карточек вверх */
@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-up {
  animation: fade-up 0.6s ease forwards;
}
</style>
