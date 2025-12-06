<template>
  <main class="bg-white text-gray-900">
    <NavBar class="bg-white/85 backdrop-blur supports-backdrop-blur:shadow-md shadow" />

    <!-- Hero -->
    <section
      class="relative overflow-hidden bg-gradient-to-br from-[#f6ffe9] via-white to-[#e3f4d9] pt-28 pb-16 md:pt-32 md:pb-24"
    >
      <div
        class="pointer-events-none absolute inset-0 opacity-60"
        aria-hidden="true"
      >
        <div class="absolute -left-24 top-12 h-72 w-72 rounded-full bg-[#a8cc55]/30 blur-3xl" />
        <div class="absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-[#4caf4f]/25 blur-3xl" />
      </div>

      <div class="container mx-auto grid items-center gap-12 px-6 lg:grid-cols-2">
        <div class="relative space-y-6">
          <span
            class="inline-flex items-center rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-[#2e7d32] shadow"
          >
            LED экраны по всей Караганде
          </span>

          <h1 class="text-4xl font-extrabold leading-tight text-gray-900 md:text-5xl">
            Реклама на уличных LED экранах города
          </h1>

          <p class="text-lg text-gray-700 md:text-xl">
            Ваш бренд видят тысячи людей каждый день, на дорогах, в центре города и возле крупных ТЦ
          </p>

          <div class="space-y-4 text-base leading-relaxed text-gray-700 md:text-lg">
            <p>Мы размещаем видеорекламу на 26 уличных LED экранах по всему городу.</p>
            <p>Эти экраны находятся вдоль дорог, на стенах зданий и на ключевых городских точках.</p>
            <p>Формат отлично работает на узнаваемость, охват и эффект «вижу каждый день».</p>
          </div>

          <div class="flex flex-wrap gap-4 pt-4">
            <button @click="noop" class="btn btn-primary">
              Скачать презентацию
            </button>
            <button @click="noop" class="btn btn-outline">
              Оставить заявку
            </button>
          </div>
        </div>

        <div class="relative flex justify-center lg:justify-end">
          <div class="led-slider-viewport bg-white/80">
            <div class="led-slider-track">
              <div
                v-for="(image, index) in ledLoopSlides"
                :key="`led-${index}`"
                class="led-slider-card"
              >
                <img
                  :src="image"
                  alt="Реклама на уличных LED экранах"
                  class="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

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

    <!-- Типы экранов -->
    <section class="bg-white py-16 md:py-24">
      <div class="container mx-auto space-y-10 px-6">
        <div class="max-w-3xl space-y-3 text-center mx-auto">
          <h2 class="text-3xl font-extrabold text-gray-900 md:text-4xl">
            Выберите вид экрана и посмотрите трафик, пример экрана и стоимость размещения
          </h2>
          <p class="text-base text-gray-600 md:text-lg">
            На мобиле блоки идут в одну колонку, на десктопе в две — как удобный каталог форматов.
          </p>
        </div>

        <div class="space-y-8">
          <article
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

    <!-- Финальный CTA: форма обратной связи -->
    <section id="led-contact" class="bg-[#eef6ff]">
      <FeedbackForm />
    </section>

    <Footer />
  </main>
</template>

<script setup lang="ts">
import FeedbackForm from '@/components/FeedbackForm.vue'
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
  title: string
  description?: string
  size?: string
  specs: string[]
  price: string
  actions: string[]
  images?: string[]
}

const noop = () => {}

const ledSlides = [
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
]

const ledLoopSlides = [...ledSlides, ...ledSlides]

const presentationUrl = '/presend/led-ekrany-vdol-dorogi-20.pdf'
const rulesUrl = '/presend/pravila-izgotovleniya-cifrovogo-postera.pdf'
const cityMallPresentation = '/presend/prise-CITY-Mall.pdf'
const cityMallTech = '/presend/teh-CITY-Mall.pdf'
const smartEcoPresentation = '/presend/Led-egm.pdf'

const getLoopImages = (images?: string[]) =>
  images && images.length ? [...images, ...images] : ledLoopSlides

const handleAction = (action: string, type?: ScreenType) => {
  const isCityMall = type?.title.includes('CITY Mall')
  const isSmartEco = type?.title.includes('Smart Eco')
  if (action === 'Заказать') {
    const el = document.getElementById('led-contact')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    return
  }
  if (action === 'Скачать презентацию') {
    if (typeof window !== 'undefined') {
      const link = isCityMall
        ? cityMallPresentation
        : isSmartEco
          ? smartEcoPresentation
          : presentationUrl
      window.open(link, '_blank')
    }
    return
  }
  if (action === 'Характеристики к видео') {
    if (typeof window !== 'undefined') {
      window.open(isCityMall ? cityMallTech : rulesUrl, '_blank')
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
    actions: ['Скачать презентацию', 'Характеристики к видео', 'Заказать'],
    images: [led8, led9, led10, led11]
  },
  {
    title: 'LED экран на Арбате',
    description: 'Охват до 6 000 человек в сутки',
    specs: [
      'Длительность ролика 8 секунд',
      'Показы от 200 в сутки',
      'Размещение от 30 дней'
    ],
    price: 'Стоимость от 30 000 ₸ в месяц',
    actions: ['Скачать презентацию', 'Заказать'],
    images: [led12, led13]
  },
  {
    title: 'LED экран при ТРЦ «CITY Mall» и ДКГ «Горняков»',
    description: 'Охват до 10 000',
    specs: [
      'Длительность ролика от 10 секунд',
      'Показы от 100 в сутки',
      'Размещение от 7 дней'
    ],
    price: 'Стоимость от 50 000 ₸ до 300 000 ₸ за 1 конструкцию',
    actions: ['Скачать презентацию', 'Характеристики к видео', 'Заказать'],
    images: [led1, led2]
  },
  {
    title: 'Smart Eco Led Smart Media Board',
    description:
      '📍 Вдоль дорог, на ключевых перекрестках и трассах: Центральный Парк Культуры и Отдыха, Сквер Абдирова Ерубаева, 45 квартал, Цирк, Акнар, Юбилейный, Караганда Арена, БЦ «Бульвар», Акимат, пр Республики, ул Ермекова, ул Сарыарка',
    size: 'Размер 6 × 2 м • 1,8 × 1 м',
    specs: [
      'Охват до 30 000 в сутки',
      'Длительность ролика от 10 секунд',
      'Показы 540 в сутки',
      'Размещение от 30 дней'
    ],
    price: 'Стоимость от 150 000 ₸ до 450 000 ₸ за 1 монитор',
    actions: ['Скачать презентацию', 'Заказать'],
    images: [led3, led4, led5, led6, led7]
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
  }
  .led-slider-card {
    flex: 0 0 calc((100% - 20px) / 2);
  }
}

@media (max-width: 640px) {
  .led-slider-card {
    flex: 0 0 75%;
    min-width: 180px;
  }
}
</style>
