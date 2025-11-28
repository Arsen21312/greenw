<!-- pages/owners.vue -->
<template>
  <div>
    <NavBar />

    <!-- Основной контент страницы -->
    <main>
      <!-- Компонент с оптимизированным контентом -->
      <OwnersContent />
    </main>

    <ReviewsPreview />
    <Footer />
  </div>
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import Footer from '@/components/Footer.vue'
import OwnersContent from '@/components/OwnersContent.vue'
import ReviewsPreview from '@/components/ReviewsPreview.vue'
import { useHead } from '#app' // Корректный импорт для Nuxt 3

useHead({
  title: 'Реклама Караганда | Эффективная реклама Караганды для собственников лифтов',
  meta: [
  {
  hid: 'description',
  name: 'description',
  content: 'Реклама Караганда от рекламного агентства «GreenW.KZ». Выгодное сотрудничество для собственников лифтов в Караганде: размещайте рекламу в лифтах и получайте дополнительный доход. Узнайте больше о преимуществах!',
},

    {
      hid: 'keywords',
      name: 'keywords',
      content:
        'Реклама Караганда, Реклама Караганды, реклама в лифтах Караганды, собственники лифтов Караганда, рекламное агентство Караганда, размещение рекламы, рекламные услуги Караганда, GreenW.KZ',
    },
    // Open Graph мета-теги
    {
      hid: 'og:title',
      property: 'og:title',
      content: 'Реклама Караганда | Выгодное сотрудничество с агентством «GreenW.KZ»',
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content:
        'Предлагаем собственникам лифтов в Караганде взаимовыгодное сотрудничество по размещению рекламы. Реклама Караганда – увеличьте доход и улучшите сервис для жителей вашего дома.',
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content: 'https://yourwebsite.com/path-to-image.jpg',
    },
    {
      hid: 'og:url',
      property: 'og:url',
      content: 'https://yourwebsite.com/owners',
    },
    {
      hid: 'og:type',
      property: 'og:type',
      content: 'website',
    },
    // Twitter Card мета-теги
    {
      hid: 'twitter:card',
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      hid: 'twitter:title',
      name: 'twitter:title',
      content: 'Реклама Караганда | Выгодное сотрудничество с агентством «GreenW.KZ»',
    },
    {
      hid: 'twitter:description',
      name: 'twitter:description',
      content:
        'Собственники лифтов в Караганде, получите дополнительный доход с рекламой в лифтах от «GreenW.KZ». Реклама Караганда – эффективное решение для вас!',
    },
    {
      hid: 'twitter:image',
      name: 'twitter:image',
      content: 'https://yourwebsite.com/path-to-image.jpg',
    },
    // Дополнительные мета-теги
    {
      hid: 'language',
      name: 'language',
      content: 'ru',
    },
    {
      hid: 'geo.region',
      name: 'geo.region',
      content: 'KZ-KAR',
    },
    {
      hid: 'geo.placename',
      name: 'geo.placename',
      content: 'Караганда',
    },
    {
      hid: 'geo.position',
      name: 'geo.position',
      content: '49.806,73.085',
    },
    {
      hid: 'ICBM',
      name: 'ICBM',
      content: '49.806,73.085',
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://www.GreenW.KZ.kz/owners',
    },
  ],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "AdvertisingAgency",
        "name": "GreenW.KZ",
        "url": "https://www.GreenW.KZ.kz/owners",
        "logo": "https://www.GreenW.KZ.kz/owners/logo.png",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Караганда",
          "addressCountry": "KZ",
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+7 708 675 5846",
          "contactType": "customer service",
          "availableLanguage": ["Russian"],
        },
        "sameAs": [
          "https://www.instagram.com/GreenW.KZ.kz/",
          "https://www.tiktok.com/@GreenW.kz",
          "https://api.whatsapp.com/send/?phone=77086755846",
        ],
      }),
    },
  ],
})
</script>
