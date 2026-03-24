import Link from 'next/link'
import {
  Check,
  ArrowRight,
  Sparkles,
  Heart,
  BarChart3,
  MessageSquare,
  FolderOpen,
  Zap,
  Calendar,
} from 'lucide-react'

export const metadata = {
  title: 'Abonnementen | DAAR',
  description: 'Overzicht van DAAR abonnementen. Transparante prijzen vanaf €1.080/maand bij 1.000 vrijwilligers.',
}

const BASE_VOLUNTEERS = 1000

const plans = [
  {
    name: 'Basis',
    tagline: 'Voor organisaties die willen starten',
    pricePerVolunteer: 1.08,
    color: 'daar-helder',
    bgColor: 'bg-white',
    borderColor: 'border-gray-200',
    featured: false,
    modules: [
      { icon: Heart, label: 'Geluksmonitor & Matching' },
    ],
    included: [
      'Vrijwilligersprofiel & dashboard',
      'Smart Matching op basis van Geluksformule',
      'Welzijnsmonitoring (5 dimensies)',
      'Automatische impact-rapporten',
      'Email support',
      'Gratis onboarding',
    ],
    cta: 'Start gratis demo',
    href: '/afspraak',
  },
  {
    name: 'Standaard',
    tagline: 'De meest gekozen optie voor groeiende organisaties',
    pricePerVolunteer: 1.49,
    color: 'brandGreen',
    bgColor: 'bg-daar-blue',
    borderColor: 'border-brandGreen',
    featured: true,
    modules: [
      { icon: Heart, label: 'Geluksmonitor & Matching' },
      { icon: FolderOpen, label: 'Centraal Dossier' },
      { icon: MessageSquare, label: 'Communicatie & Engagement' },
    ],
    included: [
      'Alles uit Basis',
      'AVG-proof documentbeheer (VOG, contracten)',
      'Chat & nieuws delen',
      'Automatische bedankjes',
      'Vrijwilligersportal met eigen branding',
      'Prioritaire email support',
    ],
    cta: 'Start gratis demo',
    href: '/afspraak',
  },
  {
    name: 'Pro',
    tagline: 'Voor organisaties die maximale impact willen meten',
    pricePerVolunteer: 1.77,
    color: 'daar-koraal',
    bgColor: 'bg-white',
    borderColor: 'border-gray-200',
    featured: false,
    modules: [
      { icon: Heart, label: 'Geluksmonitor & Matching' },
      { icon: FolderOpen, label: 'Centraal Dossier' },
      { icon: MessageSquare, label: 'Communicatie & Engagement' },
      { icon: BarChart3, label: 'Impact Dashboard' },
      { icon: Zap, label: 'Premium Support' },
    ],
    included: [
      'Alles uit Standaard',
      'Real-time impact dashboard met SDG-koppeling',
      'Subsidie-rapportages (automatisch)',
      'Benchmark vergelijking',
      'Dedicated support manager',
      'Prioritaire feature requests',
    ],
    cta: 'Neem contact op',
    href: '/contact',
  },
]

const allFeatures = [
  { label: 'Vrijwilligersprofiel & dashboard', basis: true, standaard: true, pro: true },
  { label: 'Smart Matching (Geluksformule)', basis: true, standaard: true, pro: true },
  { label: 'Welzijnsmonitoring', basis: true, standaard: true, pro: true },
  { label: 'Automatische impact-rapporten', basis: true, standaard: true, pro: true },
  { label: 'AVG-proof documentbeheer', basis: false, standaard: true, pro: true },
  { label: 'Chat & communicatie', basis: false, standaard: true, pro: true },
  { label: 'Automatische bedankjes', basis: false, standaard: true, pro: true },
  { label: 'Impact dashboard met SDG', basis: false, standaard: false, pro: true },
  { label: 'Subsidie-rapportages', basis: false, standaard: false, pro: true },
  { label: 'Dedicated support manager', basis: false, standaard: false, pro: true },
  { label: 'Gratis onboarding', basis: true, standaard: true, pro: true },
  { label: 'Geen setup kosten', basis: true, standaard: true, pro: true },
  { label: 'Maandelijks opzegbaar', basis: true, standaard: true, pro: true },
]

