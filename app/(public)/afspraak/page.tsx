import { Metadata } from 'next'
import { BookingWidget } from '@/components/booking/BookingWidget'
import { Calendar, Clock, Users, Video } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Plan een afspraak | DAAR',
  description: 'Plan een kennismaking, demo of strategiesessie met Team DAAR. Wij helpen je graag met het professionaliseren van je vrijwilligersbeheer.',
  openGraph: {
    title: 'Plan een afspraak | DAAR',
    description: 'Plan een gesprek met het DAAR team',
    type: 'website',
  },
}

export default function AfspraakPage() {
  return (
    <div className="bg-offWhite min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Info */}
          <div>
            <h1 className="text-4xl font-bold text-navy mb-4">
              Plan een afspraak
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Wij maken graag tijd voor je. Kies het type gesprek dat het beste past
              bij waar je nu staat.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-brandGreen/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-brandGreen" />
                </div>
                <div>
                  <h3 className="font-medium text-navy">Flexibele planning</h3>
                  <p className="text-gray-600 text-sm">
                    Kies een datum en tijd die jou uitkomt
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-brandGreen/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Video className="w-5 h-5 text-brandGreen" />
                </div>
                <div>
                  <h3 className="font-medium text-navy">Online of fysiek</h3>
                  <p className="text-gray-600 text-sm">
                    We kunnen videobellen of afspreken op locatie
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-brandGreen/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-brandGreen" />
                </div>
                <div>
                  <h3 className="font-medium text-navy">Het hele team</h3>
                  <p className="text-gray-600 text-sm">
                    Vincent, Saviem of Thijs - afhankelijk van je vraag
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-brandGreen/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-brandGreen" />
                </div>
                <div>
                  <h3 className="font-medium text-navy">Direct bevestiging</h3>
                  <p className="text-gray-600 text-sm">
                    Je ontvangt meteen een bevestiging per e-mail
                  </p>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <p className="text-gray-600 italic mb-4">
                "Wij geloven dat elk gesprek begint met luisteren. Vertel ons waar
                jullie organisatie staat en waar jullie naartoe willen - dan kijken
                wij hoe DAAR kan helpen."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brandGreen/20 rounded-full flex items-center justify-center text-brandGreen font-medium">
                  V
                </div>
                <div>
                  <p className="font-medium text-navy">Vincent van Munster</p>
                  <p className="text-sm text-gray-500">Co-founder, Het Sociale Hart</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Booking Widget */}
          <div className="lg:sticky lg:top-24">
            <BookingWidget />
          </div>
        </div>
      </div>
    </div>
  )
}
