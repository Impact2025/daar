import { Metadata } from 'next'
import Link from 'next/link'
import {
  Heart,
  Eye,
  Sparkles,
  Target,
  BarChart3,
  Users,
  ArrowRight,
  CheckCircle2,
  Quote,
  TrendingUp,
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
    role: 'Het Sociale Hart',
    subtitle: 'AI & Welzijn Expert',
    description: 'Ziet de mens achter elke vrijwilliger én ontwikkelt AI-oplossingen die welzijn meetbaar maken.',
    quote: 'Elke vrijwilliger verdient het om gezien te worden.',
    bgColor: 'bg-brandGreen',
    initial: 'VM',
  },
  {
    name: 'Saviem Jansen',
    role: 'De Tech Architect',
    subtitle: 'Platform & Development',
    description: 'Bouwt de technologie die vrijwilligerswerk makkelijker maakt. Software die tijd teruggeeft.',
    quote: 'Technologie moet menselijk contact versterken, niet vervangen.',
    bgColor: 'bg-daar-blue',
    initial: 'SJ',
  },
  {
    name: 'Thijs Lenting',
    role: 'Het Zakelijk Geweten',
    subtitle: 'Strategie & Impact',
    description: 'Zorgt dat DAAR duurzaam groeit en impact meetbaar maakt. Vertaalt sociale waarde naar cijfers.',
    quote: 'Impact die je niet kunt meten, kun je niet verbeteren.',
    bgColor: 'bg-daar-mint',
    initial: 'TL',
  },
]

const values = [
  {
    name: 'Integriteit',
    description: 'Wij doen wat we zeggen en zeggen wat we doen.',
    accentColor: 'bg-daar-blue',
  },
  {
    name: 'Innovatie',
    description: 'Continu zoeken naar betere manieren.',
    accentColor: 'bg-daar-geel',
  },
  {
    name: 'Verantwoordelijkheid',
    description: 'Eigenaarschap voor onze impact.',
    accentColor: 'bg-daar-koraal',
  },
  {
    name: 'Transparantie',
    description: 'Open delen van kennis en inzichten.',
    accentColor: 'bg-daar-helder',
  },
  {
    name: 'Positiviteit',
    description: 'De kracht van waardering en geluk.',
    accentColor: 'bg-brandGreen',
  },
]

const stats = [
  { value: '156', suffix: 'u', label: 'Tijdsbesparing per jaar', color: 'text-daar-geel' },
  { value: '90', suffix: '%', label: 'Tevredenheid vrijwilligers', color: 'text-brandGreen' },
  { value: '17', suffix: '%', prefix: '+', label: 'Betere retentie', color: 'text-daar-helder' },
  { value: '3', suffix: 'x', label: 'Meer impact inzicht', color: 'text-daar-mint' },
]

