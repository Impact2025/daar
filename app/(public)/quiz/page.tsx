import { Metadata } from 'next'
import Link from 'next/link'
import { QuizWidget } from '@/components/quiz/QuizWidget'
import { BarChart3, Clock, Target, TrendingUp, Users, Sparkles, ArrowRight, Check, Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Geluksmonitor | DAAR',
  description: 'Ontdek in 2 minuten hoe gezond jouw vrijwilligersbeleid is. Krijg gepersonaliseerde aanbevelingen en ROI-berekeningen voor jouw organisatie.',
  openGraph: {
    title: 'Geluksmonitor | DAAR',
    description: 'Ontdek hoe gezond jouw vrijwilligersbeleid is en ontvang concrete verbeterpunten.',
    type: 'website',
  },
}

export default function QuizPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-offWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 text-center lg:text-left mb-12 lg:mb-0">
              <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-brandGreen/10 border border-brandGreen/30 text-brandGreen text-sm font-semibold mb-8 animate-fade-in-up">
                <Sparkles size={16} className="mr-2" />
                Gratis tool - 2 minuten
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-daar-blue leading-[1.1] mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Hoe gezond is jouw <span className="text-brandGreen">vrijwilligersbeleid?</span>
              </h1>

              <p className="text-lg text-gray-600 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Ontdek in 2 minuten hoe je scoort op 5 cruciale dimensies van vrijwilligersbeheer.
                Krijg directe inzichten en concrete verbeterpunten gebaseerd op onze Geluksformule.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <a
                  href="#quiz"
                  className="bg-brandGreen text-white font-bold px-8 py-4 rounded-full hover:bg-brandGreenHover transition-all shadow-lg shadow-green-200/50 flex items-center justify-center group"
                >
                  Start de gratis scan
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </a>
                <Link
                  href="/platform"
                  className="bg-white text-daar-blue border-2 border-daar-helder font-bold px-8 py-4 rounded-full hover:bg-daar-helder/10 transition-colors text-center shadow-sm"
                >
                  Bekijk het platform
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-brandGreen mb-1">11</div>
                  <div className="text-sm text-gray-600">vragen</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-brandGreen mb-1">5</div>
                  <div className="text-sm text-gray-600">dimensies</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-bold text-brandGreen mb-1">2</div>
                  <div className="text-sm text-gray-600">minuten</div>
                </div>
              </div>
            </div>

            {/* Right Visual - Preview Card */}
            <div className="lg:col-span-6 relative">
              <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-brandGreen/10 text-brandGreen text-sm font-medium mb-4">
                    <Shield size={16} className="mr-2" />
                    Geen account nodig
                  </div>
                  <h3 className="text-2xl font-bold text-daar-blue mb-2" style={{ fontFamily: 'Nunito, sans-serif' }}>
                    Direct inzicht
                  </h3>
                  <p className="text-gray-600">in je vrijwilligersbeleid</p>
                </div>

                {/* 5 Dimensions Preview */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between p-3 bg-lightGreen rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-brandGreen"></div>
                      <span className="font-medium text-daar-blue">Beheer</span>
                    </div>
                    <span className="text-sm text-gray-500">Organisatie & administratie</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                      <span className="font-medium text-daar-blue">Communicatie</span>
                    </div>
                    <span className="text-sm text-gray-500">Informatie & bereikbaarheid</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      <span className="font-medium text-daar-blue">Onboarding</span>
                    </div>
                    <span className="text-sm text-gray-500">Introductie & begeleiding</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-pink-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-pink-500"></div>
                      <span className="font-medium text-daar-blue">Retentie</span>
                    </div>
                    <span className="text-sm text-gray-500">Waardering & motivatie</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-amber-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                      <span className="font-medium text-daar-blue">Impact</span>
                    </div>
                    <span className="text-sm text-gray-500">Meting & rapportage</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 text-center">
                  <p className="text-sm text-gray-500 mb-2">Na de scan ontvang je</p>
                  <div className="flex items-center justify-center gap-4 text-xs text-gray-600">
                    <span className="flex items-center gap-1">
                      <Check size={14} className="text-brandGreen" /> Persoonlijke score
                    </span>
                    <span className="flex items-center gap-1">
                      <Check size={14} className="text-brandGreen" /> ROI-berekening
                    </span>
                    <span className="flex items-center gap-1">
                      <Check size={14} className="text-brandGreen" /> Actieplan
                    </span>
                  </div>
                </div>
              </div>

              <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full bg-brandGreen/10 rounded-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section id="quiz" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Left: Info (smaller) */}
            <div className="lg:col-span-2 order-2 lg:order-1">
              <h2 className="text-2xl font-bold text-daar-blue mb-4">
                Waarom deze check?
              </h2>
              <p className="text-gray-600 mb-8">
                De gratis Geluksmonitor scan geeft inzicht in hoe jouw organisatie scoort op 5
                cruciale dimensies van vrijwilligersbeheer, vergeleken met vergelijkbare
                organisaties.
              </p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-brandGreen/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-brandGreen" />
                </div>
                <div>
                  <h3 className="font-medium text-daar-blue">2 minuten</h3>
                  <p className="text-gray-600 text-sm">
                    11 vragen, direct resultaat
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-brandGreen/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-5 h-5 text-brandGreen" />
                </div>
                <div>
                  <h3 className="font-medium text-daar-blue">Expertanalyse</h3>
                  <p className="text-gray-600 text-sm">
                    Krijg inzicht in je sterke en zwakke punten
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-brandGreen/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-brandGreen" />
                </div>
                <div>
                  <h3 className="font-medium text-daar-blue">ROI-berekening</h3>
                  <p className="text-gray-600 text-sm">
                    Concrete cijfers over potentiele besparingen
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-brandGreen/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="w-5 h-5 text-brandGreen" />
                </div>
                <div>
                  <h3 className="font-medium text-daar-blue">Actiegericht</h3>
                  <p className="text-gray-600 text-sm">
                    Gepersonaliseerde aanbevelingen per dimensie
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-brandGreen/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-brandGreen" />
                </div>
                <div>
                  <h3 className="font-medium text-daar-blue">Geen account nodig</h3>
                  <p className="text-gray-600 text-sm">
                    Start direct, resultaat is deelbaar
                  </p>
                </div>
              </div>
            </div>

            {/* Expertise */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-sm text-gray-500 mb-4">Ontwikkeld door experts</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-daar-blue">3</p>
                  <p className="text-xs text-gray-500">Specialisten</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-daar-blue">15+</p>
                  <p className="text-xs text-gray-500">Jaar ervaring</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-daar-blue">5</p>
                  <p className="text-xs text-gray-500">Dimensies</p>
                </div>
              </div>
            </div>
          </div>

            {/* Right: Quiz Widget (larger) */}
            <div className="lg:col-span-3 order-1 lg:order-2">
              <QuizWidget />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
