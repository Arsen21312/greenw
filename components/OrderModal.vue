<!-- components/OrderModal.vue -->
<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    @click.self="closeOrderModal"
  >
    <div class="bg-white p-8 rounded-xl w-full max-w-lg shadow-2xl relative mx-4">
      <button
        class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        @click="closeOrderModal"
      >
        &times;
      </button>
      <h2 class="text-3xl font-bold text-center mb-6 text-gray-800">
        Заказать {{ block.name }}
      </h2>
      <form @submit.prevent="submitLead">
        <div class="mb-4">
          <label for="name" class="block text-sm font-medium text-gray-700 mb-2">Имя:</label>
          <input
            v-model="leadData.name"
            type="text"
            id="name"
            required
            :placeholder="namePlaceholder"
            maxlength="40"
            :class="{ error: !!nameError }"
            class="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-custom-green"
            @input="onNameInput"
            @blur="touchField('name')"
          />
          <p v-if="nameError" class="text-red-500 text-sm mt-2">{{ nameError }}</p>
        </div>
        <div class="mb-6">
          <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">Телефон:</label>
          <input
            v-model="leadData.phone"
            type="tel"
            id="phone"
            required
            placeholder="+7 (7__) _--__"
            :class="{ error: !!phoneError }"
            class="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-custom-green"
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
          class="w-full bg-custom-green text-white py-3 rounded-lg hover:bg-green-600 transition duration-300"
        >
          Отправить
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
  </div>
</template>

<script setup>
import { computed, nextTick, ref } from 'vue'

