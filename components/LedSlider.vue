<template>
  <div class="led-slider-viewport" :style="viewportStyle" @click="handleClick">
    <div :class="['led-slider-track', isAnimated ? 'animated' : 'manual']" :style="trackStyle">
      <div v-for="(image, index) in slides" :key="`led-slide-${index}`" class="led-slider-card">
        <img :src="image" alt="Фото LED экрана" class="w-full h-full object-contain" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

const props = defineProps<{
  images: string[]
  maxWidth?: number
  height?: number
}>()

const loopSlides = computed(() => [...props.images, ...props.images])
const isAnimated = ref(true)
const currentIndex = ref(0)

const slides = computed(() => (isAnimated.value ? loopSlides.value : props.images))

const viewportStyle = computed(() => ({
  '--slider-max-width': props.maxWidth ? `${props.maxWidth}px` : undefined,
  '--slider-height': props.height ? `${props.height}px` : undefined
}))

const trackStyle = computed(() => {
  if (isAnimated.value) return undefined
  return { transform: `translateX(-${currentIndex.value * 100}%)` }
})

const updateMode = () => {
  if (typeof window === 'undefined') return
  isAnimated.value = window.matchMedia('(min-width: 768px)').matches
  if (isAnimated.value) currentIndex.value = 0
}

const handleClick = () => {
  if (isAnimated.value) return
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}

onMounted(() => {
  updateMode()
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', updateMode)
  }
})

onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', updateMode)
  }
})
</script>

<style scoped>
.led-slider-viewport {
  position: relative;
  width: 100%;
  max-width: var(--slider-max-width, 320px);
  height: var(--slider-height, 280px);
  margin: 0 auto;
  overflow: hidden;
  border-radius: 18px;
  background: #f8fbf4;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);
}

.led-slider-track {
  display: flex;
  gap: 0;
  width: 100%;
  height: 100%;
  align-items: stretch;
}

.led-slider-track.animated {
  width: max-content;
  animation: led-slide-left 36.4s cubic-bezier(0.45, 0, 0.55, 1) infinite;
}

.led-slider-track.manual {
  animation: none;
  transition: transform 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);
}

.led-slider-card {
  flex: 0 0 100%;
  min-width: 100%;
  max-width: 100%;
  height: 100%;
  aspect-ratio: 4 / 5;
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
}

.led-slider-card img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: inherit;
  transition: transform 0.25s ease;
}

.led-slider-card:active img {
  transform: scale(0.97);
}

@media (min-width: 768px) {
  .led-slider-viewport {
    max-width: 960px;
    height: var(--slider-height, 400px);
  }

  .led-slider-card {
    flex: 0 0 calc((100% - 24px) / 3);
    min-width: 220px;
    max-width: 320px;
    height: 100%;
    aspect-ratio: 4 / 5;
  }

  .led-slider-card img {
    object-fit: cover;
  }

  .led-slider-track {
    gap: 12px;
  }

  .led-slider-track.animated {
    animation-duration: 46.8s;
  }
}

@keyframes led-slide-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
