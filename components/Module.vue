<template>
  <section class="pricing-section py-12">
    <div class="container mx-auto px-4 max-w-6xl">
      <div class="text-center max-w-2xl mx-auto">
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Выберите блоки и формат</h2>
        <p class="text-gray-600">Как это работает:</p>
        <div class="how-it-works mt-5 grid gap-4 text-left md:grid-cols-3">
          <div
            v-for="(step, index) in howItWorksSteps"
            :key="step.title"
            class="how-it-works__item rounded-2xl border border-lime-100 bg-white/80 p-4 shadow-sm"
          >
            <div
              class="how-it-works__index mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-custom-green/10 text-sm font-semibold text-custom-green"
            >
              {{ index + 1 }}
            </div>
            <p class="text-sm font-semibold text-gray-900">{{ step.title }}</p>
            <p class="text-xs text-gray-600">{{ step.description }}</p>
          </div>
        </div>
      </div>

      <div class="mt-8 bg-white rounded-2xl shadow-xl p-5 lg:p-7">
        <div class="grid grid-cols-1 lg:grid-cols-[1.45fr_0.95fr] gap-10 items-start">
          <div class="space-y-6">
            <div>
              <p class="text-sm font-semibold text-gray-600 mb-3 uppercase tracking-wide">Блоки размещения</p>
              <div class="flex flex-wrap gap-3">
                <button
                  v-for="block in blocks"
                  :key="block"
                  type="button"
                  @click="toggleBlock(block)"
                  class="px-4 py-2 rounded-full border text-sm font-semibold transition"
                  :class="
                    selectedBlocks.includes(block)
                      ? 'bg-custom-green text-white border-custom-green shadow'
                      : 'bg-white text-gray-800 border-gray-200 hover:border-custom-green'
                  "
                >
                  Блок {{ block }}
                </button>
              </div>
              <p class="text-xs text-gray-500 mt-2">Можно выбрать от 1 до 5 блоков. Повторное нажатие снимает выбор.</p>
            </div>

            <div v-if="currentBlock" class="space-y-4">
              <div class="rounded-2xl border border-gray-200 bg-gray-50 p-4 space-y-3">
                <div class="flex items-center justify-between">
                  <p class="text-sm font-semibold text-gray-900">Форматы для блока {{ currentBlock }}</p>
                  <select
                    v-model.number="activeBlock"
                    class="border border-gray-300 rounded-lg px-3 py-2 text-xs text-gray-700 focus:outline-none focus:border-custom-green focus:ring-1 focus:ring-custom-green bg-white"
                  >
                    <option v-for="block in selectedBlocks" :key="`active-${block}`" :value="block">
                      Блок {{ block }}
                    </option>
                  </select>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    v-for="format in formats"
                    :key="`${currentBlock}-${format.id}`"
                    type="button"
                    class="text-left border rounded-xl p-3 flex flex-col gap-1 transition"
                    :class="
                      blockFormats[currentBlock] === format.id
                        ? 'border-custom-green bg-green-50 shadow ring-1 ring-custom-green/40'
                        : 'border-gray-200 hover:border-custom-green'
                    "
                    @click="setBlockFormat(currentBlock, format.id)"
                  >
                    <div class="flex items-center gap-3">
                      <div
                        class="grid h-9 w-9 place-items-center rounded-full border text-sm font-semibold"
                        :style="format.badge"
                      >
                        {{ format.id }}
                      </div>
                      <div>
                        <p class="text-sm font-semibold text-gray-900">{{ format.name }}</p>
                        <p class="text-xs text-gray-500">{{ format.summary }}</p>
                      </div>
                    </div>
                    <p class="text-xs text-gray-500">{{ format.size }} · {{ format.orientation }}</p>
                    <p class="text-xs text-gray-500">{{ format.preview }}</p>
                    <div class="mt-1 flex items-center justify-between text-sm font-semibold text-gray-900">
                      <span>{{ formatPrice(prices[`block${currentBlock}`][format.id]) }} / мес</span>
                      <span
                        v-if="!isFormatDiscountable(format.id)"
                        class="rounded-full bg-rose-50 px-2 py-0.5 text-[11px] font-medium text-rose-500"
                      >
                        без скидок
                      </span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
            <p v-else class="text-sm text-gray-500">Выберите хотя бы один блок, чтобы увидеть доступные форматы и цены.</p>

            <div class="rounded-2xl border border-gray-200 bg-gray-50/80 p-5 space-y-4">
              <div>
                <p class="text-sm text-gray-500">Вы выбрали</p>
                <p class="text-base font-semibold text-gray-900">
                  {{ selectedBlocks.length ? `Блоки: ${selectedBlocks.join(', ')}` : 'Ничего не выбрано' }}
                </p>
                <div class="flex items-center gap-2 mt-2">
                  <span class="text-xs text-gray-500">Срок размещения:</span>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    v-model.number="months"
                    class="w-20 border border-gray-300 rounded-lg px-3 py-1 text-sm text-gray-900 focus:outline-none focus:border-custom-green focus:ring-1 focus:ring-custom-green"
                  />
                  <span class="text-xs text-gray-500">{{ monthLabel(months) }}</span>
                </div>
                <p class="text-[11px] text-gray-400 mt-1">Введите от 1 до 12. По умолчанию 1 месяц.</p>
              </div>

              <div class="grid gap-3 sm:grid-cols-2 text-sm text-gray-600">
                <div class="rounded-xl bg-white border border-gray-200 p-3">
                  <p class="text-xs uppercase tracking-wide text-gray-500">Цена без скидок</p>
                  <p class="text-lg font-semibold text-gray-900">{{ formatCurrency(totalWithoutDiscount) }}</p>
                </div>
                <div class="rounded-xl bg-white border border-gray-200 p-3">
                  <p class="text-xs uppercase tracking-wide text-gray-500">Суммарная скидка</p>
                  <p class="text-lg font-semibold text-custom-green">{{ totalDiscountPercent }}%</p>
                </div>
                <div class="rounded-xl bg-white border border-gray-200 p-3">
                  <p class="text-xs uppercase tracking-wide text-gray-500">Экономия</p>
                  <p class="text-lg font-semibold text-custom-green">{{ formatCurrency(discountAmount) }}</p>
                </div>
                <div class="rounded-xl bg-white border border-gray-200 p-3">
                  <p class="text-xs uppercase tracking-wide text-gray-500">Итоговая цена</p>
                  <p class="text-lg font-semibold text-gray-900">{{ formatCurrency(totalWithDiscount) }}</p>
                </div>
              </div>
              <p class="text-xs text-gray-500 italic">
                Скидки не применяются к форматам A7 и A9.
              </p>

              <button
                type="button"
                class="w-full mt-2 px-5 py-3 rounded-2xl font-semibold text-white bg-custom-green hover:opacity-90 transition"
                :disabled="!selectedBlocks.length"
                :class="{ 'opacity-70 cursor-not-allowed': !selectedBlocks.length }"
                @click="handleOrderClick"
              >
                Оставить заявку
              </button>
            </div>
          </div>

          <div class="visual-card h-full flex flex-col">
            <p class="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span class="inline-block w-2 h-2 rounded-full bg-custom-green"></span>
              Как это выглядит в лифте
            </p>
            <div class="visual-wrapper">
              <div class="badge">Пример макета</div>
              <img :src="visualMock" alt="Пример размещения рекламы в лифте" class="visual-img" />
              <div class="visual-caption">
                <p class="font-semibold text-gray-800">Как выглядит реклама в лифте:</p>
                <ul class="mt-1 space-y-1 text-gray-600">
                  <li>A3 и A4 крупные форматы. Максимальная заметность.</li>
                  <li>A5 и A6 стандартные форматы. Оптимальны по цене и охвату.</li>
                  <li>A7 и A9 компактные форматы. Видны вблизи, подходят для коротких предложений.</li>
                </ul>
              </div>
            </div>
            <transition name="fade">
              <ul
                v-if="currentBlock"
                key="dynamic"
                class="mt-4 space-y-2 text-sm text-gray-700 bg-white/70 border border-gray-200 rounded-2xl p-4"
              >
                <li class="font-semibold text-gray-900">
                  Блок {{ currentBlock }} · формат {{ activeFormatInfo.id }}
                </li>
                <li class="text-sm text-gray-600">{{ activeFormatInfo.summary }}</li>
                <li class="text-sm text-gray-500">{{ activeFormatInfo.size }} — {{ activeFormatInfo.orientation }}</li>
                <li class="text-xs font-semibold uppercase tracking-wide text-gray-400">Что даёт:</li>
                <li
                  v-for="benefit in activeFormatInfo.benefits"
                  :key="benefit"
                  class="flex items-start gap-2 text-sm text-gray-700"
                >
                  <span class="mt-1 grid h-1.5 w-1.5 place-items-center rounded-full bg-custom-green"></span>
                  <span>{{ benefit }}</span>
                </li>
                <li class="text-sm text-gray-600">{{ activeFormatInfo.feature }}</li>
                <li class="text-custom-green font-semibold">
                  Стоимость: {{ formatPrice(activeFormatInfo.price) }} / мес
                </li>
                <li v-if="!activeFormatInfo.isDiscountable" class="text-[11px] text-gray-500">
                  На этот формат скидки не применяются.
                </li>
              </ul>
              <ul v-else key="default" class="mt-4 space-y-2 text-sm text-gray-600">
                <li>Фотоотчет после размещения</li>
                <li>Антивандальная защита на каждой рекламе</li>
                <li>Гарантия срока размещения</li>
              </ul>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import visualMock from '@/assets/formats-mock.png'

