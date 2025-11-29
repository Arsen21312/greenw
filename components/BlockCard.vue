<template>
  <article class="block-card flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden">
    <div class="h-56 overflow-hidden">
      <img :src="block.image" loading="lazy" :alt="`Блок ${block.title}`" class="w-full h-full object-cover" />
    </div>

    <div class="flex-1 flex flex-col p-5">
      <div class="flex-1">
        <h3 class="text-2xl font-semibold text-center text-gray-800">{{ block.title }}</h3>
        <p v-if="block.subtitle" class="mt-1 text-sm text-gray-600 text-center">{{ block.subtitle }}</p>

        <div v-if="isExpanded" class="mt-4 space-y-1 text-sm text-gray-700">
          <p v-if="block.details" class="mt-2 text-xs text-gray-500 leading-snug">
            {{ block.details }}
          </p>
          <p><span class="font-medium">Дома:</span> {{ block.houses }}</p>
          <p><span class="font-medium">Лифты:</span> {{ block.lifts }}</p>
          <p><span class="font-medium">Квартиры:</span> {{ block.apartments }}</p>
          <p><span class="font-medium">Население:</span> {{ block.population }}</p>
        </div>
      </div>

      <div class="mt-4 flex gap-3">
        <button
          type="button"
          @click="handleOrder"
          class="px-4 py-2 rounded-lg bg-lime-500 text-white text-sm font-semibold shadow-sm hover:opacity-90 transition"
        >
          Заказать
        </button>

        <button
          v-if="!isExpanded"
          type="button"
          @click="handleMore"
          class="px-4 py-2 rounded-lg border border-lime-500 text-lime-600 text-sm font-semibold bg-white hover:bg-lime-50 transition"
        >
          Подробнее
        </button>

        <a
          v-else
          :href="block.addressUrl"
          class="px-4 py-2 rounded-lg border border-lime-500 text-lime-600 text-sm font-semibold bg-white hover:bg-lime-50 transition text-center"
        >
          Скачать адреса
        </a>
      </div>
    </div>
  </article>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue'

defineProps({
  block: { type: Object, required: true },
})

const emit = defineEmits(['order'])

const isExpanded = ref(false)
const handleMore = () => {
  if (!isExpanded.value) {
    isExpanded.value = true
  }
}

const handleOrder = () => emit('order')
</script>

<style scoped>
</style>
