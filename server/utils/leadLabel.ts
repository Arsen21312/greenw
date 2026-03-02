const PAGE_LABEL_MAP: Record<string, string> = {
  '': 'Форма Сайт',
  index: 'Форма Главная',
  lift: 'Форма Лифты',
  'led-screens': 'Форма LED Экраны',
  'led-indoor': 'Форма LED Indoor',
  owners: 'Форма Owners',
  we: 'Форма Партнеры',
}

const normalizePageKey = (value?: string) => {
  if (!value) return ''

  let key = String(value).trim().toLowerCase()
  if (!key) return ''

  key = key.replace(/\\/g, '/')
  key = key.split('?')[0].split('#')[0]
  key = key.replace(/^https?:\/\/[^/]+/i, '')
  key = key.replace(/^\/+/, '').replace(/\/+$/, '')

  if (key === '' || key === 'home') {
    return 'index'
  }

  return key.split('/')[0] || ''
}

export const resolveLeadLabel = (params: {
  page?: string
  source?: string
  hasLiftOrder?: boolean
}) => {
  if (params.hasLiftOrder) {
    return PAGE_LABEL_MAP.lift
  }

  const pageKey = normalizePageKey(params.page)
  if (pageKey in PAGE_LABEL_MAP) {
    return PAGE_LABEL_MAP[pageKey]
  }

  const sourceKey = normalizePageKey(params.source)
  if (sourceKey in PAGE_LABEL_MAP) {
    return PAGE_LABEL_MAP[sourceKey]
  }

  return PAGE_LABEL_MAP['']
}

export { PAGE_LABEL_MAP, normalizePageKey }
