<template>
  <img
    :src="image.src"
    :srcset="image.srcset"
    :sizes="sizes"
    :width="image.width"
    :height="image.height"
    :loading="loading"
    decoding="async"
  />
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  image: { src: string; srcset: string; width: number; height: number }
  sizes?: string
  loading?: 'lazy' | 'eager'
}>(), { sizes: 'auto, 100vw', loading: 'lazy' })
</script>
