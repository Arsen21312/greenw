<!-- pages/screens/about.vue -->
<template>
  <main class="bg-white text-gray-900 scroll-smooth">
    <!-- ░░░ Навбар ░░░ -->
    <NavBar
      class="  bg-white/80 backdrop-blur supports-backdrop-blur:shadow-xl shadow-md"
    />

    <!-- ░░░ HERO ░░░ -->
    <section
      class="relative isolate overflow-hidden bg-gradient-to-br from-[#4caf4f] via-[#8ecb48] to-[#a8cc55] pt-28 pb-44 lg:pt-36 lg:pb-56"
    >
      <!-- шум-оверлей -->
      <div
        class="absolute inset-0 pointer-events-none mix-blend-overlay opacity-15 [mask-image:radial-gradient(circle,white,transparent)]"
      >
        <canvas ref="noise" class="h-full w-full" />
      </div>

      <!-- декоративные «капли» -->
      <Blob :size="540" extra-class="-top-56 -left-28 opacity-[0.10] blur-sm" />
      <Blob :size="420" extra-class="-bottom-44 -right-24 opacity-[0.14] blur-sm" />

      <!-- контент -->
      <div
        class="relative mx-auto max-w-5xl px-6 lg:px-12 text-center text-white"
      >
        <h1
          class="animate-pop text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight drop-shadow-xl mb-6"
        >
          Кто мы,<br class="hidden md:inline" />
          что делаем,<br class="hidden md:inline" />
          почему доверяют
        </h1>
        <p
          class="animate-pop delay-150 mx-auto max-w-3xl text-lg md:text-xl text-white/90"
        >
          Познакомьтесь с командой <strong>greenw.kz</strong> — вашим партнёром
          в офлайн-рекламе Караганды 
        </p>

        <NuxtLink
          to=""
          @click.prevent="openOrderModal('связаться')"
          class="cursor-pointer animate-pop delay-300 inline-block mt-10 rounded-full bg-white/90 px-14 py-4 font-semibold text-[#4caf4f] shadow-xl ring-2 ring-white/60 transition-all duration-300 hover:scale-105 hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white"
        >
          Связаться сейчас
        </NuxtLink>
      </div>

      <!-- волна -->
      <svg
        class="pointer-events-none absolute -bottom-px left-0 w-full fill-slate-50"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0 45c120 30 270 60 480 40s420-75 640-55 360 80 360 80v40H0Z"
        />
      </svg>
    </section>

    <!-- ░░░ Наша история ░░░ -->
    <section class="relative bg-gray-50 py-24 lg:py-32">
      <div
        class="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent_0,transparent_29px,#e5e7eb_30px)] opacity-[0.05]"
      />
      <div
        class="relative container mx-auto grid gap-12 px-6 lg:grid-cols-12 lg:px-12 items-center"
      >
        <Img
          src="/images/loggo.svg"
          width="640px"
          height="440px"
          alt="Наша история"
          class="lg:col-span-6 aspect-video rounded-[2.5rem] object-cover shadow-xl transition-transform duration-500 transform-gpu hover:rotate-2 hover:scale-105"
        />
        <div class="lg:col-span-6">
          <h2 class="section-heading mb-6"> Наша&nbsp;история</h2>
          <p class="paragraph mb-4">
            Привет! Мы — команда <strong>greenw.kz</strong>. Небольшое, но очень
            живое рекламное агентство из Караганды. Мы помогаем бизнесу стать
            заметнее — в лифтах, на экранах, в городе. Просто, честно и с полной
            отдачей.
          </p>
          <p class="paragraph mb-4">
            Всё началось спонтанно. Мы — обычные ребята, которые однажды
            задумались: «А как рассказать о бизнесе не через таргет и блогеров,
            а прямо здесь — в офлайне?»
          </p>
          <p class="paragraph">
            Так мы вспомнили формат, который почти забыли — рекламу в&nbsp;лифтах.
            Старый, казалось бы, метод. Но <em>новое — это хорошо забытое
            старое</em>. Мы попробовали. И знаете что? Это сработало. Мы не
            просто воскресили формат — мы сделали его снова рабочим.
          </p>
        </div>
      </div>
    </section>

    <!-- ░░░ Преимущества ░░░ -->
    <section class="bg-white py-24 lg:py-28">
      <div class="container mx-auto px-6 lg:px-12">
        <h2 class="section-heading mb-16 text-center">
           Реклама в&nbsp;лифтах — это не&nbsp;просто “листовка”
        </h2>

        <ul class="mx-auto grid max-w-6xl gap-8 lg:grid-cols-12">
          <Adv
            icon="📌"
            text="Повышает узнаваемость — люди видят ваш бренд каждый день"
            class="lg:col-span-4"
          />
          <Adv
            icon="🤝"
            text="Создаёт доверие — вы находитесь рядом, в своём районе"
            class="lg:col-span-4"
          />
          <Adv
            icon="💬"
            text="Даёт локальный охват — можно выбрать нужные районы"
            class="lg:col-span-4"
          />

          <Adv
            icon="💼"
            text="Работает на имидж — вас начинают воспринимать как «серьёзных»"
            class="lg:col-span-4 lg:col-start-3"
          />
          <Adv
            icon="💸"
            text="Приносит клиентов — особенно в сфере услуг и малого бизнеса"
            class="lg:col-span-4"
          />
        </ul>
      </div>
    </section>

    <!-- ░░░ Как появились экраны ░░░ -->
    <section class="relative overflow-hidden bg-gray-50 py-24 lg:py-32">
      <Blob :size="480" extra-class="-left-[18%] -top-48 opacity-10 blur-sm" />
      <Blob :size="360" extra-class="top-[30%] -right-[24%] opacity-10 blur-sm" />

      <div
        class="relative container mx-auto grid gap-12 px-6 lg:grid-cols-12 lg:px-12 items-center"
      >
        <div class="lg:col-span-6">
          <h2 class="section-heading mb-6"> Как у&nbsp;нас появились экраны</h2>
          <p class="paragraph mb-4">
            Честно? Мы не планировали. Подвернулся шанс взять в аренду несколько
            LED-экранов, и&nbsp;мы решили рискнуть. Запустили пару роликов —
            и&nbsp;поняли: <strong>это работает ещё круче</strong>.
          </p>
          <p class="paragraph">
            Теперь у&nbsp;нас экраны в&nbsp;торговых центрах, у&nbsp;вокзала,
            в&nbsp;парке, на&nbsp;дорогах. Видео привлекает взгляд, остаётся
            в&nbsp;памяти и&nbsp;повышает статус компании.
          </p>
        </div>

       <div class="lg:col-span-6 flex justify-center">
        <img
          src="/assets/svg/howled.webp"
          alt="Как у нас появились экраны"
          class="w-full h-auto rounded-3xl shadow-lg"
        />
      </div>
      </div>
    </section>

    <!-- ░░░ Крупные клиенты ░░░ -->
    <section class="bg-white py-16 lg:py-20 text-center">
      <div class="container mx-auto px-6 lg:px-12">
        <h2 class="text-2xl lg:text-3xl font-bold text-gray-800 mb-8">
          🔥 И тут произошло неожиданное
        </h2>
        <p class="text-base lg:text-lg text-gray-700 mb-10">
          Мы искренне думали, что наш формат только для малого бизнеса. Но к
          нам начали обращаться крупные компании: Home&nbsp;Bank, Dodo&nbsp;Pizza,
          Alma&nbsp;TV, Olymp&nbsp;Clinic, TEEZ и др.
        </p>
        <PartnersMarquee />
      </div>
    </section>

    <!-- ░░░ Сейчас у нас ░░░ -->
    <section class="bg-gray-50 py-16 lg:py-20">
      <div class="container mx-auto px-4 lg:px-8">
        <h2
          class="text-2xl lg:text-3xl font-bold text-gray-800 text-center mb-14"
        >
          📊 Сейчас у&nbsp;нас:
        </h2>

        <div
          class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 max-w-5xl mx-auto"
        >
          <div
            v-for="item in statsPreview"
            :key="item.label"
            :class="[
              'flex flex-col items-center justify-center gap-4 rounded-2xl bg-white/90 p-8 shadow-lg ring-1 ring-gray-100 transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl h-full',
              item.wide && 'min-w-[230px] md:min-w-[240px]'
            ]"
          >
            <p class="text-4xl md:text-5xl font-extrabold text-[#4caf4f] leading-tight text-center">
              <CountUp
                :to="item.value"
                :duration="1.2"
                :separator="item.separator"
              />
              <span v-if="item.suffix">{{ item.suffix }}</span>
            </p>
            <p
              class="text-center text-sm lg:text-base leading-snug text-gray-700"
              v-html="item.label"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- ░░░ Процесс ░░░ -->
    <section
      class="bg-gradient-to-r from-[#263818] to-[#8ecb48] py-28 lg:py-36 text-white"
    >
      <div class="container mx-auto max-w-screen-xl px-4 lg:px-8 text-center">
        <h2
          class="mb-12 text-3xl lg:text-4xl font-extrabold drop-shadow-xl"
        >
          💚 Мы делаем рекламу, которую действительно замечают
        </h2>
    <div class="max-w-screen-xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
  <!-- 1. Заявка -->
  <div class="flex flex-col items-center text-center text-white w-full">
    <img src="/assets/svg/order.svg" alt="Заявка" class="w-32 h-16 mb-4" />
    <h4 class="text-xl font-semibold">Заявка</h4>
    <p class="mt-2 text-base text-white/90">
      Выбираете расположение экрана, длину видео, количество показов
    </p>
  </div>

  <!-- 2. Оплата -->
  <div class="flex flex-col items-center text-center text-white w-full">
    <img src="/assets/svg/pay.svg" alt="Оплата" class="w-32 h-16 mb-4" />
    <h4 class="text-xl font-semibold">Оплата</h4>
    <p class="mt-2 text-base text-white/90">
      Заключаете договор и производите оплату
    </p>
  </div>

  <!-- 3. Согласование -->
  <div class="flex flex-col items-center text-center text-white w-full">
    <img src="/assets/svg/com.svg" alt="Согласование" class="w-32 h-16 mb-4" />
    <h4 class="text-xl font-semibold">Согласование</h4>
    <p class="mt-2 text-base text-white/90">
      Утверждаете дизайн видеорекламы
    </p>
  </div>

  <!-- 4. Размещение -->
  <div class="flex flex-col items-center text-center text-white w-full">
    <img src="/assets/svg/place.svg" alt="Размещение" class="w-32 h-16 mb-4" />
    <h4 class="text-xl font-semibold">Размещение</h4>
    <p class="mt-2 text-base text-white/90">
      Запускаем в любой день по желанию
    </p>
  </div>
