import { Metadata } from 'next'
import Link from 'next/link'
import {
  Heart,
  Lightbulb,
  Shield,
  Eye,
  Sparkles,
  Target,
  BarChart3,
  Calendar,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Quote,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Over DAAR | Vrijwilligerswerk Slimmer, Leuker en Duurzamer',
  description: 'DAAR maakt vrijwilligerswerk slimmer, leuker en duurzamer. Ontmoet het team achter de Geluksmomenten Formule en ontdek onze missie.',
  openGraph: {
    title: 'Over DAAR | Het Team Achter de Geluksmomenten',
    description: 'Wij geloven dat vrijwilligerswerk de motor is van een sterke samenleving. Ontmoet Vincent, Saviem en Thijs.',
    type: 'website',
  },
}

const founders = [
  {
    name: 'Vincent van Munster',
    role: 'Het Sociale Hart & AI Welzijn Expert',
    description: 'Ziet de mens achter elke vrijwilliger én ontwikkelt AI-oplossingen die welzijn meetbaar maken. Combineert sociale sector ervaring met AI-expertise.',
    quote: 'Elke vrijwilliger verdient het om gezien te worden.',
    color: 'bg-brandGreen',
    initial: 'V',
  },
  {
    name: 'Saviem Jansen',
    role: 'De Tech Architect',
    description: 'Bouwt de technologie die vrijwilligerswerk makkelijker maakt. Slimme software die coördinatoren tijd teruggeeft voor wat echt telt.',
    quote: 'Technologie moet menselijk contact versterken, niet vervangen.',
    color: 'bg-navy',
    initial: 'S',
  },
  {
    name: 'Thijs Lenting',
    role: 'Het Zakelijk Geweten',
    description: 'Zorgt dat DAAR duurzaam groeit en impact meetbaar maakt. Vertaalt sociale waarde naar cijfers die overtuigen.',
    quote: 'Impact die je niet kunt meten, kun je niet verbeteren.',
    color: 'bg-purple-600',
    initial: 'T',
  },
]

const values = [
  {
    name: 'Integriteit',
    description: 'Wij doen wat we zeggen en zeggen wat we doen. Eerlijkheid is de basis van alles.',
    icon: Shield,
  },
  {
    name: 'Innovatie',
    description: 'Wij zoeken continu naar betere manieren om vrijwilligerswerk te ondersteunen.',
    icon: Lightbulb,
  },
  {
    name: 'Verantwoordelijkheid',
    description: 'Wij nemen eigenaarschap voor onze impact op vrijwilligers en organisaties.',
    icon: Target,
  },
  {
    name: 'Transparantie',
    description: 'Wij delen kennis, inzichten en methoden open met de sector.',
    icon: Eye,
  },
  {
    name: 'Positiviteit',
    description: 'Wij geloven in de kracht van waardering, erkenning en geluksmomenten.',
    icon: Heart,
  },
]

const features = [
  {
    title: 'Geluksmomenten Formule',
    description: 'Wij meten niet alleen uren, maar de echte impact die vrijwilligers creëren.',
    icon: Sparkles,
  },
  {
    title: 'VrijwilligersCheck',
    description: 'Maandelijkse monitoring van welzijn, waardering en energie.',
    icon: BarChart3,
  },
  {
    title: 'Modulair Platform',
    description: 'Van administratie tot impactmeting - bouw wat jouw organisatie nodig heeft.',
    icon: Calendar,
  },
  {
    title: 'Ingebouwde AI',
    description: 'Slimme ondersteuning die coördinatoren tijd teruggeeft.',
    icon: MessageCircle,
  },
]

