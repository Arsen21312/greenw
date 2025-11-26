<!-- components/BlocksSection.vue -->
<template>
  <section class="bg-gradient-to-r from-green-100 to-gray-100 py-16">
    <div class="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4">
      <BlockCard
        v-for="block in blocks"
        :key="block.id"
        :block="block"
        @open-modal="openModal"
      />
    </div>

    <!-- Модальное окно "Подробнее" -->
    <BlockModal
      v-if="isModalOpen"
      :block="selectedBlock"
      @close-modal="closeModal"
      @open-order-modal="openOrderModal"
    />

    <!-- Модальное окно "Заказать" -->
    <OrderModal
      v-if="isOrderModalOpen"
      :block="selectedBlock"
      @close-order-modal="closeOrderModal"
    />
  </section>
</template>

<script setup>
import { ref } from 'vue'
import BlockCard from '@/components/BlockCard.vue'
import BlockModal from '@/components/BlockModal.vue'
import OrderModal from '@/components/OrderModal.vue' // Предполагается, что этот компонент уже существует

// Импорт изображений (если они хранятся в assets)
import image1 from '@/assets/1b.webp'
import image2 from '@/assets/2b.webp'
import image3 from '@/assets/33b.webp'
import image4  from '@/assets/4b.webp'

// Данные блоков
const blocks = ref([
  {
    id: 1,
    name: 'Блок 1 Юго-Восток (вторичное жильё)',
    image: image1,
    houses: '40',
    lifts: '102',
    apartments: '3 894',
    population: '11 682',
    addressUrl: '/addresses/block-1-address.docx',
    description:
      'Дома расположены по улицам: Строителей, Орбита, Гапеева, Муканова, пр. Шахтеров, Карбышева, К. Дюсембекова, Сатыбалдына, Язева и Университетская'
  },
  {
    id: 2,
    name: 'Блок 2',
    image: image2,
    houses: '60',
    lifts: '108',
    apartments: '3 987',
    population: '11 961',
    addressUrl: '/addresses/block-2-address.docx',
    description:
      'Улицы: Гульдер 1, Степной 1, Степной 2, Степной 3, Степной 4, Шахтеров, Таттимбета, Сарыарка. Дома расположены на главных улицах города, обеспечивая доступ к ключевым инфраструктурным объектам, включая школы и магазины.'
  },
  {
    id: 3,
    name: 'Блок 3',
    image: image3,
    houses: '19',
    lifts: '102',
    apartments: '3 201',
    population: '9 603',
    addressUrl: '/addresses/block-3-address.docx',
    description:
      'ЖК: Атамекен, Орда, Эталон, Каусар, Гульдер, Томирис, Монако-2, Байсанат 1, Сары-Арка, Орлеу, Таугуль, Улытау, Новый центр. Жилые комплексы находятся в развивающихся районах, предоставляя современное жилье с хорошей транспортной доступностью и удобствами для жителей.'
  },
  {
    id: 4,
    name: 'Блок 4',
    image: image4,
    houses: '36',
    lifts: '102',
    apartments: '3 484',
    population: '10 452',
    addressUrl: '/addresses/block-4-address.docx',
    description:
      'Районы: Восток-1, Восток-2, Восток-3, Восток-5, Сырдарья, Голубые пруды. Также входят 10 подъездов нового ЖК Орда. Широкая аудитория — от пенсионеров до молодых семей. Жильё с устоявшейся инфраструктурой и высокой плотностью заселения.'
  }
  
])

// Управление модальными окнами
const isModalOpen = ref(false)
const isOrderModalOpen = ref(false)
const selectedBlock = ref({})

// Функция открытия модального окна "Подробнее"
const openModal = (block) => {
  selectedBlock.value = block
  isModalOpen.value = true
}

// Функция закрытия модального окна "Подробнее"
const closeModal = () => {
  isModalOpen.value = false
}

// Функция открытия модального окна "Заказать"
const openOrderModal = (block) => {
  selectedBlock.value = block
  isOrderModalOpen.value = true
}

// Функция закрытия модального окна "Заказать"
const closeOrderModal = () => {
  isOrderModalOpen.value = false
}
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
