export const useAmoClient = () => {
  const config = useRuntimeConfig()

  const baseUrl = `https://${config.amoDomain}`

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${config.amoAccessToken}`,
  }

  const createContact = async (params: { name: string; phone: string }) => {
    const payload = [
      {
        name: params.name,
        custom_fields_values: [
          {
            field_code: 'PHONE',
            values: [
              {
                value: params.phone,
                enum_code: 'WORK',
              },
            ],
          },
        ],
      },
    ]

    const res = await fetch(`${baseUrl}/api/v4/contacts`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const text = await res.text()
      console.error('amo createContact error', res.status, text)
      throw createError({ statusCode: 500, statusMessage: 'amoCRM create contact error' })
    }

    const data = await res.json()
    const contact =
      (data && Array.isArray(data) && data[0]) ||
      data?._embedded?.contacts?.[0] ||
      data

    return contact
  }

  const createLead = async (params: { name: string; price?: number }) => {
    const payload = [
      {
        name: params.name,
        price: params.price || 0,
        pipeline_id: config.amoPipelineId ? Number(config.amoPipelineId) : undefined,
        status_id: config.amoStatusId ? Number(config.amoStatusId) : undefined,
      },
    ]

    const res = await fetch(`${baseUrl}/api/v4/leads`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const text = await res.text()
      console.error('amo createLead error', res.status, text)
      throw createError({ statusCode: 500, statusMessage: 'amoCRM create lead error' })
    }

    const data = await res.json()
    const lead =
      (data && Array.isArray(data) && data[0]) ||
      data?._embedded?.leads?.[0] ||
      data

    return lead
  }

  const linkContactToLead = async (leadId: number, contactId: number) => {
    const payload = [
      {
        to_entity_id: contactId,
        to_entity_type: 'contacts',
      },
    ]

    const res = await fetch(`${baseUrl}/api/v4/leads/${leadId}/link`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const body = await res.text()
      console.error('amo linkContactToLead error', res.status, body)
      throw createError({ statusCode: 500, statusMessage: 'amoCRM link contact error' })
    }
  }

  const findLeadAndContactByPhone = async (phone: string) => {
    const query = encodeURIComponent(phone)
    const res = await fetch(`${baseUrl}/api/v4/contacts?query=${query}&with=leads`, {
      method: 'GET',
      headers,
    })

    if (!res.ok) {
      const body = await res.text()
      console.error('amo findLeadAndContactByPhone error', res.status, body)
      return null
    }

    if (res.status === 204) {
      return null
    }

    const raw = await res.text()
    if (!raw) {
      return null
    }

    let data: any = null
    try {
      data = JSON.parse(raw)
    } catch (e) {
      console.error('amo findLeadAndContactByPhone parse error', e)
      return null
    }

    const contact = data?._embedded?.contacts?.[0]
    if (!contact?.id) {
      return null
    }

    const leadId = contact?._embedded?.leads?.[0]?.id || null
    return {
      contactId: Number(contact.id),
      leadId: leadId ? Number(leadId) : null,
    }
  }

  const createLeadWithContact = async (params: {
    leadName: string
    contactName: string
    phone: string
    price?: number
    liftOrderSummary?: string
  }) => {
    const contact = await createContact({
      name: params.contactName,
      phone: params.phone,
    })

    const lead = await createLead({
      name: params.leadName,
      price: params.price || 0,
    })

    if (lead?.id && contact?.id) {
      await linkContactToLead(Number(lead.id), Number(contact.id))
    }

    return { lead, contact }
  }

  const createNoteForLead = async (leadId: number, text: string) => {
    const payload = [
      {
        note_type: 'common',
        params: {
          text,
        },
      },
    ]

    const res = await fetch(`${baseUrl}/api/v4/leads/${leadId}/notes`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      const body = await res.text()
      console.error('amo createNote error', res.status, body)
    }
  }

  return { createLeadWithContact, createNoteForLead, findLeadAndContactByPhone }
}
