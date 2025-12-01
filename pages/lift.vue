<template>
  <div class="relative overflow-hidden page-shell">
    <NavBar class="shadow-md bg-white z-10" />
    <HeroComponents id="about" />
    <WaveDivider color="#e9f4da" />

    <section class="bg-[#e9f4da]">
      <Blocks />
    </section>
    <WaveDivider color="#f4f9f1" :flip="true" />

    <section class="bg-[#f4f9f1]">
      <Suspense>
        <template #default>
          <AsyncModule @lift-order="handleLiftOrder" />
        </template>
        <template #fallback>
          <div>Загрузка модуля...</div>
        </template>
      </Suspense>
    </section>
    <WaveDivider color="#eef6ff" />

    <section class="bg-[#eef6ff]">
      <Suspense>
        <template #default>
          <AsyncFeedbackForm id="contact" :lift-order="liftOrder" />
        </template>
        <template #fallback>
          <div>Загрузка формы обратной связи...</div>
        </template>
      </Suspense>
    </section>
    <WaveDivider color="#f8fbff" :flip="true" />

    <!-- Дополнительные асинхронные компоненты -->
    <!--<Suspense>
      <template #default>
        <AsyncMap2GisWraper/>
      </template>
      <template #fallback>
        <div>Загрузка карты...</div>
      </template>
    </Suspense>
    -->
    <!-- слайдер с фотками крулгый -->
    <!--<Suspense>
      <template #default>
        <AsyncSlider/>
      </template>
      <template #fallback>
        <div>Загрузка слайдера...</div>
      </template>
    </Suspense>-->
    <section class="bg-[#f8fbff]">
      <Info id="services" />
    </section>
    <WaveDivider color="#f4f9f1" />

    <section class="bg-[#f4f9f1]">
      <ReviewsPreview />
    </section>
    <WaveDivider color="#eef6ff" :flip="true" />

    <section class="bg-[#eef6ff]">
      <Suspense>
        <template #default>
          <AsyncFaq />
        </template>
        <template #fallback>
          <div>Загрузка FAQ...</div>
        </template>
      </Suspense>
    </section>
    <WaveDivider color="#f8fbff" />

    <Footer id="bank" />
  </div>
</template>

<script setup>
import { defineAsyncComponent, ref } from 'vue';
import NavBar from '@/components/NavBar.vue';
import HeroComponents from '@/components/HeroComponents.vue';
import Info from '@/components/Info.vue';
import Blocks from '@/components/Blocks.vue';
import Footer from '@/components/Footer.vue';
import ReviewsPreview from '@/components/ReviewsPreview.vue';
import WaveDivider from '@/components/WaveDivider.vue';
useSeoMeta({
  title: 'Реклама в лифтах Караганды – охват до 48 000 в день | GreenW',
  description: 'Размещение в 450+ лифтах Караганды. Ежедневный контакт с жильцами. От 20 000 ₸/мес. Фотоотчёт и помощь с макетом.',
  ogTitle: 'Лифтовая реклама в Караганде',
  ogDescription: 'Локальный охват, регулярные контакты, доступная цена.',
  ogUrl: 'https://www.greenw.kz/lift',
  twitterCard: 'summary_large_image',
  robots: 'index,follow'
})
useHead({
  link: [{ rel: 'canonical', href: 'https://www.greenw.kz/lift' }],
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no' },
  ],
  script: [
    {
      type:'application/ld+json',
      children: JSON.stringify({
        '@context':'https://schema.org',
        '@type':'Service',
        serviceType:'Реклама в лифтах',
        areaServed:{ '@type':'City', name:'Караганда' },
        provider:{ '@type':'Organization', name:'GreenW', url:'https://www.greenw.kz' },
        offers:{ '@type':'Offer', priceCurrency:'KZT', price:'20000' }
      })
    },
    {
      type:'application/ld+json',
      children: JSON.stringify({
        '@context':'https://schema.org',
        '@type':'FAQPage',
        mainEntity: [
          { '@type':'Question', name:'Сколько стоит размещение?',
            acceptedAnswer:{ '@type':'Answer', text:'От 20 000 ₸ за подъезд в месяц. Пакеты со скидкой при больших объёмах.'}},
          { '@type':'Question', name:'Нужно ли разрешение ОСИ?',
            acceptedAnswer:{ '@type':'Answer', text:'Работаем по договору с ОСИ/КСК. Дополнительных разрешений жильцов обычно не требуется.'}},
          { '@type':'Question', name:'Как оцениваем эффективность?',
            acceptedAnswer:{ '@type':'Answer', text:'UTM-метки, промокоды, опрос «где узнали». Даём рекомендации по креативу.'}}
        ]
      })
    }
  ]
})


// Динамическая загрузка компонентов
const AsyncModule = defineAsyncComponent(() => import('~/components/Module.vue'));
const AsyncFeedbackForm = defineAsyncComponent(() => import('@/components/FeedbackForm.vue'));
const AsyncMap2GisWraper = defineAsyncComponent(() => import('~/components/Map2GisWraper.vue'));
const AsyncSlider = defineAsyncComponent(() => import('@/components/Slider.vue'));
const AsyncFaq = defineAsyncComponent(() => import('@/components/Faq.vue'));

const liftOrder = ref(null);

const handleLiftOrder = (payload) => {
  liftOrder.value = payload;
};
</script>

<style scoped>
.page-shell {
  animation: pageFade 0.7s ease-out;
}

@media (prefers-reduced-motion: reduce) {
  .page-shell {
    animation: none;
  }
}

@keyframes pageFade {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
