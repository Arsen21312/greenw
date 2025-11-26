<template>
  <div class="flex flex-col min-h-screen">
    <NavBar class="shadow-md bg-white z-10" />

    <main class="flex-grow">
      <!-- Hero + Выбор формата рекламы -->
      <section class="relative overflow-hidden">
        <!-- Градиентный фон -->
        <div class="absolute inset-0 bg-gradient-to-b from-emerald-600/80 to-amber-400"></div>
        <!-- Паттерн лифтов -->
        <div
          class="absolute inset-0 bg-[url('/pattern-elevator.svg')] opacity-10 pointer-events-none"
        ></div>

        <div class="relative container mx-auto px-4 py-24 text-center text-white">
          <h1
            class="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-16 max-w-4xl mx-auto "
          >
            Привлекаем клиентов через лифты и экраны в Караганде
          </h1>

          <p class="text-lg md:text-5xl mb-12 max-w-2xl mx-auto leading-relaxed   ">
            Более 600 лифтов и 28 экрана <br />по всему городу.
          </p>
          <p class="text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed ">
            От 20 000 ₸ в месяц. Без шума. <br />С максимальным вниманием.
          </p>

          <!-- CTA-кнопки -->
          <div class="flex flex-wrap justify-center gap-4 mb-36">
            <!-- Заказать рекламу -->
            <NuxtLink
              to=""
              @click.prevent="openOrderModal('рекламу')"
              class="relative cursor-pointer z-10 px-10 py-5 text-lg md:text-xl font-semibold text-green-600 bg-white rounded-lg shadow-lg transform transition-all duration-200 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl active:scale-95"
            >
              Заказать рекламу
            </NuxtLink>

            <!-- Перейти в Instagram -->
            <a
              href="https://instagram.com/greenw.kz"
              target="_blank"
              class="relative z-10 px-10 py-5 text-lg md:text-xl font-semibold text-white bg-transparent border-2 border-white rounded-lg shadow-lg transform transition-all duration-200 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl hover:bg-white hover:text-green-600 active:scale-95"
            >
              Перейти в Instagram
            </a>
          </div>

          <h2 class="text-2xl md:text-5xl font-semibold mb-20">
            Какая реклама подойдёт именно вам?
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-6xl mx-auto">
            <!-- Лифты -->
            <NuxtLink
              to="/lift"
              class="group relative flex flex-col items-start p-12 bg-lime-300/40 backdrop-blur-md rounded-2xl border border-white/50 shadow-xl min-h-[450px] hover:backdrop-blur-sm hover:border-white/50 hover:shadow-2xl transition"
            >
              <div class="mb-6 w-full text-center">
                <img src="/assets/svg/lift.svg" alt="Реклама Караганда" class="w-20 h-20 mx-auto" />
              </div>
              <h3 class="text-2xl font-semibold text-white mb-3">
                Реклама в лифтах
              </h3>
              <ul class="mt-4 space-y-2 text-white text-left">
                <li><span class="font-semibold">Формат:</span> бумажный модуль внутри лифта</li>
                <li><span class="font-semibold">600+ лифтов</span> по всему городу</li>
                <li><span class="font-semibold">Ежедневный охват:</span> до 55 000 человек</li>
                <li><span class="font-semibold">От 20 000 ₸</span> / месяц</li>
                <li>Работает на доверие, локальность и регулярный контакт</li>
              </ul>
            </NuxtLink>

            <!-- Экраны и LED-стенды -->
            <NuxtLink
              to="/led"
              class="group relative flex flex-col items-start p-12 bg-lime-300/40 backdrop-blur-md rounded-2xl border border-white/40 shadow-xl min-h-[450px] hover:backdrop-blur-sm hover:border-white/50 hover:shadow-2xl transition"
            >
              <div class="mb-6 w-full text-center">
                <img src="/assets/svg/led.svg" alt="Реклама Караганда лед экраны" class="w-20 h-20 mx-auto" />
              </div>
              <h3 class="text-2xl font-semibold text-white mb-3">
                Реклама на экранах и LED-стендах
              </h3>
              <ul class="mt-4 space-y-2 text-white text-left">
                <li><span class="font-semibold">Формат:</span> динамичный ролик на экране</li>
                <li><span class="font-semibold">28 монитора</span> в ТД, на вокзале и улицах</li>
                <li><span class="font-semibold">200–400 показов</span> в сутки</li>
                <li>Идеально для акций, имиджа, узнаваемости</li>
                <li><span class="font-semibold">От 20 000 ₸</span> / месяц</li>
              </ul>
            </NuxtLink>
          </div>
        </div>

        <!-- Блок консультации -->
        <div class="relative -mt-1 bg-white/20 backdrop-blur-lg py-8">
          <div class="container mx-auto px-4 text-center">
            <p class="text-3xl md:text-4xl font-bold text-white mb-4">
              Не знаете, что выбрать?
            </p>
            <p class="text-lg text-white/90 mb-6">
              Поможем определиться! Закажите бесплатную консультацию
            </p>
            <div class="flex flex-wrap justify-center gap-4">
              <NuxtLink
                to=""
                @click.prevent="openOrderModal('звонок')"
                class="px-8 py-3 cursor-pointer bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition"
              >
                Заказать звонок
              </NuxtLink>
              <a
                href="https://wa.me/77086755846"
                target="_blank"
                class="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-green-600 transition"
              >
                Написать в WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
      <!-- Новый блок “Нам доверяют” -->
      <section class="bg-white py-6">
        <div class="container mx-auto px-4 text-center">
          <!-- Заголовок -->
          <h2 class="text-3xl md:text-5xl font-bold text-green-500 mb-8">
            Нам доверяют
          </h2>

          <!-- Основной текст -->
          <h3 class="text-2xl md:text-3xl font-semibold text-gray-800 max-w-3xl mx-auto">
            Уже более <span class="text-green-500">20 компаний</span> размещают рекламу с нами на постоянной основе — в лифтах и на экранах, более <span class="text-green-500">6 месяцев</span> подряд.
          </h3>
          <p class="mt-4 text-xl text-gray-600 max-w-5xl mx-auto">
            Среди них — крупные бренды, клиники, салоны, банки и локальные магазины.
          </p>
        </div>
      </section>

      <!-- Партнёры: бегущая строка -->
      <section class="bg-gray-50 py-8">
        <div class="container mx-auto">
          <PartnersMarquee />
        </div>
      </section>
    </main>

    <Footer />

    <!-- Модалка заказа -->
    <OrderModal
      v-if="showOrderModal"
      :block="modalBlock"
      @close-order-modal="closeOrderModal"
    />
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import PartnersMarquee from '@/components/PartnersMarquee.vue'
import OrderModal from '@/components/OrderModal.vue'
import { ref } from 'vue'

