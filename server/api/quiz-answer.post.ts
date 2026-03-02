import { useAmoClient } from '../utils/amoClient'
import { resolveLeadLabel } from '../utils/leadLabel'

export default defineEventHandler(async event => {
  const body = await readBody<{
    name: string
    phone: string
    leadId?: number | null
    question_key: string
    question_text: string
    answer: string
    source?: string
    page?: string
    liftOrder?: {
      blocks?: number[]
      months?: number
      totalWithoutDiscount?: number
      totalWithDiscount?: number
    } | null
  }>(event)

  const { createNoteForLead, createLeadWithContact, findLeadAndContactByPhone } = useAmoClient()

  let effectiveLeadId = body.leadId ? Number(body.leadId) : null
  let createdContactId: number | null = null

  if (!effectiveLeadId) {
    if (!body.name || !body.phone) {
      console.log('quiz answer without leadId/name/phone', body)
      return { ok: true, skipped: true }
    }

    const existing = await findLeadAndContactByPhone(body.phone)
    if (existing?.leadId) {
      effectiveLeadId = existing.leadId
      createdContactId = existing.contactId || null
    }
  }

  if (!effectiveLeadId) {
    if (!body.name || !body.phone) {
      console.log('quiz answer without leadId/name/phone', body)
      return { ok: true, skipped: true }
    }

    const source = body.source || 'unknown'
    const page = body.page || 'unknown'

    const contactName = String(body.name || '').trim()
    const created = await createLeadWithContact({
      leadName: `${resolveLeadLabel({
        page,
        source,
        hasLiftOrder: Boolean(body.liftOrder),
      })}, ${contactName}`,
      contactName,
      phone: body.phone,
      price:
        body.liftOrder?.totalWithDiscount ||
        body.liftOrder?.totalWithoutDiscount ||
        0,
    })

    effectiveLeadId = created?.lead?.id ? Number(created.lead.id) : null
    createdContactId = created?.contact?.id ? Number(created.contact.id) : null
  }

  if (!effectiveLeadId) {
    return { ok: false, skipped: true }
  }

  const parts: string[] = []

  parts.push('Quiz answer')
  parts.push(`Client: ${body.name} (${body.phone})`)
  parts.push(`Question: ${body.question_text}`)
  parts.push(`Answer: ${body.answer}`)

  if (body.liftOrder) {
    const lift = body.liftOrder
    const blocks = lift.blocks && lift.blocks.length ? lift.blocks.join(', ') : 'none'
    const months = lift.months || 1
    const total = lift.totalWithDiscount || lift.totalWithoutDiscount || 0

    parts.push(
      `Lift calc: blocks ${blocks}, term ${months} months, total ${total.toLocaleString('ru-RU')} KZT`,
    )
  }

  const noteText = parts.join('\n')

  await createNoteForLead(effectiveLeadId, noteText)

  return {
    ok: true,
    leadId: effectiveLeadId,
    contactId: createdContactId,
  }
})
