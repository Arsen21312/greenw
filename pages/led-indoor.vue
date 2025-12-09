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
            LED экраны внутри помещений
          </span>

          <h1 class="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-snug md:leading-snug lg:leading-tight text-gray-900">
            Реклама на LED экранах внутри помещений
          </h1>

          <p class="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
            Ваш ролик видят там, где люди ежедневно проходят, ждут и совершают покупки
          </p>

          <div class="space-y-4 text-base sm:text-lg leading-relaxed text-gray-700">
            <p>Мы размещаем видеорекламу на экранах в супермаркетах, ТЦ и на вокзале.</p>
            <p>68 экранов по всей Караганде. Быстрый запуск от 1 дня.</p>
            <p>Формат идеально подходит для акций, открытия нового филиала и повышения узнаваемости бренда.</p>
          </div>

          <div class="flex flex-wrap gap-4 pt-4">
            <div class="relative">
              <button @click="toggleLedNav" class="btn btn-primary">
                Все локации
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
          <div class="led-slider-viewport bg-white/80">
            <div class="led-slider-track">
              <div
                v-for="(image, index) in ledLoopSlides"
                :key="`led-indoor-${index}`"
                class="led-slider-card"
              >
                <img
                  :src="image"
                  alt="Реклама на LED экранах внутри помещений"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
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
            Экранная реклама там, где люди ходят каждый день, ждут и совершают покупки
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
        <div class="max-w-3xl space-y-3 text-center mx-auto">
          <h2 class="text-3xl font-extrabold text-gray-900 md:text-4xl">
            Выберите локацию и посмотрите трафик, пример экрана и стоимость размещения
          </h2>
          <p class="text-base text-gray-600 md:text-lg">
            Каждая локация — это несколько экранов в самых проходимых местах города
          </p>
        </div>

        <div class="space-y-8">
          <article
            :id="type.id"
            v-for="(type, idx) in screenTypes"
            :key="type.title"
            class="flex h-full flex-col gap-6 rounded-3xl bg-gray-50/80 p-8 shadow-sm ring-1 ring-gray-100 transition duration-200 hover:-translate-y-1 hover:shadow-lg"
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

              <div class="relative flex justify-center">
                <div class="led-slider-viewport bg-white/80">
                  <div class="led-slider-track">
                    <div
                      v-for="(image, imageIdx) in getLoopImages(type.images)"
                      :key="`type-${idx}-img-${imageIdx}`"
                      class="led-slider-card"
                    >
                      <img
                        :src="image"
                        :alt="`Фотография ${type.title}`"
                        class="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <WaveDivider top-color="#ffffff" bottom-color="#eef6ff" />

    <!-- Финальный CTA: форма обратной связи -->
    <section id="led-contact" class="bg-[#eef6ff]">
      <FeedbackForm :lift-order="selectedOrder" />
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
import NavBar from '@/components/NavBar.vue'
import FeedbackForm from '@/components/FeedbackForm.vue'
import WaveDivider from '@/components/WaveDivider.vue'
import FaqLed from '@/components/FaqLed.vue'
import Footer from '@/components/Footer.vue'
// indoor временные фото из public/exampleled
const heroImages = [
  '/exampleled/GCP1.png',
  '/exampleled/GCP2.png',
  '/exampleled/ledbig1.png',
  '/exampleled/ledbig2.png',
  '/exampleled/ledbig3.png',
  '/exampleled/smarteco1.png',
  '/exampleled/smarteco2.png',
  '/exampleled/tair1.png',
  '/exampleled/tair2.png',
  '/exampleled/tair3.png',
  '/exampleled/tair4.png',
  '/exampleled/tair5.png'
]