</div>


        <NuxtLink
          to=""
          @click.prevent="openOrderModal('связаться')"
          class="cursor-pointer inline-block rounded-lg bg-white/90 px-10 py-4 font-semibold text-[#4caf4f] shadow-lg ring-2 ring-white/60 transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white"
        >
          Связаться с нами
        </NuxtLink>

      </div>
    </section>

    <ReviewsPreview />
    <Footer />

    <!-- Модалка заказа -->
    <OrderModal
      v-if="showOrderModal"
      :block="modalBlock"
      @close-order-modal="closeOrderModal"
    />
  </main>
</template>

<script setup lang="ts">
import { defineComponent, h, ref, nextTick, onMounted } from 'vue'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import PartnersMarquee from '@/components/PartnersMarquee.vue'
import OrderModal from '@/components/OrderModal.vue'
import ReviewsPreview from '@/components/ReviewsPreview.vue'
import logo from '@/assets/logo.svg'
import CountUp from '@/components/CountUp.vue'

useSeoMeta({
  title: 'О нас — GreenW Караганда',
  description: 'GreenW — локальное агентство: реклама в лифтах и на LED-экранах Караганды. Примеры работ, партнёры, контакты.',
  ogTitle: 'GreenW — о компании',
  ogDescription: 'Локальная экспертиза и реальный охват города.',
  twitterCard: 'summary_large_image',
  robots: 'index,follow'
})
useHead({ link: [{ rel: 'canonical', href: 'https://www.greenw.kz/we' }] })


