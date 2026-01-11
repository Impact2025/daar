import { Metadata } from 'next'
import Link from 'next/link'
import { FileText, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Algemene Voorwaarden | DAAR',
  description: 'Lees de algemene voorwaarden van DAAR B.V.',
}

export default function VoorwaardenPage() {
  return (
    <div className="bg-offWhite min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-brandGreen mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Terug naar home
        </Link>

        <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm border border-gray-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-navy/10 rounded-xl flex items-center justify-center">
              <FileText className="w-7 h-7 text-navy" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-navy">Algemene Voorwaarden</h1>
              <p className="text-gray-500">Laatst bijgewerkt: januari 2025</p>
            </div>
          </div>

          <div className="prose prose-gray max-w-none">
            <h2 className="text-xl font-semibold text-navy mt-8 mb-4">Artikel 1 - Definities</h2>
            <p className="text-gray-600 mb-4">
              In deze algemene voorwaarden wordt verstaan onder:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
              <li><strong>DAAR:</strong> DAAR B.V., gevestigd te Nederland</li>
              <li><strong>Klant:</strong> de natuurlijke of rechtspersoon die een overeenkomst aangaat met DAAR</li>
              <li><strong>Diensten:</strong> alle diensten die DAAR aan de Klant levert</li>
              <li><strong>Platform:</strong> het DAAR vrijwilligersplatform</li>
            </ul>

            <h2 className="text-xl font-semibold text-navy mt-8 mb-4">Artikel 2 - Toepasselijkheid</h2>
            <p className="text-gray-600 mb-4">
              Deze voorwaarden zijn van toepassing op alle aanbiedingen, overeenkomsten en leveringen van diensten door DAAR.
            </p>

            <h2 className="text-xl font-semibold text-navy mt-8 mb-4">Artikel 3 - Aanbiedingen en overeenkomsten</h2>
            <p className="text-gray-600 mb-4">
              Alle aanbiedingen van DAAR zijn vrijblijvend, tenzij uitdrukkelijk anders vermeld. Een overeenkomst komt tot stand na schriftelijke bevestiging door DAAR.
            </p>

            <h2 className="text-xl font-semibold text-navy mt-8 mb-4">Artikel 4 - Uitvoering van de overeenkomst</h2>
            <p className="text-gray-600 mb-4">
              DAAR zal de overeenkomst naar beste inzicht en vermogen uitvoeren. DAAR heeft het recht bepaalde werkzaamheden te laten verrichten door derden.
            </p>

            <h2 className="text-xl font-semibold text-navy mt-8 mb-4">Artikel 5 - Verplichtingen van de Klant</h2>
            <p className="text-gray-600 mb-4">
              De Klant zorgt ervoor dat alle gegevens, waarvan DAAR aangeeft dat deze noodzakelijk zijn, tijdig worden verstrekt.
            </p>

            <h2 className="text-xl font-semibold text-navy mt-8 mb-4">Artikel 6 - Intellectueel eigendom</h2>
            <p className="text-gray-600 mb-4">
              Alle intellectuele eigendomsrechten op de door DAAR ontwikkelde of ter beschikking gestelde materialen berusten bij DAAR.
            </p>

            <h2 className="text-xl font-semibold text-navy mt-8 mb-4">Artikel 7 - Aansprakelijkheid</h2>
            <p className="text-gray-600 mb-4">
              De aansprakelijkheid van DAAR is beperkt tot het bedrag dat in het desbetreffende geval onder de aansprakelijkheidsverzekering wordt uitbetaald.
            </p>

            <h2 className="text-xl font-semibold text-navy mt-8 mb-4">Artikel 8 - Contact</h2>
            <p className="text-gray-600 mb-4">
              Voor vragen over deze voorwaarden kun je contact opnemen via{' '}
              <a href="mailto:info@daar.nl" className="text-brandGreen hover:underline">
                info@daar.nl
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
