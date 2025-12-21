<template>
  <div class="flex min-h-screen flex-col bg-gray-50 text-gray-900">
    <NavBar class="shadow-md bg-white z-10" />

    <main class="flex-grow">
      <section class="bg-white pt-24 pb-12 md:pt-28 md:pb-16">
        <div class="container mx-auto px-6">
          <div class="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div class="space-y-5">
              <p class="text-sm font-semibold uppercase tracking-wide text-[#2e7d32]">
                Кейсы GreenW
              </p>
              <h1 class="text-3xl md:text-5xl font-extrabold text-gray-900">
                {{ caseItem.title }}
              </h1>
              <p class="text-base md:text-lg text-gray-700">
                {{ caseItem.clientName }} · {{ caseItem.clientType }} · {{ caseItem.city }}
              </p>
              <p class="text-base md:text-lg text-gray-600">
                {{ caseItem.shortDescription }}
              </p>
              <div class="inline-flex flex-wrap gap-2">
                <span class="rounded-full bg-[#f3f8ee] px-3 py-1 text-xs font-semibold text-[#2e7d32]">
                  {{ caseItem.mainQuery }}
                </span>
              </div>
            </div>

            <div class="rounded-3xl bg-gray-100 p-4 shadow-sm ring-1 ring-gray-100 max-h-[360px] xl:max-h-[420px]">
              <img
                :src="caseItem.heroImage"
                :alt="caseItem.title"
                class="aspect-[9/16] w-full rounded-2xl object-cover max-h-[320px] xl:max-h-[360px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section class="py-12 md:py-16">
        <div class="container mx-auto px-6 space-y-10">
          <div class="grid gap-6 lg:grid-cols-2">
            <div class="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 space-y-2">
              <h2 class="text-xl font-bold text-gray-900">Задача</h2>
              <p class="text-gray-700">{{ caseItem.goal }}</p>
            </div>
            <div class="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 space-y-2">
              <h2 class="text-xl font-bold text-gray-900">С чего стартовали</h2>
              <p class="text-gray-700">{{ caseItem.startingPoint }}</p>
            </div>
          </div>

          <div class="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 space-y-4">
            <h2 class="text-xl font-bold text-gray-900">Что сделали</h2>
            <ul class="space-y-2 text-gray-700">
              <li
                v-for="item in solutionItems"
                :key="item"
                class="flex items-start gap-2"
              >
                <span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#4caf4f]" />
                <span class="min-w-0">{{ item }}</span>
              </li>
            </ul>
          </div>

          <div class="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div class="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 space-y-6">
              <div class="space-y-4">
                <h2 class="text-xl font-bold text-gray-900">Формат размещения</h2>
                <p class="text-gray-700">{{ caseItem.formatDetails }}</p>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="service in caseItem.services"
                    :key="service"
                    class="rounded-full bg-[#f3f8ee] px-3 py-1 text-xs font-semibold text-[#2e7d32]"
                  >
                    {{ service }}
                  </span>
                </div>
              </div>

              <div class="space-y-3">
                <h3 class="text-lg font-semibold text-gray-900">Фото размещения</h3>
                <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  <div
                    v-for="image in caseItem.gallery"
                    :key="image"
                    class="aspect-[9/16] w-full overflow-hidden rounded-2xl bg-gray-100"
                  >
                    <img
                      :src="image"
                      :alt="caseItem.title"
                      class="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 space-y-4">
              <h2 class="text-xl font-bold text-gray-900">Результат</h2>
              <p class="text-gray-700">{{ caseItem.resultText }}</p>
              <div class="grid gap-3">
                <div
                  v-for="metric in caseItem.metrics"
                  :key="metric.label"
                  class="rounded-2xl bg-gray-50 p-4"
                >
                  <p class="text-sm text-gray-500">{{ metric.label }}</p>
                  <p class="text-lg font-bold text-gray-900">{{ metric.value }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100 space-y-4">
            <h2 class="text-xl font-bold text-gray-900">Дополнительная информация</h2>
            <div class="space-y-4">
              <template v-for="(section, index) in seoSections" :key="index">
                <p
                  v-if="section.type === 'paragraph'"
                  class="text-gray-700 leading-relaxed"
                  v-html="section.html"
                />
                <blockquote
                  v-else-if="section.type === 'quote'"
                  class="rounded-2xl border-l-4 border-[#4caf4f] bg-[#f3f8ee] px-4 py-3 text-gray-700"
                >
                  <p class="leading-relaxed" v-html="section.html" />
                </blockquote>
                <ul
                  v-else-if="section.type === 'list' && !section.ordered"
                  class="space-y-2 text-gray-700"
                >
                  <li
                    v-for="item in section.items"
                    :key="item"
                    class="flex items-start gap-2"
                  >
                    <span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#4caf4f]" />
                    <span class="min-w-0" v-html="item" />
                  </li>
                </ul>
                <ol
                  v-else-if="section.type === 'list' && section.ordered"
                  class="space-y-2 list-decimal list-inside text-gray-700"
                >
                  <li v-for="item in section.items" :key="item" v-html="item" />
                </ol>
              </template>
            </div>
          </div>
        </div>
      </section>

      <section class="bg-white py-12">
        <div class="container mx-auto px-6 space-y-8">
          <NuxtLink
            to="/cases"
            class="inline-flex items-center justify-center rounded-xl border border-[#4caf4f] px-5 py-3 text-sm font-semibold text-[#2e7d32] transition hover:bg-[#f3f8ee]"
          >
            Вернуться ко всем кейсам
          </NuxtLink>

          <div v-if="otherCases.length" class="space-y-4">
            <h2 class="text-2xl font-bold text-gray-900">Другие кейсы</h2>
            <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <NuxtLink
                v-for="item in otherCases"
                :key="item.slug"
                :to="`/cases/${item.slug}`"
                class="group rounded-3xl bg-gray-50 p-5 shadow-sm ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <p class="text-lg font-semibold text-gray-900 group-hover:text-[#2e7d32]">
                  {{ item.title }}
                </p>
                <p class="text-sm text-gray-600">
                  {{ item.clientName }} · {{ item.city }}
                </p>
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import { cases } from '~/src/data/cases'

const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))
const caseItem = computed(() => cases.find((item) => item.slug === slug.value))

