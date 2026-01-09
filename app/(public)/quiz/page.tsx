import { Metadata } from 'next'
import { QuizWidget } from '@/components/quiz/QuizWidget'
import { BarChart3, Clock, Target, TrendingUp, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'VrijwilligersCheck | DAAR',
  description: 'Ontdek in 2 minuten hoe gezond jouw vrijwilligersbeleid is. Krijg gepersonaliseerde aanbevelingen en ROI-berekeningen voor jouw organisatie.',
  openGraph: {
    title: 'VrijwilligersCheck | DAAR',
    description: 'Ontdek hoe gezond jouw vrijwilligersbeleid is en ontvang concrete verbeterpunten.',
    type: 'website',
  },
}

export default function QuizPage() {
  return (
    <div className="bg-offWhite min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12 items-start">
          {/* Left: Info (smaller) */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <h2 className="text-2xl font-bold text-navy mb-4">
              Waarom deze check?
            </h2>
            <p className="text-gray-600 mb-8">
              De VrijwilligersCheck geeft inzicht in hoe jouw organisatie scoort op 5
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
                  <h3 className="font-medium text-navy">2 minuten</h3>
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
                  <h3 className="font-medium text-navy">Benchmark vergelijking</h3>
                  <p className="text-gray-600 text-sm">
                    Zie hoe je scoort t.o.v. vergelijkbare organisaties
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-brandGreen/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-5 h-5 text-brandGreen" />
                </div>
                <div>
                  <h3 className="font-medium text-navy">ROI-berekening</h3>
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
                  <h3 className="font-medium text-navy">Actiegericht</h3>
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
                  <h3 className="font-medium text-navy">Geen account nodig</h3>
                  <p className="text-gray-600 text-sm">
                    Start direct, resultaat is deelbaar
                  </p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-sm text-gray-500 mb-4">Gebaseerd op data van</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-navy">500+</p>
                  <p className="text-xs text-gray-500">Organisaties</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-navy">50K+</p>
                  <p className="text-xs text-gray-500">Vrijwilligers</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-navy">5</p>
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
    </div>
  )
}
