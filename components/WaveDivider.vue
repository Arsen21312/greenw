<template>
  <div
    class="wave-wrapper"
    :class="{ 'wave-wrapper--flip': flip }"
    :style="{
      '--wave-color-top': topColor || color,
      '--wave-color-bottom': bottomColor || color
    }"
  >
    <svg
      viewBox="0 0 1440 240"
      preserveAspectRatio="none"
      role="presentation"
      aria-hidden="true"
      class="wave-svg"
    >
      <defs>
        <linearGradient :id="gradientId" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--wave-color-top)" stop-opacity="1" />
          <stop offset="50%" stop-color="var(--wave-color-top)" stop-opacity="1" />
          <stop offset="100%" stop-color="var(--wave-color-bottom)" stop-opacity="1" />
        </linearGradient>
      </defs>

      <path
        d="M0,120 C240,80 480,140 720,90 C960,50 1200,130 1440,80"
        :stroke="`url(#${gradientId})`"
        stroke-width="8"
        fill="none"
        class="wave-stroke"
      />
      <path
        d="M0,120 C240,80 480,140 720,90 C960,50 1200,130 1440,80 L1440,200 L0,200 Z"
        :fill="`url(#${gradientId})`"
        class="wave-path"
      />
    </svg>
  </div>
</template>

<script setup>
const props = defineProps({
  color: { type: String, default: '#f5f9f0' },
  topColor: { type: String, default: '' },
  bottomColor: { type: String, default: '' },
  flip: { type: Boolean, default: false },
})

const gradientId = `waveGradient-${Math.random().toString(36).slice(2, 8)}`
</script>

<style>
.wave-wrapper {
  width: 100%;
  height: 240px;
  margin-top: -60px;
  margin-bottom: -60px;
  overflow: hidden;
  background: transparent;
}

.wave-svg {
  width: 100%;
  height: 100%;
  display: block;
}

.wave-wrapper svg {
  width: 100%;
  height: 100%;
  display: block;
}

.wave-wrapper--flip {
  transform: scaleX(-1);
}

.wave-path {
}

.wave-stroke {
  filter: drop-shadow(0 8px 10px rgba(0, 0, 0, 0.08));
}
</style>
