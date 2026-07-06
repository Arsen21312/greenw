<template>
  <section class="bg-white py-12 px-4">
    <div class="w-full max-w-6xl mx-auto space-y-10">
      <div class="text-center space-y-3">
        <p class="text-sm uppercase tracking-[0.2em] text-custom-green font-semibold">что о нас говорят</p>
        <h2 class="text-3xl font-bold text-slate-900">Живые отзывы клиентов</h2>
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

      <div class="rounded-3xl border border-slate-200 shadow-md bg-slate-50/90 px-6 lg:px-10 py-8 space-y-8 min-h-[540px]">
        <div v-if="selectedTab === 'advertiser'" class="space-y-8 max-w-4xl mx-auto">
          <div class="rounded-2xl border border-emerald-100 bg-white/90 p-5 flex flex-col sm:flex-row items-start gap-4">
            <div class="h-12 w-12 rounded-xl bg-emerald-100 text-emerald-700 grid place-items-center text-xs font-semibold uppercase tracking-wide">
              2ГИС
            </div>
            <div class="flex-1 space-y-1 text-left">
              <p class="text-lg font-semibold text-slate-900">Отзыв в 2ГИС</p>
              <p class="text-sm text-slate-600">Свежий отзыв о нашей работе: аккуратный монтаж, быстрая реакция, понятные отчёты.</p>
            </div>
            <a
              :href="twoGisUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="px-4 py-2 rounded-lg border border-emerald-500 text-emerald-600 text-sm font-semibold bg-white hover:bg-emerald-50 transition"
            >
              Читать отзыв
            </a>
          </div>

          <div class="grid sm:grid-cols-2 gap-4">
            <div
              v-for="letter in thankYouLetters"
              :key="letter.alt"
              class="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm flex items-center justify-center"
            >
              <button type="button" class="block w-full" @click="openLetter(letter)">
                <img :src="letter.src" :alt="letter.alt" class="w-full h-72 object-contain" loading="lazy" />
              </button>
            </div>
          </div>
        </div>

        <div v-else-if="selectedTab === 'locals'">
          <div class="mx-auto max-w-4xl grid gap-8 lg:grid-cols-2 items-start">
            <div class="space-y-4 order-2 lg:order-1">
              <p class="text-xs uppercase tracking-[0.2em] text-emerald-600">местные жители</p>
              <h3 class="text-2xl font-semibold text-slate-900">Отзыв из Instagram</h3>
              <p class="text-sm text-slate-700">
                Добавили Instagram-пост прямо в превью отзывов, чтобы местные жители могли смотреть ролик на сайте в более нативном формате, а не только через YouTube Shorts.
              </p>
              <p class="text-sm text-slate-500">
                Оригинал публикации остаётся доступен по ссылке в Instagram.
              </p>
              <a
                :href="instagramPostUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex text-sm font-semibold text-custom-green hover:underline"
              >
                Открыть пост в Instagram
              </a>
            </div>

            <SocialVideoEmbed
              :src="instagramEmbed"
              platform="instagram"
              :source-url="instagramPostUrl"
              title="Отзыв местных жителей из Instagram"
              class="order-1 lg:order-2 w-full max-w-sm justify-self-end"
              aspect-ratio="9 / 16"
            />
          </div>
        </div>

        <div v-else>
          <div class="mx-auto max-w-4xl grid gap-8 lg:grid-cols-2 items-start">
            <SocialVideoEmbed
              :src="instagramEmbed"
              platform="instagram"
              :source-url="instagramPostUrl"
              title="Отзыв владельцев лифтов из Instagram"
              class="w-full max-w-sm"
              aspect-ratio="9 / 16"
            />
            <div class="space-y-4">
              <p class="text-xs uppercase tracking-[0.2em] text-emerald-600">владельцы лифтов</p>
              <h3 class="text-2xl font-semibold text-slate-900">Отзыв из Instagram</h3>
              <p class="text-sm text-slate-700">
                Этот же ролик выведен и во вкладке владельцев лифтов, чтобы нужный отзыв был виден в обеих категориях превью и не терялся среди Shorts.
              </p>
              <p class="text-sm text-slate-500">
                Если потребуется, можно позже заменить его на отдельный Instagram-ролик именно для владельцев.
              </p>
              <a
                :href="instagramPostUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex text-sm font-semibold text-custom-green hover:underline"
              >
                Открыть пост в Instagram
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center">
        <NuxtLink
          to="/otzyvy"
          class="inline-flex items-center justify-center px-6 py-3 rounded-full bg-custom-green text-white font-semibold shadow hover:opacity-90 transition"
        >
          Смотреть все отзывы
        </NuxtLink>
      </div>
    </div>

    <transition name="fade">
      <div
        v-if="isLetterOpen"
        class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        @click.self="closeLetter"
      >
        <div class="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden">
          <button
            type="button"
            class="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/90 border border-slate-200 shadow flex items-center justify-center text-slate-600 hover:text-slate-900"
            @click="closeLetter"
            aria-label="Закрыть"
          >
            ×
          </button>
          <img :src="activeLetter.src" :alt="activeLetter.alt" class="w-full h-full object-contain" />
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import otz1 from '@/assets/otz1.jpeg'
import otz2 from '@/assets/otz2.jpeg'
import SocialVideoEmbed from '@/components/SocialVideoEmbed.vue'

const tabs = [
  { label: 'Рекламодатели', value: 'advertiser' },
  { label: 'Местные жители', value: 'locals' },
  { label: 'Владельцы лифтов', value: 'owners' },
]

const selectedTab = ref('owners')
const instagramPostUrl = 'https://www.instagram.com/p/DX4Xb-FsS9y/'
const instagramEmbed = 'https://www.instagram.com/p/DX4Xb-FsS9y/embed'
const twoGisUrl = 'https://go.2gis.com/cnzso'

const thankYouLetters = [
  { src: otz1, alt: 'Благодарственное письмо 1' },
  { src: otz2, alt: 'Благодарственное письмо 2' },
]

const isLetterOpen = ref(false)
const activeLetter = ref({ src: '', alt: '' })

const openLetter = (letter) => {
  activeLetter.value = letter
  isLetterOpen.value = true
}

const closeLetter = () => {
  isLetterOpen.value = false
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
