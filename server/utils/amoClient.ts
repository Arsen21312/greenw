export const useAmoClient = () => {
  const config = useRuntimeConfig()

  const baseUrl = `https://${config.amoDomain}`

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${config.amoAccessToken}`,
  }

  const createLeadWithContact = async (params: {
    name: string
    phone: string
    price?: number
    liftOrderSummary?: string
  }) => {
    const payload = [
      {
        name: params.name,
        price: params.price || 0,
        pipeline_id: config.amoPipelineId ? Number(config.amoPipelineId) : undefined,
        status_id: config.amoStatusId ? Number(config.amoStatusId) : undefined,
        // Никаких custom_fields_values и _embedded здесь нет — минимальный payload лида
      },
    ]

    console.log('amo createLead payload', JSON.stringify(payload, null, 2))

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

  return { createLeadWithContact, createNoteForLead }
}
