<template>
  <div class="text-left max-w-xl mx-auto">
    <!-- Этап 1. Контакты -->
    <div v-if="stage === 'lead'" class="space-y-6">
      <p class="text-base text-slate-700">
        Сначала оставьте контакты. Мы пришлём расчёт и варианты договора.
      </p>

      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2">
            Имя
          </label>
          <input
            v-model="lead.name"
            type="text"
            class="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="Как к вам обращаться"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-2">
            Телефон
          </label>
          <input
            v-model="lead.phone"
            type="tel"
            class="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            placeholder="8 777 123 45 67"
          />
        </div>
      </div>

      <button
        type="button"
        class="mt-4 inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-emerald-600 disabled:opacity-60 disabled:cursor-not-allowed transition"
        :disabled="isSubmitting || !lead.name || !lead.phone"
        @click="submitLead"
      >
        Начать квиз
      </button>
    </div>

    <!-- Этап 2. Квиз -->
    <div v-else-if="stage === 'quiz'" class="space-y-6">
      <p class="text-sm uppercase tracking-[0.2em] text-emerald-600 text-center">
        Вопрос {{ currentIndex + 1 }} из {{ questions.length }}
      </p>

      <h3 class="text-lg font-semibold text-slate-900 text-center">
        {{ currentQuestion.title }}
      </h3>

      <div class="space-y-3 mt-4">
        <label
          v-for="option in currentQuestion.options"
          :key="option.value"
          class="flex items-center gap-3 cursor-pointer text-slate-800"
        >
          <input
            type="radio"
            class="h-4 w-4 text-emerald-500 focus:ring-emerald-500"
            :name="'q-' + currentQuestion.key"
            :value="option.value"
            v-model="currentAnswer"
          />
          <span>{{ option.label }}</span>
        </label>
      </div>

      <button
        type="button"
        class="mt-6 inline-flex items-center justify-center rounded-lg bg-lime-400 px-6 py-3 text-sm font-semibold text-slate-900 shadow-md hover:bg-lime-500 disabled:opacity-60 disabled:cursor-not-allowed transition"
        :disabled="!currentAnswer || isSubmitting"
        @click="nextQuestion"
      >
        {{ currentIndex === questions.length - 1 ? 'Отправить ответы' : 'Далее' }}
      </button>
    </div>

    <!-- Этап 3. Спасибо -->
    <div v-else-if="stage === 'done'" class="space-y-4 text-center">
      <h3 class="text-2xl font-semibold text-slate-900">
        Спасибо
      </h3>
      <p class="text-base text-slate-700">
        Мы получили ваши ответы и расчитаем доход. Менеджер свяжется с вами по указанному телефону.
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import axios from 'axios'

const stage = ref('lead') // lead | quiz | done
const isSubmitting = ref(false)
const leadId = ref(null)

const lead = ref({
  name: '',
  phone: ''
})

const questions = ref([
  {
    key: 'role',
    title: 'Вы являетесь',
    options: [
      { value: 'ksk', label: 'Председателем КСК или ОСИ' },
      { value: 'uprav_komp', label: 'Управляющей компанией' },
      { value: 'star_dom', label: 'Старшим по дому' },
      { value: 'star_pod', label: 'Старшим по подъезду' },
      { value: 'other', label: 'Другое' }
    ]
  },
  {
    key: 'entrances',
    title: 'Сколько подъездов в доме',
    options: [
      { value: '1', label: '1 подъезд' },
      { value: '2', label: '2 подъезда' },
      { value: '3_4', label: '3–4 подъезда' },
      { value: '5_plus', label: '5 и больше подъездов' }
    ]
  },
  {
    key: 'lifts',
    title: 'Сколько работающих лифтов в доме',
    options: [
      { value: '1', label: '1 лифт' },
      { value: '2', label: '2 лифта' },
      { value: '3_plus', label: '3 и больше лифтов' }
    ]
  },
  {
    key: 'has_ads',
    title: 'Есть ли сейчас реклама в лифтах',
    options: [
      { value: 'none', label: 'Нет, рекламы нет' },
      { value: 'notes', label: 'Только объявления от жильцов' },
      { value: 'other_company', label: 'Реклама другой компании' }
    ]
  },
  {
    key: 'payout_type',
    title: 'Какой формат выплат вам удобнее',
    options: [
      { value: 'account', label: 'Деньги на расчётный счёт ОСИ или КСК' },
      { value: 'cash', label: 'Наличные' },
      { value: 'service', label: 'Уборка или сервис вместо аренды' }
    ]
  },
  {
    key: 'contract_term',
    title: 'На какой срок готовы обсуждать договор',
    options: [
      { value: 'up_6', label: 'До 6 месяцев' },
      { value: '6_12', label: 'От 6 до 12 месяцев' },
      { value: '12_plus', label: 'От 12 месяцев и дольше' },
      { value: 'not_sure', label: 'Пока не решили, хочу варианты' }
    ]
  }
])

const currentIndex = ref(0)
const currentAnswer = ref(null)

const currentQuestion = computed(() => questions.value[currentIndex.value])

async function submitLead() {
  if (!lead.value.name || !lead.value.phone) return

  isSubmitting.value = true
  try {
    const { data } = await axios.post('/api/owners-quiz/lead', {
      name: lead.value.name,
      phone: lead.value.phone,
      source: 'owners_quiz'
    })

    leadId.value = data?.lead_id || null
    stage.value = 'quiz'
  } catch (e) {
    console.error('Ошибка при отправке контактов', e)
    alert('Не получилось отправить форму. Попробуйте ещё раз')
  } finally {
    isSubmitting.value = false
  }
}

async function nextQuestion() {
  if (!currentAnswer.value) return
  isSubmitting.value = true

  try {
    await axios.post('/api/owners-quiz/answer', {
      lead_id: leadId.value,
      phone: lead.value.phone,
      question_key: currentQuestion.value.key,
      answer: currentAnswer.value
    })

    currentAnswer.value = null

    if (currentIndex.value < questions.value.length - 1) {
      currentIndex.value += 1
    } else {
      await axios.post('/api/owners-quiz/complete', {
        lead_id: leadId.value,
        phone: lead.value.phone
      })
      stage.value = 'done'
    }
  } catch (e) {
    console.error('Ошибка при отправке ответа', e)
    alert('Не получилось отправить ответ. Попробуйте ещё раз')
  } finally {
    isSubmitting.value = false
  }
}
</script>
