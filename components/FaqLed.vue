<!-- components/FaqSection.vue -->
<template>
  <section class="faq-section py-12">
    <div class="container mx-auto">
      <h2 class="text-4xl md:text-5xl font-bold mb-8 text-center text-primary">Вопросы и ответы по LED</h2>
      <TransitionGroup name="faq-list" tag="div">
        <FaqItem
          v-for="faq in visibleFaqs"
          :key="faq.id"
          :id="faq.id"
          :question="faq.question"
          :answer="faq.answer"
          @toggle="handleToggle"
        />
      </TransitionGroup>

      <div v-if="hasMore" class="mt-6 text-center">
        <button
          type="button"
          class="inline-flex items-center justify-center px-6 py-3 rounded-full bg-white text-slate-800 font-semibold shadow border border-slate-200 hover:border-slate-400 transition"
          @click="toggleAll"
        >
          {{ showAll ? 'Скрыть вопросы' : 'Показать все' }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useRoute } from 'vue-router'
import FaqItem from '@/components/FaqItem.vue'

const ledOutdoorFaqs = [
  {
    id: 1,
    question: 'Где размещены экраны?',
    answer:
      'У нас 26 экранов по всей Караганде в самых топовых локациях: на оживлённых перекрёстках, вдоль дорог, около парковой зоны.'
  },
  {
    id: 2,
    question: 'Сколько стоит размещение?',
    answer:
      'Цена от 30 000₸ до 420 000₸ в месяц на одном мониторе. Всё зависит от экрана, длительности показа и хронометража ролика. Мы подбираем оптимальный вариант под ваш бюджет.'
  },
  {
    id: 3,
    question: 'Сколько раз в день показывается мой ролик?',
    answer:
      'Количество выходов зависит от выбранного экрана. В среднем от 100 до 720 показов в сутки на одном экране.'
  },
  {
    id: 4,
    question: 'Сколько секунд длится ролик?',
    answer:
      'Хронометраж ролика зависит от выбранного экрана. В среднем от 8 до 10 секунд. Этого времени хватает, чтобы показать самое важное.'
  },
  {
    id: 5,
    question: 'Можете сделать ролик под экран?',
    answer:
      'Да, мы можем помочь с разработкой от простого слайд-шоу до анимированного видео. Обсудим стиль и сделаем в фирменных цветах.'
  },
  {
    id: 6,
    question: 'Можно ли выбрать конкретную локацию?',
    answer:
      'Конечно. Вы можете выбрать один конкретный экран, либо сразу несколько, с дополнительной скидкой.'
  },
  {
    id: 7,
    question: 'Как быстро можно запустить рекламу?',
    answer:
      'Если у вас уже есть готовое видео, то можем запустить в течение 1–2 рабочих дней.'
  },
  {
    id: 8,
    question: 'Есть ли отчётность по размещению?',
    answer:
      'Да. Мы предоставляем фото- и видеоотчёты с экрана, на котором показывался ваш ролик.'
  }
]

const ledIndoorFaqs = [
  {
    id: 1,
    question: 'Где размещены экраны?',
    answer:
      'У нас 68 экранов по Караганде: в ТЦ, на вокзале и в супермаркетах.'
  },
  {
    id: 2,
    question: 'Сколько стоит размещение?',
    answer:
      'Цена от 10 000₸ до 100 000₸ в месяц за одну локацию. Всё зависит от локации, длительности показа и хронометража ролика. Мы подбираем оптимальный вариант под ваш бюджет.'
  },
  {
    id: 3,
    question: 'Сколько раз в день показывается мой ролик?',
    answer:
      'Количество выходов зависит от выбранного экрана. В среднем от 30 до 400 показов в сутки на одном экране.'
  },
  {
    id: 4,
    question: 'Сколько секунд длится ролик?',
    answer:
      'Можно разместить видео от 10 до 30 секунд. Оптимально 15–20 сек: коротко, ясно, эффективно.'
  },
  {
    id: 5,
    question: 'Можете сделать ролик под экран?',
    answer:
      'Да, мы можем помочь с разработкой от простого слайд-шоу до анимированного видео. Обсудим стиль и сделаем в фирменных цветах.'
  },
  {
    id: 6,
    question: 'Можно ли выбрать конкретную локацию?',
    answer:
      'Конечно. Вы можете выбрать один конкретный экран, либо сразу несколько с дополнительной скидкой.'
  },
  {
    id: 7,
    question: 'Как быстро можно запустить рекламу?',
    answer:
      'Если у вас уже есть готовое видео — можем запустить в течение 1–2 рабочих дней.'
  },
  {
    id: 8,
    question: 'Как понять, работает ли реклама?',
    answer:
      'Мы рекомендуем добавить в ролик номер WhatsApp, QR-код или Instagram так вы увидите переходы и обращения. Многие клиенты получают входящие уже в первые дни после запуска.'
  },
  {
    id: 9,
    question: 'Есть ли отчётность по размещению?',
    answer:
      'Да. Мы предоставляем фото- и видеоотчёты с экрана, на котором показывался ваш ролик.'
  }
]

const route = useRoute()
const faqs = computed(() =>
  route.path.includes('led-indoor') ? ledIndoorFaqs : ledOutdoorFaqs
)
const showAll = ref(false)
const openedMap = reactive({})

const hasMore = computed(() => faqs.value.length > 4)
const visibleFaqs = computed(() =>
  showAll.value ? faqs.value : faqs.value.slice(0, 4)
)

const handleToggle = (id, isOpen) => {
  if (isOpen) openedMap[id] = true
}

const toggleAll = () => {
  showAll.value = !showAll.value
}
</script>

<style scoped>
.text-primary {
  color: #333;
}

.faq-list-enter-active,
.faq-list-leave-active {
  transition: all 0.4s ease;
}

.faq-list-enter-from,
.faq-list-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
