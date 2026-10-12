<template>
  <section class="py-12 bg-[#f3f3f3]">
    <!-- Первый блок: Когда полезна реклама в лифтах? -->
    <div class="container mx-auto text-center px-6 lg:px-8">
      <h2 class="text-3xl font-bold text-black mb-8">Когда полезна реклама в лифтах?</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div class="bg-[#efefef] rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
          <ResponsiveImage :image="sale" loading="lazy" alt="Реклама Акции и распродажи в Караганде" class="mx-auto h-40 w-auto mb-4" />
          <p>Планируете провести акцию или распродажу</p>
        </div>
        <div class="bg-[#efefef] rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
          <ResponsiveImage :image="staff" loading="lazy" alt="Реклама вакансий" class="mx-auto h-40 w-auto mb-4" />
          <p>Необходимо привлечь квалифицированный персонал</p>
        </div>
        <div class="bg-[#efefef] rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
          <ResponsiveImage :image="money" loading="lazy" alt="Рекламный бюджет" class="mx-auto h-40 w-auto mb-4" />
          <p>Ограничен рекламный бюджет</p>
        </div>
        <div class="bg-[#efefef] rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
          <ResponsiveImage :image="medal" loading="lazy" alt="Реклама лучше конкурентов" class="mx-auto h-40 w-auto mb-4" />
          <p>Хотите быть на шаг впереди конкурентов</p>
        </div>
        <div class="bg-[#efefef] rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
          <ResponsiveImage :image="people" loading="lazy" alt="Привлечение клиентов через рекламу" class="mx-auto h-40 w-auto mb-4" />
          <p>Нужен эффективный способ привлечения новых клиентов</p>
        </div>
        <div class="bg-[#efefef] rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
          <ResponsiveImage :image="hand" loading="lazy" alt="Повышение узнаваемости Бренда" class="mx-auto h-40 w-auto mb-4" />
          <p>Вашему бренду не хватает узнаваемости</p>
        </div>
      </div>
    </div>

    <!-- Второй блок: Почему реклама в лифтах? -->
    <div class="container mx-auto text-center mt-16 px-6 lg:px-8">
      <h2 class="text-3xl font-bold text-black mb-8">Почему реклама в лифтах?</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 lg:grid-cols-3 lg:gap-16 text-left">
        <div class="flex items-start space-x-4 bg-[#efefef] rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
          <ResponsiveImage :image="button" loading="lazy" alt="Button" class="h-12 w-auto" />
          <div>
            <h3 class="text-xl font-bold">Удобный формат</h3>
            <p>Реклама на уровне глаз, легко доступна и хорошо видна.</p>
          </div>
        </div>
        <div class="flex items-start space-x-4 bg-[#efefef] rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
          <ResponsiveImage :image="money" loading="lazy" alt="Выгодная цена рекламы" class="h-12 w-auto" />
          <div>
            <h3 class="text-xl font-bold">Выгодные цены</h3>
            <p>Реклама в лифтах дешевле других видов рекламы.</p>
          </div>
        </div>
        <div class="flex items-start space-x-4 bg-[#efefef] rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
          <ResponsiveImage :image="people" loading="lazy" alt="Новые площадки под рекламу" class="h-12 w-auto" />
          <div>
            <h3 class="text-xl font-bold">Развитие города</h3>
            <p>Интенсивное строительство новых жилых домов с лифтами.</p>
          </div>
        </div>
        <div class="flex items-start space-x-4 bg-[#efefef] rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
          <ResponsiveImage :image="hand" loading="lazy" alt="Реклама охватывающая людей в домах" class="h-12 w-auto" />
          <div>
            <h3 class="text-xl font-bold">Широкий охват</h3>
            <p>Можно охватить широкую аудиторию, не использующую другие медиа.</p>
          </div>
        </div>
        <div class="flex items-start space-x-4 bg-[#efefef] rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
          <ResponsiveImage :image="button" loading="lazy" alt="Частый контакт с рекламой" class="h-12 w-auto" />
          <div>
            <h3 class="text-xl font-bold">Частота контакта</h3>
            <p>80% жителей домов ежедневно пользуются лифтами минимум два раза в день.</p>
          </div>
        </div>
        <div class="flex items-start space-x-4 bg-[#efefef] rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
          <ResponsiveImage :image="hand" loading="lazy" alt="Быстрый эффект от рекламы" class="h-12 w-auto" />
          <div>
            <h3 class="text-xl font-bold">Быстрый эффект</h3>
            <p>Реклама сразу привлекает внимание, особенно востребованные услуги.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { contentImages } from '~/assets/optimized/content/images'
const button = contentImages["button.png"]
const hand = contentImages["hand.png"]
const medal = contentImages["medal.png"]
const money = contentImages["money.png"]
const people = contentImages["people.png"]
const sale = contentImages["sale.png"]
const staff = contentImages["staff.png"]
// Импортируем изображения

</script>