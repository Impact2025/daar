import { Metadata } from 'next'
import Link from 'next/link'
import { Cookie, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cookiebeleid | DAAR',
  description: 'Lees hoe DAAR cookies gebruikt op de website.',
}

export default function CookiesPage() {
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
            <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center">
              <Cookie className="w-7 h-7 text-amber-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-navy">Cookiebeleid</h1>
              <p className="text-gray-500">Laatst bijgewerkt: januari 2025</p>
            </div>
          </div>

          <div className="prose prose-gray max-w-none">
            <h2 className="text-xl font-semibold text-navy mt-8 mb-4">Wat zijn cookies?</h2>
            <p className="text-gray-600 mb-4">
              Cookies zijn kleine tekstbestanden die op je apparaat worden geplaatst wanneer je onze website bezoekt. Ze helpen ons de website beter te laten werken en je een betere ervaring te bieden.
            </p>

            <h2 className="text-xl font-semibold text-navy mt-8 mb-4">Welke cookies gebruiken wij?</h2>

            <h3 className="text-lg font-medium text-navy mt-6 mb-3">Noodzakelijke cookies</h3>
            <p className="text-gray-600 mb-4">
              Deze cookies zijn essentieel voor het functioneren van de website. Zonder deze cookies kunnen bepaalde functies niet werken.
            </p>

            <h3 className="text-lg font-medium text-navy mt-6 mb-3">Analytische cookies</h3>
            <p className="text-gray-600 mb-4">
              We gebruiken analytische cookies om te begrijpen hoe bezoekers onze website gebruiken. Dit helpt ons de website te verbeteren.
            </p>

            <h3 className="text-lg font-medium text-navy mt-6 mb-3">Functionele cookies</h3>
            <p className="text-gray-600 mb-4">
              Deze cookies onthouden je voorkeuren en instellingen om je een betere ervaring te bieden.
            </p>

            <h2 className="text-xl font-semibold text-navy mt-8 mb-4">Hoe beheer je cookies?</h2>
            <p className="text-gray-600 mb-4">
              Je kunt cookies beheren via je browserinstellingen. Let op: het uitschakelen van bepaalde cookies kan de functionaliteit van de website beperken.
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
              <li><strong>Chrome:</strong> Instellingen &gt; Privacy en beveiliging &gt; Cookies</li>
              <li><strong>Firefox:</strong> Instellingen &gt; Privacy &amp; Beveiliging &gt; Cookies</li>
              <li><strong>Safari:</strong> Voorkeuren &gt; Privacy &gt; Cookies</li>
              <li><strong>Edge:</strong> Instellingen &gt; Cookies en siterechten</li>
            </ul>

            <h2 className="text-xl font-semibold text-navy mt-8 mb-4">Contact</h2>
            <p className="text-gray-600 mb-4">
              Heb je vragen over ons cookiebeleid? Neem dan contact met ons op via{' '}
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
