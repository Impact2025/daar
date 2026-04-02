import { Metadata } from 'next'
import Link from 'next/link'
import { FileText, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Algemene Voorwaarden | DAAR',
  description: 'Lees de algemene voorwaarden van DAAR B.V. — vrijwilligersmanagement-platform voor organisaties die geluksmomenten willen vergroten.',
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
              <p className="text-gray-500">Versie 1.3 &nbsp;|&nbsp; Ingangsdatum: 1 maart 2026</p>
              <p className="text-gray-400 text-sm">Gedeponeerd bij de KvK te Amsterdam onder nummer 99576759</p>
            </div>
          </div>

          <div className="prose prose-gray max-w-none text-gray-600">

            {/* Toelichting */}
            <p className="mb-6">
              Deze algemene voorwaarden zijn van toepassing op alle overeenkomsten tussen DAAR B.V. en haar klanten.
              Ze zijn opgesteld conform Nederlands recht en sluiten aan op de AVG-verwerkersovereenkomst die als
              afzonderlijk document wordt overeengekomen. Begrippen met een hoofdletter zijn gedefinieerd in Artikel 1.
              Deze voorwaarden zijn beschikbaar in het Nederlands en (op verzoek) in het Engels; bij strijdigheid
              prevaleert de Nederlandse tekst.
            </p>

            {/* Artikel 1 */}
            <h2 className="text-xl font-semibold text-navy mt-10 mb-4">Artikel 1 — Definities</h2>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-left font-semibold text-navy px-4 py-2 border border-gray-200 w-1/4">Begrip</th>
                    <th className="text-left font-semibold text-navy px-4 py-2 border border-gray-200">Definitie</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['DAAR', 'DAAR B.V., een besloten vennootschap met beperkte aansprakelijkheid, gevestigd te Warnsveld, ingeschreven bij de KvK onder nummer 99576759, aanbieder van het Platform.'],
                    ['Klant', 'De rechtspersoon of de (eenmanszaak van de) natuurlijk persoon die een Overeenkomst aangaat met DAAR voor het gebruik van het Platform.'],
                    ['Gebruiker', 'Elke natuurlijke persoon die namens de Klant gebruik maakt van het Platform, waaronder coördinatoren, beheerders en vrijwilligers (Geluksmakers).'],
                    ['Geluksmaker', 'Een vrijwilliger die via het Platform wordt beheerd door de Klant. Een vrijwilliger is een geluksmaker en vice versa.'],
                    ['Platform', 'De modulaire SaaS-omgeving van DAAR voor vrijwilligersmanagement, inclusief alle modules, updates, API\'s, documentatie en aanverwante diensten.'],
                    ['Module', 'Een afzonderlijk functioneel onderdeel van het Platform (Dossier, Rooster, Urenregistratie, VrijwilligersCheck, Geluksformule, Communicatie, Declareren).'],
                    ['Overeenkomst', 'De schriftelijke of elektronisch gesloten abonnementsovereenkomst tussen DAAR en de Klant, inclusief eventuele Orderformulieren en Bijlagen.'],
                    ['Orderformulier', 'Het document of de elektronische registratie waarin de gekozen Modules, looptijd en vergoeding zijn vastgelegd.'],
                    ['Diensten', 'Alle door DAAR geleverde producten en diensten, inclusief het Platform, ondersteuning, onboarding en implementatiediensten.'],
                    ['Abonnement', 'Het recht van de Klant om het Platform te gebruiken conform het gekozen pakket gedurende de Looptijd.'],
                    ['Intellectueel Eigendom', 'Alle rechten van intellectuele eigendom, waaronder auteursrechten, databankrechten, merkrechten, octrooirechten, knowhow en de Geluksformule-methodologie.'],
                    ['Geluksformule', 'De door DAAR ontwikkelde en geregistreerde methodologie voor het berekenen van maatschappelijke impactscores op basis van werktype, doelgroep, contactintensiteit, bereik en vrijwilligerstevredenheid.'],
                    ['Vertrouwelijke Informatie', 'Alle informatie die een partij aanduidt als vertrouwelijk of die redelijkerwijs als vertrouwelijk moet worden beschouwd, waaronder bedrijfsstrategieën, klantgegevens, technische specificaties en prijsafspraken.'],
                    ['Schriftelijk', 'Communicatie per ondertekend document, e-mail of via een erkend elektronisch communicatieplatform, waarbij de identiteit van de afzender aantoonbaar is.'],
                    ['Werkdag', 'Een dag anders dan zaterdag, zondag of een officiële Nederlandse feestdag.'],
                    ['SLA', 'Service Level Agreement — de garanties voor beschikbaarheid, reactietijden en ondersteuning zoals opgenomen in Bijlage 1.'],
                  ].map(([term, def]) => (
                    <tr key={term} className="border-b border-gray-100">
                      <td className="px-4 py-2 border border-gray-200 font-medium text-navy align-top">{term}</td>
                      <td className="px-4 py-2 border border-gray-200 align-top">{def}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Artikel 2 */}
            <h2 className="text-xl font-semibold text-navy mt-10 mb-4">Artikel 2 — Toepasselijkheid</h2>
            <ol className="list-decimal pl-6 space-y-2 mb-6">
              <li>Deze algemene voorwaarden zijn van toepassing op alle aanbiedingen, offertes, Overeenkomsten en dienstverlening van DAAR, tenzij schriftelijk uitdrukkelijk anders is overeengekomen.</li>
              <li>De toepasselijkheid van inkoop- of andere algemene voorwaarden van de Klant wordt uitdrukkelijk van de hand gewezen, tenzij DAAR deze Schriftelijk en uitdrukkelijk heeft aanvaard.</li>
              <li>Afwijkingen van deze voorwaarden zijn uitsluitend geldig indien Schriftelijk bevestigd door een daartoe bevoegde vertegenwoordiger van DAAR.</li>
              <li>Bij tegenstrijdigheid tussen bepalingen geldt de volgende voorrangsvolgorde: (a) het Orderformulier, (b) de Overeenkomst, (c) de Verwerkersovereenkomst (AVG), (d) deze Algemene Voorwaarden, (e) de SLA.</li>
              <li>DAAR behoudt het recht deze voorwaarden te wijzigen conform Artikel 22.</li>
            </ol>

            {/* Artikel 3 */}
            <h2 className="text-xl font-semibold text-navy mt-10 mb-4">Artikel 3 — Totstandkoming van de Overeenkomst</h2>
            <ol className="list-decimal pl-6 space-y-2 mb-6">
              <li>Een Overeenkomst komt tot stand door: (a) ondertekening van een Orderformulier door beide partijen, of (b) schriftelijke aanvaarding door de Klant van een offerte van DAAR, of (c) elektronische acceptatie door de Klant via het online registratieproces op de website van DAAR.</li>
              <li>Offertes van DAAR zijn vrijblijvend en geldig gedurende 30 dagen, tenzij anders aangegeven.</li>
              <li>DAAR behoudt het recht een opdracht te weigeren zonder opgave van redenen, mits dit binnen 5 Werkdagen na aanvaarding door de Klant wordt gecommuniceerd.</li>
              <li>Voor zover de Klant namens een rechtspersoon handelt, garandeert de Klant bevoegd te zijn de Overeenkomst aan te gaan. De Klant is persoonlijk aansprakelijk indien hij zonder bevoegdheid handelt.</li>
            </ol>

            {/* Artikel 4 */}
            <h2 className="text-xl font-semibold text-navy mt-10 mb-4">Artikel 4 — Licentie en toegang tot het Platform</h2>
            <ol className="list-decimal pl-6 space-y-2 mb-6">
              <li>DAAR verleent de Klant gedurende de Looptijd een niet-exclusief, niet-overdraagbaar, niet-sublicentieerbaar gebruiksrecht op het Platform, uitsluitend ten behoeve van de interne bedrijfsvoering van de Klant.</li>
              <li>Het gebruiksrecht is beperkt tot de Modules die zijn opgenomen in het Orderformulier.</li>
              <li>De Klant mag het Platform niet: (a) doorverhuren, in sublicentie geven of anderszins aan derden beschikbaar stellen, (b) reverse engineeren, decompileren of disassembleren, (c) gebruiken voor het ontwikkelen van concurrerende producten of diensten, (d) misbruiken op een wijze die de werking voor andere klanten beïnvloedt.</li>
              <li>DAAR mag technische beperkingen opleggen ter bescherming van de integriteit en beschikbaarheid van het Platform.</li>
              <li>DAAR mag het Platform en de Diensten ook leveren aan andere klanten, inclusief organisaties in dezelfde sector als de Klant.</li>
            </ol>

            {/* Artikel 5 */}
            <h2 className="text-xl font-semibold text-navy mt-10 mb-4">Artikel 5 — Gebruikersaccounts en toegang</h2>
            <ol className="list-decimal pl-6 space-y-2 mb-6">
              <li>De Klant is verantwoordelijk voor het aanmaken, beheren en intrekken van Gebruikersaccounts. Het aantal accounts kan gebonden zijn aan de limieten van het gekozen Abonnement.</li>
              <li>Inloggegevens zijn persoonlijk en mogen niet worden gedeeld. De Klant is aansprakelijk voor alle handelingen die worden verricht via zijn accounts, ook bij ongeautoriseerd gebruik, tenzij de Klant DAAR onmiddellijk na ontdekking hiervan op de hoogte stelt.</li>
              <li>De Klant verplicht zich redelijkerwijs sterke wachtwoorden te hanteren en multi-factor authenticatie in te schakelen waar het Platform dit ondersteunt.</li>
              <li>DAAR mag accounts tijdelijk blokkeren bij: (a) gegrond vermoeden van ongeautoriseerd gebruik, (b) niet-betaling conform Artikel 10, (c) overtreding van Artikel 4 lid 3.</li>
              <li>DAAR stelt de Klant zo snel mogelijk op de hoogte van een blokkade conform lid 4 en heft de blokkade op zodra de oorzaak is opgelost.</li>
            </ol>

            {/* Artikel 6 */}
            <h2 className="text-xl font-semibold text-navy mt-10 mb-4">Artikel 6 — Verplichtingen van de Klant</h2>
            <ol className="list-decimal pl-6 space-y-2 mb-6">
              <li>De Klant zorgt voor een adequate technische omgeving (waaronder een actuele browser en betrouwbare internetverbinding) voor het gebruik van het Platform.</li>
              <li>De Klant is verantwoordelijk voor de juistheid, volledigheid en rechtmatigheid van alle data die hij in het Platform invoert, waaronder persoonsgegevens van Geluksmakers.</li>
              <li>De Klant verwerkt persoonsgegevens via het Platform als verwerkingsverantwoordelijke (controller) conform de AVG. De Klant garandeert dat hij beschikt over een rechtsgeldige grondslag voor alle verwerkingen, waaronder — waar vereist — expliciete toestemming van betrokkenen.</li>
              <li>De Klant stelt Geluksmakers adequaat in kennis van de verwerking van hun persoonsgegevens, conform zijn eigen privacyverklaring en de AVG.</li>
              <li>De Klant vrijwaart DAAR tegen aanspraken van derden (waaronder Geluksmakers, toezichthouders en andere klanten) die voortvloeien uit: (a) onrechtmatig gebruik van het Platform door de Klant of zijn Gebruikers, (b) onjuiste of onrechtmatige data die de Klant in het Platform invoert, (c) schending van AVG-verplichtingen door de Klant.</li>
              <li>De Klant informeert DAAR onverwijld over omstandigheden die de dienstverlening kunnen beïnvloeden, waaronder beveiligingsincidenten, organisatiewijzigingen en wettelijke verplichtingen die nadere maatregelen vereisen.</li>
            </ol>

            {/* Artikel 7 */}
            <h2 className="text-xl font-semibold text-navy mt-10 mb-4">Artikel 7 — Abonnement, modules en pakketten</h2>
            <ol className="list-decimal pl-6 space-y-2 mb-6">
              <li>De Klant kiest bij het sluiten van de Overeenkomst één van de beschikbare (abonnements)pakketten. De kenmerken, limieten en prijs van elk pakket zijn vastgelegd in het Orderformulier en de op dat moment geldende prijslijst van DAAR. Dan wel zijn de prijzen, limieten en kenmerken conform de met de klant gemaakte individuele afspraken (offertes).</li>
              <li>De Klant kan tijdens de Looptijd aanvullende Modules activeren. Uitbreiding gaat in op de eerste dag van de volgende factureringsperiode, tenzij partijen anders overeenkomen.</li>
              <li>Downgraden naar een lager pakket is mogelijk per het einde van de lopende Looptijd, mits tijdig gemeld conform de opzegtermijnen in Artikel 12.</li>
              <li>DAAR mag de samenstelling van pakketten en Modules aanpassen. Aanpassingen die het gecontracteerde functionaliteitsniveau verminderen worden conform Artikel 22 lid 3 aangekondigd.</li>
            </ol>

            {/* Artikel 8 */}
            <h2 className="text-xl font-semibold text-navy mt-10 mb-4">Artikel 8 — Implementatie en onboarding</h2>
            <ol className="list-decimal pl-6 space-y-2 mb-6">
              <li>DAAR biedt standaard onboarding aan.</li>
              <li>De Klant wijst een intern projectcontact aan dat gedurende de implementatie aanspreekpunt is voor DAAR.</li>
              <li>De Klant levert tijdig de benodigde informatie en medewerking. Vertraging die het gevolg is van onvoldoende medewerking van de Klant ontslaat DAAR van haar verantwoordelijkheid voor overschrijding van eventueel afgesproken livegang-data.</li>
              <li>DAAR levert implementatiediensten naar beste inzicht en vermogen (&lsquo;inspanningsverplichting&rsquo;), niet als resultaatsverplichting, tenzij uitdrukkelijk Schriftelijk anders overeengekomen.</li>
            </ol>

            {/* Artikel 9 */}
            <h2 className="text-xl font-semibold text-navy mt-10 mb-4">Artikel 9 — Beschikbaarheid, onderhoud en SLA</h2>
            <ol className="list-decimal pl-6 space-y-2 mb-6">
              <li>DAAR streeft naar een maandelijkse beschikbaarheid van het Platform van minimaal 99,5% (gemeten exclusief gepland onderhoud), conform de SLA in Bijlage 1.</li>
              <li>Gepland onderhoud wordt minimaal 48 uur van tevoren aangekondigd via e-mail en/of het statusdashboard van DAAR, en vindt bij voorkeur buiten kantooruren (maandag t/m vrijdag, 08:00–18:00 uur) plaats.</li>
              <li>Bij niet-gepland onderhoud of storingen communiceert DAAR zo spoedig mogelijk over de oorzaak, verwachte duur en herstelstatus via het statusdashboard.</li>
              <li>DAAR is gerechtigd de Diensten tijdelijk buiten gebruik te stellen voor dringende beveiligingsupdates, ook zonder aankondigingstermijn, mits de Klant onverwijld wordt geïnformeerd.</li>
              <li>DAAR biedt ondersteuning via e-mail en het helpdeskportaal conform de responsetijden in de SLA. Ondersteuning via telefoon is beschikbaar in hogere abonnementspakketten.</li>
              <li>SLA-credits bij overschrijding van de beschikbaarheidsgarantie worden conform Bijlage 1 verrekend. SLA-credits zijn het exclusieve rechtsmiddel voor beschikbaarheidsgebreken.</li>
            </ol>

            {/* Artikel 10 */}
            <h2 className="text-xl font-semibold text-navy mt-10 mb-4">Artikel 10 — Vergoedingen en betaling</h2>
            <ol className="list-decimal pl-6 space-y-2 mb-6">
              <li>De Klant betaalt de vergoeding zoals vastgelegd in het Orderformulier. Alle bedragen zijn in euro&rsquo;s en exclusief BTW, tenzij uitdrukkelijk anders vermeld.</li>
              <li>Facturering vindt maandelijks, per kwartaal of jaarlijks vooraf plaats, afhankelijk van de keuze in het Orderformulier. Jaarlijkse facturen worden bij aanvang van het abonnementsjaar verstuurd.</li>
              <li>Betalingstermijn is 14 dagen na factuurdatum. Bij niet-tijdige betaling is de Klant van rechtswege in verzuim zonder dat een nadere ingebrekestelling nodig is.</li>
              <li>Vanaf de vervaldatum is de Klant de wettelijke handelsrente verschuldigd (artikel 6:119a BW) over het openstaande bedrag, vermeerderd met de buitengerechtelijke incassokosten conform het Besluit vergoeding voor buitengerechtelijke incassokosten.</li>
              <li>DAAR mag bij betalingsverzuim van meer dan 30 dagen de toegang tot het platform opschorten na schriftelijke waarschuwing met een hersteltermijn van 7 Werkdagen.</li>
              <li>DAAR mag de tarieven jaarlijks aanpassen conform de CBS-consumentenprijsindex (CPI). Aanpassingen worden minimaal 30 dagen van tevoren aangekondigd. Andere tariefwijzigingen worden conform Artikel 22 doorgevoerd.</li>
              <li>Eenmaal betaalde bedragen worden niet gerestitueerd, behoudens het bepaalde in Artikel 12 lid 5 en gevallen van aantoonbare wanprestatie door DAAR.</li>
            </ol>

            {/* Artikel 11 */}
            <h2 className="text-xl font-semibold text-navy mt-10 mb-4">Artikel 11 — Looptijd</h2>
            <ol className="list-decimal pl-6 space-y-2 mb-6">
              <li>De Overeenkomst gaat in op de datum van ondertekening of elektronische acceptatie en heeft de looptijd zoals vermeld in het Orderformulier.</li>
              <li>Maandabonnementen worden bij gebreke van tijdige opzegging automatisch verlengd met één maand.</li>
              <li>Jaarabonnementen worden bij gebreke van tijdige opzegging automatisch verlengd met één jaar.</li>
              <li>Bij automatische verlenging zijn de dan geldende tarieven van toepassing, tenzij partijen voorafgaand aan de verlenging anderszins zijn overeengekomen.</li>
            </ol>

            {/* Artikel 12 */}
            <h2 className="text-xl font-semibold text-navy mt-10 mb-4">Artikel 12 — Opzegging en beëindiging</h2>
            <ol className="list-decimal pl-6 space-y-2 mb-6">
              <li>Maandabonnementen kunnen worden opgezegd met inachtneming van een opzegtermijn van één kalendermaand, ingaande op de eerste dag van de volgende maand na ontvangst van de opzegging.</li>
              <li>Jaarabonnementen kunnen worden opgezegd met inachtneming van een opzegtermijn van twee kalendermaanden voor het einde van de lopende Looptijd.</li>
              <li>Opzegging dient Schriftelijk te geschieden via <a href="mailto:info@daar.nl" className="text-brandGreen hover:underline">info@daar.nl</a>. DAAR bevestigt ontvangst binnen 5 Werkdagen.</li>
              <li>DAAR mag de Overeenkomst met onmiddellijke ingang ontbinden, zonder schadevergoedingsplicht, indien: (a) de Klant in staat van faillissement wordt verklaard of surseance van betaling aanvraagt, (b) de Klant na herhaalde waarschuwingen in ernstige en aanhoudende schending van Artikel 4 lid 3, Artikel 6 of Artikel 17 verkeert, (c) de Klant zijn betalingsverplichtingen gedurende meer dan 60 dagen niet nakomt ondanks aanmaning.</li>
              <li>Bij ontbinding door DAAR op grond van lid 4 onder (b) of (c) heeft de Klant geen recht op restitutie van reeds betaalde vergoedingen. Bij ontbinding op grond van aantoonbare wanprestatie door DAAR is DAAR de reeds betaalde vergoeding voor de niet-gebruikte periode verschuldigd.</li>
              <li>Na beëindiging van de Overeenkomst heeft de Klant 60 dagen de tijd om zijn data te exporteren in een gangbaar formaat (CSV, JSON of XLS). Na deze periode verwijdert DAAR alle data van de Klant conform de Verwerkersovereenkomst.</li>
            </ol>

            {/* Artikel 13 */}
            <h2 className="text-xl font-semibold text-navy mt-10 mb-4">Artikel 13 — Intellectueel eigendom</h2>
            <ol className="list-decimal pl-6 space-y-2 mb-6">
              <li>Alle Intellectuele Eigendomsrechten op het Platform, de Geluksformule-methodologie, de software, databases, ontwerpen, documentatie en aanverwante materialen berusten uitsluitend bij DAAR of haar licentiegevers.</li>
              <li>De Klant verkrijgt uitsluitend het gebruiksrecht als omschreven in Artikel 4. Geen enkele bepaling in deze voorwaarden impliceert een overdracht of ruimere licentie van Intellectuele Eigendomsrechten.</li>
              <li>Data die de Klant in het Platform invoert (&lsquo;Klantdata&rsquo;) blijft te allen tijde eigendom van de Klant. DAAR verkrijgt uitsluitend het recht om Klantdata te verwerken ten behoeve van de uitvoering van de Overeenkomst en conform de Verwerkersovereenkomst.</li>
              <li>DAAR mag geanonimiseerde, geaggregeerde en niet-herleidbare inzichten uit het gebruik van het Platform aanwenden voor productontwikkeling, sectoranalyse en benchmarking, mits dit op geen enkele wijze de Klant of individuele Geluksmakers identificeert.</li>
              <li>Feedback, suggesties en verbeterverzoeken die de Klant aan DAAR verstrekt, mogen door DAAR worden gebruikt voor productontwikkeling zonder enige vergoedingsplicht.</li>
              <li>De Klant vrijwaart DAAR tegen aanspraken van derden wegens inbreuk op Intellectuele Eigendomsrechten van derden door Klantdata die de Klant in het Platform invoert.</li>
            </ol>

            {/* Artikel 14 */}
            <h2 className="text-xl font-semibold text-navy mt-10 mb-4">Artikel 14 — Vertrouwelijkheid</h2>
            <ol className="list-decimal pl-6 space-y-2 mb-6">
              <li>Beide partijen behandelen Vertrouwelijke Informatie van de andere partij strikt vertrouwelijk en verstrekken deze niet aan derden zonder Schriftelijke toestemming, tenzij wettelijk verplicht.</li>
              <li>Partijen beperken de toegang tot Vertrouwelijke Informatie tot medewerkers, adviseurs en sub-verwerkers die een &lsquo;need-to-know&rsquo; hebben en die zijn gebonden aan gelijkwaardige geheimhoudingsverplichtingen.</li>
              <li>Vertrouwelijkheidsverplichting geldt gedurende de Looptijd en 5 jaar na beëindiging van de Overeenkomst.</li>
              <li>De vertrouwelijkheidsverplichting geldt niet voor informatie die: (a) algemeen bekend is geworden zonder schending van deze verplichting, (b) aantoonbaar reeds in het bezit was van de ontvangende partij, (c) rechtmatig door een derde aan de ontvangende partij is verstrekt, (d) onafhankelijk door de ontvangende partij is ontwikkeld.</li>
              <li>Indien een partij op grond van wetgeving of rechterlijk bevel verplicht is Vertrouwelijke Informatie openbaar te maken, stelt zij de andere partij hiervan zo spoedig mogelijk op de hoogte (voor zover wettelijk toegestaan) en werkt zij mee aan pogingen de openbaarmaking te beperken.</li>
            </ol>

            {/* Artikel 15 */}
            <h2 className="text-xl font-semibold text-navy mt-10 mb-4">Artikel 15 — Persoonsgegevens en AVG</h2>
            <ol className="list-decimal pl-6 space-y-2 mb-6">
              <li>De Klant treedt op als verwerkingsverantwoordelijke (controller) voor de persoonsgegevens van Geluksmakers die via het Platform worden verwerkt. DAAR treedt op als verwerker (processor).</li>
              <li>De rechten en verplichtingen van partijen ten aanzien van de verwerking van persoonsgegevens zijn uitsluitend geregeld in de Verwerkersovereenkomst, die onlosmakelijk deel uitmaakt van de Overeenkomst en als Bijlage 2 is bijgevoegd.</li>
              <li>De Klant garandeert dat hij beschikt over een rechtsgeldige grondslag voor alle verwerkingen die hij via het Platform uitvoert, en vrijwaart DAAR voor aanspraken van toezichthouders of betrokkenen bij schending van deze garantie.</li>
            </ol>

            {/* Artikel 16 */}
            <h2 className="text-xl font-semibold text-navy mt-10 mb-4">Artikel 16 — Aansprakelijkheid</h2>
            <h3 className="text-base font-semibold text-navy mt-6 mb-3">16.1 Aansprakelijkheid van DAAR</h3>
            <ol className="list-decimal pl-6 space-y-2 mb-4">
              <li>DAAR is uitsluitend aansprakelijk voor directe schade die het rechtstreekse gevolg is van een toerekenbare tekortkoming in de nakoming van de Overeenkomst of onrechtmatige daad.</li>
              <li>De totale aansprakelijkheid van DAAR is beperkt tot het bedrag dat de Klant in de 12 maanden voorafgaand aan de schadeveroorzakende gebeurtenis aan DAAR heeft betaald op grond van de Overeenkomst, met een absoluut maximum van &euro; 50.000,&mdash; per gebeurtenis.</li>
              <li>DAAR is niet aansprakelijk voor: (a) indirecte schade, gevolgschade, gederfde winst, gemiste besparingen, verlies van data of reputatieschade, (b) schade veroorzaakt door onjuist of onrechtmatig gebruik van het Platform door de Klant of zijn Gebruikers, (c) schade veroorzaakt door instructies van de Klant, (d) schade die het gevolg is van overmacht als bedoeld in Artikel 18.</li>
              <li>De beperkingen in lid 2 en lid 3 gelden niet voor schade veroorzaakt door opzet of bewuste roekeloosheid van DAAR of haar leidinggevenden.</li>
            </ol>
            <h3 className="text-base font-semibold text-navy mt-6 mb-3">16.2 Meldplicht</h3>
            <ol className="list-decimal pl-6 space-y-2 mb-4" start={5}>
              <li>De Klant meldt schade die mogelijk voor vergoeding in aanmerking komt zo spoedig mogelijk, doch uiterlijk binnen 30 dagen na ontdekking, Schriftelijk aan DAAR. Bij niet-tijdige melding vervalt het recht op schadevergoeding.</li>
            </ol>
            <h3 className="text-base font-semibold text-navy mt-6 mb-3">16.3 Productaansprakelijkheid</h3>
            <ol className="list-decimal pl-6 space-y-2 mb-6" start={6}>
              <li>Niets in deze voorwaarden beperkt of sluit de wettelijke aansprakelijkheid van DAAR uit die niet contractueel mag worden beperkt, waaronder aansprakelijkheid voor dood of persoonlijk letsel veroorzaakt door nalatigheid.</li>
            </ol>

            {/* Artikel 17 */}
            <h2 className="text-xl font-semibold text-navy mt-10 mb-4">Artikel 17 — Acceptable use — verboden gebruik</h2>
            <ol className="list-decimal pl-6 space-y-2 mb-6">
              <li>
                Het is de Klant en zijn Gebruikers verboden het Platform te gebruiken voor:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Het opslaan, versturen of verwerken van illegale, misleidende of discriminerende content</li>
                  <li>Het uitvoeren van aanvallen op de infrastructuur van DAAR of van derden (DDoS, penetratieaanvallen)</li>
                  <li>Het omzeilen van authenticatie- of autorisatiemechanismen</li>
                  <li>Het scrapen, kopiëren of exporteren van gegevens buiten de hiertoe door DAAR geboden functionaliteiten</li>
                  <li>Het gebruik van het Platform voor het beheer van vrijwilligers van een andere organisatie dan de Klant, tenzij uitdrukkelijk Schriftelijk overeengekomen</li>
                  <li>Het gebruik in strijd met toepasselijke wet- en regelgeving, waaronder de AVG, de Wet computercriminaliteit en de Wet bescherming bedrijfsgeheimen</li>
                </ul>
              </li>
              <li>DAAR mag bij overtreding van lid 1 de toegang tot het Platform onmiddellijk opschorten en de Overeenkomst ontbinden conform Artikel 12 lid 4.</li>
            </ol>

            {/* Artikel 18 */}
            <h2 className="text-xl font-semibold text-navy mt-10 mb-4">Artikel 18 — Overmacht</h2>
            <ol className="list-decimal pl-6 space-y-2 mb-6">
              <li>Geen van de partijen is aansprakelijk voor een tekortkoming die het gevolg is van omstandigheden buiten haar redelijke invloedsfeer (&lsquo;overmacht&rsquo;). Overmacht omvat in ieder geval: (a) uitval van elektriciteits- of internetinfrastructuur buiten de invloedssfeer van de partij, (b) overheidsmaatregelen, embargo&rsquo;s of sancties, (c) oorlog, terrorisme, pandemie of nationale noodtoestand, (d) DDoS-aanvallen of cyberaanvallen ondanks passende beveiligingsmaatregelen.</li>
              <li>De partij die zich op overmacht beroept, informeert de andere partij zo spoedig mogelijk, doch uiterlijk binnen 5 Werkdagen na optreden van de overmacht, Schriftelijk.</li>
              <li>Duurt de overmacht langer dan 60 aaneengesloten dagen, dan heeft elke partij het recht de Overeenkomst Schriftelijk te ontbinden zonder schadevergoedingsplicht. Reeds betaalde vergoedingen worden naar rato gerestitueerd voor de niet-gebruikte periode.</li>
            </ol>

            {/* Artikel 19 */}
            <h2 className="text-xl font-semibold text-navy mt-10 mb-4">Artikel 19 — Referentie en publiciteit</h2>
            <ol className="list-decimal pl-6 space-y-2 mb-6">
              <li>DAAR mag de Klant vermelden als referentieklant in haar commerciële communicatie (website, pitch-materiaal, persberichten), tenzij de Klant hier Schriftelijk bezwaar tegen maakt binnen 30 dagen na het aangaan van de Overeenkomst.</li>
              <li>DAAR mag het logo van de Klant gebruiken in bovengenoemde communicatie, tenzij de Klant dit Schriftelijk weigert.</li>
              <li>Elke verdergaande publiciteit (case studies, testimonials, interviews) vereist voorafgaande Schriftelijke toestemming van de Klant.</li>
            </ol>

            {/* Artikel 20 */}
            <h2 className="text-xl font-semibold text-navy mt-10 mb-4">Artikel 20 — Cessie en overdracht</h2>
            <ol className="list-decimal pl-6 space-y-2 mb-6">
              <li>De Klant mag zijn rechten en verplichtingen uit de Overeenkomst niet zonder voorafgaande Schriftelijke toestemming van DAAR overdragen aan een derde, waaronder bij fusie, overname of splitsing.</li>
              <li>DAAR mag haar rechten en verplichtingen overdragen in het kader van een herstructurering, fusie of overname van (een deel van) haar onderneming, mits: (a) de Klant hier minimaal 30 dagen vooraf Schriftelijk over wordt geïnformeerd, en (b) de overnemende partij schriftelijk dezelfde verplichtingen aanvaardt als die van DAAR.</li>
              <li>Bij overdracht conform lid 2 heeft de Klant het recht de Overeenkomst op te zeggen per de overdrachtsdatum, zonder opzeggingsvergoeding.</li>
            </ol>

            {/* Artikel 21 */}
            <h2 className="text-xl font-semibold text-navy mt-10 mb-4">Artikel 21 — Audit en compliance</h2>
            <ol className="list-decimal pl-6 space-y-2 mb-6">
              <li>DAAR stelt de Klant op verzoek relevante beveiligingscertificeringen, auditrapportages of samenvattingen van penetratietestresultaten beschikbaar, voor zover deze de Klant betreffen.</li>
              <li>De Klant heeft het recht DAAR eenmaal per jaar te auditeren op de naleving van deze voorwaarden en de Verwerkersovereenkomst, met een aankondigingstermijn van minimaal 20 Werkdagen. De kosten van de audit zijn voor rekening van de Klant, tenzij de audit een materiële overtreding door DAAR aan het licht brengt.</li>
              <li>Partijen verlenen elkaar de redelijke medewerking die noodzakelijk is voor de naleving van toepasselijke wet- en regelgeving.</li>
            </ol>

            {/* Artikel 22 */}
            <h2 className="text-xl font-semibold text-navy mt-10 mb-4">Artikel 22 — Wijziging van de voorwaarden</h2>
            <ol className="list-decimal pl-6 space-y-2 mb-6">
              <li>DAAR behoudt het recht deze algemene voorwaarden te wijzigen.</li>
              <li>Wijzigingen die de rechten van de Klant niet of positief beïnvloeden worden direct van kracht en gecommuniceerd via e-mail en het Platform.</li>
              <li>Wijzigingen die de rechten van de Klant negatief beïnvloeden worden minimaal 30 dagen voor ingang van de wijziging aangekondigd via e-mail aan de contactpersoon van de Klant. De Klant heeft het recht de Overeenkomst op te zeggen per de ingangsdatum van de wijziging, zonder opzeggingsvergoeding, door dit Schriftelijk aan DAAR mee te delen vóór de ingangsdatum. Voortgezet gebruik na de ingangsdatum geldt als aanvaarding van de gewijzigde voorwaarden.</li>
              <li>De actuele versie van deze voorwaarden is steeds beschikbaar via <span className="text-brandGreen">www.daarvrijwilligers.nl/voorwaarden</span> en wordt op verzoek per e-mail toegestuurd.</li>
            </ol>

            {/* Artikel 23 */}
            <h2 className="text-xl font-semibold text-navy mt-10 mb-4">Artikel 23 — Toepasselijk recht en geschillen</h2>
            <ol className="list-decimal pl-6 space-y-2 mb-6">
              <li>Op alle Overeenkomsten en rechtsverhoudingen tussen DAAR en de Klant is uitsluitend Nederlands recht van toepassing. De toepasselijkheid van het Weens Koopverdrag (CISG) is uitdrukkelijk uitgesloten.</li>
              <li>Partijen streven ernaar geschillen in de eerste plaats op te lossen door middel van overleg. Hiertoe stelt de meest gerede partij de andere partij Schriftelijk in kennis van het geschil, waarna partijen zich binnen 15 Werkdagen inspannen om in goed overleg tot een oplossing te komen.</li>
              <li>Indien het overleg niet leidt tot een oplossing, hebben partijen de mogelijkheid het geschil voor te leggen aan mediation via het Nederlands Mediation Instituut (NMI), alvorens een rechterlijke procedure te starten.</li>
              <li>Indien mediation niet slaagt of door één van de partijen wordt afgewezen, wordt het geschil bij uitsluiting voorgelegd aan de bevoegde rechter in het arrondissement Amsterdam.</li>
              <li>DAAR behoudt het recht om in spoedeisende gevallen (waaronder niet-betaling en inbreuk op Intellectueel Eigendom) zonder voorafgaand overleg of mediation een voorlopige voorziening te vragen bij de bevoegde rechter.</li>
            </ol>

            {/* Artikel 24 */}
            <h2 className="text-xl font-semibold text-navy mt-10 mb-4">Artikel 24 — Overige bepalingen</h2>
            <ol className="list-decimal pl-6 space-y-2 mb-6">
              <li>Indien een bepaling van deze voorwaarden nietig, vernietigbaar of anderszins niet-afdwingbaar blijkt, laat dit de geldigheid van de overige bepalingen onverlet. Partijen vervangen de ongeldige bepaling door een geldige bepaling die de bedoeling van de oorspronkelijke bepaling zo nauw mogelijk benadert.</li>
              <li>Het niet of vertraagd uitoefenen van een recht door een partij geldt niet als afstand van dat recht.</li>
              <li>Deze voorwaarden, de Overeenkomst, de Verwerkersovereenkomst en de SLA vormen de volledige overeenkomst tussen partijen en vervangen alle eerdere afspraken, correspondentie en overeenkomsten met betrekking tot het onderwerp.</li>
              <li>Mededelingen en kennisgevingen dienen Schriftelijk te geschieden. E-mailberichten naar de in de Overeenkomst opgegeven adressen voldoen aan het Schriftelijkheidsvereiste.</li>
            </ol>

            {/* Bijlage 1 — SLA */}
            <div className="border-t border-gray-200 mt-12 pt-10">
              <h2 className="text-xl font-semibold text-navy mb-6">Bijlage 1 — Service Level Agreement (SLA)</h2>

              <div className="overflow-x-auto mb-8">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left font-semibold text-navy px-4 py-2 border border-gray-200 w-1/3">SLA-parameter</th>
                      <th className="text-left font-semibold text-navy px-4 py-2 border border-gray-200">Specificatie</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Beschikbaarheidsgarantie', '99,5% per kalendermaand (exclusief gepland onderhoud)'],
                      ['Meting', 'Aaneengesloten minuten dat het Platform niet beschikbaar is, gedeeld door totale minuten in de maand'],
                      ['Gepland onderhoud', 'Maximaal 8 uur per maand, minimaal 48 uur van tevoren aangekondigd, bij voorkeur buiten kantooruren'],
                      ['Incidentrespons P1 (kritisch)', 'Eerste reactie binnen 2 uur; herstelstatus elke 2 uur; streven naar oplossing binnen 8 uur'],
                      ['Incidentrespons P2 (hoog)', 'Eerste reactie binnen 4 uur; streven naar oplossing binnen 24 uur'],
                      ['Incidentrespons P3 (normaal)', 'Eerste reactie binnen 1 Werkdag; streven naar oplossing binnen 5 Werkdagen'],
                      ['Helpdesk beschikbaarheid', 'Maandag t/m vrijdag 09:00–17:00 uur (NL tijd), exclusief officiële feestdagen'],
                      ['Statusdashboard', 'Beschikbaar via status.daarvrijwilligers.nl met realtime status en incidenthistorie'],
                    ].map(([param, spec]) => (
                      <tr key={param} className="border-b border-gray-100">
                        <td className="px-4 py-2 border border-gray-200 font-medium text-navy align-top">{param}</td>
                        <td className="px-4 py-2 border border-gray-200 align-top">{spec}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="text-base font-semibold text-navy mb-4">SLA-credits bij overschrijding beschikbaarheidsgarantie</h3>
              <div className="overflow-x-auto mb-6">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="text-left font-semibold text-navy px-4 py-2 border border-gray-200">Beschikbaarheid</th>
                      <th className="text-left font-semibold text-navy px-4 py-2 border border-gray-200">SLA-credit</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-2 border border-gray-200">99,0% – 99,5%</td>
                      <td className="px-4 py-2 border border-gray-200">1% korting op de maandvergoeding</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="px-4 py-2 border border-gray-200">98,0% – 99,0%</td>
                      <td className="px-4 py-2 border border-gray-200">5% korting op de maandvergoeding</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border border-gray-200">&lt; 98,0%</td>
                      <td className="px-4 py-2 border border-gray-200">10% korting op de maandvergoeding</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-sm text-gray-500">
                SLA-credits worden verrekend op de eerstvolgende factuur. Credits zijn niet cumulatief en vervallen bij niet-tijdige claim (binnen 30 dagen na de rapportageperiode). Credits zijn het exclusieve rechtsmiddel van de Klant voor beschikbaarheidsgebreken.
              </p>
            </div>

            {/* Footer */}
            <div className="border-t border-gray-200 mt-10 pt-6 text-sm text-gray-400">
              <p>
                DAAR B.V. &nbsp;|&nbsp; Algemene Voorwaarden v1.3 &nbsp;|&nbsp; 1 maart 2026 &nbsp;|&nbsp;{' '}
                <a href="mailto:info@daar.nl" className="text-brandGreen hover:underline">info@daar.nl</a>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
