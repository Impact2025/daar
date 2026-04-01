import { Metadata } from 'next'
import Link from 'next/link'
import { Cookie, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cookiebeleid | DAAR',
  description: 'Transparantie over hoe DAAR B.V. cookies en vergelijkbare technieken gebruikt op www.daar.nl.',
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
              <p className="text-gray-500">Transparantie over hoe wij cookies en vergelijkbare technieken gebruiken</p>
              <p className="text-gray-400 text-sm">Versie 1.1 | Ingangsdatum: 1 maart 2026</p>
            </div>
          </div>

          <div className="prose prose-gray max-w-none">

            {/* Leeswijzer */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-8">
              <p className="text-sm text-blue-800 leading-relaxed m-0">
                <strong>Leeswijzer</strong><br />
                Dit cookiebeleid is van toepassing op de website www.daar.nl en het DAAR-platform. Het is opgesteld conform de Telecommunicatiewet (Tw), de Algemene Verordening Gegevensbescherming (AVG) en de richtlijnen van de Autoriteit Persoonsgegevens (AP) en de Autoriteit Consument &amp; Markt (ACM). Dit beleid maakt deel uit van het privacydocumentatiepakket van DAAR en dient te worden gelezen in samenhang met de{' '}
                <Link href="/privacy" className="text-blue-700 hover:underline">Privacyverklaring</Link>.
              </p>
            </div>

            <h2 className="text-xl font-semibold text-navy mt-8 mb-4">1. Wat zijn cookies?</h2>
            <p className="text-gray-600 mb-4">
              Cookies zijn kleine tekstbestanden die door een webserver worden geplaatst op het apparaat (computer, tablet, smartphone) van een websitebezoeker of platformgebruiker. Ze worden opgeslagen in de browser en kunnen bij een volgend bezoek worden uitgelezen.
            </p>
            <p className="text-gray-600 mb-4">Naast traditionele cookies maakt DAAR gebruik van vergelijkbare technieken die hetzelfde effect hebben:</p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm text-gray-600 border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-2 pr-4 text-left font-semibold text-navy">Techniek</th>
                    <th className="py-2 text-left font-semibold text-navy">Uitleg</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 align-top">Cookie</td>
                    <td className="py-2">Tekstbestand opgeslagen door de browser, leesbaar door de plaatsende domeinnaam</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 align-top">Sessiecookie</td>
                    <td className="py-2">Tijdelijke cookie die verdwijnt zodra de browser wordt gesloten</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 align-top">Persistente cookie</td>
                    <td className="py-2">Cookie met een vaste vervaldatum die blijft staan na het sluiten van de browser</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 align-top">First-party cookie</td>
                    <td className="py-2">Geplaatst door het domein dat de gebruiker bezoekt (DAAR zelf)</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 align-top">Third-party cookie</td>
                    <td className="py-2">Geplaatst door een extern domein (sub-verwerker of derde partij)</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 align-top">Local Storage</td>
                    <td className="py-2">Browseropslag vergelijkbaar met cookies, zonder vervaldatum — gebruikt voor platformfunctionaliteit</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 align-top">Pixel / beacon</td>
                    <td className="py-2">Onzichtbare afbeelding die laadgedrag registreert — DAAR gebruikt dit uitsluitend met toestemming</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 align-top">Fingerprinting</td>
                    <td className="py-2">Identificatie op basis van browserkenmerken — DAAR past dit <strong>niet</strong> toe</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-xl font-semibold text-navy mt-8 mb-4">2. Waarom gebruikt DAAR cookies?</h2>
            <p className="text-gray-600 mb-2">DAAR gebruikt cookies en vergelijkbare technieken voor de volgende doeleinden:</p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
              <li>Het functioneren van de website en het platform (technisch noodzakelijk)</li>
              <li>Het onthouden van uw voorkeuren en instellingen</li>
              <li>Het beveiligen van uw sessie en het voorkomen van fraude</li>
              <li>Het meten en verbeteren van de gebruikservaring (analytisch, geanonimiseerd)</li>
              <li>Het tonen van relevante informatie op onze website (marketing — uitsluitend met toestemming)</li>
            </ul>
            <p className="text-gray-600 mb-4">
              DAAR plaatst geen cookies voor profilering van individuele gebruikers, verkoop van data aan derden of het bouwen van advertentieprofielen.
            </p>

            <h2 className="text-xl font-semibold text-navy mt-8 mb-4">3. Welke cookies gebruikt DAAR?</h2>
            <p className="text-gray-600 mb-6">
              DAAR onderscheidt vier categorieën cookies, gebaseerd op de richtlijnen van de AP en de ICC-cookie-categorisering.
            </p>

            {/* Categorie 1 */}
            <div className="bg-green-50 border border-green-100 rounded-xl p-4 mb-3">
              <h3 className="text-base font-semibold text-green-800 mb-1">Categorie 1 — Strikt noodzakelijke cookies</h3>
              <p className="text-xs text-green-700 m-0">Geen toestemming vereist &nbsp;|&nbsp; Altijd actief &nbsp;|&nbsp; Niet uitschakelbaar</p>
            </div>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm text-gray-600 border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-2 pr-3 text-left font-semibold text-navy">Naam</th>
                    <th className="py-2 pr-3 text-left font-semibold text-navy">Type</th>
                    <th className="py-2 pr-3 text-left font-semibold text-navy">Partij</th>
                    <th className="py-2 pr-3 text-left font-semibold text-navy">Looptijd</th>
                    <th className="py-2 text-left font-semibold text-navy">Doel</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-3 font-mono text-xs">daar_session</td>
                    <td className="py-2 pr-3">Sessie</td>
                    <td className="py-2 pr-3">First-party</td>
                    <td className="py-2 pr-3 whitespace-nowrap">Sessielooptijd</td>
                    <td className="py-2">Houdt de inlogsessie actief; vereist voor platformtoegang</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-3 font-mono text-xs">csrf_token</td>
                    <td className="py-2 pr-3">Beveiliging</td>
                    <td className="py-2 pr-3">First-party</td>
                    <td className="py-2 pr-3 whitespace-nowrap">Sessielooptijd</td>
                    <td className="py-2">Beschermt tegen Cross-Site Request Forgery (CSRF)-aanvallen</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-3 font-mono text-xs">daar_lang</td>
                    <td className="py-2 pr-3">Voorkeur</td>
                    <td className="py-2 pr-3">First-party</td>
                    <td className="py-2 pr-3 whitespace-nowrap">12 maanden</td>
                    <td className="py-2">Onthoudt de taalinstelling van de gebruiker</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-3 font-mono text-xs">daar_consent</td>
                    <td className="py-2 pr-3">Consent</td>
                    <td className="py-2 pr-3">First-party</td>
                    <td className="py-2 pr-3 whitespace-nowrap">12 maanden</td>
                    <td className="py-2">Slaat de cookievoorkeur van de gebruiker op</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-3 font-mono text-xs">cookieyes-consent</td>
                    <td className="py-2 pr-3">Consent</td>
                    <td className="py-2 pr-3">First-party</td>
                    <td className="py-2 pr-3 whitespace-nowrap">12 maanden</td>
                    <td className="py-2">Registreert de toestemmingsstatus conform de Tw</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Categorie 2 */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-3">
              <h3 className="text-base font-semibold text-blue-800 mb-1">Categorie 2 — Functionele cookies</h3>
              <p className="text-xs text-blue-700 m-0">Toestemming vereist &nbsp;|&nbsp; Verbetert gebruiksgemak maar niet strikt noodzakelijk</p>
            </div>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm text-gray-600 border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-2 pr-3 text-left font-semibold text-navy">Naam</th>
                    <th className="py-2 pr-3 text-left font-semibold text-navy">Type</th>
                    <th className="py-2 pr-3 text-left font-semibold text-navy">Partij</th>
                    <th className="py-2 pr-3 text-left font-semibold text-navy">Looptijd</th>
                    <th className="py-2 text-left font-semibold text-navy">Doel</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-3 font-mono text-xs">daar_view_mode</td>
                    <td className="py-2 pr-3">Voorkeur</td>
                    <td className="py-2 pr-3">First-party</td>
                    <td className="py-2 pr-3 whitespace-nowrap">6 maanden</td>
                    <td className="py-2">Onthoudt de weergavemodus (lijst/kalender) in het roosteroverzicht</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-3 font-mono text-xs">daar_dash_layout</td>
                    <td className="py-2 pr-3">Voorkeur</td>
                    <td className="py-2 pr-3">First-party</td>
                    <td className="py-2 pr-3 whitespace-nowrap">6 maanden</td>
                    <td className="py-2">Onthoudt de dashboard-indeling van de coördinator</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-3 font-mono text-xs">daar_notif_pref</td>
                    <td className="py-2 pr-3">Voorkeur</td>
                    <td className="py-2 pr-3">First-party</td>
                    <td className="py-2 pr-3 whitespace-nowrap">6 maanden</td>
                    <td className="py-2">Onthoudt de notificatievoorkeuren van de gebruiker</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-3 font-mono text-xs">intercom_id</td>
                    <td className="py-2 pr-3">Helpdesk</td>
                    <td className="py-2 pr-3">Third-party</td>
                    <td className="py-2 pr-3 whitespace-nowrap">9 maanden</td>
                    <td className="py-2">Identificeert de gebruiker voor de helpdeskchat (Intercom) — alleen actief indien helpdeskmodule is ingeschakeld</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Categorie 3 */}
            <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-3">
              <h3 className="text-base font-semibold text-amber-800 mb-1">Categorie 3 — Analytische cookies</h3>
              <p className="text-xs text-amber-700 m-0">Toestemming vereist &nbsp;|&nbsp; Geanonimiseerd &nbsp;|&nbsp; Nooit gedeeld met advertentienetwerken</p>
            </div>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm text-gray-600 border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-2 pr-3 text-left font-semibold text-navy">Naam</th>
                    <th className="py-2 pr-3 text-left font-semibold text-navy">Type</th>
                    <th className="py-2 pr-3 text-left font-semibold text-navy">Partij</th>
                    <th className="py-2 pr-3 text-left font-semibold text-navy">Looptijd</th>
                    <th className="py-2 text-left font-semibold text-navy">Doel</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-3 font-mono text-xs">_ga</td>
                    <td className="py-2 pr-3">Analytics</td>
                    <td className="py-2 pr-3">First-party</td>
                    <td className="py-2 pr-3 whitespace-nowrap">24 maanden</td>
                    <td className="py-2">Google Analytics 4 — unieke sessie-identificatie (IP geanonimiseerd, geen cross-site tracking)</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-3 font-mono text-xs">_ga_[ID]</td>
                    <td className="py-2 pr-3">Analytics</td>
                    <td className="py-2 pr-3">First-party</td>
                    <td className="py-2 pr-3 whitespace-nowrap">24 maanden</td>
                    <td className="py-2">Google Analytics 4 — sessiedata per eigendoms-ID</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-3 font-mono text-xs">ph_[ID]_posthog</td>
                    <td className="py-2 pr-3">Analytics</td>
                    <td className="py-2 pr-3">First-party</td>
                    <td className="py-2 pr-3 whitespace-nowrap">12 maanden</td>
                    <td className="py-2">PostHog product-analytics — geanonimiseerde gebruikspatronen (alternatief voor GA, self-hosted optie beschikbaar)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-3 font-mono text-xs">_hjSessionUser</td>
                    <td className="py-2 pr-3">Heatmap</td>
                    <td className="py-2 pr-3">Third-party</td>
                    <td className="py-2 pr-3 whitespace-nowrap">12 maanden</td>
                    <td className="py-2">Hotjar — geanonimiseerde sessie-opnames en heatmaps (optioneel, uitsluitend op de marketingwebsite)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Categorie 4 */}
            <div className="bg-red-50 border border-red-100 rounded-xl p-4 mb-3">
              <h3 className="text-base font-semibold text-red-800 mb-1">Categorie 4 — Marketingcookies</h3>
              <p className="text-xs text-red-700 m-0">Expliciete toestemming vereist &nbsp;|&nbsp; Uitsluitend op de marketingwebsite, nooit in het platform</p>
            </div>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm text-gray-600 border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-2 pr-3 text-left font-semibold text-navy">Naam</th>
                    <th className="py-2 pr-3 text-left font-semibold text-navy">Type</th>
                    <th className="py-2 pr-3 text-left font-semibold text-navy">Partij</th>
                    <th className="py-2 pr-3 text-left font-semibold text-navy">Looptijd</th>
                    <th className="py-2 text-left font-semibold text-navy">Doel</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-3 font-mono text-xs">_fbp</td>
                    <td className="py-2 pr-3">Social</td>
                    <td className="py-2 pr-3">Third-party</td>
                    <td className="py-2 pr-3 whitespace-nowrap">90 dagen</td>
                    <td className="py-2">Meta Pixel — meet conversies vanuit Facebook/Instagram-advertenties (uitsluitend met expliciete toestemming)</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-3 font-mono text-xs">_gcl_au</td>
                    <td className="py-2 pr-3">Ads</td>
                    <td className="py-2 pr-3">Third-party</td>
                    <td className="py-2 pr-3 whitespace-nowrap">90 dagen</td>
                    <td className="py-2">Google Ads Conversion — meet of een websitebezoek leidt tot een aanvraag (uitsluitend met expliciete toestemming)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-3 font-mono text-xs">li_fat_id</td>
                    <td className="py-2 pr-3">Social</td>
                    <td className="py-2 pr-3">Third-party</td>
                    <td className="py-2 pr-3 whitespace-nowrap">30 dagen</td>
                    <td className="py-2">LinkedIn Insight Tag — meet bereik van LinkedIn-campagnes (uitsluitend met expliciete toestemming)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Platform-notitie */}
            <div className="bg-navy/5 border border-navy/10 rounded-xl p-5 mb-8">
              <h3 className="text-base font-semibold text-navy mb-2">Cookies in het DAAR-platform</h3>
              <p className="text-sm text-gray-600 m-0">
                In het DAAR-platform (na inloggen) worden uitsluitend strikt noodzakelijke en functionele cookies gebruikt. Analytische cookies in het platform zijn self-hosted en verwerken geen persoonsgegevens buiten de EER. Marketingcookies worden nooit in het platform geplaatst.
              </p>
            </div>

            <h2 className="text-xl font-semibold text-navy mt-8 mb-4">4. Rechtsgrondslag voor cookieplacement</h2>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm text-gray-600 border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-2 pr-4 text-left font-semibold text-navy">Categorie</th>
                    <th className="py-2 pr-4 text-left font-semibold text-navy">Rechtsgrondslag</th>
                    <th className="py-2 text-left font-semibold text-navy">Toelichting</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 align-top">Categorie 1 (noodzakelijk)</td>
                    <td className="py-2 pr-4 align-top whitespace-nowrap">Art. 11.7a lid 3 Tw</td>
                    <td className="py-2">Vrijstelling voor technisch noodzakelijke cookies — geen toestemming vereist</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 align-top">Categorie 2 (functioneel)</td>
                    <td className="py-2 pr-4 align-top whitespace-nowrap">Art. 11.7a lid 1 Tw + AVG art. 6(1)(a)</td>
                    <td className="py-2">Toestemming via de cookiebanner</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 align-top">Categorie 3 (analytisch)</td>
                    <td className="py-2 pr-4 align-top whitespace-nowrap">Art. 11.7a lid 1 Tw + AVG art. 6(1)(a)</td>
                    <td className="py-2">Toestemming via de cookiebanner; geanonimiseerde analytics vallen onder de vrijstelling als IP volledig wordt geanonimiseerd</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 align-top">Categorie 4 (marketing)</td>
                    <td className="py-2 pr-4 align-top whitespace-nowrap">Art. 11.7a lid 1 Tw + AVG art. 6(1)(a)</td>
                    <td className="py-2">Expliciete toestemming vereist; apart aanvinken in de cookiebanner</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-600 m-0">
                <strong>Wettelijk kader:</strong> De Telecommunicatiewet (Tw) artikel 11.7a implementeert de Europese ePrivacy-richtlijn in Nederland. De AP en ACM zijn gezamenlijk toezichthouder. Toestemming voor niet-noodzakelijke cookies moet vrij, specifiek, geïnformeerd en ondubbelzinnig zijn — een vinkje vooraf (&apos;pre-ticked box&apos;) is niet toegestaan.
              </p>
            </div>

            <h2 className="text-xl font-semibold text-navy mt-8 mb-4">5. Cookiebanner en toestemmingsbeheer</h2>

            <h3 className="text-lg font-semibold text-navy mt-6 mb-3">5.1 Eerste bezoek</h3>
            <p className="text-gray-600 mb-2">Bij het eerste bezoek aan www.daar.nl verschijnt een cookiebanner. De banner voldoet aan de volgende vereisten:</p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
              <li>Toestemming per categorie (granulaire keuze) — geen &apos;alles accepteren&apos; als enige optie</li>
              <li>&apos;Weigeren&apos; of &apos;Alleen noodzakelijk&apos; is even prominent als &apos;Accepteren&apos;</li>
              <li>Geen pre-aangevinkte vakjes voor niet-noodzakelijke categorieën</li>
              <li>Duidelijke uitleg per categorie in begrijpelijke taal</li>
              <li>Koppeling naar dit cookiebeleid en de privacyverklaring</li>
              <li>Toestemming wordt geregistreerd met tijdstempel, versie en keuze (consent logging)</li>
            </ul>

            <h3 className="text-lg font-semibold text-navy mt-6 mb-3">5.2 Toestemming intrekken of aanpassen</h3>
            <p className="text-gray-600 mb-3">U kunt uw cookievoorkeuren op elk moment wijzigen via:</p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm text-gray-600 border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-2 pr-4 text-left font-semibold text-navy">Methode</th>
                    <th className="py-2 text-left font-semibold text-navy">Hoe</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 align-top">Cookiebanner opnieuw openen</td>
                    <td className="py-2">Via de knop &apos;Cookievoorkeuren&apos; in de footer van onze website</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 align-top">Direct e-mailverzoek</td>
                    <td className="py-2"><a href="mailto:hallo@daar.nl" className="text-brandGreen hover:underline">hallo@daar.nl</a> — wij verwerken uw verzoek binnen 5 werkdagen</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 align-top">Browserinstellingen</td>
                    <td className="py-2">Via de instellingen van uw browser (zie sectie 6)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 mb-4">
              Intrekking van toestemming heeft geen terugwerkende kracht maar treedt onmiddellijk in werking. Reeds verwerkte gegevens op basis van toestemming worden conform de bewaartermijnen in de Privacyverklaring verwijderd.
            </p>

            <h3 className="text-lg font-semibold text-navy mt-6 mb-3">5.3 Toestemming voor minderjarigen</h3>
            <p className="text-gray-600 mb-4">
              Het DAAR-platform en de website zijn niet gericht op personen jonger dan 16 jaar. Indien DAAR vaststelt dat cookies zijn geplaatst op basis van toestemming van een minderjarige, worden de betreffende cookies onmiddellijk verwijderd.
            </p>

            <h2 className="text-xl font-semibold text-navy mt-8 mb-4">6. Cookies beheren via uw browser</h2>
            <p className="text-gray-600 mb-3">
              Naast de cookiebanner kunt u cookies beheren via de instellingen van uw browser. Houd er rekening mee dat het verwijderen of blokkeren van strikt noodzakelijke cookies de werking van het platform verstoort.
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm text-gray-600 border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-2 pr-4 text-left font-semibold text-navy">Browser</th>
                    <th className="py-2 text-left font-semibold text-navy">Pad naar cookie-instellingen</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4">Google Chrome</td>
                    <td className="py-2">Instellingen → Privacy en beveiliging → Cookies en andere sitegegevens</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4">Mozilla Firefox</td>
                    <td className="py-2">Instellingen → Privacy &amp; Beveiliging → Cookies en sitegegevens</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4">Apple Safari</td>
                    <td className="py-2">Instellingen → Safari → Privacy → Cookies en websitedata beheren</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4">Microsoft Edge</td>
                    <td className="py-2">Instellingen → Cookies en sitemachtigingen → Cookies en sitegegevens</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4">iOS Safari</td>
                    <td className="py-2">Instellingen → Safari → Scrollen naar &apos;Privacy en beveiliging&apos;</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Android Chrome</td>
                    <td className="py-2">Chrome → Menu → Instellingen → Site-instellingen → Cookies</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 mb-4 text-sm">
              Voor opt-out van Google Analytics specifiek: tools.google.com/dlpage/gaoptout. Voor opt-out van LinkedIn Insight Tag: linkedin.com/psettings/guest-controls.
            </p>

            <h2 className="text-xl font-semibold text-navy mt-8 mb-4">7. Bewaartermijnen</h2>
            <p className="text-gray-600 mb-4">
              Cookies worden bewaard conform de looptijden in sectie 3. Persoonsgegevens verzameld via analytische cookies worden maximaal 26 maanden bewaard. Na het verstrijken van de looptijd worden cookies automatisch verwijderd door de browser. Toestemmingsregistraties (consent logs) worden 3 jaar bewaard als bewijs van rechtmatige verwerking.
            </p>
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-600 m-0">
                <strong>Bewaartermijn vs. cookielooptijd:</strong> De looptijd van een cookie (hoe lang het in de browser staat) verschilt van de bewaartermijn van de bijbehorende gegevens op onze servers. Gegevens uit analytische cookies worden na maximaal 26 maanden verwijderd, ook als de cookie zelf al eerder is verlopen of verwijderd.
              </p>
            </div>

            <h2 className="text-xl font-semibold text-navy mt-8 mb-4">8. Derden en sub-verwerkers</h2>
            <p className="text-gray-600 mb-3">
              De volgende derde partijen kunnen via het DAAR-platform of de website cookies plaatsen. Met alle verwerkers zijn verwerkersovereenkomsten gesloten:
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm text-gray-600 border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-2 pr-3 text-left font-semibold text-navy">Sub-verwerker</th>
                    <th className="py-2 pr-3 text-left font-semibold text-navy">Doel</th>
                    <th className="py-2 pr-3 text-left font-semibold text-navy">DPA</th>
                    <th className="py-2 text-left font-semibold text-navy">Doorgifte</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-3">Google LLC (GA4)</td>
                    <td className="py-2 pr-3">Analytics</td>
                    <td className="py-2 pr-3">Ja</td>
                    <td className="py-2">Privacy Shield / SCCs</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-3">Meta Platforms (Pixel)</td>
                    <td className="py-2 pr-3">Marketing</td>
                    <td className="py-2 pr-3">Ja*</td>
                    <td className="py-2">SCCs</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-3">LinkedIn (Insight Tag)</td>
                    <td className="py-2 pr-3">Marketing</td>
                    <td className="py-2 pr-3">Ja*</td>
                    <td className="py-2">SCCs</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-3">Hotjar Ltd.</td>
                    <td className="py-2 pr-3">Analytics</td>
                    <td className="py-2 pr-3">Ja*</td>
                    <td className="py-2">EER (Ierland)</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-3">Intercom Inc.</td>
                    <td className="py-2 pr-3">Helpdesk</td>
                    <td className="py-2 pr-3">Ja</td>
                    <td className="py-2">SCCs</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-3">PostHog Inc.</td>
                    <td className="py-2 pr-3">Analytics</td>
                    <td className="py-2 pr-3">Ja</td>
                    <td className="py-2">Self-hosted / EER</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-500 text-xs mb-4">* Uitsluitend actief na expliciete toestemming voor marketingcookies (categorie 4).</p>
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-600 m-0">
                <strong>Doorgifte buiten de EER:</strong> Google Analytics, Meta en LinkedIn verwerken data mogelijk buiten de EER. DAAR heeft Standard Contractual Clauses (SCCs) afgesloten met deze partijen en heeft een Transfer Impact Assessment (TIA) uitgevoerd. De volledige lijst van sub-verwerkers is beschikbaar via <a href="mailto:hallo@daar.nl" className="text-brandGreen hover:underline">hallo@daar.nl</a>.
              </p>
            </div>

            <h2 className="text-xl font-semibold text-navy mt-8 mb-4">9. Uw rechten</h2>
            <p className="text-gray-600 mb-3">
              Als betrokkene heeft u de volgende rechten met betrekking tot persoonsgegevens verwerkt via cookies:
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
                    <td className="py-2 pr-4 align-top">Inzage (art. 15 AVG)</td>
                    <td className="py-2">Opvragen welke persoonsgegevens via cookies over u zijn verzameld</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 align-top">Verwijdering (art. 17 AVG)</td>
                    <td className="py-2">Verzoeken uw gegevens te wissen — treedt in werking binnen 30 dagen</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 align-top">Bezwaar (art. 21 AVG)</td>
                    <td className="py-2">Bezwaar maken tegen verwerking op basis van gerechtvaardigd belang</td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-2 pr-4 align-top">Intrekking toestemming</td>
                    <td className="py-2">Via de cookiebanner, e-mail of browserinstellingen — onmiddellijk effect</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4 align-top">Klacht indienen</td>
                    <td className="py-2">
                      Autoriteit Persoonsgegevens:{' '}
                      <a href="https://www.autoriteitpersoonsgegevens.nl" className="text-brandGreen hover:underline" target="_blank" rel="noopener noreferrer">
                        autoriteitpersoonsgegevens.nl
                      </a>{' '}
                      | 088-1805250
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 mb-4">
              Verzoeken kunt u indienen via <a href="mailto:hallo@daar.nl" className="text-brandGreen hover:underline">hallo@daar.nl</a>. DAAR reageert binnen 30 dagen.
            </p>

            <h2 className="text-xl font-semibold text-navy mt-8 mb-4">10. Wijzigingen in dit cookiebeleid</h2>
            <p className="text-gray-600 mb-2">DAAR past dit cookiebeleid aan wanneer:</p>
            <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-1">
              <li>Nieuwe cookies of technieken worden ingezet</li>
              <li>Sub-verwerkers worden gewijzigd</li>
              <li>Wet- of regelgeving dit vereist (bijv. bij inwerkingtreding van de ePrivacy Verordening)</li>
              <li>De cookiebanner wordt bijgewerkt</li>
            </ul>
            <p className="text-gray-600 mb-4">
              Materiële wijzigingen worden minimaal 30 dagen voor ingang aangekondigd via een banner op onze website en per e-mail aan geregistreerde gebruikers. De versiehistorie van dit beleid is beschikbaar op verzoek. De actuele versie is altijd te vinden op www.daar.nl/cookies.
            </p>

            {/* Bijlage */}
            <h2 className="text-xl font-semibold text-navy mt-10 mb-4">Bijlage — Volledige Cookiematrix</h2>
            <p className="text-gray-600 mb-4">
              Onderstaande tabel geeft een volledig overzicht van alle cookies, inclusief juridische grondslag en toestemmingsvereiste. Dit overzicht wordt bij elke versie-update bijgewerkt.
            </p>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-xs text-gray-600 border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200 bg-gray-50">
                    <th className="py-2 pr-2 text-left font-semibold text-navy">Naam</th>
                    <th className="py-2 pr-2 text-left font-semibold text-navy">Type</th>
                    <th className="py-2 pr-2 text-left font-semibold text-navy">Partij</th>
                    <th className="py-2 pr-2 text-left font-semibold text-navy">Looptijd</th>
                    <th className="py-2 pr-2 text-left font-semibold text-navy">Categorie</th>
                    <th className="py-2 pr-2 text-left font-semibold text-navy">Grondslag</th>
                    <th className="py-2 text-left font-semibold text-navy">Toest.</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['daar_session', 'Sessie', 'First', 'Sessie', 'Noodzakelijk', 'Art. 11.7a lid 3 Tw', 'Nee'],
                    ['csrf_token', 'Beveiliging', 'First', 'Sessie', 'Noodzakelijk', 'Art. 11.7a lid 3 Tw', 'Nee'],
                    ['daar_lang', 'Voorkeur', 'First', '12 mnd', 'Noodzakelijk', 'Art. 11.7a lid 3 Tw', 'Nee'],
                    ['daar_consent', 'Consent', 'First', '12 mnd', 'Noodzakelijk', 'Art. 11.7a lid 3 Tw', 'Nee'],
                    ['cookieyes-consent', 'Consent', 'First', '12 mnd', 'Noodzakelijk', 'Art. 11.7a lid 3 Tw', 'Nee'],
                    ['daar_view_mode', 'Voorkeur', 'First', '6 mnd', 'Functioneel', 'Toestemming', 'Ja'],
                    ['daar_dash_layout', 'Voorkeur', 'First', '6 mnd', 'Functioneel', 'Toestemming', 'Ja'],
                    ['daar_notif_pref', 'Voorkeur', 'First', '6 mnd', 'Functioneel', 'Toestemming', 'Ja'],
                    ['intercom_id', 'Helpdesk', 'Third', '9 mnd', 'Functioneel', 'Toestemming', 'Ja'],
                    ['_ga', 'Analytics', 'First', '24 mnd', 'Analytisch', 'Toestemming', 'Ja'],
                    ['_ga_[ID]', 'Analytics', 'First', '24 mnd', 'Analytisch', 'Toestemming', 'Ja'],
                    ['ph_[ID]_posthog', 'Analytics', 'First', '12 mnd', 'Analytisch', 'Toestemming', 'Ja'],
                    ['_hjSessionUser', 'Heatmap', 'Third', '12 mnd', 'Analytisch', 'Toestemming', 'Ja'],
                    ['_fbp', 'Social', 'Third', '90 dagen', 'Marketing', 'Expliciete toest.', 'Ja'],
                    ['_gcl_au', 'Ads', 'Third', '90 dagen', 'Marketing', 'Expliciete toest.', 'Ja'],
                    ['li_fat_id', 'Social', 'Third', '30 dagen', 'Marketing', 'Expliciete toest.', 'Ja'],
                  ].map(([naam, type, partij, looptijd, categorie, grondslag, toest], i) => (
                    <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-1.5 pr-2 font-mono">{naam}</td>
                      <td className="py-1.5 pr-2">{type}</td>
                      <td className="py-1.5 pr-2">{partij}</td>
                      <td className="py-1.5 pr-2 whitespace-nowrap">{looptijd}</td>
                      <td className="py-1.5 pr-2">{categorie}</td>
                      <td className="py-1.5 pr-2 whitespace-nowrap">{grondslag}</td>
                      <td className="py-1.5">
                        <span className={toest === 'Nee' ? 'text-green-600 font-medium' : 'text-amber-600 font-medium'}>
                          {toest}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

          <div className="mt-12 pt-6 border-t border-gray-100 text-sm text-gray-400 text-center">
            DAAR B.V. &nbsp;|&nbsp; Cookiebeleid v1.1 &nbsp;|&nbsp; 1 maart 2026 &nbsp;|&nbsp;{' '}
            <a href="mailto:hallo@daar.nl" className="text-brandGreen hover:underline">hallo@daar.nl</a>
          </div>
        </div>
      </div>
    </div>
  )
}
