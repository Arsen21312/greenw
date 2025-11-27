<template>
  <section class="pricing-section py-16 pb-12">
    <div class="container mx-auto px-4 max-w-6xl">
      <div class="text-center max-w-3xl mx-auto">
        <h2 class="text-3xl font-bold text-gray-900 mb-3">Выберите формат и блок размещения</h2>
        <p class="text-gray-700">
          Простая таблица по актуальным ценам. Выберите нужный блок и добавьте форматы в расчёт.
        </p>
      </div>

      <div class="flex flex-wrap justify-center gap-3 mt-8">
        <button
          v-for="block in blocks"
          :key="block"
          @click="activeTab = block"
          class="px-4 py-2 rounded-full border transition font-semibold"
          :class="activeTab === block ? 'bg-custom-green text-white border-custom-green shadow' : 'bg-white text-gray-800 border-gray-300 hover:border-custom-green'"
        >
          Блок {{ block }}
        </button>
      </div>

      <div class="bg-white rounded-xl shadow-lg p-6 mt-8">
        <div class="grid grid-cols-1 lg:grid-cols-[1.3fr_0.9fr] gap-6 items-start">
          <div class="grid grid-cols-1 gap-4">
          <div
            v-for="format in formats"
            :key="format.id"
            class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-4 border border-gray-200 rounded-lg hover:border-custom-green transition"
          >
            <div class="flex items-start gap-3">
              <div class="w-12 h-12 rounded-lg bg-green-50 border border-green-200 text-custom-green font-bold grid place-items-center">
                {{ format.id }}
              </div>
              <div>
                <p class="text-lg font-semibold text-gray-900">{{ format.name }}</p>
                <p class="text-sm text-gray-600">{{ format.size }} · {{ format.orientation }}</p>
                <p class="text-sm text-gray-500 mt-1">{{ format.note }}</p>
              </div>
            </div>

            <div class="flex items-center gap-4">
              <div class="text-right">
                <p class="text-xs uppercase text-gray-500">Цена / мес</p>
                <p class="text-xl font-bold text-gray-900">{{ formatPrice(prices[`block${activeTab}`][format.id]) }}</p>
              </div>
              <a
                href="#contact"
                class="min-w-[140px] px-4 py-2 rounded-lg border font-semibold transition bg-custom-green text-white border-custom-green hover:opacity-90 text-center"
              >
                Заказать звонок
              </a>
            </div>
          </div>
        </div>
          <div class="visual-card">
            <p class="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <span class="inline-block w-2 h-2 rounded-full bg-custom-green"></span>
              Как это выглядит в лифте
            </p>
            <div class="visual-wrapper">
              <div class="badge">Пример макета</div>
              <img :src="visualMock" alt="Пример размещения рекламы в лифте" class="visual-img" />
              <div class="visual-caption">
                Вид спереди: A3 и A4 крупные форматы, A5 и A9 они компактные, читаются на расстоянии
              </div>
            </div>
            <ul class="mt-4 space-y-2 text-sm text-gray-700">
              <li>100% фотоотчет. После размещения предоставляем фотоотчет с подтверждением</li>
              <li>Защита от вандализма. Объявления размещаются под защитными антивандальными стеклами. С каждым лифтом заключен договор</li>
              <li>Гарантия срока размещения. Ваша реклама будет висеть заявленный период без повреждений</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import visualMock from '@/assets/formats-mock.png'

const blocks = [1, 2, 3, 4, 5]
const activeTab = ref(1)

const formats = [
  { id: 'A3', name: 'A3', size: '58×20,1 см', orientation: 'горизонтальный', note: 'Максимальная заметность.' },
  { id: 'A4', name: 'A4', size: '28,8×20,1 см', orientation: 'горизонтальный', note: 'Сбалансированный формат.' },
  { id: 'A5', name: 'A5', size: '14,2×20,1 см', orientation: 'вертикальный', note: 'Компактно и наглядно.' },
  { id: 'A6', name: 'A6', size: '14,2×9,8 см', orientation: 'горизонтальный', note: 'Для ключевых офферов.' },
  { id: 'A7', name: 'A7', size: '6,9×9,8 см', orientation: 'вертикальный', note: 'Краткие контакты и логотип.' },
  { id: 'A9', name: 'A9', size: '5,2×3,7 см', orientation: 'горизонтальный', note: 'Мини-формат для напоминаний.' },
]

const prices = ref({
  block1: { A3: 332000, A4: 166000, A5: 83000, A6: 41500, A7: 23000, A9: 6000 },
  block2: { A3: 332000, A4: 166000, A5: 83000, A6: 41500, A7: 23000, A9: 6000 },
  block3: { A3: 432000, A4: 216000, A5: 108000, A6: 54000, A7: 30000, A9: 10000 },
  block4: { A3: 240000, A4: 120000, A5: 60000, A6: 30000, A7: 20000, A9: 5000 },
  block5: { A3: 332000, A4: 166000, A5: 83000, A6: 41500, A7: 23000, A9: 6000 },
})

const formatPrice = (value) => `${value.toLocaleString('ru-RU')} ₸`
</script>

<style scoped>
.fade-expand-enter-active,
.fade-expand-leave-active {
  transition: all 0.6s ease;
}

.fade-expand-enter-from,
.fade-expand-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.fade-expand-enter-to,
.fade-expand-leave-from {
  opacity: 1;
  transform: translateY(0);
}

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
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 14px;
  background: linear-gradient(145deg, #f8fff4, #eef7e8);
  box-shadow: inset 0 0 0 1px rgba(152, 200, 80, 0.08);
}

.visual-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid #dce9c7;
  background: #fff;
}

.visual-img {
  width: 100%;
  display: block;
  object-fit: cover;
}

.badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: #98c850;
  color: #fff;
  padding: 6px 10px;
  font-weight: 700;
  border-radius: 9999px;
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.12);
  z-index: 2;
}

.visual-caption {
  padding: 10px 12px;
  font-size: 12px;
  color: #4b5563;
  background: #f9fdf4;
  border-top: 1px solid #e5e7eb;
}
</style>