const blocks = [1, 2, 3, 4, 5]
const howItWorksSteps = [
  {
    title: 'Выберите район города (блок)',
    description: 'Отметьте дом или квартал, где реклама нужна именно вам.',
  },
  {
    title: 'Подберите размер рекламного модуля',
    description: 'Сравните форматы от имиджевых A3 до компактных A9.',
  },
  {
    title: 'Укажите срок размещения',
    description: 'Система мгновенно покажет итоговую стоимость и выгоду.',
  },
]
const formats = [
  {
    id: 'A3',
    name: 'A3',
    summary: 'Крупный имиджевый формат',
    preview: 'Максимальная заметность с первых секунд.',
    size: '58×20,1 см',
    orientation: 'горизонтальный',
    benefits: [
      'Максимальная заметность',
      'Привлекает внимание в первую секунду',
      'Читается из любой точки лифта',
    ],
    feature: 'Создаёт “вау-эффект”. Этот формат невозможно не заметить.',
    badge: { backgroundColor: '#fef2f2', borderColor: '#fecaca', color: '#b91c1c' },
  },
  {
    id: 'A4',
    name: 'A4',
    summary: 'Большой выразительный формат',
    preview: 'Идеален для акций и спецпредложений.',
    size: '28,8×20,1 см',
    orientation: 'горизонтальный',
    benefits: [
      'Яркий визуальный акцент',
      'Идеален для акций и спецпредложений',
      'Хорошо воспринимается в движении',
    ],
    feature: 'Привлекает взгляд первым и держит баланс между ценой и заметностью.',
    badge: { backgroundColor: '#fef2f2', borderColor: '#fecaca', color: '#b91c1c' },
  },
  {
    id: 'A5',
    name: 'A5',
    summary: 'Стандартный универсальный формат',
    preview: 'Оптимальный баланс цена/эффект.',
    size: '14,2×20,1 см',
    orientation: 'вертикальный',
    benefits: [
      'Оптимальный баланс цена/эффект',
      'Быстрое восприятие',
      'Подходит для большинства задач',
    ],
    feature: 'Самый “рабочий” формат — с него начинают 80% клиентов.',
    badge: { backgroundColor: '#fefce8', borderColor: '#fde68a', color: '#b45309' },
  },
  {
    id: 'A6',
    name: 'A6',
    summary: 'Компактный, но информативный',
    preview: 'Сильный эффект при минимальной цене.',
    size: '14,2×9,8 см',
    orientation: 'горизонтальный',
    benefits: ['Бюджетный вариант', 'Читается вблизи', 'Подходит для коротких сообщений'],
    feature: 'Сильный эффект при минимальной стоимости.',
    badge: { backgroundColor: '#ecfccb', borderColor: '#bef264', color: '#3f6212' },
  },
  {
    id: 'A7',
    name: 'A7',
    summary: 'Мини-формат для короткой информации',
    preview: 'Лучше всего для дополнительного сообщения.',
    size: '6,9×9,8 см',
    orientation: 'вертикальный',
    benefits: ['Быстрое восприятие', 'Хорош как дополнительное сообщение', 'Не перегружает макет'],
    feature: 'Идеален, когда важно только одно чтобы позвонили.',
    badge: { backgroundColor: '#dbeafe', borderColor: '#bfdbfe', color: '#1d4ed8' },
  },
  {
    id: 'A9',
    name: 'A9',
    summary: 'Самый компактный формат',
    preview: 'Минимальная цена и быстрый контакт.',
    size: '7×4,7 см',
    orientation: 'горизонтальный',
    benefits: ['Минимальная цена', 'Чёткое быстрое сообщение', '“Здесь и сейчас”'],
    feature: 'Работает за счёт центрального размещения и простоты.',
    badge: { backgroundColor: '#ede9fe', borderColor: '#ddd6fe', color: '#6d28d9' },
  },
]

