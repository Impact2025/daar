import { Metadata } from 'next'
import Link from 'next/link'
import { Shield, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacybeleid | DAAR',
  description: 'Lees hoe DAAR omgaat met je persoonsgegevens en privacy.',
}

export default function PrivacyPage() {
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
            <div className="w-14 h-14 bg-brandGreen/10 rounded-xl flex items-center justify-center">
              <Shield className="w-7 h-7 text-brandGreen" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-navy">Privacybeleid</h1>
              <p className="text-gray-500">Laatst bijgewerkt: januari 2025</p>
            </div>
          </div>

          <div className="prose prose-gray max-w-none">
            <h2 className="text-xl font-semibold text-navy mt-8 mb-4">1. Inleiding</h2>
            <p className="text-gray-600 mb-4">
              DAAR B.V. respecteert je privacy en zorgt ervoor dat de persoonlijke informatie die je aan ons verstrekt vertrouwelijk wordt behandeld. In dit privacybeleid leggen we uit welke gegevens we verzamelen en hoe we deze gebruiken.
            </p>

            <h2 className="text-xl font-semibold text-navy mt-8 mb-4">2. Welke gegevens verzamelen we?</h2>
            <p className="text-gray-600 mb-4">
              Wij verzamelen de volgende persoonsgegevens:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
              <li>Naam en contactgegevens (e-mailadres, telefoonnummer)</li>
              <li>Organisatiegegevens</li>
              <li>Gegevens over het gebruik van onze diensten</li>
              <li>Communicatievoorkeuren</li>
            </ul>

            <h2 className="text-xl font-semibold text-navy mt-8 mb-4">3. Waarvoor gebruiken we je gegevens?</h2>
            <p className="text-gray-600 mb-4">
              Wij gebruiken je gegevens voor:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
              <li>Het leveren van onze diensten</li>
              <li>Communicatie over je account of onze diensten</li>
              <li>Verbetering van onze producten</li>
              <li>Naleving van wettelijke verplichtingen</li>
            </ul>

            <h2 className="text-xl font-semibold text-navy mt-8 mb-4">4. Hoe beveiligen we je gegevens?</h2>
            <p className="text-gray-600 mb-4">
              Wij nemen passende technische en organisatorische maatregelen om je gegevens te beschermen tegen verlies, misbruik of ongeautoriseerde toegang. Alle gegevens worden versleuteld opgeslagen en overgedragen.
            </p>

            <h2 className="text-xl font-semibold text-navy mt-8 mb-4">5. Je rechten</h2>
            <p className="text-gray-600 mb-4">
              Je hebt het recht om:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
              <li>Inzage te vragen in je persoonsgegevens</li>
              <li>Correctie of verwijdering aan te vragen</li>
              <li>Bezwaar te maken tegen verwerking</li>
              <li>Je gegevens over te dragen</li>
            </ul>

            <h2 className="text-xl font-semibold text-navy mt-8 mb-4">6. Contact</h2>
            <p className="text-gray-600 mb-4">
              Heb je vragen over dit privacybeleid? Neem dan contact met ons op via{' '}
              <a href="mailto:privacy@daar.nl" className="text-brandGreen hover:underline">
                privacy@daar.nl
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
