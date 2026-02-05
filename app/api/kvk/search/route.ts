import { NextRequest, NextResponse } from 'next/server'

// KVK zoeken op bedrijfsnaam
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('q')

    if (!query || query.length < 2) {
      return NextResponse.json({ error: 'Zoekterm moet minimaal 2 karakters zijn' }, { status: 400 })
    }

    const results: Array<{
      kvkNumber: string
      companyName: string
      address?: string
      postalCode?: string
      city?: string
      type?: string
    }> = []

    // Probeer openkvk.nl API - zoek in alle rechtsvormen
    const rechtsvormen = ['bv', 'eenmanszaak', 'vof', 'stichting', 'vereniging', 'cv', 'maatschap', 'nv']

    for (const rechtsvorm of rechtsvormen) {
      try {
        const response = await fetch(
          `https://openkvk.nl/api/v1/${rechtsvorm}?naam=${encodeURIComponent(query)}&limit=5`,
          {
            headers: { 'Accept': 'application/json' },
            signal: AbortSignal.timeout(3000),
          }
        )

        if (response.ok) {
          const data = await response.json()
          if (Array.isArray(data)) {
            for (const bedrijf of data) {
              results.push({
                kvkNumber: bedrijf.kvk || bedrijf.dossiernummer || '',
                companyName: bedrijf.handelsnaam || bedrijf.naam || '',
                address: bedrijf.straat ? `${bedrijf.straat} ${bedrijf.huisnummer || ''}`.trim() : '',
                postalCode: bedrijf.postcode || '',
                city: bedrijf.plaats || '',
                type: bedrijf.type || rechtsvorm.toUpperCase(),
              })
            }
          }
        }
      } catch (e) {
        // Doorgaan met volgende rechtsvorm
      }

      // Stop als we genoeg resultaten hebben
      if (results.length >= 10) break
    }

    if (results.length === 0) {
      console.log('OpenKVK search failed, trying alternatives...')
    }

    // Als geen resultaten, probeer overheid.io
    if (results.length === 0) {
      try {
        const response = await fetch(
          `https://overheid.io/api/kvk?filters[handelsnaam]=${encodeURIComponent(query)}&size=10`,
          {
            headers: { 'Accept': 'application/json' },
            signal: AbortSignal.timeout(5000),
          }
        )

        if (response.ok) {
          const data = await response.json()
          if (data._embedded?.rechtspersoon) {
            for (const bedrijf of data._embedded.rechtspersoon) {
              results.push({
                kvkNumber: bedrijf.dossiernummer || '',
                companyName: bedrijf.handelsnaam || '',
                city: bedrijf.plaats || '',
              })
            }
          }
        }
      } catch (e) {
        console.log('Overheid.io search also failed')
      }
    }

    // Filter duplicaten op KVK nummer
    const uniqueResults = results.filter(
      (item, index, self) =>
        item.kvkNumber && self.findIndex((t) => t.kvkNumber === item.kvkNumber) === index
    )

    return NextResponse.json({
      success: true,
      count: uniqueResults.length,
      results: uniqueResults,
    })

  } catch (error) {
    console.error('KVK search error:', error)
    return NextResponse.json({
      success: false,
      error: 'Zoeken mislukt',
      results: [],
    }, { status: 500 })
  }
}
