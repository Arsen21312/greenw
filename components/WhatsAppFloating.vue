<template>
  <a
    :href="whatsAppLink"
    target="_blank"
    rel="noopener"
    class="wa-floating"
    aria-label="Написать нам в WhatsApp"
  >
    <div class="wa-icon">
      <slot name="icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
          <path
            d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"
          />
        </svg>
      </slot>
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
    box-shadow: 0 0 0 0 #25d36673, 0 12px 25px rgba(37, 211, 102, 0.35);
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
