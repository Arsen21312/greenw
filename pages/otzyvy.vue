<template>
  <div class="min-h-screen bg-slate-50">
    <NavBar class="z-10 bg-white shadow-md" />
    <main class="pt-24 md:pt-10">
      <section class="px-4 py-12">
        <div class="mx-auto max-w-6xl space-y-10">
          <header class="space-y-3 text-center">
            <p class="text-sm font-semibold uppercase tracking-widest text-custom-green">Живые результаты</p>
            <h1 class="text-3xl font-bold text-slate-900 md:text-4xl">Отзывы и результаты</h1>
            <p class="text-slate-600">
              Мы собрали видеокомментарии от рекламодателей, жителей и владельцев лифтов. Выберите категорию и
              посмотрите, как работает реклама GreenW.
            </p>
          </header>

          <div class="flex flex-wrap justify-center gap-3">
            <button
              v-for="tab in tabs"
              :key="tab.value"
              class="rounded-full border px-4 py-2 text-sm font-semibold transition"
              :class="
                selectedTab === tab.value
                  ? 'border-custom-green bg-custom-green text-white shadow'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-custom-green'
              "
              @click="selectedTab = tab.value"
            >
              {{ tab.label }}
            </button>
          </div>

          <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <article
              v-for="review in filteredReviews"
              :key="review.id"
              class="flex flex-col gap-4 rounded-2xl bg-white p-5 shadow-sm"
            >
              <SocialVideoEmbed
                :src="review.videoUrl"
                :platform="review.platform || 'youtube'"
                :source-url="review.sourceUrl || ''"
                :title="review.name"
                aspect-ratio="9 / 16"
              />

              <div class="space-y-2 text-slate-800">
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="type in review.types"
                    :key="`${review.id}-${type}`"
                    class="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600"
                  >
                    {{ tabLabels[type] }}
                  </span>
                </div>

                <h3 class="text-xl font-semibold text-slate-900">{{ review.name }}</h3>
                <p class="text-sm text-slate-600">{{ review.business }} · {{ review.instagram }}</p>
                <p class="leading-relaxed text-slate-700">{{ review.fullText }}</p>

                <a
                  v-if="review.sourceUrl"
                  :href="review.sourceUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex text-sm font-semibold text-custom-green hover:underline"
                >
                  Открыть оригинал в Instagram
                </a>
              </div>
            </article>
          </div>

          <div class="flex flex-col items-center gap-6 rounded-2xl bg-white p-6 shadow-md md:flex-row md:p-10">
            <div class="flex-1 space-y-2 text-center md:text-left">
              <p class="text-sm font-semibold uppercase tracking-widest text-custom-green">Готовы обсудить?</p>
              <h2 class="text-2xl font-bold text-slate-900">Хотите такие же результаты?</h2>
              <p class="text-slate-600">
                Свяжитесь с нами в WhatsApp и мы подготовим расчет по вашим районам и целевой аудитории.
              </p>
            </div>

            <a
              href="https://api.whatsapp.com/send?phone=77086755846&text=Здравствуйте!%20Хочу%20узнать%20подробнее%20про%20рекламу%20в%20лифтах."
              target="_blank"
              rel="noopener"
              class="inline-flex items-center justify-center rounded-full bg-custom-green px-6 py-3 font-semibold text-white shadow transition hover:opacity-90"
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
          <div class="py-12 text-center text-slate-500">Загрузка вопросов...</div>
        </template>
      </Suspense>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent, ref } from 'vue'
import { reviews } from '@/assets/reviews'
import Footer from '@/components/Footer.vue'
import NavBar from '@/components/NavBar.vue'
import SocialVideoEmbed from '@/components/SocialVideoEmbed.vue'

const AsyncFaq = defineAsyncComponent(() => import('@/components/Faq.vue'))

const tabs = [
  { label: 'Все', value: 'all' },
  { label: 'Рекламодатели', value: 'advertiser' },
  { label: 'Местные жители', value: 'locals' },
  { label: 'Владельцы лифтов', value: 'owners' },
]

const tabLabels = {
  advertiser: 'Рекламодатель',
  locals: 'Местные жители',
  owners: 'Владельцы лифтов',
}

const selectedTab = ref('all')

const filteredReviews = computed(() => {
  if (selectedTab.value !== 'all') {
    return reviews
      .filter((item) => item.type === selectedTab.value)
      .map((item) => ({
        ...item,
        types: [item.type],
      }))
  }

  const groupedReviews = new Map()

  for (const review of reviews) {
    const reviewKey = review.sourceUrl || `${review.platform || 'youtube'}:${review.videoUrl}`

    if (!groupedReviews.has(reviewKey)) {
      groupedReviews.set(reviewKey, {
        ...review,
        types: [review.type],
      })
      continue
    }

    const existingReview = groupedReviews.get(reviewKey)
    if (!existingReview.types.includes(review.type)) {
      existingReview.types.push(review.type)
    }
  }

  return Array.from(groupedReviews.values())
})

useSeoMeta({
  title: 'Отзывы GreenW — реальные истории клиентов',
  description: 'Видеоотзывы рекламодателей, жителей и владельцев лифтов о рекламе GreenW в Караганде.',
  ogTitle: 'Отзывы GreenW',
  ogDescription: 'Посмотрите, как работает реклама в лифтах и на экранах на примере реальных клиентов.',
  robots: 'index,follow',
})
</script>
