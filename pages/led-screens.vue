<template>
  <main class="bg-white text-gray-900 overflow-x-hidden pt-20 md:pt-24">
    <NavBar class="bg-white/85 backdrop-blur supports-backdrop-blur:shadow-md shadow" />

    <!-- Hero -->
    <section
  class="relative bg-gradient-to-br from-[#f6ffe9] via-white to-[#e3f4d9] pt-28 pb-16 md:pt-32 md:pb-24"
>

      <div
        class="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
      >
        <div class="absolute -left-24 top-12 h-72 w-72 rounded-full bg-[#a8cc55]/30 blur-3xl" />
        <div class="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-[#4caf4f]/25 blur-3xl" />
      </div>

      <div class="container mx-auto grid items-center gap-12 px-6 lg:grid-cols-2 -mt-10">
        <div class="relative space-y-6">
          <span
            class="inline-flex items-center rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-[#2e7d32] shadow"
          >
            LED экраны по всей Караганде
          </span>

          <h1 class="text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold leading-snug md:leading-snug lg:leading-tight text-gray-900">
            Реклама на уличных LED экранах города Караганды
          </h1>

          <p class="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
            Ваш бренд видят тысячи людей каждый день, на дорогах, в центре города и возле крупных ТЦ
          </p>

          <div class="space-y-4 text-base sm:text-lg leading-relaxed text-gray-700">
            <p>Мы размещаем видеорекламу на 26 уличных LED экранах по всему городу.</p>
            <p>Эти экраны находятся вдоль дорог, на стенах зданий и на ключевых городских точках.</p>
            <p>Формат отлично работает на узнаваемость, охват и эффект «вижу каждый день».</p>
          </div>

          <div class="flex flex-wrap gap-4 pt-4">
            <div class="relative">
              <button @click="toggleLedNav" class="btn btn-primary">
                Все LED
              </button>
              <div
                v-if="showLedNav"
                class="absolute z-20 mt-2 w-72 max-h-[70vh] overflow-auto rounded-xl bg-white shadow-lg ring-1 ring-gray-200"
              >
                <button
                  v-for="navItem in ledNavItems"
                  :key="navItem.id"
                  @click="scrollToType(navItem.id)"
                  class="block w-full px-4 py-3 text-left text-sm font-semibold text-gray-800 hover:bg-gray-50"
                >
                  {{ navItem.title }}
                </button>
              </div>
            </div>
            <button @click="scrollToForm" class="btn btn-outline">
              Оставить заявку
            </button>
          </div>
        </div>

        <div class="relative flex justify-center lg:justify-end">
          <LedSlider :images="ledLoopSlides" :max-width="340" :height="510" />
        </div>
      </div>
    </section>

    <WaveDivider top-color="#f6ffe9" bottom-color="#f9fafb" />

    <!-- Преимущества -->
    <section class="bg-gray-50 py-16 md:py-20">
      <div class="container mx-auto px-6">
        <div class="mb-10 text-center">
          <h2 class="text-3xl font-extrabold text-gray-900 md:text-4xl">
            Коротко о главном
          </h2>
          <p class="mt-3 text-base text-gray-600 md:text-lg">
            Охват, гибкие форматы и имиджевый эффект для вашего бренда
          </p>
        </div>

        <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <div
            v-for="(advantage, idx) in advantages"
            :key="advantage.title"
            class="group relative flex flex-col gap-3 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <span
              class="flex h-12 w-12 items-center justify-center rounded-full border border-[#4caf4f]/30 bg-[#4caf4f]/10 text-lg font-semibold text-[#2e7d32]"
            >
              {{ idx + 1 }}
            </span>
            <h3 class="text-lg font-semibold text-gray-900">{{ advantage.title }}</h3>
            <p class="text-sm leading-relaxed text-gray-700 md:text-base">
              {{ advantage.text }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <WaveDivider top-color="#f9fafb" bottom-color="#ffffff" flip />

    <!-- Типы экранов -->
    <section class="bg-white py-16 md:py-24 overflow-hidden">
      <div class="container mx-auto space-y-10 px-6">
        <div class="max-w-4xl space-y-3 text-center mx-auto px-4">
          <h2 class="text-3xl font-extrabold text-gray-900 md:text-4xl">
            Выберите вид экрана и посмотрите трафик, пример экрана и стоимость размещения
          </h2>
        </div>

        <div class="space-y-8">
          <article
            :id="type.id"
            v-for="(type, idx) in screenTypes"
            :key="type.title"
            class="flex h-full flex-col gap-6 rounded-3xl bg-gray-50/80 p-6 sm:p-8 shadow-sm ring-1 ring-gray-100 overflow-hidden transition duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <div class="grid gap-6 lg:grid-cols-2 lg:items-center">
              <div class="space-y-4">
                <div class="flex items-start justify-between gap-3">
                  <div class="space-y-2">
                    <h3 class="text-2xl font-bold text-gray-900">
                      {{ type.title }}
                    </h3>
                    <p v-if="type.description" class="text-base text-gray-700">
                      {{ type.description }}
                    </p>
                    <p v-if="type.size" class="text-sm font-medium text-[#2e7d32]">
                      {{ type.size }}
                    </p>
                  </div>
                  <span
                    class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-base font-semibold text-[#2e7d32] shadow-inner ring-1 ring-[#a8cc55]/50"
                  >
                    {{ idx + 1 }}
                  </span>
                </div>

                <ul class="space-y-2 text-base leading-relaxed text-gray-700">
                  <li
                    v-for="spec in type.specs"
                    :key="spec"
                    class="flex items-start gap-2"
                  >
                    <span class="mt-1 inline-block h-2 w-2 rounded-full bg-[#4caf4f]" />
                    <span>{{ spec }}</span>
                  </li>
                </ul>

                <p class="text-lg font-semibold text-gray-900">{{ type.price }}</p>

                <div class="flex flex-wrap gap-3">
                  
                  <button
                    v-for="action in type.actions"
                    :key="action"
                    @click="handleAction(action, type)"
                    class="btn btn-primary"
                  >
                    {{ action }}
                  </button>  
                </div>
              </div>

              <div class="relative flex justify-center mobile-slider-block">
                <LedSlider :images="getLoopImages(type.images)" :max-width="340" :height="510" />
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <WaveDivider top-color="#ffffff" bottom-color="#eef6ff" />

    <!-- Финальный CTA: форма обратной связи -->
    <section id="led-contact" class="bg-[#eef6ff]">
      <FeedbackForm :lift-order="selectedOrder" page-key="led-screens" />
    </section>

    <WaveDivider top-color="#eef6ff" bottom-color="#ffffff" flip />

    <!-- Вопросы по LED -->
    <section class="bg-white py-16 md:py-20">
      <div class="container mx-auto px-6 lg:px-12">
        <FaqLed />
      </div>
    </section>

    <Footer />
  </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import FeedbackForm from '@/components/FeedbackForm.vue'
import WaveDivider from '@/components/WaveDivider.vue'
import FaqLed from '@/components/FaqLed.vue'
import LedSlider from '~/components/LedSlider.vue'
import led1 from '@/assets/led-screens1.png'
import led2 from '@/assets/led-screens2.png'
import led3 from '@/assets/led-screens3.png'
import led4 from '@/assets/led-screens4.png'
import led5 from '@/assets/led-screens5.png'
import led6 from '@/assets/led-screens6.png'
import led7 from '@/assets/led-screens7.png'
import led8 from '@/assets/led-screens8.png'
import led9 from '@/assets/led-screens9.png'
import led10 from '@/assets/led-screens10.png'
import led11 from '@/assets/led-screens11.png'
import led12 from '@/assets/led-screens12.png'
import led13 from '@/assets/led-screens13.png'

useSeoMeta({
  title: 'Реклама на уличных LED экранах в Караганде GreenW',
  description:
    'Размещение видеорекламы на 26 уличных LED экранах по всему городу Караганда охват до 30 000 человек в сутки форматы 8–60 секунд GreenW',
  ogTitle: 'Реклама на уличных LED экранах в Караганде GreenW',
  ogDescription:
    'Размещение видеорекламы на 26 уличных LED экранах по всему городу Караганда охват до 30 000 человек в сутки форматы 8–60 секунд GreenW'
})

type ScreenType = {
  id: string
  title: string
  description?: string
  size?: string
  specs: string[]
  price: string
  actions: string[]
  images?: string[]
  presentationUrl?: string
}

const noop = () => {}

const ledSlides = ref<string[]>([
  led1,
  led2,
  led3,
  led4,
  led5,
  led6,
  led7,
  led8,
  led9,
  led10,
  led11,
  led12,
  led13
])

const shuffleSlides = (arr: string[]) => {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

onMounted(() => {
  ledSlides.value = shuffleSlides(ledSlides.value)
})

const ledLoopSlides = computed(() => [...ledSlides.value, ...ledSlides.value])

const presentationUrl = '/presend/led-ekrany-vdol-dorogi-20.pdf'
const rulesUrl = '/presend/pravila-izgotovleniya-cifrovogo-postera.pdf'
const cityMallPresentation = '/presend/Led-CityMall.pdf'
const cityMallTech = '/presend/teh-CITY-Mall.pdf'
const smartEcoPresentation = '/presend/Led-egm.pdf'

const selectedOrder = ref<{ name: string; id?: string; source: string } | null>({
  name: 'LED экраны',
  id: 'led-screens',
  source: 'led-screens'
})

const getLoopImages = (images?: string[]) =>
  images && images.length ? [...images, ...images] : ledLoopSlides.value

const showLedNav = ref(false)

const ledNavItems = computed(() =>
  screenTypes.map((item) => ({ id: item.id, title: item.title }))
)

const toggleLedNav = () => {
  showLedNav.value = !showLedNav.value
}

const scrollToType = (id: string) => {
  showLedNav.value = false
  if (typeof window !== 'undefined') {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}

const scrollToForm = () => scrollToType('led-contact')

const handleAction = (action: string, type?: ScreenType) => {
  const isCityMall = type?.title.includes('CITY Mall')
  const isSmartEco = type?.title.includes('Smart Eco')
  if (action === 'Заказать') {
    selectedOrder.value = type
      ? { name: type.title, id: type.id, source: 'led-screens' }
      : { name: 'LED наружные экраны', id: 'led-screens', source: 'led-screens' }
    const el = document.getElementById('led-contact')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    return
  }
  if (action === 'Скачать презентацию') {
    if (typeof window !== 'undefined') {
      const link =
        type?.presentationUrl ??
        (isCityMall
          ? cityMallPresentation
          : isSmartEco
            ? smartEcoPresentation
            : presentationUrl)
      window.open(link, '_blank')
    }
    return
  }
  if (action === 'Правила') {
    if (typeof window !== 'undefined') {
      window.open(rulesUrl, '_blank')
    }
    return
  }
  noop()
}

const advantages = [
  {
    title: 'От 200 до 1000 показов в день',
    text: 'Ролик демонстрируется регулярно и стабильно'
  },
  {
    title: 'Хронометраж 8–60 секунд',
    text: 'Длинные и короткие ролики под любую задачу'
  },
  {
    title: 'Высокий охват города',
    text: 'Экраны стоят вдоль дорог и в самых проходимых точках'
  },
  {
    title: 'Имиджевый эффект',
    text: 'Уличный LED экран усиливает статус бренда и повышает доверие'
  }
]

const screenTypes: ScreenType[] = [
  {
    id: 'led-road',
    title: 'LED экраны вдоль дорог',
    description:
      '📍 10 экранов на самых оживленных улицах: Пр Бухар Жырау, ул Гоголя, ул Ерубаева, пр Республики, ул Ермекова, ул Сарыарка',
    size: 'Размер 5,76 × 1,92 м • 2,88 × 1,92 м',
    specs: [
      'Автоохват до 30 000 в сутки',
      'Длительность ролика 8 секунд',
      'Показы 540 в сутки',
      'Размещение от 7 дней'
    ],
    price: 'Стоимость от 50 000 ₸ до 350 000 ₸ за 1 монитор',
    actions: ['Скачать презентацию', 'Правила', 'Заказать'],
    images: [led8, led9, led10, led11]
  },
  {
    id: 'led-arbat',
    title: 'LED экран на Арбате',
    description: 'Охват до 6 000 человек в сутки',
    specs: [
      'Длительность ролика 8 секунд',
      'Показы от 200 в сутки',
      'Размещение от 30 дней'
    ],
    price: 'Стоимость от 30 000 ₸ в месяц',
    actions: ['Скачать презентацию', 'Заказать'],
    images: [led12, led13],
    presentationUrl: '/presend/LED-arbat.pdf'
  },
  {
    id: 'led-city-mall',
    title: 'LED экран при ТРЦ «CITY Mall»',
    description: 'Охват до 10 000',
    specs: [
      'Длительность ролика от 10 секунд',
      'Показы от 100 в сутки',
      'Размещение от 7 дней'
    ],
    price: 'Стоимость от 50 000 ₸ до 300 000 ₸ за 1 конструкцию',
    actions: ['Скачать презентацию', 'Заказать'],
    images: [led1, led2]
  },
  {
    id: 'led-smart-eco',
    title: 'Smart Eco Led Smart Media Board',
    description:
      '📍 Вдоль дорог, на ключевых перекрестках и трассах: Центральный Парк Культуры и Отдыха, Сквер Абдирова Ерубаева, 45 квартал, Цирк, Акнар, Юбилейный, Караганда Арена, БЦ «Бульвар», Акимат, пр Республики, ул Ермекова, ул Сарыарка',
    size: 'Размер 6 × 2 м • 1,8 × 1 м',
    specs: [
      'Охват до 30 000 в сутки',
      'Длительность ролика от 10 секунд',
      'Показы 720 в сутки',
      'Размещение от 30 дней'
    ],
    price: 'Стоимость от 150 000 ₸ до 420 000 ₸ за 1 монитор',
    actions: ['Скачать презентацию', 'Правила', 'Заказать'],
    images: [led3, led4, led5, led6, led7],
    presentationUrl: '/presend/Led-Smart.pdf'
  }
]
</script>

<style scoped>
.btn {
  @apply inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition-all duration-200 md:text-base;
}

.btn-primary {
  @apply bg-[#4caf4f] text-white shadow hover:-translate-y-0.5 hover:shadow-lg;
}

.btn-outline {
  @apply border border-[#4caf4f] text-[#2e7d32] hover:bg-white/80 hover:-translate-y-0.5;
}

.pattern-dots {
  background-image: radial-gradient(circle at center, rgba(255, 255, 255, 0.35) 2px, transparent 0);
  background-size: 24px 24px;
}
</style>



