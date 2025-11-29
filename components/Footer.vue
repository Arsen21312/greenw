<template>
  <footer class="modern-footer text-gray-900">
    <div class="container mx-auto px-4 py-8 space-y-6">
      <div class="attention-pin">
        <div class="attention-card">
          <div>
            <p class="text-sm uppercase font-semibold text-custom-green tracking-wide">Внимание</p>
            <p class="mt-1 text-sm text-gray-700">
              Работаем удалённо. Для встречи, подписания договора или уточнения вопросов напишите менеджеру — подберём удобный
              формат офлайн.
            </p>
          </div>
          <a href="https://wa.me/77086755846" target="_blank" rel="noopener" class="btn-contact">Связаться</a>
        </div>
      </div>

      <div class="collapsible open" aria-hidden="false">
        <div class="footer-grid">
          <div class="info-card">
            <p class="card-title">Контакты</p>
            <ul class="space-y-2 text-sm">
              <li>+7 708 675 5846</li>
              <li>GREENWAYKRG@GMAIL.COM</li>
              <li>ПН–ПТ: 09:00–18:00</li>
              <li>СБ–ВС: выходной</li>
            </ul>
          </div>

          <div class="brand-card">
            <p class="text-xs uppercase text-gray-500 tracking-[0.3em] text-center">Рекламное агентство</p>
            <img :src="logo" alt="Логотип рекламного агентства GreenW в Караганде" class="mx-auto h-12 mt-2" />
            <div class="mt-3 flex items-center justify-center gap-3">
              <a href="https://www.instagram.com/greenw.kz" target="_blank" class="social-btn" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4">
                  <rect x="2.5" y="2.5" width="11" height="11" rx="3.5" />
                  <circle cx="8" cy="8" r="3" />
                  <circle cx="11.5" cy="4.5" r="0.9" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href="https://www.tiktok.com/@greenw.kz" target="_blank" class="social-btn" aria-label="TikTok">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z" />
                </svg>
              </a>
              <a href="https://wa.me/77086755846" target="_blank" class="social-btn" aria-label="WhatsApp">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                  <path
                    d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div class="info-card">
            <p class="card-title">Реквизиты</p>
            <ul class="space-y-2 text-sm text-gray-600">
              <li>ИП «GreenWay»</li>
              <li>Индекс 100000, Республика Казахстан, г. Караганда</li>
              <li>14 микрорайон, дом 42, кв. 20</li>
              <li>БИН/ИИН 710 128 450 661</li>
            </ul>
          </div>
        </div>

        <p class="text-center text-xs text-gray-500 mt-4">
          © {{ new Date().getFullYear() }} GreenW — лифтовая реклама в Караганде. Все права защищены.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import logo from '@/assets/svg/loggo.svg'
</script>

<style scoped>
.modern-footer {
  background: radial-gradient(circle at top, #f3fce8 0%, #e4f1da 40%, #f9faf7 100%);
  border-top: 1px solid #e6edd8;
  touch-action: pan-y;
}

.attention-pin {
  position: sticky;
  top: 10px;
  z-index: 5;
}

.attention-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 14px 18px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(152, 200, 80, 0.25);
  box-shadow: 0 10px 30px rgba(152, 200, 80, 0.14);
  justify-content: space-between;
}

@media (min-width: 640px) {
  .attention-card {
    flex-direction: row;
    align-items: center;
  }
  .attention-pin {
    top: 24px;
  }
}

.btn-contact {
  border-radius: 999px;
  background: #98c850;
  color: #fff;
  font-weight: 600;
  padding: 9px 22px;
  font-size: 0.85rem;
  transition: opacity 0.2s ease;
  text-align: center;
}
.btn-contact:hover {
  opacity: 0.88;
}

.pull-handle {
  margin-top: 10px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  letter-spacing: 0.06em;
  color: #5f7531;
  background: rgba(152, 200, 80, 0.12);
  border: 1px solid rgba(152, 200, 80, 0.25);
  border-radius: 999px;
  padding: 8px 12px;
  box-shadow: 0 10px 24px rgba(152, 200, 80, 0.08);
  cursor: grab;
  transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
}

.pull-handle:active {
  cursor: grabbing;
  transform: translateY(2px);
  box-shadow: 0 6px 16px rgba(152, 200, 80, 0.12);
}

.hint-arrow {
  display: inline-flex;
  width: 22px;
  height: 22px;
  border-radius: 999px;
  align-items: center;
  justify-content: center;
  background: rgba(152, 200, 80, 0.15);
  color: #5f7531;
  font-weight: 700;
  animation: hint-bounce 1.2s ease-in-out infinite alternate;
}

.info-card,
.brand-card {
  border-radius: 16px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(152, 200, 80, 0.15);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.03);
}

.brand-card {
  text-align: center;
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.95), rgba(244, 252, 235, 0.9));
}

.card-title {
  font-weight: 600;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #4f5d37;
  margin-bottom: 0.75rem;
}

.social-btn {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  border: 1px solid rgba(152, 200, 80, 0.4);
  display: grid;
  place-items: center;
  background: #fff;
  color: #98c850;
  box-shadow: 0 6px 16px rgba(152, 200, 80, 0.18);
  transition: transform 0.2s ease;
}
.social-btn:hover {
  transform: translateY(-2px);
}

.footer-grid {
  display: grid;
  gap: 12px;
  grid-template-columns: 1fr;
}

@media (min-width: 1024px) {
  .footer-grid {
    grid-template-columns: 1.4fr auto 1.4fr;
    align-items: start;
    gap: 24px;
  }
}

.collapsible {
  overflow: visible;
}

.text-custom-green {
  color: #98c850;
}

@keyframes hint-bounce {
  from {
    transform: translateY(0);
    opacity: 0.7;
  }
  to {
    transform: translateY(7px);
    opacity: 1;
  }
}

.collapsible {
  will-change: auto;
}
</style>