export default function OverOnsPage() {
  return (
    <div className="bg-offWhite">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-navy via-navy to-brandGreen overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-brandGreen rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="max-w-3xl">
            <p className="text-brandGreen font-medium mb-4">Over DAAR</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Vrijwilligerswerk
              <span className="block text-brandGreen">slimmer, leuker en duurzamer</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed mb-8">
              Wij geloven dat vrijwilligerswerk de motor is van een sterke samenleving — en dat elke vrijwilliger gezien en gewaardeerd verdient te worden.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center px-6 py-3 bg-brandGreen text-white rounded-lg font-medium hover:bg-brandGreenHover transition-colors"
              >
                Start de VrijwilligersCheck
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-colors"
              >
                Neem contact op
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Missie */}
            <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm border border-gray-100">
              <div className="w-14 h-14 bg-brandGreen/10 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-brandGreen" />
              </div>
              <h2 className="text-2xl font-bold text-navy mb-4">Onze Missie</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                DAAR maakt vrijwilligerswerk slimmer, leuker en duurzamer. Wij geloven dat vrijwilligerswerk de motor is van een sterke samenleving, met een positieve impact op het welzijn van de mens.
              </p>
              <p className="text-gray-600 leading-relaxed">
                DAAR creëert en meet <strong className="text-navy">Geluksmomenten</strong>, brengt vrijwilligers en organisaties bij elkaar en monitort het welzijn van vrijwilligers.
              </p>
            </div>

            {/* Visie */}
            <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm border border-gray-100">
              <div className="w-14 h-14 bg-navy/10 rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-navy" />
              </div>
              <h2 className="text-2xl font-bold text-navy mb-4">Onze Visie</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Iedereen kan meedoen op basis van eigen behoefte, kunnen en invulling — zonder uit het oog te verliezen dat we het samen moeten doen.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Iedereen wordt op zijn manier gezien en gehoord. <strong className="text-navy">Iedereen heeft regelmatig zijn geluksmomenten.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes DAAR Unique */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Wat maakt DAAR uniek?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Wij meten Geluksmomenten — de positieve impact die vrijwilligers creëren voor zichzelf én voor anderen.
            </p>
          </div>

          {/* Geluksmomenten Highlight */}
          <div className="bg-gradient-to-br from-lightGreen to-white rounded-3xl p-8 lg:p-12 mb-12 border border-brandGreen/20">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-brandGreen/10 rounded-full mb-6">
                  <Sparkles className="w-4 h-4 text-brandGreen" />
                  <span className="text-sm font-medium text-brandGreen">Ons unieke concept</span>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-navy mb-4">
                  De Geluksmomenten Formule
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Niet alleen hoeveel uren vrijwilligers draaien, maar welke positieve impact zij creëren — voor zichzelf én voor de mensen die zij helpen. Zo maken we de echte waarde van vrijwilligerswerk zichtbaar.
                </p>
                <div className="bg-navy text-white p-4 rounded-xl text-center">
                  <p className="text-sm text-white/70 mb-1">De formule</p>
                  <p className="font-mono">Impact = Werk × Doelgroep × Intensiteit × Bereik × Kwaliteit</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature) => (
                  <div key={feature.title} className="bg-white rounded-xl p-5 shadow-sm">
                    <feature.icon className="w-8 h-8 text-brandGreen mb-3" />
                    <h4 className="font-semibold text-navy mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* VrijwilligersCheck */}
          <div className="bg-navy rounded-3xl p-8 lg:p-12 text-white">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl lg:text-3xl font-bold mb-4">
                  De VrijwilligersCheck
                </h3>
                <p className="text-white/80 leading-relaxed mb-6">
                  Met de VrijwilligersCheck monitoren we maandelijks hoe het écht gaat met vrijwilligers. Voelen ze zich gewaardeerd? Hebben ze genoeg energie? Zo kunnen organisaties vroegtijdig signalen oppikken en uitval voorkomen.
                </p>
                <ul className="space-y-3 mb-8">
                  {['Welzijnsmonitoring', 'Vroege signalering', 'Concrete aanbevelingen', 'Benchmark vergelijking'].map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brandGreen flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/quiz"
                  className="inline-flex items-center px-6 py-3 bg-brandGreen text-white rounded-lg font-medium hover:bg-brandGreenHover transition-colors"
                >
                  Probeer de VrijwilligersCheck
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
              <div className="relative">
                <div className="bg-white/10 rounded-2xl p-6 backdrop-blur">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-brandGreen rounded-full flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold">Jouw organisatie scoort</p>
                      <p className="text-sm text-white/70">Bovengemiddeld in waardering</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: 'Waardering', score: 85 },
                      { label: 'Communicatie', score: 72 },
                      { label: 'Werkdruk', score: 68 },
                      { label: 'Ontwikkeling', score: 78 },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{item.label}</span>
                          <span>{item.score}%</span>
                        </div>
                        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-brandGreen rounded-full"
                            style={{ width: `${item.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-brandGreen font-medium mb-2">Het team</p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Drie ondernemers, één missie
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              DAAR is opgericht vanuit de overtuiging dat iedereen op zijn eigen manier kan bijdragen aan de samenleving.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {founders.map((founder) => (
              <div key={founder.name} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow">
                <div className={`w-20 h-20 ${founder.color} rounded-2xl flex items-center justify-center text-white text-3xl font-bold mb-6`}>
                  {founder.initial}
                </div>
                <h3 className="text-xl font-bold text-navy mb-1">{founder.name}</h3>
                <p className="text-brandGreen font-medium mb-4">{founder.role}</p>
                <p className="text-gray-600 mb-6 leading-relaxed">{founder.description}</p>
                <div className="flex items-start gap-3 pt-6 border-t border-gray-100">
                  <Quote className="w-5 h-5 text-brandGreen flex-shrink-0 mt-1" />
                  <p className="text-gray-600 italic">&ldquo;{founder.quote}&rdquo;</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-4">
              Onze kernwaarden
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Deze waarden vormen het fundament van alles wat we doen.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6">
            {values.map((value) => (
              <div key={value.name} className="text-center p-6 rounded-2xl bg-offWhite hover:bg-lightGreen transition-colors group">
                <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:shadow-md transition-shadow">
                  <value.icon className="w-7 h-7 text-brandGreen" />
                </div>
                <h3 className="font-semibold text-navy mb-2">{value.name}</h3>
                <p className="text-sm text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Promise */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-brandGreen to-brandGreenHover rounded-3xl p-8 lg:p-16 text-center text-white">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <Heart className="w-8 h-8" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Onze kernbelofte
            </h2>
            <p className="text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Wij helpen organisaties hun vrijwilligers te <strong>vinden</strong>, <strong>waarderen</strong>, <strong>behouden</strong> en <strong>verbinden</strong>. Met meer impact en geluk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-brandGreen rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Plan een kennismaking
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/kennisbank"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                Lees onze kennisbank
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '500+', label: 'Organisaties geholpen' },
              { value: '50.000+', label: 'Vrijwilligers bereikt' },
              { value: '1M+', label: 'Geluksmomenten gemeten' },
              { value: '98%', label: 'Klanttevredenheid' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-4xl md:text-5xl font-bold text-navy mb-2">{stat.value}</p>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy rounded-3xl p-8 lg:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Klaar om te ontdekken wat DAAR voor jou kan betekenen?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Start met de gratis VrijwilligersCheck of plan direct een gesprek met ons team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/quiz"
                className="inline-flex items-center justify-center px-8 py-4 bg-brandGreen text-white rounded-lg font-semibold hover:bg-brandGreenHover transition-colors"
              >
                Start de VrijwilligersCheck
              </Link>
              <Link
                href="/afspraak"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-navy rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Plan een gesprek
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
