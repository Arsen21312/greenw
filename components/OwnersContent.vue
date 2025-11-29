<template>
  <section class="bg-slate-50 text-slate-900">
    <div class="relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-br from-lime-50 via-white to-sky-50"></div>
      <div class="absolute -left-10 -top-10 h-64 w-64 rounded-full bg-lime-200 blur-3xl opacity-50 parallax"></div>
      <div class="absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-emerald-200 blur-3xl opacity-60 parallax delay-150"></div>

      <!-- Hero -->
      <div class="relative container mx-auto px-4 lg:px-8 pt-14 pb-20 grid lg:grid-cols-2 gap-12 items-center">
        <div class="space-y-6 reveal-on-scroll">
          <p class="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm ring-1 ring-emerald-100">
            Реклама в лифтах Караганды
          </p>
          <h1 class="text-4xl lg:text-5xl font-bold leading-tight text-slate-900">
            Просто зарабатывайте на своих лифтах вместе с GreenW.KZ
          </h1>
          <p class="text-lg text-slate-700 max-w-2xl">
            GreenW.KZ профессионально размещает рекламу в лифтах Караганды. Работаем официально, заключаем прозрачные договоры и вовремя оплачиваем аренду.
          </p>
          <p class="text-lg text-slate-700 max-w-2xl">
            Вы сдаёте небольшую площадь на стене лифта под аккуратный рекламный модуль — он не портит кабину и легко демонтируется при необходимости.
          </p>
          <div class="flex flex-wrap gap-4">
            <button @click="openOrderModal" class="px-6 py-3 rounded-full bg-emerald-500 text-white font-semibold shadow-lg shadow-emerald-200 hover:bg-emerald-600 transition-all duration-200 reveal-on-scroll">
              Получить предложение
            </button>
            <a href="https://wa.me/77776668204" target="_blank" rel="noopener noreferrer" class="px-6 py-3 rounded-full bg-white text-emerald-700 font-semibold shadow-md ring-1 ring-emerald-100 hover:ring-emerald-200 transition-all duration-200 reveal-on-scroll">
              Написать в WhatsApp
            </a>
          </div>
          <div class="flex flex-wrap gap-6 text-sm text-slate-600">
            <div class="flex items-center gap-2">
              <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
              Реклама в лифтах — прямой контакт с жителями
            </div>
            <div class="flex items-center gap-2">
              <span class="h-2 w-2 rounded-full bg-emerald-400"></span>
              С нами уже работают 250+ КСК и ОСИ с прозрачным доходом
            </div>
          </div>
        </div>
        <div class="relative reveal-on-scroll lg:justify-self-end">
          <div class="absolute -inset-4 bg-white/60 blur-2xl"></div>
          <div class="relative rounded-3xl bg-white shadow-xl ring-1 ring-emerald-100 overflow-hidden">
            <img :src="img" loading="lazy" alt="Рекламный стенд в лифте" class="w-full h-full object-cover" />
            <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4 text-white">
              <p class="text-sm font-semibold">Монтаж без следов и шума</p>
              <p class="text-xs text-white/80">Износостойкие конструкции, быстрая замена макетов</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <WaveDivider color="#f8fbff" />
    <div class="bg-[#f8fbff]">

    <!-- Интро -->
    <div class="container mx-auto px-4 lg:px-8 pb-8 lg:pb-12">
      <div class="grid lg:grid-cols-2 gap-10 items-center bg-white rounded-3xl shadow-xl shadow-emerald-50 ring-1 ring-emerald-100 p-8 lg:p-12 reveal-on-scroll">
        <div class="space-y-4">
          <h2 class="text-3xl font-semibold text-slate-900">Рекламное агентство GreenW.KZ</h2>
          <p class="text-lg text-slate-700">GreenW.KZ профессионально размещает рекламу в лифтах Караганды. Работаем официально, заключаем прозрачные договоры и своевременно производим выплаты.</p>
          <p class="text-lg text-slate-700">Вы сдаёте небольшую площадь на стене лифта под аккуратный рекламный модуль, который не портит кабину и легко демонтируется при необходимости.</p>
          <p class="text-lg text-slate-700">Реклама в лифтах — это прямой контакт с жителями. Мы подбираем контент под район, чтобы объявления были полезными и действительно читались.</p>
          <p class="text-lg text-slate-700">С нами уже работают 250+ КСК и ОСИ, и каждый месяц получают стабильный и прозрачный доход.</p>
        </div>
        <div class="grid sm:grid-cols-2 gap-4">
          <div class="card-soft">
            <p class="text-4xl font-bold text-emerald-500">24/7</p>
            <p class="text-slate-600">Поддержка и оперативный выезд: заменим или снимем стенд быстро.</p>
          </div>
          <div class="card-soft">
            <p class="text-4xl font-bold text-emerald-500">610×990</p>
            <p class="text-slate-600">Оптимальный размер стенда — подходит большинству лифтов без ущерба отделке.</p>
          </div>
          <div class="card-soft">
            <p class="text-4xl font-bold text-emerald-500">PVC</p>
            <p class="text-slate-600">Безопасный материал на антивандальном скотче — не портит и не царапает кабину.</p>
          </div>
          <div class="card-soft">
            <p class="text-4xl font-bold text-emerald-500">250+</p>
            <p class="text-slate-600">КСК и ОСИ уже получают стабильный доход. Подключаем без хлопот.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Как это работает -->
    <div class="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
      <div class="text-center space-y-3 mb-10 reveal-on-scroll">
        <p class="text-sm uppercase tracking-[0.2em] text-emerald-600">процесс</p>
        <h2 class="text-3xl lg:text-4xl font-bold text-slate-900">Как это работает</h2>
        <p class="text-lg text-slate-600">Три понятных шага — от заявки до стабильного дохода.</p>
      </div>
      <div class="grid md:grid-cols-3 gap-6">
        <div class="step-card reveal-on-scroll">
          <div class="icon-circle bg-emerald-100 text-emerald-600">1</div>
          <h3 class="text-xl font-semibold">Осматриваем лифты</h3>
          <p class="text-slate-600">Проводим согласование с ОСИ/КСК, фиксируем условия и готовим договор.</p>
        </div>
        <div class="step-card reveal-on-scroll delay-150">
          <div class="icon-circle bg-emerald-100 text-emerald-600">2</div>
          <h3 class="text-xl font-semibold">Монтаж за 1 день</h3>
          <p class="text-slate-600">Устанавливаем стенды без шума и мусора. При демонтаже не остаётся следов.</p>
        </div>
        <div class="step-card reveal-on-scroll delay-300">
          <div class="icon-circle bg-emerald-100 text-emerald-600">3</div>
          <h3 class="text-xl font-semibold">Регулярные выплаты</h3>
          <p class="text-slate-600">Платим по договору, можем предложить ежемесячную уборку вместо аренды.</p>
        </div>
      </div>
    </div>

    <!-- Почему нас выбирают -->
    <div class="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
      <div class="text-center space-y-3 mb-10 reveal-on-scroll">
        <p class="text-sm uppercase tracking-[0.2em] text-emerald-600">партнёрство</p>
        <h2 class="text-3xl lg:text-4xl font-bold text-slate-900">Почему нас выбирают</h2>
        <p class="text-lg text-slate-600">Делаем рекламу удобной для жильцов и выгодной для собственников лифтов.</p>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="item in reasons" :key="item.title" class="feature-card reveal-on-scroll">
          <div class="icon-box">{{ item.icon }}</div>
          <h3 class="text-xl font-semibold text-slate-900">{{ item.title }}</h3>
          <p class="text-slate-600">{{ item.text }}</p>
        </div>
      </div>
    </div>

    <!-- Особенности рекламы -->
    <div class="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
      <div class="grid lg:grid-cols-2 gap-10 items-center bg-white rounded-3xl shadow-lg shadow-slate-100 ring-1 ring-slate-100 p-8 lg:p-12 overflow-hidden">
        <div class="space-y-4 reveal-on-scroll">
          <p class="text-sm uppercase tracking-[0.2em] text-emerald-600">эффективность</p>
          <h2 class="text-3xl font-bold text-slate-900">Реклама с максимальной отдачей</h2>
          <p class="text-lg text-slate-700">Адаптируем сообщения под районы Караганды, чтобы жители видели актуальные предложения. Размещаем на популярных маршрутах и сопровождаем клиента на каждом этапе.</p>
          <ul class="space-y-3 text-slate-700">
            <li class="flex gap-3"><span class="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-400"></span>Индивидуальный контент и дизайн под аудиторию дома.</li>
            <li class="flex gap-3"><span class="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-400"></span>Широкий охват за счёт лифтов в ключевых районах города.</li>
            <li class="flex gap-3"><span class="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-400"></span>Конкурентные цены и гибкие условия для долгосрочных партнёров.</li>
            <li class="flex gap-3"><span class="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-400"></span>Поддержка, консультации и быстрая реакция на запросы.</li>
          </ul>
        </div>
        <div class="grid sm:grid-cols-2 gap-4 reveal-on-scroll">
          <div class="card-soft">
            <p class="text-xl font-semibold text-slate-900">Платим больше</p>
            <p class="text-slate-600">Арендные ставки выше рынка, плюс опция уборки лифта.</p>
          </div>
          <div class="card-soft">
            <p class="text-xl font-semibold text-slate-900">Чистота</p>
            <p class="text-slate-600">Аккуратный монтаж плакатов, быстрая замена и контроль состояния.</p>
          </div>
          <div class="card-soft">
            <p class="text-xl font-semibold text-slate-900">Надёжность</p>
            <p class="text-slate-600">Работа строго по договору и соблюдение сроков выплат.</p>
          </div>
          <div class="card-soft">
            <p class="text-xl font-semibold text-slate-900">Сервис</p>
            <p class="text-slate-600">Быстро реагируем на поломки и вопросы жильцов.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Преимущества для жителей -->
    <div class="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
      <div class="text-center space-y-3 mb-10 reveal-on-scroll">
        <p class="text-sm uppercase tracking-[0.2em] text-emerald-600">для жителей</p>
        <h2 class="text-3xl lg:text-4xl font-bold text-slate-900">Польза для дома</h2>
        <p class="text-lg text-slate-600">Реклама становится полезным сервисом, а не просто объявлениями.</p>
      </div>
      <div class="grid md:grid-cols-2 gap-6">
        <div v-for="perk in perks" :key="perk.title" class="benefit-card reveal-on-scroll">
          <div class="flex items-start gap-4">
            <div class="h-12 w-12 flex items-center justify-center rounded-2xl bg-amber-50 text-amber-600 text-2xl">{{ perk.icon }}</div>
            <div>
              <h3 class="text-xl font-semibold text-slate-900">{{ perk.title }}</h3>
              <p class="text-slate-600">{{ perk.text }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Квиз -->
    <div class="bg-gradient-to-r from-emerald-500 via-emerald-400 to-lime-400 py-14 lg:py-16">
      <div class="container mx-auto px-4 lg:px-8">
        <div class="max-w-3xl mx-auto bg-white/90 backdrop-blur rounded-3xl shadow-2xl shadow-emerald-200 ring-1 ring-white/60 p-8 lg:p-10 text-center space-y-4 reveal-on-scroll">
          <p class="text-sm uppercase tracking-[0.2em] text-emerald-600">квиз</p>
          <h2 class="text-3xl font-bold text-slate-900">Узнайте доход с лифтов вашего дома</h2>
          <p class="text-lg text-slate-700">Ответьте на 6 вопросов — подготовим выгодное предложение по аренде и покажем расчёт выплат.</p>
          <div class="reveal-on-scroll delay-150">
            <QuizForm />
          </div>
        </div>
      </div>
    </div>

    <!-- Технический блок -->
    <div class="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
      <div class="grid lg:grid-cols-2 gap-10 items-center bg-white rounded-3xl shadow-xl shadow-slate-100 ring-1 ring-slate-100 p-8 lg:p-12 overflow-hidden">
        <div class="space-y-4 reveal-on-scroll">
          <p class="text-sm uppercase tracking-[0.2em] text-emerald-600">конструкция</p>
          <h2 class="text-3xl font-bold text-slate-900">Технический стенд</h2>
          <ul class="space-y-3 text-slate-700">
            <li class="flex gap-3"><span class="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-400"></span>Размер 610×990 мм — хорошо читается и не мешает отделке.</li>
            <li class="flex gap-3"><span class="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-400"></span>Безопасный PVC толщиной 0,5 мм: гибкий, не ломается.</li>
            <li class="flex gap-3"><span class="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-400"></span>Серебристый оракал сверху и снизу по 30 мм — выглядит аккуратно.</li>
            <li class="flex gap-3"><span class="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-400"></span>Крепление на баннерный скотч — быстрое размещение без следов.</li>
          </ul>
          <div class="flex flex-wrap gap-3">
            <a href="https://www.instagram.com/greenw.kz" target="_blank" rel="noopener noreferrer" class="px-5 py-3 rounded-full bg-emerald-500 text-white font-semibold shadow-md hover:bg-emerald-600 transition-all duration-200">
              Смотреть видео процесса
            </a>
            <!-- обсудить монтаж кнопка 
            <button @click="openOrderModal" class="px-5 py-3 rounded-full bg-white text-emerald-700 font-semibold shadow ring-1 ring-emerald-100 hover:ring-emerald-200 transition-all duration-200">
              Обсудить монтаж
            </button> -->
          </div>
        </div>
        <div class="relative reveal-on-scroll">
          <div class="absolute -inset-6 bg-gradient-to-tr from-emerald-50 via-white to-lime-50 blur-3xl"></div>
          <div class="relative rounded-3xl overflow-hidden shadow-xl ring-1 ring-slate-100">
            <img :src="img" loading="lazy" alt="Конструкция рекламного стенда" class="w-full h-full object-cover" />
            <div class="absolute inset-0 pointer-events-none">
              <div class="label" style="top:12%;left:18%;">Гибкий PVC</div>
              <div class="label" style="top:35%;right:12%;">610×990 мм</div>
              <div class="label" style="bottom:26%;left:20%;">Баннерный скотч</div>
              <div class="label" style="bottom:10%;right:18%;">Серебристый оракал</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Финальный CTA -->
    <div class="container mx-auto px-4 lg:px-8 pb-16">
      <div class="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-sky-400 text-white p-8 lg:p-12 shadow-2xl reveal-on-scroll">
        <div class="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/20 blur-3xl"></div>
        <div class="absolute right-0 bottom-0 h-48 w-48 rounded-full bg-white/10 blur-3xl"></div>
        <div class="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div class="space-y-3 max-w-2xl">
            <h2 class="text-3xl lg:text-4xl font-bold">Готовы начать сотрудничество?</h2>
            <p class="text-lg text-white/90">Свяжитесь с нами — расскажем, как превратить лифты вашего дома в источник дохода и оставить жильцам полезные объявления.</p>
          </div>
          <div class="flex flex-wrap gap-4">
            <button @click="openOrderModal" class="px-6 py-3 rounded-full bg-white text-emerald-700 font-semibold shadow-lg hover:-translate-y-0.5 transition-all duration-200">
              Оставить заявку
            </button>
            <a href="https://wa.me/77776668204" target="_blank" rel="noopener noreferrer" class="px-6 py-3 rounded-full bg-emerald-700/60 text-white font-semibold shadow-lg ring-1 ring-white/50 hover:bg-emerald-700 transition-all duration-200">
              Написать в WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>

    <OrderModal v-if="isOrderModalOpen" :block="block" @close-order-modal="closeOrderModal" />
    </div>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import WaveDivider from '@/components/WaveDivider.vue'
import QuizForm from '@/components/QuizForm.vue'
import OrderModal from '@/components/OrderModal.vue'
import img from '@/assets/3.webp'

const isOrderModalOpen = ref(false)

const block = {
  name: 'Реклама в лифтах'
}

const reasons = [
  {
    icon: '💸',
    title: 'Высокие выплаты',
    text: 'Платим больше рынка и предлагаем альтернативу в виде уборки лифта.'
  },
  {
    icon: '🛠️',
    title: 'Качественный монтаж',
    text: 'Стенды выглядят стильно, крепятся без следов, легко демонтируются.'
  },
  {
    icon: '🧹',
    title: 'Чистота и порядок',
    text: 'Работаем без шума и мусора, быстро реагируем на поломки.'
  },
  {
    icon: '🤝',
    title: 'Честные договоры',
    text: 'Соблюдаем условия и сроки выплат, держим связь с жильцами.'
  }
]

const perks = [
  {
    icon: '🏡',
    title: 'Дополнительный доход',
    text: 'Средства от аренды снижают расходы на содержание и благоустройство дома.'
  },
  {
    icon: '💚',
    title: 'Приятные скидки',
    text: 'Рекламодатели дают специальные условия тем, кто увидел объявление в лифте.'
  },
  {
    icon: '📰',
    title: 'Всегда в курсе',
    text: 'Только актуальные акции, вакансии и сервисы рядом с жильцами.'
  },
  {
    icon: '📱',
    title: 'Информация под рукой',
    text: 'Нужно позвонить — сфотографируйте объявление и сделайте звонок из квартиры.'
  }
]

const openOrderModal = () => {
  isOrderModalOpen.value = true
}

const closeOrderModal = () => {
  isOrderModalOpen.value = false
}

let revealObserver

onMounted(() => {
  if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
    document.querySelectorAll('.reveal-on-scroll').forEach((el) => el.classList.add('reveal-visible'))
    return
  }

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible')
          revealObserver?.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15 }
  )

  document.querySelectorAll('.reveal-on-scroll').forEach((el) => revealObserver.observe(el))
})