const prices = {
  block1: { A3: 332000, A4: 166000, A5: 83000, A6: 41500, A7: 23000, A9: 6000 },
  block2: { A3: 332000, A4: 166000, A5: 83000, A6: 41500, A7: 23000, A9: 6000 },
  block3: { A3: 432000, A4: 216000, A5: 108000, A6: 54000, A7: 30000, A9: 10000 },
  block4: { A3: 240000, A4: 120000, A5: 60000, A6: 30000, A7: 20000, A9: 5000 },
  block5: { A3: 332000, A4: 166000, A5: 83000, A6: 41500, A7: 23000, A9: 6000 },
}

const blockFormats = ref({
  1: 'A3',
  2: 'A3',
  3: 'A3',
  4: 'A3',
  5: 'A3',
})

const selectedBlocks = ref([])
const months = ref(1)
const activeBlock = ref(null)
const discountExcludedFormats = new Set(['A7', 'A9'])

const isFormatDiscountable = (formatId) => !discountExcludedFormats.has(formatId)

const toggleBlock = (block) => {
  if (selectedBlocks.value.includes(block)) {
    selectedBlocks.value = selectedBlocks.value.filter((item) => item !== block)
    if (activeBlock.value === block) {
      activeBlock.value = selectedBlocks.value[selectedBlocks.value.length - 1] || null
    }
  } else {
    selectedBlocks.value = [...selectedBlocks.value, block].sort()
    activeBlock.value = block
  }
}

