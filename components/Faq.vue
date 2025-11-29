<template>
  <section class="faq-section bg-gray-200 py-12">
    <div class="container mx-auto">
      <h2 class="text-5xl font-bold mb-8 text-center text-primary">Частые вопросы</h2>
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
    question: 'Сколько стоит размещение рекламы в лифте и какие форматы есть?',
    answer:
      'Цена зависит от блока и выбранного формата. У нас есть варианты от компактных A9 до крупного A3. Подскажем, что подойдет под ваш бюджет и задачу.',
  },
  {
    id: 2,
    question: 'Как считается охват аудитории?',
    answer:
      'Средний подъезд в Караганде — около 23 000 подъемов в месяц. Фактический охват зависит от выбранных домов, количества форматов и срока размещения.',
  },
  {
    id: 3,
    question: 'Как обеспечиваете безопасность и аккуратность размещений?',
    answer:
      'Используем безопасные материалы, крепим на антивандальный скотч без следов, контролируем состояние стендов и меняем макеты без шума. Работаем по договору и соблюдаем сроки.',
  },
  {
    id: 4,
    question: 'Как выбрать формат для конкретного подъезда?',
    answer:
      'Чаще выбирают A5–A4 для уверенной читаемости. Компактные A6–A7 ставим там, где нужен акцент без перегрузки пространства.',
  },
  {
    id: 5,
    question: 'Как быстро можно запустить рекламу?',
    answer:
      'Подготовка макета и согласование занимают от 1 до 3 дней. Монтаж выполняем оперативно и подтверждаем готовность фотоотчетом.',
  },
  {
    id: 6,
    question: 'Как подтверждаете размещение?',
    answer:
      'После монтажа делаем фотоотчет с адресами и блоками, отправляем ссылку. По запросу обновляем фото, если макет заменен.',
  },
  {
    id: 7,
    question: 'Можно ли размещаться только в нужных районах?',
    answer:
      'Да. Подберем дома в выбранных локациях или предложим список с прогнозом охвата. Работаем по адресной выборке.',
  },
  {
    id: 8,
    question: 'Как работают скидки на объем и срок?',
    answer:
      'Долгосрочные размещения (3, 6, 12 месяцев) и пакеты блоков получают прогрессивную скидку. Расскажем точные цифры под ваш заказ.',
  },
  {
    id: 9,
    question: 'Как отслеживать эффективность?',
    answer:
      'Используем UTM-метки, короткие номера, QR и опрос “где узнали”. Сравниваем отклик по каналам и даем рекомендации по креативу.',
  },
  {
    id: 10,
    question: 'Что делать, если нужен срочный демонтаж или замена?',
    answer:
      'Выезжаем оперативно, аккуратно демонтируем или заменяем макет без следов и шума. Согласуем время работ заранее.',
  },
  {
    id: 11,
    question: 'Как оформляется договор и оплата?',
    answer:
      'Заключаем официальный договор, работаем безналично. Предоставляем закрывающие документы и соблюдаем согласованные сроки оплаты.',
  },
  {
    id: 12,
    question: 'Какие материалы нужны для запуска?',
    answer:
      'Подойдут готовый макет или ваши бренд-гайды. Если макета нет, подготовим дизайн под формат лифта с учетом читаемости и контактов.',
  },
  {
    id: 13,
    question: 'Можно ли получить консультацию до оплаты?',
    answer:
      'Да, бесплатно рассчитаем варианты, предложим адреса и форматы, расскажем про сроки и скидки. Подберем оптимальный пакет под ваши цели.',
  },
]

const faqs = ref(faqsData)
const showAll = ref(false)
const openedMap = reactive({})

const hasMore = computed(() => faqs.value.length > 3)
const visibleFaqs = computed(() => (showAll.value ? faqs.value : faqs.value.slice(0, 3)))

const handleToggle = (id, isOpen) => {
  if (isOpen) {
    openedMap[id] = true
  }
}

const toggleAll = () => {
  showAll.value = !showAll.value
}
</script>

<style scoped>
.faq-section {
  background: #f3f4f6;
}

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