/* ── Blob ── */
const Blob = defineComponent({
  props: { size: { type: Number, default: 400 }, extraClass: String },
  setup (props) {
    return () =>
      h(
        'svg',
        {
          width: props.size,
          height: props.size,
          viewBox: '0 0 600 600',
          class:
            'absolute pointer-events-none ' + (props.extraClass || ''),
          xmlns: 'http://www.w3.org/2000/svg',
          role: 'presentation'
        },
        [
          h('path', {
            fill: '#ffffff',
            'fill-opacity': '.95',
            d: 'M421,327Q382,414,295,433Q208,452,152,384Q96,316,93,221Q90,126,184,80Q278,34,353,91Q428,148,436,234Q444,320,421,327Z'
          })
        ]
      )
  }
})

/* ── Advantage ── */
const Adv = defineComponent({
  props: { icon: String, text: String },
  setup (props, { attrs }) {
    return () =>
      h(
        'li',
        {
          class: [
            'group relative flex items-start space-x-4 rounded-xl bg-gray-50 p-6 shadow transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl',
            attrs.class
          ]
        },
        [
          h(
            'span',
            {
              class:
                'flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4caf4f]/10 text-xl'
            },
            props.icon
          ),
          h(
            'p',
            { class: 'text-md lg:text-lg leading-relaxed text-gray-700' },
            props.text
          )
        ]
      )
  }
})

