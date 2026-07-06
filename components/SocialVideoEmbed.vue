<template>
  <div
    class="relative overflow-hidden rounded-2xl shadow"
    :class="frameClass"
    :style="{ aspectRatio }"
  >
    <iframe
      :src="src"
      :title="title"
      class="h-full w-full"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>

    <a
      v-if="sourceUrl"
      :href="sourceUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="absolute left-3 top-3 inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold shadow-sm backdrop-blur"
      :class="badgeClass"
    >
      {{ badgeLabel }}
    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: 'Видео',
  },
  platform: {
    type: String,
    default: 'youtube',
  },
  sourceUrl: {
    type: String,
    default: '',
  },
  aspectRatio: {
    type: String,
    default: '9 / 16',
  },
})

const isInstagram = computed(() => props.platform === 'instagram')

const frameClass = computed(() =>
  isInstagram.value
    ? 'bg-white ring-1 ring-slate-200'
    : 'bg-black'
)

const badgeClass = computed(() =>
  isInstagram.value
    ? 'bg-white/90 text-slate-900'
    : 'bg-black/70 text-white'
)

const badgeLabel = computed(() =>
  isInstagram.value ? 'Instagram' : 'Видео'
)
</script>
