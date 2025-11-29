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
        <!-- Рекламодатели -->
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

        <!-- Местные жители -->
        <div v-else-if="selectedTab === 'locals'">
          <div class="mx-auto max-w-4xl grid gap-8 lg:grid-cols-2 items-start">
            <div class="space-y-4 order-2 lg:order-1">
              <p class="text-xs uppercase tracking-[0.2em] text-emerald-600">местная жительница</p>
              <h3 class="text-2xl font-semibold text-slate-900">«Светлана находит акции прямо в лифте»</h3>
              <p class="text-sm text-slate-700">
                Светлана говорит, что каждый раз, пока едет домой, просматривает предложения на стендах. Видит скидки на доставку еды,
                услуги, сразу фотографирует нужные контакты и делится с соседями.
              </p>
              <p class="text-sm text-slate-500">
                Видео загружено на YouTube (формат Shorts). Если нужно — вышлем оригинал и контакт Светланы.
              </p>
              <div class="grid gap-3 text-sm text-slate-700">
                <div class="flex items-start gap-3">
                  <span class="h-2 w-2 rounded-full bg-emerald-500 mt-1"></span>
                  <div>
                    <p class="font-semibold text-slate-900">Любимые категории:</p>
                    <p>Доставка еды, бытовые услуги, скидки на товары для дома.</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <span class="h-2 w-2 rounded-full bg-emerald-500 mt-1"></span>
                  <div>
                    <p class="font-semibold text-slate-900">Как использует:</p>
                    <p>Фотографирует контакты, сохраняет акции, делится с соседями.</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <span class="h-2 w-2 rounded-full bg-emerald-500 mt-1"></span>
                  <div>
                    <p class="font-semibold text-slate-900">Комментарий:</p>
                    <p>«Пока еду, успеваю посмотреть все новинки, ничего не пропускаю».</p>
                  </div>
                </div>
              </div>
            </div>

            <div class="order-1 lg:order-2 w-full max-w-sm justify-self-end rounded-2xl overflow-hidden shadow bg-black" style="aspect-ratio: 9 / 16; max-height: 620px;">
              <iframe
                :src="localsYoutubeEmbed"
                title="Отзыв местной жительницы"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                class="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>

        <!-- Владельцы лифтов -->
        <div v-else>
          <div class="mx-auto max-w-4xl grid gap-8 lg:grid-cols-2 items-start">
            <div class="w-full max-w-sm rounded-2xl overflow-hidden shadow bg-black" style="aspect-ratio: 9 / 16; max-height: 620px;">
              <iframe
                :src="youtubeEmbed"
                title="Отзыв владельца лифта"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                class="w-full h-full"
              ></iframe>
            </div>
            <div class="space-y-4">
              <p class="text-xs uppercase tracking-[0.2em] text-emerald-600">председатель кск / владелец лифта</p>
              <h3 class="text-2xl font-semibold text-slate-900">Отзыв о сотрудничестве</h3>
              <p class="text-sm text-slate-700">
                «Команда GreenW аккуратно смонтировала рекламные стенды, не повредив отделку лифта. Выплаты приходят вовремя, жильцы не жалуются.
                Если нужно снять или заменить — реагируют быстро».
              </p>
              <p class="text-sm text-slate-500">
                Видео загружено на YouTube. Если нужен оригинал с подписью — можем отправить файл и контакт председателя.
              </p>
              <div class="grid gap-3 text-sm text-slate-700">
                <div class="flex items-start gap-3">
                  <span class="h-2 w-2 rounded-full bg-emerald-500 mt-1"></span>
                  <div>
                    <p class="font-semibold text-slate-900">Дом:</p>
                    <p>КСК «Полёт», на управлении с 1997 года.</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <span class="h-2 w-2 rounded-full bg-emerald-500 mt-1"></span>
                  <div>
                    <p class="font-semibold text-slate-900">Результат:</p>
                    <p>Разместили стенды без шума и следов. Своевременные выплаты, жильцы довольны.</p>
                  </div>
                </div>
                <div class="flex items-start gap-3">
                  <span class="h-2 w-2 rounded-full bg-emerald-500 mt-1"></span>
                  <div>
                    <p class="font-semibold text-slate-900">Контакт:</p>
                    <p>Готовы поделиться номером председателя и отправить оригинал видео.</p>
                  </div>
                </div>
              </div>
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
            ✕
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

const tabs = [
  { label: 'Рекламодатели', value: 'advertiser' },
  { label: 'Местные жители', value: 'locals' },
  { label: 'Владельцы лифтов', value: 'owners' },
]

const selectedTab = ref('owners')
const youtubeEmbed = 'https://www.youtube.com/embed/Ct9biTNJWBM'
const localsYoutubeEmbed = 'https://www.youtube.com/embed/joFgiXuriIg'
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