const setBlockFormat = (block, formatId) => {
  blockFormats.value = { ...blockFormats.value, [block]: formatId }
}

const getBlockPrice = (blockNumber) => {
  const pricesForBlock = prices[`block${blockNumber}`] || {}
  const formatId = blockFormats.value[blockNumber] || 'A3'
  return pricesForBlock[formatId] || 0
}

const getDurationDiscount = (value) => {
  if (value >= 12) return 30
  if (value >= 6) return 20
  if (value >= 3) return 10
  return 0
}

const getBlocksDiscount = (count) => {
  if (count >= 5) return 25
  if (count === 4) return 20
  if (count === 3) return 15
  if (count === 2) return 10
  return 0
}

const totalWithoutDiscount = computed(() => {
  if (!selectedBlocks.value.length) return 0
  return selectedBlocks.value.reduce((sum, block) => sum + getBlockPrice(block) * months.value, 0)
})
const discountableAmount = computed(() => {
  if (!selectedBlocks.value.length) return 0
  return selectedBlocks.value.reduce((sum, block) => {
    const formatId = blockFormats.value[block] || 'A3'
    if (!isFormatDiscountable(formatId)) {
      return sum
    }
    return sum + getBlockPrice(block) * months.value
  }, 0)
})

const clientDiscountPercent = 10
const durationDiscountPercent = computed(() => getDurationDiscount(months.value))
const blocksDiscountPercent = computed(() => getBlocksDiscount(selectedBlocks.value.length))

