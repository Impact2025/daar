'use client';

import React, { useState } from 'react';
import { Smile, Users, BarChart2, Shield, MessageCircle, ArrowRight, Check, Play, Heart, TrendingUp, Clock, Calendar, UserCheck } from 'lucide-react';

interface Feature {
  id: string;
  label: string;
  title: string;
  description: string;
  bgColor: string;
  accentColor: string;
  ctaText: string;
  ctaHref: string;
  visual: React.ReactNode;
}

const features: Feature[] = [
  {
    id: 'geluksmonitor',
    label: 'Geluksmonitor',
    title: 'Signaleer overbelasting voordat het te laat is',
    description: 'Onze slimme Geluksformule meet het welbevinden van je vrijwilligers. Het stoplicht-systeem waarschuwt automatisch wanneer iemand extra aandacht nodig heeft.',
    bgColor: '#D4A84B',
    accentColor: '#FFFFFF',
    ctaText: 'Probeer de check',
    ctaHref: '/quiz',
    visual: (
      <div className="relative">
        {/* Chat conversation mockup */}
        <div className="bg-white rounded-3xl p-6 shadow-lg max-w-sm">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-daar-helder flex items-center justify-center text-daar-blue text-xs font-bold">MK</div>
            <div>
              <p className="font-semibold text-daar-blue text-sm">Marieke</p>
              <p className="text-gray-600 text-sm">Ik merk dat ik de laatste tijd minder energie heb voor mijn taken...</p>
            </div>
          </div>
          <div className="flex items-start gap-3 mb-4">
            <div className="w-8 h-8 rounded-full bg-brandGreen flex items-center justify-center">
              <Heart className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-semibold text-brandGreen text-sm">Daar</p>
              <p className="text-gray-600 text-sm">Bedankt voor je eerlijkheid. Laten we samen kijken wat er speelt.</p>
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-daar-geel/30 flex items-center justify-center">
              <Smile className="w-6 h-6 text-daar-blue" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-daar-blue text-sm">Welzijns-check</p>
              <p className="text-gray-500 text-xs">5 minuten</p>
            </div>
            <Play className="w-5 h-5 text-daar-blue" />
          </div>
        </div>
        {/* Floating emoji */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-daar-koraal rounded-full flex items-center justify-center shadow-lg">
          <span className="text-2xl">😊</span>
        </div>
      </div>
    ),
  },
  {
    id: 'matching',
    label: 'Smart Matching',
    title: 'De perfecte match in seconden',
    description: 'Een Tinder-achtige ervaring voor vrijwilligerswerk. Swipe door profielen en vind de ideale vrijwilliger voor elke klus op basis van skills, beschikbaarheid en persoonlijkheid.',
    bgColor: '#E07A5A',
    accentColor: '#FFFFFF',
    ctaText: 'Bekijk matching',
    ctaHref: '/platform',
    visual: (
      <div className="relative">
        {/* Match cards stack */}
        <div className="relative w-72">
          {/* Back card */}
          <div className="absolute top-4 left-4 w-full bg-white rounded-3xl p-6 shadow-md opacity-60 transform rotate-3">
            <div className="h-32 bg-gray-100 rounded-2xl mb-4"></div>
          </div>
          {/* Front card */}
          <div className="relative bg-white rounded-3xl p-6 shadow-xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-daar-mint flex items-center justify-center text-white text-xl font-bold">
                SJ
              </div>
              <div>
                <p className="font-bold text-daar-blue">Sanne Jansen</p>
                <p className="text-gray-500 text-sm">Ervaren begeleider</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-daar-mint/20 text-daar-blue text-xs font-medium rounded-full">Ouderenzorg</span>
              <span className="px-3 py-1 bg-daar-geel/30 text-daar-blue text-xs font-medium rounded-full">Flexibel</span>
              <span className="px-3 py-1 bg-daar-helder/30 text-daar-blue text-xs font-medium rounded-full">Rijbewijs</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <div className="flex">
                  {[1,2,3,4,5].map((i) => (
                    <Heart key={i} className={`w-4 h-4 ${i <= 4 ? 'text-daar-koraal fill-daar-koraal' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-1">98% match</span>
              </div>
            </div>
          </div>
        </div>
        {/* Match indicator */}
        <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-brandGreen text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
          <Check className="w-5 h-5" />
          <span className="font-semibold text-sm">Match!</span>
        </div>
      </div>
    ),
  },
  {
    id: 'planning',
    label: 'Planning & Projecten',
    title: 'Wie kan, wil en doet mee? Chat direct met je projectgroep.',
    description: 'Beheer projecten, zie in één oogopslag wie beschikbaar is en chat direct met je team. "Wie neemt de ballen mee?" — communiceer moeiteloos binnen je projectgroep.',
    bgColor: '#4BA99B',
    accentColor: '#FFFFFF',
    ctaText: 'Ontdek planning',
    ctaHref: '/platform',
    visual: (
      <div className="bg-white rounded-3xl p-6 shadow-xl max-w-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-daar-mint/10 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-daar-mint" />
            </div>
            <div>
              <p className="font-bold text-daar-blue">Zomerfestival 2025</p>
              <p className="text-sm text-gray-500">25 juni - 2 juli</p>
            </div>
          </div>
          <span className="px-3 py-1 bg-brandGreen/10 text-brandGreen text-xs font-medium rounded-full">Actief</span>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Deelnemers</span>
            <span className="font-semibold text-daar-blue">24 / 30</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-daar-mint rounded-full" style={{ width: '80%' }}></div>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 p-2 bg-lightGreen rounded-lg">
            <UserCheck className="w-4 h-4 text-brandGreen" />
            <span className="text-sm text-daar-blue flex-1">15 bevestigd</span>
            <span className="text-xs text-gray-500">✓</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-daar-geel/20 rounded-lg">
            <Clock className="w-4 h-4 text-daar-koraal" />
            <span className="text-sm text-daar-blue flex-1">9 uitgenodigd</span>
            <span className="text-xs text-gray-500">⏳</span>
          </div>
        </div>

        {/* Project groepschat preview */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-3">
          <div className="flex items-center gap-2 mb-3">
            <MessageCircle className="w-4 h-4 text-daar-mint" />
            <span className="text-sm font-semibold text-daar-blue">Projectgroep chat</span>
            <span className="ml-auto w-5 h-5 bg-daar-koraal text-white text-xs font-bold rounded-full flex items-center justify-center">2</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-daar-helder flex items-center justify-center text-white text-xs font-bold flex-shrink-0">M</div>
              <div className="bg-white rounded-lg rounded-tl-none p-2 flex-1">
                <p className="text-xs text-gray-700">Wie neemt de ballen mee naar het veld?</p>
                <p className="text-xs text-gray-400 mt-1">10:24</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-6 h-6 rounded-full bg-brandGreen flex items-center justify-center text-white text-xs font-bold flex-shrink-0">A</div>
              <div className="bg-white rounded-lg rounded-tl-none p-2 flex-1">
                <p className="text-xs text-gray-700">Regel ik! Tot zo 👍</p>
                <p className="text-xs text-gray-400 mt-1">10:26</p>
              </div>
            </div>
          </div>
        </div>

        <button className="w-full bg-daar-mint text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-daar-mint/90 transition-colors">
          <MessageCircle size={18} />
          Open groepschat
        </button>
      </div>
    ),
  },
  {
    id: 'impact',
    label: 'Impact Dashboard',
    title: 'Maak je waarde zichtbaar',
    description: 'Genereer real-time rapporten voor gemeenten en fondsen. Koppel vrijwilligersuren aan SDG\'s en toon de maatschappelijke impact met harde cijfers.',
    bgColor: '#5BA3BD',
    accentColor: '#FFFFFF',
    ctaText: 'Bekijk dashboard',
    ctaHref: '/platform',
    visual: (
      <div className="bg-white rounded-3xl p-6 shadow-xl max-w-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-gray-500 text-sm">Impact deze maand</p>
            <p className="text-3xl font-bold text-daar-blue">2.847</p>
            <p className="text-sm text-gray-600">vrijwilligersuren</p>
          </div>
          <div className="w-16 h-16 rounded-2xl bg-daar-mint/20 flex items-center justify-center">
            <TrendingUp className="w-8 h-8 text-daar-mint" />
          </div>
        </div>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Sociale verbinding</span>
              <span className="font-semibold text-daar-blue">+24%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-brandGreen rounded-full" style={{ width: '78%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Welzijn deelnemers</span>
              <span className="font-semibold text-daar-blue">+18%</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-daar-helder rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Maatschappelijke waarde</span>
              <span className="font-semibold text-daar-blue">€48.200</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-daar-geel rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'dossier',
    label: 'Centraal Dossier',
    title: 'Alles veilig op één plek',
    description: 'VOG\'s, contracten, certificaten en notities AVG-proof opgeslagen. Automatische herinneringen voor verlopen documenten en volledige audit trail.',
    bgColor: '#4BA99B',
    accentColor: '#FFFFFF',
    ctaText: 'Ontdek dossiers',
    ctaHref: '/platform',
    visual: (
      <div className="bg-white rounded-3xl p-6 shadow-xl max-w-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-brandGreen/10 flex items-center justify-center">
            <Shield className="w-6 h-6 text-brandGreen" />
          </div>
          <div>
            <p className="font-bold text-daar-blue">Vrijwilliger Dossier</p>
            <p className="text-sm text-gray-500">Jan de Vries</p>
          </div>
          <span className="ml-auto px-2 py-1 bg-brandGreen/10 text-brandGreen text-xs font-medium rounded-full">Actief</span>
        </div>
        <div className="space-y-2">
          {[
            { name: 'VOG Verklaring', status: 'valid', date: 'Geldig tot dec 2026' },
            { name: 'Vrijwilligersovereenkomst', status: 'valid', date: 'Getekend 15 jan 2024' },
            { name: 'EHBO Certificaat', status: 'warning', date: 'Verloopt over 30 dagen' },
            { name: 'Rijbewijs B', status: 'valid', date: 'Geverifieerd' },
          ].map((doc, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                doc.status === 'valid' ? 'bg-brandGreen/10' : 'bg-daar-geel/30'
              }`}>
                {doc.status === 'valid' ? (
                  <Check className="w-4 h-4 text-brandGreen" />
                ) : (
                  <Clock className="w-4 h-4 text-daar-koraal" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-daar-blue">{doc.name}</p>
                <p className="text-xs text-gray-500">{doc.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'communicatie',
    label: 'Communicatie',
    title: 'Chat met je projectgroepen en teams',
    description: 'Directe communicatie binnen projecten. "Willem is ziek vandaag, Achmed krijgt de leiding." Chat met groepen, deel nieuws en vier successen samen.',
    bgColor: '#2D334A',
    accentColor: '#FFFFFF',
    ctaText: 'Bekijk features',
    ctaHref: '/platform',
    visual: (
      <div className="bg-white rounded-3xl p-6 shadow-xl max-w-sm">
        <div className="flex items-center gap-3 mb-4">
          <MessageCircle className="w-6 h-6 text-daar-koraal" />
          <p className="font-bold text-daar-blue">Voetbaltraining Zaterdag</p>
          <span className="ml-auto w-6 h-6 bg-daar-koraal text-white text-xs font-bold rounded-full flex items-center justify-center">3</span>
        </div>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-daar-helder flex items-center justify-center text-white text-xs font-bold">M</div>
            <div className="flex-1 bg-gray-50 rounded-2xl rounded-tl-none p-3">
              <p className="text-sm text-gray-700">Wie neemt de ballen mee naar het veld?</p>
              <p className="text-xs text-gray-400 mt-1">08:15</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-daar-koraal flex items-center justify-center text-white text-xs font-bold">W</div>
            <div className="flex-1 bg-gray-50 rounded-2xl rounded-tl-none p-3">
              <p className="text-sm text-gray-700">Ik ben ziek vandaag 😷 Sorry!</p>
              <p className="text-xs text-gray-400 mt-1">08:42</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-brandGreen flex items-center justify-center text-white text-xs font-bold">A</div>
            <div className="flex-1 bg-gray-50 rounded-2xl rounded-tl-none p-3">
              <p className="text-sm text-gray-700">Geen probleem! Ik neem vandaag de leiding. Beterschap Willem! 💪</p>
              <p className="text-xs text-gray-400 mt-1">08:45</p>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="bg-lightGreen px-4 py-2 rounded-full flex items-center gap-2">
              <span className="text-sm font-medium text-brandGreen">We gaan gewoon door! ⚽</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

export default function FeatureTabShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const activeFeature = features[activeTab];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-daar-blue mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Alles wat je nodig hebt, op één plek
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Voor grote én kleine organisaties. Van werving tot impactmeting — ontdek hoe elke module je vrijwilligerswerk versterkt.
          </p>
        </div>

        {/* Tabs - horizontally scrollable on mobile */}
        <div className="relative mb-8">
          <div className="flex md:flex-wrap md:justify-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
            {features.map((feature, index) => (
              <button
                key={feature.id}
                onClick={() => setActiveTab(index)}
                aria-pressed={activeTab === index}
                className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                  activeTab === index
                    ? 'bg-daar-blue text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {feature.label}
              </button>
            ))}
          </div>
          {/* Fade indicators for scroll on mobile */}
          <div className="absolute right-0 top-0 bottom-2 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none md:hidden" />
        </div>

        {/* Content area */}
        <div
          className="rounded-[2rem] p-8 md:p-12 transition-colors duration-500 relative overflow-hidden"
          style={{ backgroundColor: activeFeature.bgColor }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            {/* Visual */}
            <div className="flex justify-center order-2 md:order-1">
              {activeFeature.visual}
            </div>

            {/* Content */}
            <div className="order-1 md:order-2">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {activeFeature.title}
              </h3>
              <p className="text-white/90 text-lg leading-relaxed mb-8">
                {activeFeature.description}
              </p>
              <a
                href={activeFeature.ctaHref}
                className="inline-flex items-center bg-white text-daar-blue font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all group"
              >
                {activeFeature.ctaText}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