useSeoMeta({
  title: 'Реклама в Караганде – лифты и LED-экраны, наружная реклама агентство GreenW',
  description: 'Привлечём клиентов в Караганде через рекламу в лифтах и на LED-экранах. Охват до 48 000 жителей ежедневно. От 20 000 ₸/мес. Наружная реклама',
  ogTitle: 'Реклама в Караганде – лифты и LED-экраны',
  ogDescription: 'Локальный охват: 450+ лифтов и 22 экрана по городу.',
  ogUrl: 'https://www.greenw.kz',
  twitterCard: 'summary_large_image',
  robots: 'index,follow'
})
useHead({
  link: [{ rel: 'canonical', href: 'https://www.greenw.kz/' }],
  script: [{
    type: 'application/ld+json',
    children: JSON.stringify({
      '@context':'https://schema.org',
      '@type':'LocalBusiness',
      name:'GreenW',
      description:'Рекламное агентство в Караганде: лифты и LED-экраны',
      url:'https://www.greenw.kz',
      telephone:'+7 708 675 5846',
      email:'GREENWAYKRG@gmail.com',
      address:{
        '@type':'PostalAddress',
        addressLocality:'Караганда',
        addressRegion:'Карагандинская область',
        postalCode:'100000',
        streetAddress:'мкр 14, д.42, кв.20'
      },
      areaServed:'Караганда',
      priceRange:'₸₸',
      sameAs:[
        'https://instagram.com/greenw.kz', // при необходимости замени
        'https://tiktok.com/@greenw.kz'    // при необходимости замени
      ]
    })
  }]
})


const showOrderModal = ref(false)
const modalBlock     = ref<{ name: string }>({ name: '' })

function openOrderModal(name: string) {
  modalBlock.value = { name }
  showOrderModal.value = true
}
function closeOrderModal() {
  showOrderModal.value = false
}
</script>

<style>
.text-stroke-3 {
  text-shadow: -1px -1px 0 black, 1px -1px 0 black, -1px 1px 0 black, 1px 1px 0 black;
}
.text-stroke-thin {
  text-shadow:
    -0.5px -0.5px 0 black,
     0.5px -0.5px 0 black,
    -0.5px  0.5px 0 black,
     0.5px  0.5px 0 black;
}
</style>
