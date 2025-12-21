<template>
  <div class="flex min-h-screen flex-col bg-gray-50 text-gray-900">
    <NavBar class="shadow-md bg-white z-10" />

    <main class="flex-grow">
      <section class="bg-white pt-24 pb-16 md:pt-28 md:pb-20">
        <div class="container mx-auto px-6">
          <div class="mx-auto max-w-3xl text-center space-y-4">
            <h1 class="text-3xl md:text-5xl font-extrabold text-gray-900">
              Кейсы рекламы в лифтах Караганды
            </h1>
            <p class="text-base md:text-lg text-gray-600">
              Реальные примеры размещений и результатов — от задачи до итоговых цифр.
            </p>
          </div>

          <div class="mt-10 flex flex-wrap justify-center gap-3">
            <button
              v-for="category in categories"
              :key="category"
              @click="selectedCategory = category"
              :class="[
                'px-4 py-2 rounded-full border text-sm md:text-base font-semibold transition',
                selectedCategory === category
                  ? 'bg-[#4caf4f] border-[#4caf4f] text-white'
                  : 'border-[#a8cc55]/60 text-gray-700 hover:text-[#2e7d32] hover:border-[#4caf4f]'
              ]"
            >
              {{ category }}
            </button>
          </div>

          <div class="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <article
              v-for="caseItem in filteredCases"
              :key="caseItem.slug"
              class="flex h-full flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div class="space-y-4 flex-1">
                <div class="space-y-1">
                  <h2 class="text-xl md:text-2xl font-bold text-gray-900">
                    {{ caseItem.title }}
                  </h2>
                  <p class="text-sm text-gray-600">
                    {{ caseItem.clientName }} · {{ caseItem.city }}
                  </p>
                </div>

                <p class="text-base text-gray-700">
                  {{ caseItem.shortDescription }}
                </p>

                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="service in caseItem.services.slice(0, 2)"
                    :key="service"
                    class="rounded-full bg-[#f3f8ee] px-3 py-1 text-xs font-semibold text-[#2e7d32]"
                  >
                    {{ service }}
                  </span>
                </div>

                <div class="grid gap-3 sm:grid-cols-2">
                  <div
                    v-for="metric in caseItem.metrics.slice(0, 2)"
                    :key="metric.label"
                    class="rounded-2xl bg-gray-50 p-3 text-center"
                  >
                    <p class="text-sm text-gray-500">{{ metric.label }}</p>
                    <p class="text-lg font-bold text-gray-900">{{ metric.value }}</p>
                  </div>
                </div>
              </div>

              <NuxtLink
                :to="`/cases/${caseItem.slug}`"
                class="mt-6 inline-flex items-center justify-center rounded-xl bg-[#4caf4f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#43a047]"
              >
                Посмотреть кейс
              </NuxtLink>
            </article>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import { cases } from '~/src/data/cases'

const selectedCategory = ref('Все')

const categories = computed(() => {
  const types = Array.from(new Set(cases.map((item) => item.clientType)))
  return ['Все', ...types]
})

const filteredCases = computed(() => {
  if (selectedCategory.value === 'Все') return cases
  return cases.filter((item) => item.clientType === selectedCategory.value)
})

useHead({
  title: 'Кейсы рекламы в лифтах Караганды — GreenW',
  meta: [
    {
      name: 'description',
      content:
        'Кейсы GreenW: реальные примеры размещений рекламы в лифтах Караганды и результаты кампаний.'
    }
  ]
})
</script>
