import { useAmoClient } from '../utils/amoClient'

export default defineEventHandler(async event => {
  const body = await readBody<{
    name: string
    phone: string
    liftOrder?: {
      blocks?: number[]
      blockFormats?: Record<string, string>
      months?: number
      totalWithoutDiscount?: number
      totalWithDiscount?: number
      totalDiscountPercent?: number
    } | null
  }>(event)

  if (!body.name || !body.phone) {
    throw createError({
      statusCode: 400,
      statusMessage: 'name and phone are required',
    })
  }

  const { createLeadWithContact } = useAmoClient()

  const lift = body.liftOrder || null

  let liftSummary = ''
  if (lift) {
    const blocks = lift.blocks && lift.blocks.length ? lift.blocks.join(', ') : 'не выбраны'
    const months = lift.months || 1
    const total = lift.totalWithDiscount || lift.totalWithoutDiscount || 0
    const base = lift.totalWithoutDiscount || 0
    const disc = lift.totalDiscountPercent || 0

    liftSummary =
      `Лифтовый калькулятор:` +
      ` блоки ${blocks},` +
      ` срок ${months} мес,` +
      ` цена без скидок ${base.toLocaleString('ru-RU')} ₸,` +
      ` скидка ${disc} %,` +
      ` итог ${total.toLocaleString('ru-RU')} ₸`
  }

  const leadName = lift
    ? `Лифт реклама, калькулятор, ${body.name}`
    : `Лифт реклама, заявка с формы, ${body.name}`

  const lead = await createLeadWithContact({
    name: leadName,
    phone: body.phone,
    price: lift?.totalWithDiscount || lift?.totalWithoutDiscount || 0,
    liftOrderSummary: liftSummary || undefined,
  })

  return { ok: true, leadId: lead.id }
})