export default function OverOnsPage() {
  return (
    <div className="bg-offWhite">
      {/* Hero Section - Clean & Modern */}
      <section className="relative bg-lightGreen pt-20 pb-16 lg:pt-24 lg:pb-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-daar-geel/20 border border-daar-geel/30 text-daar-blue text-sm font-semibold mb-8">
                <Sparkles size={16} className="mr-2 text-brandGreen" />
                Over DAAR
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-daar-blue leading-[1.1] mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Vrijwilligerswerk
                <span className="block text-brandGreen">slimmer & menselijker.</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-lg">
                Wij geloven dat elke vrijwilliger gezien en gewaardeerd verdient te worden.
                Daarom bouwen we technologie die de mens centraal zet.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/afspraak"
                  className="bg-brandGreen text-white font-bold px-8 py-4 rounded-full hover:bg-brandGreenHover transition-all shadow-lg shadow-green-200/50 flex items-center justify-center group"
                >
                  Plan een kennismaking
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
                <Link
                  href="/quiz"
                  className="bg-white text-daar-blue border-2 border-daar-helder font-bold px-8 py-4 rounded-full hover:bg-daar-helder/10 transition-colors text-center shadow-sm"
                >
                  Doe de gratis Geluksmonitor scan
                </Link>
              </div>
            </div>

            {/* Right - Stats Card */}
            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="inline-block px-3 py-1 bg-brandGreen/10 text-brandGreen text-xs font-semibold rounded-full mb-2">
                      DAAR IN CIJFERS
                    </span>
                    <h3 className="text-xl font-bold text-daar-blue" style={{ fontFamily: 'Nunito, sans-serif' }}>Onze impact</h3>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-brandGreen/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-brandGreen" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="bg-gray-50 rounded-2xl p-4">
                      <div className={`text-2xl font-bold ${stat.color}`}>
                        {stat.prefix}{stat.value}<span className="text-lg">{stat.suffix}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {['VM', 'SJ', 'TL'].map((initial, i) => (
                        <div key={i} className={`w-10 h-10 rounded-full ${i === 0 ? 'bg-brandGreen' : i === 1 ? 'bg-daar-blue' : 'bg-daar-mint'} flex items-center justify-center text-white text-xs font-bold border-2 border-white`}>
                          {initial}
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500">3 founders, 1 missie</p>
                  </div>
                </div>
              </div>

              {/* Decorative shadow */}
              <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full bg-brandGreen/20 rounded-3xl"></div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-brandGreen/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-daar-geel/10 rounded-full blur-3xl"></div>
      </section>

      {/* Mission & Vision - Card Style */}
      <section className="py-24 bg-offWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-daar-blue mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Waarom we doen wat we doen
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              DAAR is geboren uit de overtuiging dat vrijwilligerswerk de motor is van een sterke samenleving.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Missie */}
            <div className="bg-white rounded-3xl p-8 lg:p-10 relative overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all border border-gray-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brandGreen/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-brandGreen rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-green-200/50">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-daar-blue mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>Onze Missie</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  DAAR maakt vrijwilligerswerk <strong className="text-daar-blue">slimmer, leuker en duurzamer</strong>.
                  We creëren en meten Geluksmomenten, brengen vrijwilligers en organisaties bij elkaar,
                  en monitoren het welzijn van iedereen die bijdraagt.
                </p>
                <div className="flex items-center gap-2 text-brandGreen font-medium">
                  <CheckCircle2 size={18} />
                  <span>Elke vrijwilliger telt</span>
                </div>
              </div>
            </div>

            {/* Visie */}
            <div className="bg-white rounded-3xl p-8 lg:p-10 relative overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all border border-gray-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-daar-blue/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative">
                <div className="w-14 h-14 bg-daar-blue rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
                  <Eye className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-daar-blue mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>Onze Visie</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Een wereld waarin <strong className="text-daar-blue">iedereen kan meedoen</strong> op basis van eigen
                  behoefte, kunnen en invulling. Waar iedereen wordt gezien, gehoord, en regelmatig
                  zijn geluksmomenten beleeft.
                </p>
                <div className="flex items-center gap-2 text-daar-blue font-medium">
                  <Heart size={18} />
                  <span>Samen sterker</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Geluksmomenten Formule */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-offWhite rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-brandGreen/10 rounded-full mb-6">
                  <Sparkles className="w-4 h-4 text-brandGreen" />
                  <span className="text-sm font-semibold text-brandGreen">Ons unieke concept</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-extrabold text-daar-blue mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  De Geluksmomenten Formule
                </h2>

                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  Wij meten niet alleen uren, maar de <strong className="text-daar-blue">echte impact</strong> die
                  vrijwilligers creëren — voor zichzelf én voor de mensen die zij helpen.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    'Welzijn van vrijwilligers monitoren',
                    'Sociale impact kwantificeren',
                    'Vroege signalering van overbelasting',
                    'Data voor subsidieaanvragen'
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-brandGreen/10 flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-brandGreen" />
                      </div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/quiz"
                  className="inline-flex items-center bg-brandGreen text-white font-bold px-8 py-4 rounded-full hover:bg-brandGreenHover transition-all shadow-lg shadow-green-200/50 group"
                >
                  Probeer de gratis Geluksmonitor scan
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
              </div>

              {/* Visual - Geluksmeter Card */}
              <div className="relative">
                <div className="bg-daar-blue rounded-3xl p-8 text-white">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                      <BarChart3 className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-bold" style={{ fontFamily: 'Nunito, sans-serif' }}>Geluksmeter</h4>
                      <p className="text-sm text-white/70">Live monitoring</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { label: 'Plezier in werk', value: 92, color: 'bg-brandGreen' },
                      { label: 'Betrokkenheid', value: 88, color: 'bg-daar-helder' },
                      { label: 'Waardering', value: 95, color: 'bg-daar-geel' },
                      { label: 'Energie', value: 78, color: 'bg-daar-mint' },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-white/80">{item.label}</span>
                          <span className="font-bold">{item.value}%</span>
                        </div>
                        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                          <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.value}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-white/10 text-center">
                    <p className="text-sm text-white/60">Gemiddelde score</p>
                    <p className="text-3xl font-bold text-brandGreen">88%</p>
                  </div>
                </div>

                <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full bg-brandGreen/20 rounded-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-offWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-daar-blue/10 text-daar-blue text-sm font-semibold mb-4">
              <Users size={16} className="mr-2" />
              Het team
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-daar-blue mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Drie ondernemers, één missie
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Samen brengen we decennia aan ervaring in technologie, zorg en vrijwilligerswerk.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {founders.map((founder) => (
              <div key={founder.name} className="group">
                <div className="bg-white rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col border border-gray-100">
                  {/* Avatar */}
                  <div className={`w-20 h-20 ${founder.bgColor} rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    {founder.initial}
                  </div>

                  {/* Info */}
                  <h3 className="text-xl font-bold text-daar-blue mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>{founder.name}</h3>
                  <p className="text-brandGreen font-semibold mb-1">{founder.role}</p>
                  <p className="text-sm text-gray-500 mb-4">{founder.subtitle}</p>

                  <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                    {founder.description}
                  </p>

                  {/* Quote */}
                  <div className="pt-6 border-t border-gray-200">
                    <div className="flex gap-3">
                      <Quote className="w-5 h-5 text-brandGreen flex-shrink-0" />
                      <p className="text-sm text-gray-600 italic">&ldquo;{founder.quote}&rdquo;</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-daar-blue mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Onze kernwaarden
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Deze waarden vormen het fundament van alles wat we doen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((value) => (
              <div
                key={value.name}
                className="bg-white rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
              >
                <div className={`h-1.5 ${value.accentColor}`}></div>
                <div className="p-6 text-center">
                  <h3 className="font-bold text-daar-blue mb-3 text-lg" style={{ fontFamily: 'Nunito, sans-serif' }}>{value.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Banner */}
      <section className="py-24 bg-offWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-lightGreen rounded-3xl p-8 lg:p-12 border border-gray-100">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-daar-blue mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
                  Een vliegende start met jarenlange bagage
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  Hoewel DAAR pas net begint, brengen wij samen decennia aan ervaring mee.
                  Wij hebben gezien wat wel en niet werkt in vrijwilligersmanagement.
                  Die kennis zetten we nu in om het platform te bouwen dat we zelf altijd hebben gemist.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-lg hover:-translate-y-1 transition-all">
                  <p className="text-3xl font-bold text-brandGreen mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>3</p>
                  <p className="text-sm text-gray-600">Experts</p>
                </div>
                <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-lg hover:-translate-y-1 transition-all">
                  <p className="text-3xl font-bold text-daar-blue mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>15+</p>
                  <p className="text-sm text-gray-600">Jaar ervaring</p>
                </div>
                <div className="bg-white rounded-2xl p-6 text-center shadow-md hover:shadow-lg hover:-translate-y-1 transition-all">
                  <p className="text-3xl font-bold text-daar-mint mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>1</p>
                  <p className="text-sm text-gray-600">Missie</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-daar-blue">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Klaar om te ontdekken wat DAAR voor jou kan betekenen?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light">
            Start met de gratis Geluksmonitor scan of plan direct een gesprek met ons team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quiz"
              className="bg-brandGreen text-white font-bold px-8 py-4 rounded-full hover:bg-brandGreenHover transition-all shadow-lg shadow-green-900/20 transform hover:-translate-y-1 flex items-center justify-center group"
            >
              Start de gratis Geluksmonitor scan
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <Link
              href="/afspraak"
              className="bg-transparent border-2 border-white/30 text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-colors text-center"
            >
              Plan een gesprek
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