const props = defineProps({
  block: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close-order-modal'])
const closeOrderModal = () => emit('close-order-modal')

const leadData = ref({ name: '', phone: '' })
const namePlaceholder = 'Например, Арсентий'
const message = ref('')
const isError = ref(false)
const isSubmitting = ref(false)
const touched = ref({ name: false, phone: false })
const submittedOnce = ref(false)

const sanitizeName = (value, options = {}) => {
  const { keepTrailingSpace = false } = options
  const hadTrailingSpace = /\s$/.test(String(value || ''))
  let sanitized = String(value || '')
    .replace(/[^A-Za-z\u0400-\u04FF -]/g, '')
    .replace(/\s+/g, ' ')

  sanitized = keepTrailingSpace ? sanitized.trimStart() : sanitized.trim()

  const words = sanitized.trim().split(' ').filter(Boolean)
  if (words.length > 3) {
    sanitized = words.slice(0, 3).join(' ')
  } else if (keepTrailingSpace && hadTrailingSpace && words.length > 0) {
    sanitized = sanitized.trimEnd()
    sanitized += ' '
  }

  return sanitized.slice(0, 40)
}

const extractDigits = (value) => String(value || '').replace(/\D/g, '')

const formatKzPhone = (value) => {
  let digits = extractDigits(value)
  if (!digits) return ''

  if (digits[0] === '8') {
    digits = `7${digits.slice(1)}`
  }
  if (digits[0] !== '7') {
    digits = `7${digits}`
  }

  digits = digits.slice(0, 12)
  const rest = digits.slice(1)
  let result = '+7'
  if (rest.length > 0) result += ` (${rest.slice(0, 3)}`
  if (rest.length >= 3) result += ')'
  if (rest.length > 3) result += ` ${rest.slice(3, 6)}`
  if (rest.length > 6) result += `-${rest.slice(6, 8)}`
  if (rest.length > 8) result += `-${rest.slice(8, 10)}`
  if (rest.length > 10) result += ` ${rest.slice(10, 11)}`
  return result
}

const getCaretPositionByDigitIndex = (formattedValue, digitIndex) => {
  if (digitIndex <= 0) return 0
  let seenDigits = 0
  for (let i = 0; i < formattedValue.length; i += 1) {
    if (/\d/.test(formattedValue[i])) seenDigits += 1
    if (seenDigits >= digitIndex) return i + 1
  }
  return formattedValue.length
}

const validateName = (name) => {
  const normalizedName = sanitizeName(name)
  if (!normalizedName) return 'Введите имя'
  if (normalizedName.length > 40) return 'Максимум 40 символов'
  const words = normalizedName.split(' ').filter(Boolean)
  if (words.length > 3) return 'Не больше 3 слов'
  const namePattern = /^[A-Za-z\u0400-\u04FF-]+(?: [A-Za-z\u0400-\u04FF-]+){0,2}$/
  if (!namePattern.test(normalizedName)) return 'Только буквы, пробел и дефис'
  return ''
}

const validatePhone = (phone) => {
  const digitsCount = extractDigits(phone).length
  if (!digitsCount) return 'Введите телефон'
  if (digitsCount < 10) return 'Слишком короткий номер'
  if (digitsCount > 12) return 'Слишком длинный номер'
  return ''
}

const nameError = computed(() => {
  if (!touched.value.name && !submittedOnce.value) return ''
  return validateName(leadData.value.name)
})

const phoneError = computed(() => {
  if (!touched.value.phone && !submittedOnce.value) return ''
  return validatePhone(leadData.value.phone)
})

const isFormValid = computed(() => !validateName(leadData.value.name) && !validatePhone(leadData.value.phone))

const touchField = (field) => {
  touched.value[field] = true
  if (field === 'name') leadData.value.name = sanitizeName(leadData.value.name)
  if (field === 'phone') leadData.value.phone = formatKzPhone(leadData.value.phone)
}

const onNameInput = (event) => {
  const inputValue = event?.target?.value ?? leadData.value.name
  leadData.value.name = sanitizeName(inputValue, { keepTrailingSpace: true })
}

const onPhoneInput = (event) => {
  const input = event?.target
  const inputValue = input?.value ?? leadData.value.phone
  const caret = input?.selectionStart ?? inputValue.length
  const digitsBeforeCaret = extractDigits(inputValue.slice(0, caret)).length
  const digits = extractDigits(inputValue).slice(0, 12)
  leadData.value.phone = formatKzPhone(digits)

  nextTick(() => {
    if (!input || document.activeElement !== input) return
    const nextCaret = getCaretPositionByDigitIndex(leadData.value.phone, digitsBeforeCaret)
    input.setSelectionRange(nextCaret, nextCaret)
  })
}

const onPhoneKeyDown = (event) => {
  const input = event?.target
  if (!input) return
  if (event.key !== 'Backspace' && event.key !== 'Delete') return

  const start = input.selectionStart ?? 0
  const end = input.selectionEnd ?? 0
  if (start !== end) return

  const value = String(input.value || '')
  const targetIndex = event.key === 'Backspace' ? start - 1 : start
  const targetChar = value[targetIndex]
  if (!targetChar || /\d/.test(targetChar)) return

  const digits = extractDigits(value).split('')
  if (!digits.length) return

  const digitIndex = extractDigits(value.slice(0, start)).length + (event.key === 'Delete' ? 0 : -1)
  if (digitIndex < 0 || digitIndex >= digits.length) return

  event.preventDefault()
  digits.splice(digitIndex, 1)
  leadData.value.phone = formatKzPhone(digits.join(''))

  nextTick(() => {
    if (document.activeElement !== input) return
    const nextCaret = getCaretPositionByDigitIndex(leadData.value.phone, Math.max(digitIndex, 0))
    input.setSelectionRange(nextCaret, nextCaret)
  })
}

const submitLead = async () => {
  submittedOnce.value = true
  touched.value.name = true
  touched.value.phone = true
  leadData.value.name = sanitizeName(leadData.value.name)
  leadData.value.phone = formatKzPhone(leadData.value.phone)

  if (!isFormValid.value) {
    isError.value = true
    message.value = 'Проверьте поля формы'
    return
  }

  isSubmitting.value = true

  try {
    const pageKey =
      typeof window !== 'undefined'
        ? String(window.location.pathname || '').replace(/^\/+|\/+$/g, '').toLowerCase() || 'index'
        : 'unknown'

    const dataToSend = {
      name: leadData.value.name,
      phone: leadData.value.phone,
      source: pageKey,
      page: pageKey,
    }

    const response = await fetch('/api/create-lead', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToSend)
    })

    const result = await response.json().catch(() => ({}))

    if (response.ok) {
      message.value = 'Заявка успешно отправлена!'
      isError.value = false
      leadData.value.name = ''
      leadData.value.phone = ''
      setTimeout(() => {
        closeOrderModal()
      }, 2000)
    } else {
      isError.value = true
      message.value = result.message || 'Ошибка при отправке заявки.'
    }
  } catch (error) {
    isError.value = true
    message.value = 'Ошибка при отправке заявки. Пожалуйста, попробуйте позже.'
    console.error('Ошибка при отправке формы:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.bg-custom-green {
  background-color: #4CAF50;
}

.text-custom-green {
  color: #4CAF50;
}

.error {
  border-color: #ef4444;
}

.error:focus {
  --tw-ring-color: #fca5a5;
}

.shadow-lg {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.hover\:scale-105:hover {
  transform: scale(1.05);
}
</style>
