import { defineEventHandler, readBody, createError } from 'h3'
import { useAmoClient } from '../utils/amoClient'
import { resolveLeadLabel } from '../utils/leadLabel'

export default defineEventHandler(async event => {
  const body = await readBody(event)

  if (!body?.name || !body?.phone) {
    throw createError({
      statusCode: 400,
      statusMessage: 'name and phone are required',
    })
  }

  const { createLeadWithContact, findLeadAndContactByPhone } = useAmoClient()

  const lift = body.liftOrder || null
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
  })

  return {
    ok: true,
    leadId: result?.lead?.id ? Number(result.lead.id) : null,
    contactId: result?.contact?.id ? Number(result.contact.id) : null,
  }
})
