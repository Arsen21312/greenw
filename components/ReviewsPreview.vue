<template>
  <section class="bg-white py-12 px-4">
    <div class="w-full max-w-7xl mx-auto space-y-8">
      <div class="text-center">
        <p class="text-sm uppercase tracking-widest text-custom-green font-semibold">Что о нас говорят</p>
        <h2 class="text-3xl font-bold text-slate-900 mt-2">Живые отзывы клиентов</h2>
      </div>

      <div class="flex flex-wrap justify-center gap-4 text-sm font-semibold">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          @click="selectedTab = tab.value"
          class="px-4 py-2 rounded-full border transition"
          :class="
            selectedTab === tab.value
              ? 'bg-custom-green border-custom-green text-white shadow'
              : 'bg-white border-slate-200 text-slate-600 hover:border-custom-green'
          "
        >
          {{ tab.label }}
        </button>
      </div>

      <div class="rounded-3xl border border-slate-200 shadow-md bg-slate-50/90 p-6 lg:p-10">
        <div v-if="selectedTab !== 'owners'" class="space-y-12">
          <div
            v-for="review in currentVideos"
            :key="review.id"
            class="flex flex-col lg:flex-row gap-8 items-start"
          >
            <div class="flex-1 w-full">
              <div class="rounded-2xl overflow-hidden shadow bg-black aspect-video">
                <iframe
                  :src="review.videoUrl"
                  :title="`Отзыв ${review.name}`"
                  class="w-full h-full"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
            <div class="flex-1 space-y-2 text-left text-slate-800">
              <p class="text-2xl font-semibold text-slate-900">{{ review.name }}</p>
              <p class="text-sm uppercase tracking-wide text-slate-500">{{ review.business }}</p>
              <p class="text-sm text-slate-500">{{ review.instagram }}</p>
              <p class="text-slate-700 leading-relaxed mt-4">{{ review.shortText }}</p>
            </div>
          </div>
        </div>

        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          <div
            v-for="photo in ownerCertificates"
            :key="photo.alt"
            class="rounded-2xl overflow-hidden shadow bg-white flex items-center justify-center p-4"
          >
            <img :src="photo.src" :alt="photo.alt" class="w-full object-contain max-h-96" />
          </div>
        </div>

        <div class="pt-6 text-center">
          <NuxtLink
            to="/otzyvy"
            class="inline-flex items-center justify-center px-6 py-3 rounded-full bg-custom-green text-white font-semibold shadow hover:opacity-90 transition"
          >
            Больше отзывов
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { reviews } from '@/assets/reviews'
import cert1 from '@/assets/1b.png'
import cert2 from '@/assets/2b.png'
import cert3 from '@/assets/3b.png'

const tabs = [
  { label: 'Рекламодатели', value: 'advertiser' },
  { label: 'Местные жители', value: 'locals' },
  { label: 'Владельцы лифтов', value: 'owners' },
]

const selectedTab = ref('advertiser')

const currentVideos = computed(() => {
  const filtered = reviews.filter((item) => item.type === selectedTab.value)
  return filtered.slice(0, 2)
})

const ownerCertificates = [
  { src: cert1, alt: 'Благодарственное письмо' },
  { src: cert2, alt: 'Рекомендательное письмо' },
  { src: cert3, alt: 'Рекомендация партнёров' },
]
</script>