const totalDiscountPercent = computed(() => {
  if (!discountableAmount.value) return 0
  const total = clientDiscountPercent + durationDiscountPercent.value + blocksDiscountPercent.value
  return Math.min(50, total)
})

const discountAmount = computed(() => (discountableAmount.value * totalDiscountPercent.value) / 100)
const totalWithDiscount = computed(() => totalWithoutDiscount.value - discountAmount.value)

const formatCurrency = (value = 0) => `${Math.max(0, Math.round(value || 0)).toLocaleString('ru-RU')} ₸`
const formatPrice = (value = 0) => formatCurrency(value)

const monthLabel = (value) => {
  if (value === 1) return 'месяц'
  if (value >= 2 && value <= 4) return 'месяца'
  return 'месяцев'
}

const currentBlock = computed(() => activeBlock.value || selectedBlocks.value[0] || null)

const activeFormatInfo = computed(() => {
  if (!currentBlock.value) {
    return {
      id: '—',
      size: '',
      orientation: '',
      summary: '',
      benefits: [],
      feature: '',
      price: 0,
      isDiscountable: true,
    }
  }
  const formatId = blockFormats.value[currentBlock.value] || 'A3'
  const format = formats.find((item) => item.id === formatId) || {}
  return {
    id: formatId,
    size: format.size || '',
    orientation: format.orientation || '',
    summary: format.summary || '',
    benefits: format.benefits || [],
    feature: format.feature || '',
    price: prices[`block${currentBlock.value}`]?.[formatId] || 0,
    isDiscountable: isFormatDiscountable(formatId),
  }
})

const handleOrderClick = () => {
  if (!selectedBlocks.value.length) return
  console.log({
    blocks: selectedBlocks.value,
    blockFormats: blockFormats.value,
    months: months.value,
    totalWithoutDiscount: totalWithoutDiscount.value,
    totalDiscountPercent: totalDiscountPercent.value,
    totalWithDiscount: totalWithDiscount.value,
  })
}
</script>

<style scoped>
.bg-custom-green {
  background-color: #98c850;
}
.text-custom-green {
  color: #98c850;
}
.border-custom-green {
  border-color: #98c850;
}

.visual-card {
  border: 1px solid #dfe8cf;
  border-radius: 20px;
  padding: 20px;
  background: linear-gradient(140deg, #f6ffee, #eef7e8);
  box-shadow: 0 15px 45px rgba(152, 200, 80, 0.15);
}

.visual-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  border: 1px solid rgba(152, 200, 80, 0.3);
  background: #fff;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.4);
}

.visual-img {
  width: 100%;
  display: block;
  object-fit: cover;
}

.badge {
  position: absolute;
  top: 16px;
  left: 16px;
  background: #98c850;
  color: #fff;
  padding: 6px 14px;
  font-weight: 700;
  border-radius: 9999px;
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.14);
  z-index: 2;
}

.visual-caption {
  padding: 12px 14px;
  font-size: 12px;
  color: #4b5563;
  background: #f9fdf4;
  border-top: 1px solid rgba(152, 200, 80, 0.2);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.how-it-works__item {
  transition: transform 0.28s ease, box-shadow 0.28s ease;
}

.how-it-works__item:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 30px rgba(152, 200, 80, 0.2);
}

.how-it-works__index {
  box-shadow: 0 10px 20px rgba(152, 200, 80, 0.16);
  animation: howItWorksPulse 4s ease-in-out infinite;
}

@keyframes howItWorksPulse {
  0% {
    box-shadow: 0 0 0 0 rgba(152, 200, 80, 0.35);
  }
  70% {
    box-shadow: 0 0 0 16px rgba(152, 200, 80, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(152, 200, 80, 0);
  }
}
</style>