onBeforeUnmount(() => {
  revealObserver?.disconnect()
})
</script>

<style scoped>
.section {
  scroll-behavior: smooth;
}
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(16px);
  transition: all 0.9s cubic-bezier(0.25, 0.1, 0.25, 1);
}
.reveal-on-scroll.delay-150 {
  transition-delay: 0.15s;
}
.reveal-on-scroll.delay-300 {
  transition-delay: 0.3s;
}
.reveal-visible {
  opacity: 1;
  transform: translateY(0);
}
.card-soft {
  @apply rounded-2xl bg-white shadow-md shadow-emerald-50 ring-1 ring-emerald-100 p-5 flex flex-col gap-2;
}
.step-card {
  @apply rounded-2xl bg-white shadow-lg shadow-emerald-50 ring-1 ring-emerald-100 p-6 space-y-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl;
}
.feature-card {
  @apply rounded-2xl bg-white shadow-lg shadow-emerald-50 ring-1 ring-emerald-100 p-6 space-y-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl;
}
.icon-circle {
  @apply h-12 w-12 flex items-center justify-center rounded-full font-semibold;
}
.icon-box {
  @apply h-12 w-12 flex items-center justify-center rounded-2xl bg-emerald-50 text-2xl;
}
.benefit-card {
  @apply rounded-2xl bg-amber-50/60 ring-1 ring-amber-100 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-100;
}
.label {
  @apply absolute px-3 py-1 rounded-full bg-black/60 text-white text-xs backdrop-blur;
}
.parallax {
  animation: float 9s ease-in-out infinite;
}
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-12px);
  }
}
</style>

<!-- Анимация: элементы с классами reveal-on-scroll получают класс reveal-visible через Intersection Observer; parallax-элементы создают мягкое движение фона. -->