/* ── StatCard ── */
const statsPreview = [
  { value: 605, suffix: '+', label: 'лифтов с&nbsp;размещённой&nbsp;рекламой', separator: ' ' },
  { value: 28, suffix: '', label: 'экрана по&nbsp;всей&nbsp;Караганде', separator: '' },
  { value: 55200, suffix: '+', label: 'человек видят рекламу&nbsp;каждый&nbsp;день', separator: ' ' },
  { value: 150, suffix: '+', label: 'довольных&nbsp;клиентов', separator: ' ' }
]

/* ── canvas-noise ── */
const noise = ref<HTMLCanvasElement | null>(null)
onMounted(() =>
  nextTick(() => {
    if (!noise.value) return
    const ctx = noise.value.getContext('2d')!
    const { width: w, height: h } = noise.value
    const draw = () => {
      const id = ctx.createImageData(w, h)
      for (let i = 0; i < id.data.length; i += 4) {
        const v = Math.random() * 255
        id.data[i] = id.data[i + 1] = id.data[i + 2] = v
        id.data[i + 3] = 14 // чуть мягче
      }
      ctx.putImageData(id, 0, 0)
      requestAnimationFrame(draw)
    }
    draw()
  })
)

// состояние модалки
const showOrderModal = ref(false)
const modalBlock     = ref<{ name: string }>({ name: '' })

function openOrderModal(name: string) {
  modalBlock.value = { name }
  showOrderModal.value = true
}
function closeOrderModal() {
  showOrderModal.value = false
}
</script>

<style scoped>
.section-heading {
  @apply text-2xl lg:text-4xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#4caf4f] via-[#8ecb48] to-[#a8cc55];
}
.paragraph {
  @apply text-base lg:text-lg leading-relaxed text-gray-700;
}

/* HERO появление */
@keyframes pop {
  from {
    opacity: 0;
    transform: translateY(18px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
.animate-pop {
  animation: pop 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
}
.delay-150 {
  animation-delay: 0.15s;
}
.delay-300 {
  animation-delay: 0.3s;
}

/* бесконечный marquee */
@keyframes marquee {
  to {
    transform: translateX(-50%);
  }
}
.animate-marquee {
  animation: marquee 26s linear infinite;
}

/* когда пользователь отключил анимации */
@media (prefers-reduced-motion: reduce) {
  .animate-pop,
  .animate-marquee {
    animation: none !important;
  }
}
</style>
