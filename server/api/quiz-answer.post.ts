import { useAmoClient } from '../utils/amoClient'

export default defineEventHandler(async event => {
  const body = await readBody<{
    name: string
    phone: string
    leadId?: number | null
    question_key: string
    question_text: string
    answer: string
    liftOrder?: any
  }>(event)

  const { createNoteForLead } = useAmoClient()

  if (!body.leadId) {
    console.log('quiz answer without leadId', body)
    return { ok: true, skipped: true }
  }

  const parts: string[] = []

  parts.push(`Ответ опроса`)
  parts.push(`Клиент: ${body.name} (${body.phone})`)
  parts.push(`Вопрос: ${body.question_text}`)
  parts.push(`Ответ: ${body.answer}`)

  if (body.liftOrder) {
    const lift = body.liftOrder
    const blocks = lift.blocks && lift.blocks.length ? lift.blocks.join(', ') : 'не выбраны'
    const months = lift.months || 1
    const total = lift.totalWithDiscount || lift.totalWithoutDiscount || 0

    parts.push(
      `Лифтовый калькулятор: блоки ${blocks}, срок ${months} мес, итог ${total.toLocaleString(
        'ru-RU',
      )} ₸`,
    )
  }

  const noteText = parts.join('\n')

  await createNoteForLead(Number(body.leadId), noteText)

  return { ok: true }
})
