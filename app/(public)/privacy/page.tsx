import { Metadata } from 'next'
import Link from 'next/link'
import { Shield, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacyverklaring | DAAR',
  description: 'Lees hoe DAAR B.V. omgaat met persoonsgegevens van websitebezoekers en klanten.',
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
              <h1 className="text-3xl font-bold text-navy">Privacyverklaring</h1>
              <p className="text-gray-500">Voor gebruikers van onze website en klanten van ons platform</p>
              <p className="text-gray-400 text-sm">Versie 1.3 | Ingangsdatum: 1 maart 2026</p>
            </div>
          </div>

          <div className="prose prose-gray max-w-none">

            <h2 className="text-xl font-semibold text-navy mt-8 mb-4">Reikwijdte van deze verklaring</h2>
            <p className="text-gray-600 mb-4">
              Deze privacyverklaring beschrijft hoe DAAR B.V. omgaat met persoonsgegevens van (a) bezoekers van onze website, (b) klanten en prospects die direct contact met ons opnemen, en (c) contactpersonen bij organisaties die ons platform gebruiken. DAAR treedt voor deze verwerkingen op als verwerkingsverantwoordelijke (controller). De persoonsgegevens van vrijwilligers die via het platform worden verwerkt, vallen onder de verantwoordelijkheid van de betreffende organisatie. DAAR treedt daarvoor op als verwerker. Die relatie is geregeld in de Verwerkersovereenkomst.
            </p>

            <h2 className="text-xl font-semibold text-navy mt-8 mb-4">1. Wie zijn wij?</h2>
            <p className="text-gray-600 mb-4">
              DAAR B.V. is een sociale onderneming die een modulair platform aanbiedt voor vrijwilligersmanagement, met als kern het meten en vergroten van Geluksmomenten bij vrijwilligers.
            </p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm text-gray-600 border-collapse">
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-medium text-navy w-64">Bedrijfsnaam</td>
                    <td className="py-2">DAAR B.V.</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-medium text-navy">KVK-nummer</td>
                    <td className="py-2">99576759</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-medium text-navy">Functionaris Gegevensbescherming (FG)</td>
                    <td className="py-2">mail naar: <a href="mailto:hallo@daar.nl" className="text-brandGreen hover:underline">hallo@daar.nl</a></td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 font-medium text-navy">E-mail privacy</td>
                    <td className="py-2"><a href="mailto:hallo@daar.nl" className="text-brandGreen hover:underline">hallo@daar.nl</a></td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 font-medium text-navy">Website</td>
                    <td className="py-2">www.daar.nl</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-xl font-semibold text-navy mt-8 mb-4">2. Welke persoonsgegevens verwerkt DAAR als controller?</h2>
            <p className="text-gray-600 mb-4">
              DAAR verwerkt als verwerkingsverantwoordelijke uitsluitend gegevens van de volgende categorieën betrokkenen:
            </p>

            <h3 className="text-lg font-semibold text-navy mt-6 mb-3">2a. Websitebezoekers</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
              <li>IP-adres (geanonimiseerd na 24 uur)</li>
              <li>Bezochte pagina&apos;s en klikgedrag (via analytische cookies — alleen met toestemming)</li>
              <li>Browsertype en apparaattype</li>
            </ul>

            <h3 className="text-lg font-semibold text-navy mt-6 mb-3">2b. Klanten, prospects en contactpersonen</h3>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
              <li>Naam en zakelijk e-mailadres</li>
              <li>Organisatienaam en functietitel</li>
              <li>Correspondentie en gespreksnotities</li>
              <li>Factuurgegevens (naam, adres, btw-nummer)</li>
              <li>Inloggegevens voor het platform (versleuteld opgeslagen)</li>
            </ul>
            <p className="text-gray-600 mb-4">
              DAAR verwerkt geen bijzondere persoonsgegevens (zoals gezondheids- of strafrechtelijke gegevens) van bovengenoemde groepen.
            </p>

            <h2 className="text-xl font-semibold text-navy mt-8 mb-4">3. Grondslagen voor verwerking</h2>
            <p className="text-gray-600 mb-4">
              Elke verwerking is gebaseerd op een van de volgende wettelijke grondslagen conform AVG artikel 6:
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm text-gray-600 border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-2 pr-4 text-left font-semibold text-navy">Grondslag</th>
                    <th className="py-2 pr-4 text-left font-semibold text-navy">AVG-artikel</th>
                    <th className="py-2 text-left font-semibold text-navy">Toepassing bij DAAR</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4">Uitvoering overeenkomst</td>
                    <td className="py-2 pr-4">Art. 6(1)(b)</td>
                    <td className="py-2">Accountbeheer, facturering, levering diensten</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4">Gerechtvaardigd belang</td>
                    <td className="py-2 pr-4">Art. 6(1)(f)</td>
                    <td className="py-2">Website-analytics (geanonimiseerd), fraudepreventie, productontwikkeling op geaggregeerd niveau</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4">Toestemming</td>
                    <td className="py-2 pr-4">Art. 6(1)(a)</td>
                    <td className="py-2">Nieuwsbrief, marketingcookies — altijd intrekbaar</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Wettelijke verplichting</td>
                    <td className="py-2 pr-4">Art. 6(1)(c)</td>
                    <td className="py-2">Fiscale bewaarplicht (7 jaar), meldplicht datalekken</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 mb-4">
              <strong>Afweging gerechtvaardigd belang:</strong> DAAR heeft voor de grondslag &apos;gerechtvaardigd belang&apos; een balancing test uitgevoerd en gedocumenteerd in het intern verwerkersregister. Deze afweging toont aan dat het belang van DAAR bij productontwikkeling en fraudepreventie niet zwaarder weegt dan de privacybelangen van betrokkenen, mits de verwerking beperkt blijft tot geanonimiseerde of geaggregeerde gegevens.
            </p>

            <h2 className="text-xl font-semibold text-navy mt-8 mb-4">4. Bewaartermijnen</h2>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm text-gray-600 border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-2 pr-4 text-left font-semibold text-navy">Categorie</th>
                    <th className="py-2 pr-4 text-left font-semibold text-navy">Termijn</th>
                    <th className="py-2 text-left font-semibold text-navy">Grondslag</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4">Klantaccounts (actief)</td>
                    <td className="py-2 pr-4">Zolang actief</td>
                    <td className="py-2">Uitvoering overeenkomst</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4">Klantaccounts (inactief)</td>
                    <td className="py-2 pr-4">2 jaar na laatste activiteit</td>
                    <td className="py-2">Gerechtvaardigd belang (geschillen)</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4">Factuurgegevens</td>
                    <td className="py-2 pr-4">7 jaar</td>
                    <td className="py-2">Wettelijke verplichting (fiscaal)</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4">E-mailcorrespondentie</td>
                    <td className="py-2 pr-4">5 jaar na laatste contact</td>
                    <td className="py-2">Gerechtvaardigd belang (contractueel)</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4">Websiteanalytics (geanonimiseerd)</td>
                    <td className="py-2 pr-4">24 maanden</td>
                    <td className="py-2">Gerechtvaardigd belang</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4">Sollicitaties (afgewezen)</td>
                    <td className="py-2 pr-4">4 weken na afwijzing</td>
                    <td className="py-2">Toestemming (tenzij verlengd)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Marketingtoestemming</td>
                    <td className="py-2 pr-4">Tot intrekking + 1 jaar</td>
                    <td className="py-2">Toestemming + bewijslast</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-xl font-semibold text-navy mt-8 mb-4">5. Delen van persoonsgegevens</h2>
            <p className="text-gray-600 mb-4">
              DAAR verkoopt nooit persoonsgegevens. Wij delen gegevens uitsluitend in de volgende situaties:
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm text-gray-600 border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-2 pr-4 text-left font-semibold text-navy">Situatie</th>
                    <th className="py-2 text-left font-semibold text-navy">Toelichting</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 align-top">Sub-verwerkers</td>
                    <td className="py-2">Hostingprovider Vercel, e-mailplatform Resend. Verwerkersovereenkomsten zijn afgesloten met alle sub-verwerkers. Een actuele lijst is beschikbaar op verzoek.</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 align-top">Wettelijke verplichting</td>
                    <td className="py-2">Op schriftelijke vordering van bevoegde autoriteiten (AP, OM, rechter). DAAR informeert de betrokkene hierover tenzij dit wettelijk verboden is.</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 align-top">Bedrijfsoverdracht</td>
                    <td className="py-2">Bij fusie of overname worden betrokkenen minimaal 30 dagen vooraf geïnformeerd en krijgen zij de mogelijkheid hun gegevens te verwijderen.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-xl font-semibold text-navy mt-8 mb-4">6. Internationale gegevensoverdracht</h2>
            <p className="text-gray-600 mb-4">
              DAAR verwerkt gegevens bij voorkeur binnen de Europese Economische Ruimte (EER). Indien een sub-verwerker gegevens buiten de EER verwerkt, waarborgt DAAR de rechtmatigheid door: (a) adequaatheidsbesluiten van de Europese Commissie, of (b) Standard Contractual Clauses (SCCs), aangevuld met een Transfer Impact Assessment waar nodig.
            </p>

            <h2 className="text-xl font-semibold text-navy mt-8 mb-4">7. Beveiliging</h2>
            <p className="text-gray-600 mb-4">
              DAAR hanteert de volgende technische en organisatorische beveiligingsmaatregelen:
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm text-gray-600 border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-2 pr-4 text-left font-semibold text-navy">Maatregel</th>
                    <th className="py-2 text-left font-semibold text-navy">Uitwerking</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 align-top">Versleuteling</td>
                    <td className="py-2">TLS 1.3 voor datatransport; AES-256-GCM voor opgeslagen data</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 align-top">Toegangscontrole</td>
                    <td className="py-2">Role-Based Access Control (RBAC); minimale toegangsprivileges</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 align-top">Authenticatie</td>
                    <td className="py-2">Multi-factor authenticatie verplicht voor beheerders</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 align-top">Back-ups</td>
                    <td className="py-2">Dagelijks, versleuteld, geografisch redundant</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 align-top">Monitoring</td>
                    <td className="py-2">Geautomatiseerde detectie van ongeautoriseerde toegang</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 align-top">Datalekprocedure</td>
                    <td className="py-2">Gedetecteerde lekken worden binnen 72 uur gemeld bij de AP (AVG art. 33) en betrokkenen worden geïnformeerd conform art. 34</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 align-top">Medewerkers</td>
                    <td className="py-2">Geheimhoudingsverklaring en jaarlijkse AVG-bewustzijnstraining</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 align-top">Penetratietesten</td>
                    <td className="py-2">Jaarlijks door externe partij</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-xl font-semibold text-navy mt-8 mb-4">8. Uw rechten als betrokkene</h2>
            <p className="text-gray-600 mb-4">
              Op grond van de AVG heeft u de volgende rechten. U kunt deze uitoefenen via{' '}
              <a href="mailto:hallo@daar.nl" className="text-brandGreen hover:underline">hallo@daar.nl</a>.
              DAAR reageert binnen 30 dagen (verlengbaar met 60 dagen bij complexe verzoeken).
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm text-gray-600 border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-2 pr-4 text-left font-semibold text-navy">Recht</th>
                    <th className="py-2 text-left font-semibold text-navy">Inhoud</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 align-top">Inzage (art. 15)</td>
                    <td className="py-2">Opvragen welke gegevens wij over u verwerken</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 align-top">Rectificatie (art. 16)</td>
                    <td className="py-2">Onjuiste gegevens laten corrigeren</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 align-top">Verwijdering (art. 17)</td>
                    <td className="py-2">Verzoeken uw gegevens te wissen (&apos;recht op vergetelheid&apos;)</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 align-top">Beperking (art. 18)</td>
                    <td className="py-2">Verwerking laten beperken in specifieke situaties</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 align-top">Overdraagbaarheid (art. 20)</td>
                    <td className="py-2">Uw gegevens in machineleesbaar formaat ontvangen</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 align-top">Bezwaar (art. 21)</td>
                    <td className="py-2">Bezwaar maken tegen verwerking op grond van gerechtvaardigd belang</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 align-top">Intrekking toestemming</td>
                    <td className="py-2">Op elk moment, zonder opgave van reden — intrekking doet geen afbreuk aan eerdere verwerking</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 align-top">Klacht indienen</td>
                    <td className="py-2">
                      Bij de Autoriteit Persoonsgegevens:{' '}
                      <a href="https://www.autoriteitpersoonsgegevens.nl" className="text-brandGreen hover:underline" target="_blank" rel="noopener noreferrer">
                        autoriteitpersoonsgegevens.nl
                      </a>{' '}
                      | 088-1805250
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-xl font-semibold text-navy mt-8 mb-4">9. Cookies</h2>
            <p className="text-gray-600 mb-4">
              Voor het cookiebeleid verwijzen wij naar onze afzonderlijke{' '}
              <Link href="/cookies" className="text-brandGreen hover:underline">Cookieverklaring</Link>.
              Cookiebeheer is mogelijk via de cookiebanner bij uw eerste bezoek of via de instellingen in de footer van onze website.
            </p>

            <h2 className="text-xl font-semibold text-navy mt-8 mb-4">10. Wijzigingen</h2>
            <p className="text-gray-600 mb-4">
              DAAR behoudt het recht deze privacyverklaring te wijzigen. Materiële wijzigingen worden minimaal 30 dagen voor ingang gecommuniceerd via e-mail aan klanten en via een banner op de website. De actuele versie is altijd beschikbaar via www.daar.nl/privacy. De versiegeschiedenis is op verzoek beschikbaar.
            </p>

          </div>

          <div className="mt-12 pt-6 border-t border-gray-100 text-sm text-gray-400 text-center">
            DAAR B.V. &nbsp;|&nbsp; Versie 1.3 &nbsp;|&nbsp; 1 maart 2026 &nbsp;|&nbsp;{' '}
            <a href="mailto:hallo@daar.nl" className="text-brandGreen hover:underline">hallo@daar.nl</a>
          </div>
        </div>
      </div>
    </div>
  )
}
