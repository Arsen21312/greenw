<template>
  <div>
    <NavBar class="shadow-md bg-white z-10" />
    <HeroComponents id="about" />
     <Blocks/>
    <Suspense>
      <template #default>
        <AsyncModule /> 
      </template>
      <template #fallback>
        <div>Загрузка модуля...</div>
      </template>
    </Suspense>
    <Suspense>
      <template #default>
        <AsyncFeedbackForm id="contact"/>
      </template>
      <template #fallback>
        <div>Загрузка формы обратной связи...</div>
      </template>
    </Suspense>
    
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
     <Info id="services"/>
 <Suspense>
      <template #default>
        <AsyncFaq />
      </template>
      <template #fallback>
        <div>Загрузка FAQ...</div>
      </template>
    </Suspense>
    <Footer id="bank"/>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
import NavBar from '@/components/NavBar.vue';
import HeroComponents from '@/components/HeroComponents.vue';
import Info from '@/components/Info.vue';
import Blocks from '@/components/Blocks.vue';
import Footer from '@/components/Footer.vue';
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
</script>
