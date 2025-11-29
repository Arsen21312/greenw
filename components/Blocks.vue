<!-- components/BlocksSection.vue -->
<template>
  <section class="bg-[#e9f4da] py-16">
    <div class="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 px-4 items-start">
      <BlockCard
        v-for="block in blocks"
        :key="block.id"
        :block="block"
        @order="scrollToContact"
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
import image3 from '@/assets/3b.webp'
import image4  from '@/assets/4b.webp'
import image5 from '@/assets/5b.webp'

// Данные блоков
const blocks = ref([
  {
    id: 1,
    title: 'Блок 1 Юго-Восток',
    subtitle: 'вторичное жильё',
    image: image1,
    houses: '40',
    lifts: '102',
    apartments: '3 894',
    population: '11 682',
    addressUrl: '/addresses/block-1-address.docx',

    details: 'Улицы: Орбита, Гапеева, Дюсембекова, Карбышева, Муканова, Сатыбалдина, Язева, Университетская и др.'
  },
  {
    id: 2,
    title: 'Блок 2 Юго-Восток',
    subtitle: 'вторичное жильё',
    image: image2,
    houses: '60',
    lifts: '108',
    apartments: '3 987',
    population: '11 961',
    addressUrl: '/addresses/block-2-address.docx',
    details: 'Микрорайоны: Гульдер-1, Степной 1–4, улицы Шахтёров, Сарыарка, Таттимбета и др.'
  },
  {
    id: 3,
    title: 'Блок 3 Элитные ЖК',
    subtitle: 'новостройки',
    image: image3,
    houses: '19',
    lifts: '102',
    apartments: '3 201',
    population: '9 603',
    addressUrl: '/addresses/block-3-address.docx',
    details: 'Районы: Юго-Восток и Майкудук. Современные жилые комплексы, новые дома.'
  },
  {
    id: 4,
    title: 'Блок 4 Майкудук',
    subtitle: 'вторичное жильё',
    image: image4,
    houses: '36',
    lifts: '102',
    apartments: '3 484',
    population: '10 452',
    addressUrl: '/addresses/block-4-address.docx',

    details: 'Микрорайоны: Восток 1–5, Голубые пруды, Сердарья, Карла Маркса и 19 микрорайон.'
  },
  {
    id: 5,
    title: 'Блок 5 Город',
    subtitle: 'вторичное жильё + ЖК',
    image: image5,
    houses: '40',
    lifts: '90',
    apartments: '3 236',
    population: '9 925',
    addressUrl: '/addresses/block-5-address.docx',
    details: 'Улицы:  Бухар Жырау, Назарбаева, Ерубаева, Ержанова, Ермекова и прилегающие кварталы.'
  }

])

const scrollToContact = () => {
  const el = document.getElementById('contact')
  if (!el) return

  el.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  })
}
</script>

<style scoped>
</style>
