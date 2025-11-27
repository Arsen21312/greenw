<template>
  <div class="w-full relative py-24 px-6">
    <div class="container mx-auto max-w-4xl flex flex-col items-center gap-10">
      <!-- Плашка -->
      <div class="bg-white w-full max-w-2xl rounded-3xl shadow-xl p-10 text-center">
        <h2 class="text-4xl font-bold text-gray-800 mb-3">Мы вам перезвоним</h2>
        <p class="text-lg text-gray-700">
          Заполните имя и номер телефона, остальное по желанию
        </p>
      </div>

      <!-- Карта с этапами -->
      <div class="bg-white w-full rounded-3xl shadow-lg p-10">
        <!-- Этап: форма -->
        <div v-if="stage === 'form'">
          <form @submit.prevent="submitLead">
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Имя:</label>
              <input
                v-model="leadData.name"
                type="text"
                required
                class="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#a8cc55]"
              />
            </div>

            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Телефон:</label>
              <input
                v-model="leadData.phone"
                type="tel"
                required
                class="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#a8cc55]"
              />
            </div>

            <button
              type="submit"
              class="mt-4 w-full inline-flex items-center justify-center bg-[#a8cc55] text-black font-semibold py-3 rounded-lg shadow-md hover:bg-[#97b84c] transition"
            >
              Отправить заявку
            </button>
          </form>

          <p
            v-if="message"
            :class="{ 'text-red-500': isError, 'text-green-500': !isError }"
            class="text-center mt-4"
          >
            {{ message }}
          </p>
        </div>

        <!-- Этап: приглашение к опросу -->
        <div v-else-if="stage === 'invite'">
          <h3 class="text-2xl font-bold text-gray-800 mb-4 text-center">
            Заявка уже у нас
          </h3>
          <p class="text-center text-gray-700 mb-6">
            Хотите пройти короткий опрос, чтобы мы подготовили более точное предложение
          </p>

          <div class="flex flex-col sm:flex-row gap-4">
            <button
              type="button"
              class="flex-1 bg-[#a8cc55] text-white py-3 rounded-lg transition"
              @click="startQuiz"
            >
              Да, пройти опрос
            </button>
            <button
              type="button"
              class="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg transition"
              @click="stage = 'done'"
            >
              Нет, спасибо
            </button>
          </div>
        </div>

        <!-- Этап: опрос -->
        <div v-else-if="stage === 'quiz'">
          <h2 class="text-3xl font-bold text-gray-800 mb-4 text-center">
            Подскажите
          </h2>

          <p class="text-center text-gray-600 mb-6">
            Вопрос {{ currentQuestionIndex + 1 }} из {{ surveyQuestions.length }}
          </p>

          <div v-if="currentQuestion">
            <p class="text-lg font-medium text-gray-800 mb-8 text-center">
              {{ currentQuestion.text }}
            </p>

            <div class="flex justify-center gap-4">
              <button
                type="button"
                class="min-w-[120px] py-3 px-6 rounded-xl border border-[#a8cc55] text-[#0f172a] font-semibold transition transform"
                :class="{ 'scale-95 shadow-md': lastAnswer === true }"
                @click="answerQuestion(true)"
              >
                Да
              </button>
              <button
                type="button"
                class="min-w-[120px] py-3 px-6 rounded-xl border border-gray-300 text-gray-700 font-semibold transition transform"
                :class="{ 'scale-95 shadow-md': lastAnswer === false }"
                @click="answerQuestion(false)"
              >
                Нет
              </button>
            </div>
          </div>
        </div>

        <!-- Этап: завершено -->
        <div v-else-if="stage === 'done'">
          <h3 class="text-2xl font-bold text-gray-800 mb-4 text-center">
            Спасибо
          </h3>
          <p class="text-center text-gray-700">
            Мы уже получили вашу заявку и ответы на вопросы, скоро свяжемся
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      leadData: {
        name: '',
        phone: '',
      },
      message: '',
      isError: false,
      stage: 'form', // form, invite, quiz, done
      currentQuestionIndex: 0,
      lastAnswer: null,
      surveyQuestions: [
        { key: 'preferred_messenger', text: 'Предпочитаете общение через мессенджер?', answer: null },
        { key: 'is_lift_owner', text: 'Вы собственник лифта?', answer: null },
        { key: 'need_qr', text: 'Нужен QR-код?', answer: null },
        { key: 'need_design', text: 'Нужен дизайн макета от нас?', answer: null },
        { key: 'need_led', text: 'Интересно размещение на LED-экранах?', answer: null },
        { key: 'long_term', text: 'Рассматриваете долгосрочное размещение?', answer: null },
        { key: 'cross_promo', text: 'Готовы к кросс-промо с партнёрами?', answer: null },
        { key: 'brand_lift', text: 'Хотите брендирование лифта?', answer: null },
        { key: 'print_need', text: 'Нужна печать полиграфии?', answer: null },
        { key: 'priority_contact', text: 'Связаться прямо сегодня?', answer: null },
      ]
    };
  },
  computed: {
    currentQuestion() {
      return this.surveyQuestions[this.currentQuestionIndex] || null;
    }
  },
  methods: {
    startQuiz() {
      this.stage = 'quiz';
      this.currentQuestionIndex = 0;
    },
    async answerQuestion(value) {
      if (!this.currentQuestion) return;

      this.lastAnswer = value;
      this.currentQuestion.answer = value;

      try {
        await this.sendQuizAnswer(this.currentQuestion, value);
      } catch (e) {
        console.error('Ошибка при отправке ответа опроса', e);
      }

      setTimeout(() => {
        this.lastAnswer = null;

        if (this.currentQuestionIndex < this.surveyQuestions.length - 1) {
          this.currentQuestionIndex += 1;
        } else {
          this.finishQuiz();
        }
      }, 300);
    },
    finishQuiz() {
      this.stage = 'done';
    },
    async sendQuizAnswer(question, value) {
      const payload = {
        phone: this.leadData.phone,
        question_key: question.key,
        question_text: question.text,
        answer: value
      };

      await axios.post('/api/quiz-answer', payload);
    },
    async submitLead() {
      try {
        const dataToSend = {
          name: this.leadData.name,
          phone: this.leadData.phone
        };

        const response = await axios.post('/api/create-lead', dataToSend);

        if (response.status === 200) {
          this.message = '';
          this.isError = false;
          this.stage = 'invite';
          // очищаем только имя, телефон оставляем для опроса
          this.leadData.name = '';
        } else {
          this.message = 'Ошибка при отправке заявки. Попробуйте позже.';
          this.isError = true;
        }
      } catch (error) {
        this.message = 'Ошибка при отправке заявки. Попробуйте позже.';
        this.isError = true;
        console.error('Ошибка:', error);
      }
    },
  }
};
</script>

<style scoped>
.shadow-consultation {
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.shadow-custom-top {
  box-shadow: 0 -10px 20px rgba(0, 0, 0, 0.05),
              0 0 4px rgba(3, 46, 40, 0.4);
}
</style>
