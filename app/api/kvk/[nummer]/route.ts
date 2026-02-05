import { NextRequest, NextResponse } from 'next/server'

// KVK lookup via openkvk.nl (gratis) of overheid.io
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ nummer: string }> }
) {
  try {
    const { nummer } = await params

    // Valideer KVK nummer (8 cijfers)
    if (!/^\d{8}$/.test(nummer)) {
      return NextResponse.json({ error: 'KVK nummer moet 8 cijfers zijn' }, { status: 400 })
    }

    // Probeer openkvk.nl API
    const response = await fetch(
      `https://openkvk.nl/api/v1/bv/${nummer}`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    )

    if (response.ok) {
      const data = await response.json()

      if (data && data.length > 0) {
        const bedrijf = data[0]
        return NextResponse.json({
          success: true,
          data: {
            companyName: bedrijf.handelsnaam || bedrijf.naam || '',
            address: bedrijf.straat ? `${bedrijf.straat} ${bedrijf.huisnummer || ''}`.trim() : '',
            postalCode: bedrijf.postcode || '',
            city: bedrijf.plaats || '',
            website: bedrijf.website || '',
          },
        })
      }
    }

    // Fallback: probeer overheid.io (Handelsregister)
    const overheidResponse = await fetch(
      `https://overheid.io/api/kvk/${nummer}`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    )

    if (overheidResponse.ok) {
      const data = await overheidResponse.json()

      if (data) {
        return NextResponse.json({
          success: true,
          data: {
            companyName: data.handelsnaam || data.naam || '',
            address: data.straat || '',
            postalCode: data.postcode || '',
            city: data.plaats || '',
          },
        })
      }
    }

    // Geen resultaat gevonden
    return NextResponse.json({
      success: false,
      error: 'Geen bedrijf gevonden met dit KVK nummer',
    }, { status: 404 })

  } catch (error) {
    console.error('KVK lookup error:', error)
    return NextResponse.json({
      success: false,
      error: 'Kon KVK gegevens niet ophalen',
    }, { status: 500 })
  }
}
