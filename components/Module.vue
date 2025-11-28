<template>
  <section class="pricing-section py-12">
    <div class="container mx-auto px-4 max-w-6xl">
      <div class="text-center max-w-2xl mx-auto">
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Выберите блоки и формат</h2>
        <p class="text-gray-600">
          Сначала выбираем блоки размещения, проваливаемся в их форматы и цены, затем задаём срок и сразу видим итог.
        </p>
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
                    <div class="flex items-center gap-2">
                      <div class="w-8 h-8 rounded-full bg-green-50 border border-green-100 text-custom-green font-semibold grid place-items-center text-sm">
                        {{ format.id }}
                      </div>
                      <div>
                        <p class="text-sm font-semibold text-gray-900">{{ format.name }}</p>
                        <p class="text-xs text-gray-500">{{ format.size }}</p>
                      </div>
                    </div>
                    <p class="text-xs text-gray-500">{{ format.orientation }}</p>
                    <p class="text-sm font-semibold text-gray-900 mt-1">
                      {{ formatPrice(prices[`block${currentBlock}`][format.id]) }} / мес
                    </p>
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
                <p class="text-[11px] text-gray-400 mt-1">Введите от 1 до 12. По умолчанию 3 месяца.</p>
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
                Вид спереди: A3 и A4 — крупные форматы, A5 и A9 компактные, читаются даже вблизи.
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
                <li>{{ activeFormatInfo.size }} — {{ activeFormatInfo.orientation }}</li>
                <li>{{ activeFormatInfo.note }}</li>
                <li>{{ activeFormatInfo.highlight }}</li>
                <li class="text-custom-green font-semibold">
                  Стоимость: {{ formatPrice(activeFormatInfo.price) }} / мес
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
const formats = [
  { id: 'A3', name: 'A3', size: '58×20,1 см', orientation: 'горизонтальный', note: 'Максимальная заметность.' },
  { id: 'A4', name: 'A4', size: '28,8×20,1 см', orientation: 'горизонтальный', note: 'Сбалансированный формат.' },
  { id: 'A5', name: 'A5', size: '14,2×20,1 см', orientation: 'вертикальный', note: 'Компактно и наглядно.' },
  { id: 'A6', name: 'A6', size: '14,2×9,8 см', orientation: 'горизонтальный', note: 'Для ключевых офферов.' },
  { id: 'A7', name: 'A7', size: '6,9×9,8 см', orientation: 'вертикальный', note: 'Краткие контакты и логотип.' },
  { id: 'A9', name: 'A9', size: '5,2×3,7 см', orientation: 'горизонтальный', note: 'Мини-формат для напоминаний.' },
]

const formatHighlights = {
  A3: 'До 1800 контактов — идеален для крупных заявок и брендинга.',
  A4: 'Средний формат — заметен на расстоянии, даёт до 1200 показов.',
  A5: 'Компромисс между размером и ценой, отлично подходит для офферов.',
  A6: 'Короткие сообщения, до 900 просмотров в месяц.',
  A7: 'Используется для контактов и быстрых CTA, до 700 касаний.',
  A9: 'Мини-напоминания у кнопки вызова лифта, до 500 касаний.',
}

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
const months = ref(3)
const activeBlock = ref(null)

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
  if (count >= 5) return 30
  if (count === 4) return 20
  if (count === 3) return 15
  if (count === 2) return 10
  return 0
}

const totalWithoutDiscount = computed(() => {
  if (!selectedBlocks.value.length) return 0
  return selectedBlocks.value.reduce((sum, block) => sum + getBlockPrice(block) * months.value, 0)
})

const clientDiscountPercent = 10
const durationDiscountPercent = computed(() => getDurationDiscount(months.value))
const blocksDiscountPercent = computed(() => getBlocksDiscount(selectedBlocks.value.length))

const totalDiscountPercent = computed(() => {
  const total = clientDiscountPercent + durationDiscountPercent.value + blocksDiscountPercent.value
  return Math.min(50, total)
})

const discountAmount = computed(() => (totalWithoutDiscount.value * totalDiscountPercent.value) / 100)
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
      note: '',
      highlight: '',
      price: 0,
    }
  }
  const formatId = blockFormats.value[currentBlock.value] || 'A3'
  const format = formats.find((item) => item.id === formatId) || {}
  return {
    id: formatId,
    size: format.size || '',
    orientation: format.orientation || '',
    note: format.note || '',
    highlight: formatHighlights[formatId] || '',
    price: prices[`block${currentBlock.value}`]?.[formatId] || 0,
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
</style>
