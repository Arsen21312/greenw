<template>
  <div class="bg-slate-50 min-h-screen">
    <NavBar class="shadow-md bg-white z-10" />
    <main class="pt-24 md:pt-10">
      <section class="py-12 px-4">
        <div class="max-w-6xl mx-auto space-y-10">
          <header class="text-center space-y-3">
            <p class="text-sm font-semibold text-custom-green uppercase tracking-widest">живые результаты</p>
            <h1 class="text-3xl md:text-4xl font-bold text-slate-900">Отзывы и результаты</h1>
            <p class="text-slate-600">
              Мы собрали видеокомментарии от рекламодателей, жителей и владельцев лифтов. Выберите категорию и
              посмотрите, как работает реклама GreenW.
            </p>
          </header>

          <div class="flex flex-wrap gap-3 justify-center">
            <button
              v-for="tab in tabs"
              :key="tab.value"
              @click="selectedTab = tab.value"
              class="px-4 py-2 rounded-full border transition font-semibold text-sm"
              :class="
                selectedTab === tab.value
                  ? 'bg-custom-green text-white border-custom-green shadow'
                  : 'bg-white text-slate-700 border-slate-200 hover:border-custom-green'
              "
            >
              {{ tab.label }}
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <article
              v-for="review in filteredReviews"
              :key="review.id"
              class="bg-white rounded-2xl shadow-sm p-5 flex flex-col gap-4"
            >
              <div class="aspect-video rounded-xl overflow-hidden bg-black shadow">
                <iframe
                  :src="review.videoUrl"
                  class="w-full h-full"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
              <div class="space-y-2 text-slate-800">
                <p class="text-sm uppercase tracking-widest text-slate-500">
                  {{ tabLabels[review.type] }}
                </p>
                <h3 class="text-xl font-semibold text-slate-900">{{ review.name }}</h3>
                <p class="text-sm text-slate-600">{{ review.business }} · {{ review.instagram }}</p>
                <p class="text-slate-700 leading-relaxed">{{ review.fullText }}</p>
              </div>
            </article>
          </div>

          <div class="bg-white rounded-2xl shadow-md p-6 md:p-10 flex flex-col md:flex-row items-center gap-6">
            <div class="flex-1 text-center md:text-left space-y-2">
              <p class="text-sm font-semibold text-custom-green uppercase tracking-widest">Готовы обсудить?</p>
              <h2 class="text-2xl font-bold text-slate-900">Хотите такие же результаты?</h2>
              <p class="text-slate-600">
                Свяжитесь с нами в WhatsApp и мы подготовим расчёт по вашим районам и целевой аудитории.
              </p>
            </div>
            <a
              href="https://api.whatsapp.com/send?phone=77086755846&text=Здравствуйте!%20Хочу%20узнать%20подробнее%20про%20рекламу%20в%20лифтах."
              target="_blank"
              rel="noopener"
              class="inline-flex items-center justify-center px-6 py-3 bg-custom-green text-white rounded-full font-semibold shadow hover:opacity-90 transition"
            >
              Написать в WhatsApp
            </a>
          </div>
        </div>
      </section>

      <Suspense>
        <template #default>
          <AsyncFaq />
        </template>
        <template #fallback>
          <div class="text-center py-12 text-slate-500">Загрузка вопросов...</div>
        </template>
      </Suspense>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref, computed } from 'vue'
import { reviews } from '@/assets/reviews'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'

const AsyncFaq = defineAsyncComponent(() => import('@/components/Faq.vue'))

const tabs = [
  { label: 'Все', value: 'all' },
  { label: 'Рекламодатели', value: 'advertiser' },
  { label: 'Местные жители', value: 'locals' },
  { label: 'Владельцы лифтов', value: 'owners' },
]

const tabLabels = {
  advertiser: 'Рекламодатель',
  locals: 'Местный житель',
  owners: 'Владелец лифта / ОСИ',
}

const selectedTab = ref('all')

const filteredReviews = computed(() => {
  if (selectedTab.value === 'all') {
    return reviews
  }
  return reviews.filter((item) => item.type === selectedTab.value)
})

useSeoMeta({
  title: 'Отзывы GreenW — реальные истории клиентов',
  description: 'Видеоотзывы рекламодателей, жителей и владельцев лифтов о рекламе GreenW в Караганде.',
  ogTitle: 'Отзывы GreenW',
  ogDescription: 'Посмотрите, как работает реклама в лифтах и на экранах на примере реальных клиентов.',
  robots: 'index,follow',
})
</script>
