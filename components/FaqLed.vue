<!-- components/FaqSection.vue -->
<template>
  <section class="faq-section py-12">
    <div class="container mx-auto">
      <h2 class="text-4xl md:text-5xl font-bold mb-8 text-center text-primary">Частые вопросы по LED</h2>
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
          {{ showAll ? 'Меньше вопросов' : 'Еще вопросы' }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import FaqItem from '@/components/FaqItem.vue'

const faqsData = [
  {
    id: 1,
    question: 'Где размещены экраны?',
    answer:
      'У нас 22 экрана по всей Караганде: в ТЦ, на вокзале, в парке, скверах и на оживлённых перекрёстках.',
  },
  {
    id: 2,
    question: 'Сколько стоит размещение?',
    answer:
      'Цена — от 20 000₸ до 750 000₸ в месяц. Всё зависит от экрана, длительности показа и хронометража ролика. Мы подбираем оптимальный вариант под ваш бюджет.',
  },
  {
    id: 3,
    question: 'Сколько раз в день показывается мой ролик?',
    answer:
      'Вы сами выбираете: от 200 до 400 показов в сутки. Стандартно — 3 показа в час.',
  },
  {
    id: 4,
    question: 'Сколько секунд длится ролик?',
    answer:
      'Можно разместить видео от 10 до 30 секунд. Оптимально — 15–20 сек: коротко, ясно, эффективно.',
  },
  {
    id: 5,
    question: 'Можете сделать ролик под экран?',
    answer:
      'Да, мы можем помочь с разработкой — от простого слайд-шоу до анимированного видео. Обсудим стиль и сделаем в фирменных цветах.',
  },
  {
    id: 6,
    question: 'Можно ли выбрать конкретную локацию?',
    answer:
      'Конечно. Вы можете выбрать один конкретный экран (например, в ТД Таир), либо сразу несколько — с дополнительной скидкой.',
  },
  {
    id: 7,
    question: 'Как быстро можно запустить рекламу?',
    answer:
      'Если у вас уже есть готовое видео — можем запустить в течение 1–2 рабочих дней.',
  },
  {
    id: 8,
    question: 'Как понять, работает ли реклама?',
    answer:
      'Мы рекомендуем добавить в ролик номер WhatsApp, QR-код или Instagram — так вы увидите переходы и обращения.\nМногие клиенты получают входящие уже в первые дни после запуска.',
  },
  {
    id: 9,
    question: 'Есть ли отчётность по размещению?',
    answer:
      'Да. Мы предоставляем фото- и видеоотчёты с экрана, на котором показывался ваш ролик.',
  },
  {
    id: 10,
    question: 'Насколько это эффективнее баннера?',
    answer:
      'LED-экран двигается, светится, привлекает внимание. Его не пролистают. Он работает на имидж, узнаваемость и доверие. А значит — приводит клиентов.',
  },
]

const faqs = ref(faqsData)
const showAll = ref(false)
const openedMap = reactive({})

const hasMore = computed(() => faqs.value.length > 4)
const visibleFaqs = computed(() => (showAll.value ? faqs.value : faqs.value.slice(0, 4)))

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
