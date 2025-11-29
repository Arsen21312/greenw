<template>
  <div
    class="wave-wrapper"
    :class="{ 'wave-wrapper--flip': flip }"
    :style="{ '--wave-color': color }"
  >
    <svg
      viewBox="0 0 1440 180"
      preserveAspectRatio="none"
      role="presentation"
      aria-hidden="true"
    >
      <defs>
        <linearGradient :id="gradientId" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--wave-color)" stop-opacity="1" />
          <stop offset="50%" stop-color="var(--wave-color)" stop-opacity="1" />
          <stop offset="100%" stop-color="var(--wave-color)" stop-opacity="1" />
        </linearGradient>
      </defs>

      <path
        d="M0,100 C280,160 520,40 820,100 C1100,150 1280,60 1440,110 L1440,0 L0,0 Z"
        :fill="`url(#${gradientId})`"
        class="wave-path"
      />
    </svg>
  </div>
</template>

<script setup>
const props = defineProps({
  color: { type: String, default: '#f5f9f0' },
  flip: { type: Boolean, default: false },
})

const gradientId = `waveGradient-${Math.random().toString(36).slice(2, 8)}`
</script>

<style>
.wave-wrapper {
  width: 100%;
  height: 140px;
  margin-top: -1px;
  overflow: hidden;
  filter: drop-shadow(0 6px 14px rgba(0, 0, 0, 0.08));
}

.wave-wrapper svg {
  width: 100%;
  height: 100%;
  display: block;
}

.wave-wrapper--flip {
  transform: rotate(180deg);
}

.wave-path {
  /* static */
}
</style>
