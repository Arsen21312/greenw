declare global {
  interface Window {
    ym?: (...args: unknown[]) => void
  }
}

// Send pageview hits for SPA navigation so Yandex Metrika tracks Nuxt route changes.
export default defineNuxtPlugin((nuxtApp) => {
  const counterId = Number(
    import.meta.env.VITE_YANDEX_METRIKA_ID || process.env.VITE_YANDEX_METRIKA_ID
  )
  if (!counterId) return

  const sendHit = (path?: string) => {
    if (typeof window === 'undefined' || typeof window.ym !== 'function') return
    const url = path ?? window.location.pathname + window.location.search + window.location.hash
    window.ym(counterId, 'hit', url)
  }

  nuxtApp.hook('app:mounted', () => {
    sendHit()
  })

  nuxtApp.hook('page:finish', ({ route }) => {
    sendHit(route.fullPath)
  })
})