export default function AbonnementPage() {
  return (
    <div className="bg-offWhite">

      {/* Hero */}
      <section className="relative pt-10 pb-16 lg:pt-16 lg:pb-20 overflow-hidden bg-gradient-to-br from-offWhite via-white to-lightGreen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-brandGreen/10 border border-brandGreen/30 text-brandGreen text-sm font-semibold mb-8">
            <Sparkles className="w-4 h-4 mr-2" />
            Transparante prijzen
          </div>
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-daar-blue leading-tight mb-6"
            style={{ fontFamily: 'Nunito, sans-serif' }}
          >
            Kies het abonnement
            <span className="block text-brandGreen">dat bij je past</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Transparante prijzen op basis van je aantal vrijwilligers.
            Onderstaande prijzen zijn gebaseerd op <strong className="text-daar-blue">1.000 vrijwilligers</strong> — maandelijks opzegbaar.
          </p>
        </div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-brandGreen/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-daar-helder/10 rounded-full blur-3xl" />
      </section>

      {/* Pricing Cards */}
      <section className="py-20 -mt-8 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-3xl border-2 ${plan.borderColor} ${plan.bgColor} overflow-hidden shadow-lg ${
                  plan.featured ? 'ring-2 ring-brandGreen ring-offset-4 scale-[1.02]' : ''
                }`}
              >
                {plan.featured && (
                  <div className="bg-brandGreen text-white text-center text-sm font-bold py-2 px-4">
                    Meest gekozen
                  </div>
                )}

                <div className={`p-8 ${plan.featured ? 'text-white' : ''}`}>
                  {/* Plan name */}
                  <h2
                    className={`text-2xl font-extrabold mb-1 ${plan.featured ? 'text-white' : 'text-daar-blue'}`}
                    style={{ fontFamily: 'Nunito, sans-serif' }}
                  >
                    {plan.name}
                  </h2>
                  <p className={`text-sm mb-6 ${plan.featured ? 'text-white/70' : 'text-gray-500'}`}>
                    {plan.tagline}
                  </p>

                  {/* Price */}
                  <div className="mb-8">
                    <span className={`text-xs font-semibold uppercase tracking-wide ${plan.featured ? 'text-white/60' : 'text-gray-400'}`}>
                      Vanaf 1.000 vrijwilligers
                    </span>
                    <div className="flex items-end gap-1 mt-1">
                      <span className={`text-5xl font-extrabold ${plan.featured ? 'text-daar-geel' : 'text-daar-blue'}`}>
                        €{(plan.pricePerVolunteer * BASE_VOLUNTEERS).toLocaleString('nl-NL', { maximumFractionDigits: 0 })}
                      </span>
                      <span className={`text-sm mb-2 ${plan.featured ? 'text-white/70' : 'text-gray-500'}`}>
                        / mnd
                      </span>
                    </div>
                    <p className={`text-xs mt-1 ${plan.featured ? 'text-white/50' : 'text-gray-400'}`}>
                      €{plan.pricePerVolunteer.toFixed(2).replace('.', ',')} p/vrijw. · excl. BTW · maandelijks opzegbaar
                    </p>
                  </div>

                  {/* Modules */}
                  <div className="mb-6">
                    <p className={`text-xs font-semibold uppercase tracking-wide mb-3 ${plan.featured ? 'text-white/60' : 'text-gray-400'}`}>
                      Modules inbegrepen
                    </p>
                    <div className="space-y-2">
                      {plan.modules.map(({ icon: Icon, label }) => (
                        <div key={label} className="flex items-center gap-2">
                          <div className={`w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 ${
                            plan.featured ? 'bg-white/20' : 'bg-brandGreen/10'
                          }`}>
                            <Icon className={`w-3.5 h-3.5 ${plan.featured ? 'text-white' : 'text-brandGreen'}`} />
                          </div>
                          <span className={`text-sm ${plan.featured ? 'text-white/80' : 'text-gray-700'}`}>
                            {label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Included */}
                  <ul className="space-y-2 mb-8">
                    {plan.included.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${plan.featured ? 'text-brandGreen' : 'text-brandGreen'}`} />
                        <span className={`text-sm ${plan.featured ? 'text-white/80' : 'text-gray-600'}`}>
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link
                    href={plan.href}
                    className={`flex items-center justify-center gap-2 w-full font-bold px-6 py-3.5 rounded-xl transition-all group ${
                      plan.featured
                        ? 'bg-brandGreen text-white hover:bg-brandGreenHover shadow-lg'
                        : 'bg-daar-blue text-white hover:bg-daar-blue/90'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Calculator link */}
          <div className="mt-10 text-center">
            <p className="text-gray-500 text-sm">
              Wil je de prijs berekenen voor jouw aantal vrijwilligers?{' '}
              <Link href="/prijzen" className="text-brandGreen font-semibold hover:underline inline-flex items-center gap-1">
                Gebruik de prijscalculator
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Feature comparison table */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2
              className="text-3xl font-extrabold text-daar-blue mb-4"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              Wat zit er in elk abonnement?
            </h2>
            <p className="text-gray-600">Volledig overzicht van alle functies per plan.</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left py-4 px-6 font-semibold text-gray-500 w-1/2">Functie</th>
                  <th className="text-center py-4 px-4 font-bold text-daar-blue">Basis</th>
                  <th className="text-center py-4 px-4 font-bold text-brandGreen">Standaard</th>
                  <th className="text-center py-4 px-4 font-bold text-daar-koraal">Pro</th>
                </tr>
              </thead>
              <tbody>
                {allFeatures.map((feature, i) => (
                  <tr key={feature.label} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                    <td className="py-3 px-6 text-gray-700">{feature.label}</td>
                    <td className="py-3 px-4 text-center">
                      {feature.basis
                        ? <Check className="w-4 h-4 text-brandGreen mx-auto" />
                        : <span className="text-gray-200">—</span>}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {feature.standaard
                        ? <Check className="w-4 h-4 text-brandGreen mx-auto" />
                        : <span className="text-gray-200">—</span>}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {feature.pro
                        ? <Check className="w-4 h-4 text-brandGreen mx-auto" />
                        : <span className="text-gray-200">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ strip */}
      <section className="py-16 bg-offWhite">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-2xl font-extrabold text-daar-blue mb-8 text-center"
            style={{ fontFamily: 'Nunito, sans-serif' }}
          >
            Veelgestelde vragen over prijzen
          </h2>
          <div className="space-y-4">
            {[
              {
                q: 'Is er een minimumcontract?',
                a: 'Nee. Alle abonnementen zijn maandelijks opzegbaar, zonder minimale looptijd of setup kosten.',
              },
              {
                q: 'Hoe worden vrijwilligers geteld?',
                a: 'Je betaalt op basis van het aantal actieve vrijwilligers in je account op de eerste dag van de maand.',
              },
              {
                q: 'Kan ik van abonnement wisselen?',
                a: 'Ja, je kunt op elk moment upgraden of downgraden. Wijzigingen gaan in per de volgende maand.',
              },
              {
                q: 'Is er een gratis proefperiode?',
                a: 'We bieden een gratis demo aan. Neem contact op om een vrijblijvende kennismaking in te plannen.',
              },
            ].map((faq) => (
              <div key={faq.q} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-daar-blue mb-2">{faq.q}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-daar-blue">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2
            className="text-3xl md:text-4xl font-extrabold text-white mb-4"
            style={{ fontFamily: 'Nunito, sans-serif' }}
          >
            Niet zeker welk abonnement past?
          </h2>
          <p className="text-gray-300 mb-10 text-lg">
            Plan een gratis gesprek — we helpen je het juiste plan te kiezen.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/afspraak"
              className="bg-brandGreen text-white font-bold px-8 py-4 rounded-full hover:bg-brandGreenHover transition-all shadow-lg flex items-center justify-center gap-2 group"
            >
              Plan een gesprek
              <Calendar className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-white/30 text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-colors text-center"
            >
              Stuur een bericht
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
