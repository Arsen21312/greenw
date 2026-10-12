# Nuxt 3 Minimal Starter

Все фотографии и логотипы сайта используют подготовленные WebP с `srcset`.
Браузер выбирает подходящий размер для экрана и его плотности пикселей.
Первые фотографии LED и лифтов приоритетные; нижние галереи начинают загрузку
при приближении к ним, не забирая канал у первого экрана. Логотипы сохраняют
прозрачность. SVG-иконки подключаются через сборщик.

После замены оригиналов выполните `npm run optimize:images`, затем `npm run build`.
Общий скрипт — `scripts/optimize-site-images.mjs`, список файлов и размеры заданы
в нём. Он обновляет `assets/optimized/`; оригиналы не изменяет.
`assets/optimized/report.json` содержит размеры файлов до и после оптимизации.
Крупные версии благодарственных писем доступны при открытии изображения.
Сборка также создаёт gzip/Brotli для текстовых ресурсов, а файлы с хешами
в `/_nuxt/` получают длительный браузерный кеш.

Фотографии слайдера на `/lift` используют WebP шириной 280px и 560px и встроенные миниатюры.
После замены оригиналов `2.jpeg`, `3.jpeg`, `54.jpeg`, `85.jpg`, `89.jpeg`,
`102.jpg`, `110.jpeg` в `assets/` выполните `npm run optimize:lift-images`,
затем обычную сборку. Скрипт обновит `assets/lift/`, сохранив оригиналы.

Фотографии на `/led-indoor` используют WebP шириной 360px и 680px.
После замены фотографий Green City Park или «Таир» в `public/exampleled/`
выполните `npm run optimize:indoor-images`, затем обычную сборку.
Список фотографий задаётся в `scripts/optimize-indoor-images.mjs`;
скрипт обновляет `assets/led-indoor/`, сохраняя оригиналы.

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
