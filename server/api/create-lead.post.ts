import { useAmoClient } from '../utils/amoClient'
import { resolveLeadLabel } from '../utils/leadLabel'

export default defineEventHandler(async event => {
  const body = await readBody<{
    name: string
    phone: string
    source?: string
    page?: string
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

  const { createLeadWithContact, findLeadAndContactByPhone } = useAmoClient()

  const lift = body.liftOrder || null

  let liftSummary = ''
  if (lift) {
    const blocks = lift.blocks && lift.blocks.length ? lift.blocks.join(', ') : 'none'
    const months = lift.months || 1
    const total = lift.totalWithDiscount || lift.totalWithoutDiscount || 0
    const base = lift.totalWithoutDiscount || 0
    const disc = lift.totalDiscountPercent || 0

    liftSummary =
      `Lift calculator:` +
      ` blocks ${blocks},` +
      ` term ${months} months,` +
      ` base ${base.toLocaleString('ru-RU')} KZT,` +
      ` discount ${disc} %,` +
      ` total ${total.toLocaleString('ru-RU')} KZT`
  }

  const source = body.source || 'unknown'
  const page = body.page || 'unknown'

  const existing = await findLeadAndContactByPhone(body.phone)
  if (existing?.leadId) {
    return {
      ok: true,
      leadId: existing.leadId,
      contactId: existing.contactId || null,
      reused: true,
    }
  }

  const contactName = String(body.name || '').trim()
  const leadName = `${resolveLeadLabel({
    page,
    source,
    hasLiftOrder: Boolean(lift),
  })}, ${contactName}`

  const result = await createLeadWithContact({
    leadName,
    contactName,
    phone: body.phone,
    price: lift?.totalWithDiscount || lift?.totalWithoutDiscount || 0,
    liftOrderSummary: liftSummary || undefined,
  })

  return {
    ok: true,
    leadId: result?.lead?.id ? Number(result.lead.id) : null,
    contactId: result?.contact?.id ? Number(result.contact.id) : null,
  }
})
