<!-- components/BlocksSection.vue -->
<template>
  <section class="bg-gradient-to-r from-green-100 to-gray-100 py-16">
    <div class="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 px-4">
      <BlockCard
        v-for="block in blocks"
        :key="block.id"
        :block="block"
      />
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import BlockCard from '@/components/BlockCard.vue'

// Импорт изображений (если они хранятся в assets)
import image1 from '@/assets/1b.webp'
import image2 from '@/assets/2b.webp'
import image3 from '@/assets/33b.webp'
import image4  from '@/assets/4b.webp'
import image5 from '@/assets/5.webp'

// Данные блоков
const blocks = ref([
  {
    id: 1,
    name: 'Блок 1 — Юго-Восток (вторичное жильё)',
    image: image1,
    houses: '40',
    lifts: '102',
    apartments: '3 894',
    population: '11 682',
    addressUrl: '/addresses/block-1-address.docx',
    summary: 'Юго-Восток, вторичное жильё.',
    details: 'Улицы: Орбита, Гапеева, Дюсембекова, Карбышева, Муканова, Сатыбалдина, Язева, Университетская и др.'
  },
  {
    id: 2,
    name: 'Блок 2 — Юго-Восток (вторичное жильё)',
    image: image2,
    houses: '60',
    lifts: '108',
    apartments: '3 987',
    population: '11 961',
    addressUrl: '/addresses/block-2-address.docx',
    summary: 'Юго-Восток, вторичное жильё.',
    details: 'Микрорайоны: Гульдер-1, Степной 1–4, улицы Шахтёров, Сарыарка, Таттимбета и др.'
  },
  {
    id: 3,
    name: 'Блок 3 — Элитные ЖК и новостройки',
    image: image3,
    houses: '19',
    lifts: '102',
    apartments: '3 201',
    population: '9 603',
    addressUrl: '/addresses/block-3-address.docx',
    summary: 'Современные жилые комплексы и новые дома.',
    details: 'Районы: Юго-Восток и Майкудук. Современные жилые комплексы, новые дома.'
  },
  {
    id: 4,
    name: 'Блок 4 — Майкудук (вторичное жильё)',
    image: image4,
    houses: '36',
    lifts: '102',
    apartments: '3 484',
    population: '10 452',
    addressUrl: '/addresses/block-4-address.docx',
    summary: 'Майкудук, вторичное жильё.',
    details: 'Микрорайоны: Восток 1–5, Голубые пруды, Сердарья, Карла Маркса и др.'
  },
  {
    id: 5,
    name: 'Блок 5 — Центр города',
    image: image5,
    houses: '50',
    lifts: '101',
    apartments: '3 636',
    population: '10 925',
    addressUrl: '/addresses/block-5-address.docx',
    summary: 'Центр города: новостройки и вторичное жильё.',
    details: 'Улицы: Назарбаева, Ерубаева, Ержанова, Ермекова и прилегающие кварталы.'
  }

])
</script>

<style scoped>
.bg-custom-green {
  background-color: #4CAF50; /* Ваш оригинальный цвет */
}
.text-custom-green {
  color: #4CAF50; /* Ваш оригинальный цвет */
}
.shadow-lg {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}
.hover\:scale-105:hover {
  transform: scale(1.05);
}
</style>