if (!caseItem.value) {
  throw createError({ statusCode: 404, statusMessage: 'Case not found' })
}

const solutionItems = computed(() =>
  (caseItem.value?.solution || '').split('\n').filter(Boolean)
)

const otherCases = computed(() =>
  cases.filter((item) => item.slug !== slug.value).slice(0, 3)
)

type SeoSection =
  | { type: 'paragraph'; html: string }
  | { type: 'quote'; html: string }
  | { type: 'list'; ordered: boolean; items: string[] }

const linkify = (text: string) =>
  text.replace(
    /NeuralWiseWolf\.com/g,
    '<a href="https://neuralwisewolf.com" class="text-[#2e7d32] underline" target="_blank" rel="noopener noreferrer">NeuralWiseWolf.com</a>'
  )

const seoSections = computed<SeoSection[]>(() => {
  const raw = caseItem.value?.seoBody || ''
  if (!raw) return []

  const blocks = raw.split('\n\n').map((block) => block.trim()).filter(Boolean)
  const sections: SeoSection[] = []

  for (const block of blocks) {
    const lines = block.split('\n').map((line) => line.trim()).filter(Boolean)
    if (!lines.length) continue

    const listLines = lines.filter((line) => /^(\d+\)|—\s)/.test(line))
    const restLines = lines.filter((line) => !/^(\d+\)|—\s)/.test(line))

    if (restLines.length) {
      const paragraph = linkify(restLines.join(' '))
      if (paragraph.startsWith('«') && paragraph.endsWith('»')) {
        sections.push({ type: 'quote', html: paragraph })
      } else {
        sections.push({ type: 'paragraph', html: paragraph })
      }
    }

    if (listLines.length) {
      const ordered = listLines.every((line) => /^\d+\)/.test(line))
      const items = listLines.map((line) =>
        linkify(line.replace(/^(\d+\)|—)\s?/, ''))
      )
      sections.push({ type: 'list', ordered, items })
    }
  }

  return sections
})

useHead({
  title: caseItem.value.seoTitle,
  meta: [
    {
      name: 'description',
      content: caseItem.value.seoDescription
    }
  ]
})
</script>