useSeoMeta({
  title: 'Реклама на LED экранах внутри помещений в Караганде GreenW',
  description:
    'Видеореклама на LED экранах в супермаркетах, ТЦ и на вокзале Караганды 68 экранов по городу, быстрый запуск от 1 дня, форматы 10–30 секунд',
  ogTitle: 'Реклама на LED экранах внутри помещений в Караганде GreenW',
  ogDescription:
    'Видеореклама на LED экранах в супермаркетах, ТЦ и на вокзале Караганды 68 экранов по городу, быстрый запуск от 1 дня, форматы 10–30 секунд'
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
}

const noop = () => {}

const ledSlides = ref<string[]>([...heroImages])

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
const cityMallPresentation = '/presend/prise-CITY-Mall.pdf'
const cityMallTech = '/presend/teh-CITY-Mall.pdf'
const smartEcoPresentation = '/presend/Led-egm.pdf'

const selectedOrder = ref<{ name: string; id?: string; source: string } | null>({
  name: 'LED indoor',
  id: 'led-indoor',
  source: 'led-indoor'
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
  if (action === 'Заказать') {
    selectedOrder.value = type
      ? { name: type.title, id: type.id, source: 'led-indoor' }
      : { name: 'LED indoor', id: 'led-indoor', source: 'led-indoor' }
    const el = document.getElementById('led-contact')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    return
  }
  if (action === 'Скачать презентацию') {
    if (typeof window !== 'undefined') {
      window.open(presentationUrl, '_blank')
    }
    return
  }
  if (action === 'Характеристики к видео') {
    if (typeof window !== 'undefined') {
      window.open(rulesUrl, '_blank')
    }
    return
  }
  noop()
}

const advantages = [
  {
    title: 'Высокая видимость',
    text: 'Экраны стоят в ключевых точках города'
  },
  {
    title: 'До 400 показов в день',
    text: 'Стабильная частота контакта с вашим роликом'
  },
  {
    title: '10–30 секунд ролика',
    text: 'Этого достаточно, чтобы донести главную выгоду'
  },
  {
    title: 'Есть звук',
    text: 'Реклама лучше удерживает внимание и запоминается'
  }
]

const screenTypes: ScreenType[] = [
  {
    id: 'indoor-green-city-park',
    title: 'Монитор в ЖК Green City Park',
    description: 'Улица Ержанова, 34/1',
    specs: [
      'Проходимость: 7 500 человек в день',
      'Охват: 4 500 человек в день',
      'Расположение: рядом кассы супермаркета City Market, банкоматы и лестница на второй этаж в столовую и бизнес-центр',
      'Время работы: 15 часов в день',
      'Длительность ролика: от 10 до 25 секунд',
      'Показы: от 200 до 400 в сутки',
      'Размещение: 7 или 30 дней'
    ],
    price: 'Стоимость от 10 000 ₸ до 50 000 ₸ в месяц',
    actions: ['Скачать презентацию', 'Характеристики к видео', 'Заказать'],
    images: ['/exampleled/GCP1.png', '/exampleled/GCP2.png', '/exampleled/GCP3.jpg']
  },
  {
    id: 'indoor-railway-station',
    title: 'Мониторы Ж/Д вокзала',
    description: 'Привокзальная площадь, 1',
    specs: [
      'Проходимость: 22 000 человек в день',
      'Охват: 14 000 человек в день',
      'Расположение: экран №1 — напротив рамок металлодетектора и выхода на перрон, экран №2 — напротив мест ожидания в зале ожидания',
      'Время работы: 24 часа в сутки',
      'Длительность ролика: от 10 до 25 секунд',
      'Показы: от 200 до 400 в сутки',
      'Размещение: 7 или 30 дней',
      'Количество мониторов: 2, работают в связке и продаются только в паре'
    ],
    price: 'Стоимость от 20 000 ₸ до 100 000 ₸ в месяц',
    actions: ['Скачать презентацию', 'Характеристики к видео', 'Заказать'],
    images: ['/exampleled/ledbig1.png', '/exampleled/ledbig2.png', '/exampleled/ledbig3.png']
  },
  {
    id: 'indoor-tair',
    title: 'Мониторы ТД «Таир»',
    description: 'Проспект Бухар Жырау, стр 88/2',
    specs: [
      'Проходимость: 20 000 человек в день',
      'Охват: 12 000 человек в день',
      'Расположение: два LED экрана на 1 этаже, ещё восемь мониторов на 2 и 4 этажах в зоне фуд-корта',
      'Время работы: 15 часов в день',
      'Длительность ролика: от 10 секунд',
      'Показы: 3 показа в час',
      'Размещение: от 30 дней',
      'Количество мониторов: 10, продаются только пакетом'
    ],
    price: 'Стоимость 40 000 ₸ в месяц',
    actions: ['Скачать презентацию', 'Характеристики к видео', 'Заказать'],
    images: ['/exampleled/tair1.png', '/exampleled/tair2.png', '/exampleled/tair3.png']
  },
  {
    id: 'indoor-vostok-ayan',
    title: 'ТД «Восток», супермаркет «Аян»',
    description: '12-й микрорайон, 51/1',
    specs: [
      'Проходимость: 20 000 человек в день',
      'Охват: 12 000 человек в день',
      'Расположение: рядом кассы супермаркета Аян, банкоматы, аптека и эскалаторы на второй этаж',
      'Время работы: 15 часов в день',
      'Длительность ролика: от 10 до 25 секунд',
      'Показы: от 200 до 400 в сутки',
      'Размещение: 7 или 30 дней'
    ],
    price: 'Стоимость от 10 000 ₸ до 50 000 ₸ в месяц',
    actions: ['Скачать презентацию', 'Характеристики к видео', 'Заказать'],
    images: ['/exampleled/ledbig4.png', '/exampleled/ledbig5.png', '/exampleled/ledbig.jpg']
  },
  {
    id: 'indoor-southern-chain',
    title: 'Мониторы в сетях супермаркетов «Южный»',
    description:
      '7 локаций: ТД «Таир», ТД «Абзал», ТД «Город», ТД «Галерея», ТД «Айман», ул Зелинского 28А, 17 мкр-н, д 41',
    specs: [
      'В каждом супермаркете от 5 до 10 мониторов',
      'Экраны в самых проходимых местах: возле касс и оживлённых прилавков',
      'Звуковое сопровождение рекламы по всему супермаркету',
      'Время работы: 13 часов в день',
      'Длительность ролика: до 30 секунд',
      'Показы: от 4 до 6 показов в час',
      'Размещение: от 30 дней'
    ],
    price:
      'Стоимость от 50 000 ₸ в месяц за одну локацию или от 100 000 ₸ в месяц за все локации',
    actions: ['Скачать презентацию', 'Характеристики к видео', 'Заказать'],
    images: ['/exampleled/smarteco1.png', '/exampleled/smarteco2.png', '/exampleled/smarteco3.png']
  },
  {
    id: 'indoor-belarus-damezhan',
    title: 'Мониторы в магазинах «Белорусские продукты» и магазине «Дамежан»',
    description: '4 локации: ул Бухар Жырау 74, ул Бухар Жырау 75/3, ул Аманжолова 29/1, пр Н Назарбаева 7',
    specs: [
      'В каждом магазине от 3 до 7 мониторов',
      'Звуковое сопровождение рекламы по всему магазину',
      'Время работы: 11 часов в день',
      'Длительность ролика: до 30 секунд',
      'Показы: 6 показов в час',
      'Размещение: от 30 дней'
    ],
    price: 'Стоимость 25 000 ₸ в месяц за одну локацию',
    actions: ['Скачать презентацию', 'Характеристики к видео', 'Заказать'],
    images: ['/exampleled/ledbig1.png', '/exampleled/ledbig2.png', '/exampleled/ledbig3.png']
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

.led-slider-viewport {
  position: relative;
  width: 100%;
  max-width: 960px;
  height: 100%;
  min-height: 16rem;
  overflow: hidden;
  border-radius: 18px;
  background: #f8fbf4;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
}

.led-slider-track {
  display: flex;
  gap: 14px;
  width: max-content;
  height: 100%;
  animation: led-slide-left 36s linear infinite;
}

.led-slider-card {
  flex: 0 0 calc((100% - 28px) / 3);
  min-width: 220px;
  max-width: 320px;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
}

.led-slider-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@keyframes led-slide-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@media (max-width: 1024px) {
  .led-slider-viewport {
    max-width: 100%;
    min-height: 15rem;
  }
  .led-slider-card {
    flex: 0 0 calc((100% - 20px) / 2);
  }
}

@media (max-width: 640px) {
  .led-slider-viewport {
    max-width: calc(100vw - 32px);
    margin: 0 auto;
    min-height: 16rem;
  }
  .led-slider-card {
    flex: 0 0 75%;
    min-width: 180px;
    max-width: 280px;
    height: 100%;
  }
  .led-slider-track {
    animation: led-slide-left 32s linear infinite;
    height: 100%;
  }
  .led-slider-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
