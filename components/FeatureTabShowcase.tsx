'use client';

import React, { useState } from 'react';
import { Smile, Meh, Frown, Users, BarChart2, Shield, MessageCircle, ArrowRight, Check, List, X, Heart, TrendingUp, Clock, Calendar, BadgePercent, Banknote, Download, Filter, Sparkles } from 'lucide-react';

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
        <div className="bg-white rounded-3xl p-6 pb-10 shadow-lg max-w-sm">
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
          <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
            {(['goed', 'twijfel', 'niet-goed'] as const).map((activeKey, i) => (
              <div key={i} className="flex items-center justify-around">
                {(
                  [
                    {
                      key: 'goed' as const,
                      label: 'Goed',
                      icon: Smile,
                      activeClasses: 'border-brandGreen bg-brandGreen text-white',
                      inactiveClasses: 'border-brandGreen bg-white text-brandGreen',
                    },
                    {
                      key: 'twijfel' as const,
                      label: 'Twijfel',
                      icon: Meh,
                      activeClasses: 'border-daar-geel bg-daar-geel text-white',
                      inactiveClasses: 'border-daar-geel bg-white text-daar-geel',
                    },
                    {
                      key: 'niet-goed' as const,
                      label: 'Niet goed',
                      icon: Frown,
                      activeClasses: 'border-daar-koraal bg-daar-koraal text-white',
                      inactiveClasses: 'border-daar-koraal bg-white text-daar-koraal',
                    },
                  ]
                ).map(({ key, label, icon: Icon, activeClasses, inactiveClasses }) => {
                  const isActive = activeKey === key;
                  return (
                    <div key={key} className="flex flex-col items-center gap-1">
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center border-2 ${
                          isActive ? activeClasses : inactiveClasses
                        }`}
                      >
                        <Icon className="w-4 h-4" strokeWidth={2.5} />
                      </div>
                      <span className={`text-[10px] ${isActive ? 'font-bold text-daar-blue' : 'text-gray-500'}`}>
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
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
    title: 'De perfecte match, automatisch gesuggereerd',
    description: 'Onze Smart Matching kijkt naar vaardigheden, beschikbaarheid en werkgeschiedenis en stelt direct de beste vrijwilliger voor elke klus voor. Geen eindeloos rondbellen meer.',
    bgColor: '#E07A5A',
    accentColor: '#FFFFFF',
    ctaText: 'Bekijk matching',
    ctaHref: '/platform',
    visual: (
      <div className="bg-white rounded-3xl p-6 shadow-xl max-w-sm">
        <p className="text-xs font-bold text-gray-500 tracking-wide mb-3">VEREISTE VAARDIGHEDEN</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {['Hout hakken', 'Technisch inzicht', 'Natuurvrijwilligerswerk', 'Bos'].map((skill) => (
            <span key={skill} className="px-3 py-1.5 bg-gray-100 text-daar-blue text-sm rounded-full">
              {skill}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mb-2">
          <p className="font-bold text-daar-blue">Bezetting</p>
          <p className="text-sm text-gray-500">6/8 ingevuld · 2 plekken over</p>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-6">
          <div className="h-full bg-brandGreen rounded-full" style={{ width: '75%' }}></div>
        </div>

        <div className="bg-daar-koraal-light rounded-xl p-4 flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-daar-koraal flex-shrink-0 mt-0.5" />
          <p className="text-sm text-daar-koraal italic leading-relaxed">
            <span className="font-semibold">AI-suggestie:</span> Dylan Aydin Beschikbaar 09:00 – 13:00 · Heeft eerder op Vrijdag gewerkt.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'declaraties',
    label: 'Declaraties',
    title: 'Declaraties in één oogopslag beheren',
    description: 'Van indienen tot uitbetalen. Zie in real-time hoeveel declaraties wachten op goedkeuring, klaarstaan voor de batch of uitbetaald gaan worden — zonder gedoe met losse bonnetjes.',
    bgColor: '#3E3D5C',
    accentColor: '#FFFFFF',
    ctaText: 'Bekijk declaraties',
    ctaHref: '/platform',
    visual: (
      <div className="space-y-3 w-72">
        {[
          { border: 'border-daar-geel', icon: BadgePercent, label: '14 wachten op goedkeuring', amount: '€ 565,20' },
          { border: 'border-brandGreen', icon: Banknote, label: '15 wachten op batch', amount: '€ 882,97' },
          { border: 'border-daar-helder', icon: Download, label: '3 klaar voor betaling', amount: '€ 57,90' },
        ].map(({ border, icon: Icon, label, amount }) => (
          <div key={label} className={`bg-white rounded-2xl shadow-md border-l-4 ${border} p-4`}>
            <p className="text-daar-blue font-semibold text-sm mb-3">{label}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon className="w-5 h-5 text-daar-blue" />
                <span className="text-xl font-bold text-daar-blue">{amount}</span>
              </div>
              <Filter className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        ))}
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
      <div className="relative bg-white rounded-3xl p-6 shadow-xl max-w-sm">
        {/* Unread indicator */}
        <div className="absolute top-4 right-4 w-2.5 h-2.5 bg-daar-koraal rounded-full"></div>

        <div className="flex items-center justify-between mb-4">
          <p className="font-bold text-daar-blue text-lg">Notificaties</p>
          <div className="flex items-center gap-3 text-gray-400">
            <Check className="w-5 h-5" />
            <List className="w-5 h-5" />
            <X className="w-5 h-5" />
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center flex-shrink-0">
              <Calendar className="w-4 h-4 text-daar-blue" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className="font-bold text-daar-blue text-sm">Je bent ingepland voor een activiteit</p>
                <Check className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" />
              </div>
              <p className="text-gray-600 text-sm mt-1">
                Je bent toegevoegd aan de activiteit &quot;Wandeling strand&quot;.
              </p>
              <p className="text-gray-400 text-xs mt-2">8 minuten geleden</p>

              <div className="mt-4 space-y-2">
                <button className="w-full bg-brandGreen text-white font-semibold text-sm py-2.5 px-4 rounded-xl flex items-center gap-2 hover:bg-brandGreen/90 transition-colors">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  Bekijk activiteit
                </button>
                <button className="w-full bg-brandGreen text-white font-semibold text-sm py-2.5 px-4 rounded-xl flex items-center gap-2 hover:bg-brandGreen/90 transition-colors">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  Wandeling strand · 20-09-2026 09:00
                </button>
              </div>
            </div>
          </div>
        </div>
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
          className="rounded-[2rem] p-8 md:p-10 transition-colors duration-500 relative overflow-hidden h-[400px] flex items-center"
          style={{ backgroundColor: activeFeature.bgColor }}
        >
          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10 w-full h-full">
            {/* Visual */}
            <div className="flex justify-center items-center order-2 md:order-1 overflow-hidden h-full">
              <div className="scale-[0.78] origin-center">
                {activeFeature.visual}
              </div>
            </div>

            {/* Content */}
            <div className="order-1 md:order-2">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
                {activeFeature.title}
              </h3>
              <p className="text-white/90 text-lg leading-relaxed">
                {activeFeature.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
