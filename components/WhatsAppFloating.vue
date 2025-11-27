<template>
  <a
    :href="whatsAppLink"
    target="_blank"
    rel="noopener"
    class="wa-floating"
    aria-label="Написать нам в WhatsApp"
  >
    <div class="wa-icon">
      <!-- Замените на логотип WhatsApp, когда добавите в проект -->
      <slot name="icon">WA</slot>
    </div>
    <div class="wa-text">
      <span class="wa-label">Напишите нам</span>
      <span class="wa-sub">Прямо сейчас в WhatsApp</span>
    </div>
  </a>
</template>

<script setup>
import { computed } from 'vue'

const phone = '77086755846'
const message = 'Здравствуйте! Хочу узнать подробнее о рекламе в лифтах.'

const whatsAppLink = computed(() => {
  const encodedMessage = encodeURIComponent(message)
  return `https://api.whatsapp.com/send?phone=${phone}&text=${encodedMessage}`
})
</script>

<style scoped>
.wa-floating {
  position: fixed;
  right: 1.25rem;
  bottom: 1.25rem;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1.1rem;
  background: linear-gradient(135deg, #25d366, #1ebe5d);
  color: #fff;
  border-radius: 9999px;
  box-shadow: 0 12px 25px rgba(37, 211, 102, 0.35), 0 4px 10px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  font-weight: 600;
  z-index: 9999;
  animation: wa-pulse 3s ease-in-out infinite;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.wa-floating:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 14px 30px rgba(37, 211, 102, 0.4), 0 6px 14px rgba(0, 0, 0, 0.12);
}

.wa-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.25);
  display: grid;
  place-items: center;
  font-weight: 800;
  letter-spacing: 0.5px;
}

.wa-text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
  white-space: nowrap;
}

.wa-label {
  font-size: 0.95rem;
}

.wa-sub {
  font-size: 0.78rem;
  opacity: 0.9;
  font-weight: 500;
}

@keyframes wa-pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.45), 0 12px 25px rgba(37, 211, 102, 0.35);
  }
  60% {
    box-shadow: 0 0 0 14px rgba(37, 211, 102, 0), 0 12px 25px rgba(37, 211, 102, 0.35);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0), 0 12px 25px rgba(37, 211, 102, 0.35);
  }
}

@media (max-width: 768px) {
  .wa-floating {
    right: 0.95rem;
    bottom: 0.95rem;
    padding: 0.75rem 1rem;
    gap: 0.65rem;
  }

  .wa-icon {
    width: 38px;
    height: 38px;
  }

  .wa-label {
    font-size: 0.88rem;
  }

  .wa-sub {
    font-size: 0.72rem;
  }
}
</style>
