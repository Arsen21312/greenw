<template>
  <div class="w-full relative py-24 px-6">
    <div class="container mx-auto max-w-4xl flex flex-col items-center gap-10">
      <!-- Плашка -->
      <div class="bg-white w-full max-w-2xl rounded-3xl shadow-xl p-10 text-center">
        <h2 class="text-4xl font-bold text-gray-800 mb-3">Мы вам позвоним</h2>
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
                :placeholder="namePlaceholder"
                maxlength="40"
                :class="{ error: !!nameError }"
                class="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#a8cc55]"
                @input="onNameInput"
                @blur="touchField('name')"
              />
              <p v-if="nameError" class="text-red-500 text-sm mt-2">{{ nameError }}</p>
            </div>

            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-2">Телефон:</label>
              <input
                v-model="leadData.phone"
                type="tel"
                required
                placeholder="+7 (7__) _--__"
                :class="{ error: !!phoneError }"
                class="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#a8cc55]"
                @keydown="onPhoneKeyDown"
                @input="onPhoneInput"
                @blur="touchField('phone')"
              />
              <p v-if="phoneError" class="text-red-500 text-sm mt-2">{{ phoneError }}</p>
            </div>

            <button
              type="submit"
              :disabled="!isFormValid || isSubmitting"
              :class="{ 'opacity-60 cursor-not-allowed': !isFormValid || isSubmitting }"
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

            <div class="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                v-for="option in currentQuestion.options"
                :key="option"
                class="min-w-[160px] max-w-xs whitespace-normal py-3 px-4 rounded-xl border text-[#0f172a] font-semibold transition transform"
                :class="lastAnswer === option ? 'border-[#a8cc55] bg-[#f4fae6] shadow-md scale-95' : 'border-gray-300 hover:border-[#a8cc55]'"
                @click="answerQuestion(option)"
              >
                {{ option }}
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
  props: {
    liftOrder: {
      type: Object,
      default: null,
    },
    pageKey: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      leadData: {
        name: '',
        phone: '',
        leadId: null,
        contactId: null,
      },
      leadCacheKey: 'gw_lead_id',
      leadCacheTtlMs: 60 * 60 * 1000,
      namePlaceholder: '\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440, \u0410\u0440\u0441\u0435\u043D\u0442\u0438\u0439',
      message: '',
      isError: false,
      isSubmitting: false,
      touched: {
        name: false,
        phone: false,
      },
      submittedOnce: false,
      stage: 'form', // form, invite, quiz, done
      currentQuestionIndex: 0,
      lastAnswer: null,
      surveyQuestions: [
        {
          key: 'industry',
          text: 'В какой сфере вы работаете?',
          options: ['услуги', 'доставка', 'розница', 'медицина', 'обучение', 'другое'],
          answer: null,
        },
        {
          key: 'audience_location',
          text: 'Где находятся ваши клиенты чаще всего?',
          options: ['ЮВ', 'Центр', 'Майкудук', 'весь город'],
          answer: null,
        },
        {
          key: 'ad_goal',
          text: 'Какую цель хотите достичь рекламой?',
          options: ['узнаваемость', 'клиенты', 'трафик в Instagram', 'продажи', 'открытие нового филиала'],
          answer: null,
        },
        {
          key: 'preferred_format',
          text: 'Какой формат вам интереснее?',
          options: ['лифт', 'LED-экран', 'не знаю — подскажите'],
          answer: null,
        },
        {
          key: 'have_creative',
          text: 'У вас уже есть готовый макет или видео?',
          options: ['да', 'нет', 'нужно сделать'],
          answer: null,
        },
        {
          key: 'has_offer',
          text: 'Есть ли у вас акция или спецпредложение?',
          options: ['да', 'нет', 'планирую'],
          answer: null,
        },
        {
          key: 'budget',
          text: 'Какой бюджет вы рассматриваете?',
          options: ['до 50 тыс', '50–150 тыс', '150–300 тыс', '300+ тыс', 'не знаю'],
          answer: null,
        },
        {
          key: 'priority_area',
          text: 'В каком районе вам важно показываться?',
          options: ['конкретные районы', 'где будет эффективнее'],
          answer: null,
        },
        {
          key: 'start_time',
          text: 'Когда вы хотите запустить рекламу?',
          options: ['в течение 3 дней', 'на этой неделе', 'в этом месяце', 'позже'],
          answer: null,
        },
        {
          key: 'contact_channel',
          text: 'Как вам удобнее получить предложение?',
          options: ['WhatsApp', 'звонок', 'e-mail'],
          answer: null,
        },
      ]
    };
  },
  computed: {
    currentQuestion() {
      return this.surveyQuestions[this.currentQuestionIndex] || null;
    },
    nameError() {
      if (!this.touched.name && !this.submittedOnce) {
        return '';
      }

      return this.validateName(this.leadData.name);
    },
    phoneError() {
      if (!this.touched.phone && !this.submittedOnce) {
        return '';
      }

      return this.validatePhone(this.leadData.phone);
    },
    isFormValid() {
      return !this.validateName(this.leadData.name) && !this.validatePhone(this.leadData.phone);
    },
  },
  mounted() {
    const cached = this.getLeadCacheEntry();
    if (cached?.leadId) {
      this.leadData.leadId = cached.leadId;
      this.leadData.contactId = cached.contactId || null;
    }
  },
  methods: {
    getEffectivePageKey() {
      if (this.pageKey) {
        return String(this.pageKey).toLowerCase();
      }
      if (this.liftOrder?.source) {
        return String(this.liftOrder.source).toLowerCase();
      }
      if (typeof window !== 'undefined') {
        return String(window.location.pathname || '')
          .replace(/^\/+|\/+$/g, '')
          .toLowerCase() || 'index';
      }
      return 'unknown';
    },
    getEffectiveSourceKey() {
      if (this.liftOrder?.source) {
        return String(this.liftOrder.source).toLowerCase();
      }
      return this.getEffectivePageKey();
    },
    getNormalizedPhone(value) {
      return this.extractDigits(this.formatKzPhone(value)).slice(0, 11);
    },
    getLeadCacheEntry() {
      if (typeof window === 'undefined') return null;
      try {
        const raw = localStorage.getItem(this.leadCacheKey);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed?.leadId || !parsed?.expiresAt || Number(parsed.expiresAt) < Date.now()) {
          localStorage.removeItem(this.leadCacheKey);
          return null;
        }
        return {
          leadId: Number(parsed.leadId),
          contactId: parsed.contactId ? Number(parsed.contactId) : null,
          phone: parsed.phone ? String(parsed.phone) : '',
          name: parsed.name ? String(parsed.name) : '',
          expiresAt: Number(parsed.expiresAt),
        };
      } catch {
        localStorage.removeItem(this.leadCacheKey);
        return null;
      }
    },
    setLeadCache(payload) {
      if (typeof window === 'undefined') return;
      const cache = {
        leadId: payload.leadId,
        contactId: payload.contactId || null,
        phone: this.getNormalizedPhone(payload.phone || this.leadData.phone),
        name: this.sanitizeName(payload.name || this.leadData.name),
        expiresAt: Date.now() + this.leadCacheTtlMs,
      };
      localStorage.setItem(this.leadCacheKey, JSON.stringify(cache));
    },
    clearLeadCache() {
      if (typeof window === 'undefined') return;
      localStorage.removeItem(this.leadCacheKey);
    },
    findCachedLeadIdForCurrentForm() {
      const cached = this.getLeadCacheEntry();
      if (!cached?.leadId) return null;
      const currentPhone = this.getNormalizedPhone(this.leadData.phone);
      const cachedPhone = this.getNormalizedPhone(cached.phone || '');
      if (currentPhone && cachedPhone && currentPhone !== cachedPhone) {
        this.clearLeadCache();
        this.leadData.leadId = null;
        this.leadData.contactId = null;
        return null;
      }
      if (!this.leadData.leadId) {
        this.leadData.leadId = cached.leadId;
      }
      if (!this.leadData.contactId && cached.contactId) {
        this.leadData.contactId = cached.contactId;
      }
      return cached.leadId;
    },
    async createLeadRequest() {
      const dataToSend = {
        name: this.leadData.name,
        phone: this.leadData.phone,
        liftOrder: this.liftOrder || null,
        source: this.getEffectiveSourceKey(),
        page: this.getEffectivePageKey(),
      };
      const response = await axios.post('/api/create-lead', dataToSend);
      if (response.status !== 200 || !response.data?.leadId) {
        throw new Error('lead creation failed');
      }
      const leadId = Number(response.data.leadId);
      const contactId = response.data?.contactId ? Number(response.data.contactId) : null;
      this.leadData.leadId = leadId;
      this.leadData.contactId = contactId;
      this.setLeadCache({
        leadId,
        contactId,
        name: this.leadData.name,
        phone: this.leadData.phone,
      });
      return { leadId, contactId };
    },
    async ensureLeadExists() {
      const cachedLeadId = this.findCachedLeadIdForCurrentForm();
      if (cachedLeadId) {
        return { leadId: Number(cachedLeadId), contactId: this.leadData.contactId || null };
      }
      if (this.leadData.leadId) {
        return { leadId: Number(this.leadData.leadId), contactId: this.leadData.contactId || null };
      }
      return this.createLeadRequest();
    },
    touchField(field) {
      this.touched[field] = true;
      if (field === 'name') {
        this.leadData.name = this.sanitizeName(this.leadData.name);
      }
      if (field === 'phone') {
        this.leadData.phone = this.formatKzPhone(this.leadData.phone);
      }
    },
    onNameInput(event) {
      const inputValue = event?.target?.value ?? this.leadData.name;
      this.leadData.name = this.sanitizeName(inputValue, { keepTrailingSpace: true });
    },
    onPhoneInput(event) {
      const input = event?.target;
      const inputValue = input?.value ?? this.leadData.phone;
      const caret = input?.selectionStart ?? inputValue.length;
      const digitsBeforeCaret = this.extractDigits(inputValue.slice(0, caret)).length;
      const digits = this.extractDigits(inputValue).slice(0, 12);
      this.leadData.phone = this.formatKzPhone(digits);

      this.$nextTick(() => {
        if (!input || document.activeElement !== input) return;
        const nextCaret = this.getCaretPositionByDigitIndex(this.leadData.phone, digitsBeforeCaret);
        input.setSelectionRange(nextCaret, nextCaret);
      });
    },
    onPhoneKeyDown(event) {
      const input = event?.target;
      if (!input) return;

      if (event.key !== 'Backspace' && event.key !== 'Delete') return;
      const start = input.selectionStart ?? 0;
      const end = input.selectionEnd ?? 0;

      if (start !== end) return;

      const value = String(input.value || '');
      const targetIndex = event.key === 'Backspace' ? start - 1 : start;
      const targetChar = value[targetIndex];
      if (!targetChar || /\d/.test(targetChar)) return;

      const digits = this.extractDigits(value).split('');
      if (!digits.length) return;

      const digitIndex = this.extractDigits(value.slice(0, start)).length + (event.key === 'Delete' ? 0 : -1);
      if (digitIndex < 0 || digitIndex >= digits.length) return;

      event.preventDefault();
      digits.splice(digitIndex, 1);
      this.leadData.phone = this.formatKzPhone(digits.join(''));

      this.$nextTick(() => {
        if (document.activeElement !== input) return;
        const nextCaret = this.getCaretPositionByDigitIndex(this.leadData.phone, Math.max(digitIndex, 0));
        input.setSelectionRange(nextCaret, nextCaret);
      });
    },
    getCaretPositionByDigitIndex(formattedValue, digitIndex) {
      if (digitIndex <= 0) return 0;
      let seenDigits = 0;
      for (let i = 0; i < formattedValue.length; i += 1) {
        if (/\d/.test(formattedValue[i])) {
          seenDigits += 1;
        }
        if (seenDigits >= digitIndex) {
          return i + 1;
        }
      }
      return formattedValue.length;
    },
    sanitizeName(value, options = {}) {
      const { keepTrailingSpace = false } = options;
      const hadTrailingSpace = /\s$/.test(String(value || ''));
      let sanitized = String(value || '')
        .replace(/[^A-Za-z\u0400-\u04FF -]/g, '')
        .replace(/\s+/g, ' ');

      sanitized = keepTrailingSpace ? sanitized.trimStart() : sanitized.trim();

      const words = sanitized.trim().split(' ').filter(Boolean);
      if (words.length > 3) {
        sanitized = words.slice(0, 3).join(' ');
      } else if (keepTrailingSpace && hadTrailingSpace && words.length > 0) {
        sanitized = sanitized.trimEnd();
        sanitized += ' ';
      }

      return sanitized.slice(0, 40);
    },
    extractDigits(value) {
      return String(value || '').replace(/\D/g, '');
    },
    formatKzPhone(value) {
      let digits = this.extractDigits(value);

      if (!digits) {
        return '';
      }

      if (digits[0] === '8') {
        digits = `7${digits.slice(1)}`;
      }
      if (digits[0] !== '7') {
        digits = `7${digits}`;
      }

      digits = digits.slice(0, 12);
      const rest = digits.slice(1);
      let result = '+7';

      if (rest.length > 0) {
        result += ` (${rest.slice(0, 3)}`;
      }
      if (rest.length >= 3) {
        result += ')';
      }
      if (rest.length > 3) {
        result += ` ${rest.slice(3, 6)}`;
      }
      if (rest.length > 6) {
        result += `-${rest.slice(6, 8)}`;
      }
      if (rest.length > 8) {
        result += `-${rest.slice(8, 10)}`;
      }
      if (rest.length > 10) {
        result += ` ${rest.slice(10, 11)}`;
      }

      return result;
    },
    validateName(name) {
      const normalizedName = this.sanitizeName(name);

      if (!normalizedName) {
        return '\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0438\u043C\u044F';
      }
      if (normalizedName.length > 40) {
        return '\u041C\u0430\u043A\u0441\u0438\u043C\u0443\u043C 40 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432';
      }

      const words = normalizedName.split(' ').filter(Boolean);
      if (words.length > 3) {
        return '\u041D\u0435 \u0431\u043E\u043B\u044C\u0448\u0435 3 \u0441\u043B\u043E\u0432';
      }

      const namePattern = /^[A-Za-z\u0400-\u04FF-]+(?: [A-Za-z\u0400-\u04FF-]+){0,2}$/;
      if (!namePattern.test(normalizedName)) {
        return '\u0422\u043E\u043B\u044C\u043A\u043E \u0431\u0443\u043A\u0432\u044B, \u043F\u0440\u043E\u0431\u0435\u043B \u0438 \u0434\u0435\u0444\u0438\u0441';
      }

      return '';
    },
    validatePhone(phone) {
      const digitsCount = this.extractDigits(phone).length;

      if (!digitsCount) {
        return '\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0435\u043B\u0435\u0444\u043E\u043D';
      }
      if (digitsCount < 10) {
        return '\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u043A\u043E\u0440\u043E\u0442\u043A\u0438\u0439 \u043D\u043E\u043C\u0435\u0440';
      }
      if (digitsCount > 12) {
        return '\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u0434\u043B\u0438\u043D\u043D\u044B\u0439 \u043D\u043E\u043C\u0435\u0440';
      }

      return '';
    },
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
      if (!this.leadData.leadId) {
        await this.ensureLeadExists();
      }
      const payload = {
        phone: this.leadData.phone,
        name: this.leadData.name,
        leadId: this.leadData.leadId || null,
        question_key: question.key,
        question_text: question.text,
        answer: value,
        liftOrder: this.liftOrder || null,
        source: this.getEffectiveSourceKey(),
        page: this.getEffectivePageKey(),
      };
      await axios.post('/api/quiz-answer', payload);
    },
    async submitLead() {
      this.submittedOnce = true;
      this.touched.name = true;
      this.touched.phone = true;
      this.leadData.name = this.sanitizeName(this.leadData.name);
      this.leadData.phone = this.formatKzPhone(this.leadData.phone);
      if (!this.isFormValid) {
        this.message = '\u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u043F\u043E\u043B\u044F \u0444\u043E\u0440\u043C\u044B';
        this.isError = true;
        return;
      }
      this.isSubmitting = true;
      try {
        await this.ensureLeadExists();
        this.message = '';
        this.isError = false;
        this.stage = 'invite';
      } catch (error) {
        this.message = 'Ошибка при отправке заявки. Попробуйте позже.';
        this.isError = true;
        console.error('Ошибка:', error);
      } finally {
        this.isSubmitting = false;
      }
    },
  }
};
</script>

<style scoped>
.error {
  border-color: #ef4444;
}

.error:focus {
  --tw-ring-color: #fca5a5;
}

.shadow-consultation {
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.shadow-custom-top {
  box-shadow: 0 -10px 20px rgba(0, 0, 0, 0.05),
              0 0 4px rgba(3, 46, 40, 0.4);
}
</style>
