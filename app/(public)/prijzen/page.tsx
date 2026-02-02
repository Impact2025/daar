'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  Sparkles,
  ArrowRight,
  Users,
  TrendingUp,
  Heart,
  Clock,
  Euro,
  Zap,
  Calculator,
  BarChart3
} from 'lucide-react';

interface Module {
  id: number;
  name: string;
  description: string;
  pricePerVolunteerPerMonth: number;
  icon: React.ReactNode;
  color: string;
}

const modules: Module[] = [
  {
    id: 1,
    name: 'Geluksmonitor & Matching',
    description: 'De Geluksformule + Smart Matching voor perfecte matches',
    pricePerVolunteerPerMonth: 1.08,
    icon: <Heart className="w-5 h-5" />,
    color: 'daar-koraal',
  },
  {
    id: 2,
    name: 'Centraal Dossier',
    description: 'AVG-proof documentbeheer voor VOG\'s, contracten en certificaten',
    pricePerVolunteerPerMonth: 0.17,
    icon: <Check className="w-5 h-5" />,
    color: 'daar-mint',
  },
  {
    id: 3,
    name: 'Communicatie & Engagement',
    description: 'Chat, nieuws delen en automatische bedankjes versturen',
    pricePerVolunteerPerMonth: 0.24,
    icon: <Sparkles className="w-5 h-5" />,
    color: 'daar-geel',
  },
  {
    id: 4,
    name: 'Impact Dashboard',
    description: 'Real-time rapporten met SDG koppeling en maatschappelijke impact',
    pricePerVolunteerPerMonth: 0.28,
    icon: <BarChart3 className="w-5 h-5" />,
    color: 'daar-helder',
  },
  {
    id: 5,
    name: 'Premium Support',
    description: 'Dedicated support manager en prioritaire feature requests',
    pricePerVolunteerPerMonth: 0,
    icon: <Zap className="w-5 h-5" />,
    color: 'brandGreen',
  },
];

export default function PrijzenPage() {
  const [numVolunteers, setNumVolunteers] = useState(125);
  const [hoursPerMonth, setHoursPerMonth] = useState(6);
  const [selectedModules, setSelectedModules] = useState<Set<number>>(
    new Set([1, 2, 3, 4])
  );

  const toggleModule = (moduleId: number) => {
    const newModules = new Set(selectedModules);
    if (newModules.has(moduleId)) {
      newModules.delete(moduleId);
    } else {
      newModules.add(moduleId);
    }
    setSelectedModules(newModules);
  };

  // Calculations
  const pricePerVolunteerPerMonth = Array.from(selectedModules).reduce((total, moduleId) => {
    const module = modules.find(m => m.id === moduleId);
    return total + (module?.pricePerVolunteerPerMonth || 0);
  }, 0);

  const totalPricePerMonth = pricePerVolunteerPerMonth * numVolunteers;
  const totalPricePerYear = totalPricePerMonth * 12;

  // Value calculations (€25.04 per hour = volunteer value)
  const volunteerValuePerMonth = numVolunteers * hoursPerMonth * 25.04;
  const volunteerValuePerYear = volunteerValuePerMonth * 12;

  // Happiness moments (5 per hour)
  const happinessMomentsPerMonth = numVolunteers * hoursPerMonth * 5;
  const happinessMomentsPerYear = happinessMomentsPerMonth * 12;

  // Cost per happiness moment
  const costPerHappinessMoment = totalPricePerMonth > 0 ? totalPricePerMonth / happinessMomentsPerMonth : 0;

  // Value per happiness moment
  const valuePerHappinessMoment = happinessMomentsPerMonth > 0 ? volunteerValuePerMonth / happinessMomentsPerMonth : 0;

  // ROI calculation
  const roi = totalPricePerYear > 0 ? ((volunteerValuePerYear - totalPricePerYear) / totalPricePerYear) * 100 : 0;

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden bg-gradient-to-br from-offWhite via-white to-lightGreen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-brandGreen/10 border border-brandGreen/30 text-brandGreen text-sm font-semibold mb-8"
            >
              <Calculator size={16} className="mr-2" />
              Bereken je investering in real-time
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-daar-blue leading-tight mb-6"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              Wat kost <span className="text-brandGreen">Daar</span> voor jouw organisatie?
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Transparante prijzen op basis van jouw aantal vrijwilligers. Kies de modules die
              je nodig hebt en zie direct de impact en ROI.
            </motion.p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-brandGreen/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-daar-helder/10 rounded-full blur-3xl" />
      </section>

      {/* Interactive Calculator */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Input & Modules */}
            <div className="space-y-8">
              {/* Input Section */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-xl border border-gray-100"
              >
                <h2
                  className="text-2xl font-bold text-daar-blue mb-6 flex items-center gap-3"
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                >
                  <Users className="text-brandGreen" size={28} />
                  Jouw organisatie
                </h2>

                {/* Volunteers Input */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-daar-blue font-semibold">
                      Aantal vrijwilligers
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        value={numVolunteers}
                        onChange={(e) => setNumVolunteers(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-24 px-3 py-2 border-2 border-brandGreen rounded-xl font-bold text-daar-blue text-right focus:outline-none focus:ring-2 focus:ring-brandGreen/50"
                      />
                      <span className="text-gray-500">vrijwilligers</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="500"
                    value={numVolunteers}
                    onChange={(e) => setNumVolunteers(parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer slider-green"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>1</span>
                    <span>250</span>
                    <span>500+</span>
                  </div>
                </div>

                {/* Hours Input */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-daar-blue font-semibold">
                      Uren per vrijwilliger per maand
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        value={hoursPerMonth}
                        onChange={(e) => setHoursPerMonth(Math.max(1, parseInt(e.target.value) || 1))}
                        className="w-20 px-3 py-2 border-2 border-daar-helder rounded-xl font-bold text-daar-blue text-right focus:outline-none focus:ring-2 focus:ring-daar-helder/50"
                      />
                      <span className="text-gray-500">uur</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="40"
                    value={hoursPerMonth}
                    onChange={(e) => setHoursPerMonth(parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer slider-blue"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>1u</span>
                    <span>20u</span>
                    <span>40u</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-lightGreen rounded-2xl">
                  <p className="text-sm text-gray-600">
                    <Clock className="inline w-4 h-4 mr-1 text-brandGreen" />
                    Totaal: <span className="font-bold text-daar-blue">
                      {(numVolunteers * hoursPerMonth).toLocaleString('nl-NL')} uur/maand
                    </span>
                  </p>
                </div>
              </motion.div>

              {/* Modules Selection */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-xl border border-gray-100"
              >
                <h2
                  className="text-2xl font-bold text-daar-blue mb-6 flex items-center gap-3"
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                >
                  <Sparkles className="text-brandGreen" size={28} />
                  Kies jouw modules
                </h2>

                <div className="space-y-4">
                  {modules.map((module, index) => (
                    <motion.div
                      key={module.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      onClick={() => toggleModule(module.id)}
                      className={`p-5 rounded-2xl cursor-pointer transition-all border-2 ${
                        selectedModules.has(module.id)
                          ? 'border-brandGreen bg-lightGreen shadow-md'
                          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        {/* Toggle Switch */}
                        <div className="flex-shrink-0">
                          <div
                            className={`relative w-14 h-8 rounded-full transition-all ${
                              selectedModules.has(module.id) ? 'bg-brandGreen' : 'bg-gray-300'
                            }`}
                          >
                            <motion.div
                              className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md"
                              animate={{
                                x: selectedModules.has(module.id) ? 24 : 0,
                              }}
                              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                            />
                          </div>
                        </div>

                        {/* Module Info */}
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                  selectedModules.has(module.id)
                                    ? `bg-${module.color}/20 text-${module.color}`
                                    : 'bg-gray-100 text-gray-400'
                                }`}
                              >
                                {module.icon}
                              </div>
                              <h3 className="font-bold text-daar-blue">{module.name}</h3>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-brandGreen">
                                €{module.pricePerVolunteerPerMonth.toFixed(2)}
                              </div>
                              <div className="text-xs text-gray-500">p/vrijw./mnd</div>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{module.description}</p>
                          {selectedModules.has(module.id) && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-3 pt-3 border-t border-gray-200"
                            >
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Maandelijks totaal:</span>
                                <span className="font-semibold text-daar-blue">
                                  €{(module.pricePerVolunteerPerMonth * numVolunteers).toFixed(2)}
                                </span>
                              </div>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {selectedModules.size === 0 && (
                  <div className="mt-6 p-4 bg-daar-geel/20 rounded-2xl border border-daar-geel/30">
                    <p className="text-sm text-daar-blue">
                      ⚠️ Selecteer minimaal één module om te beginnen
                    </p>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Right: Results */}
            <div className="lg:sticky lg:top-8 space-y-6" style={{ height: 'fit-content' }}>
              {/* Price Summary */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-gradient-to-br from-daar-blue to-daar-blue/90 rounded-3xl p-8 text-white shadow-2xl"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Euro size={28} />
                  Jouw investering
                </h2>

                <div className="space-y-6">
                  {/* Per Volunteer */}
                  <div className="pb-6 border-b border-white/20">
                    <p className="text-white/70 text-sm mb-2">Per vrijwilliger per maand</p>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={pricePerVolunteerPerMonth}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="text-4xl font-extrabold"
                      >
                        €{pricePerVolunteerPerMonth.toFixed(2)}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Total Per Month */}
                  <div className="pb-6 border-b border-white/20">
                    <p className="text-white/70 text-sm mb-2">Totaal per maand</p>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={totalPricePerMonth}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="text-5xl font-extrabold text-daar-geel"
                      >
                        €{totalPricePerMonth.toLocaleString('nl-NL', { maximumFractionDigits: 0 })}
                      </motion.div>
                    </AnimatePresence>
                    <p className="text-white/60 text-xs mt-2">excl. BTW</p>
                  </div>

                  {/* Total Per Year */}
                  <div>
                    <p className="text-white/70 text-sm mb-2">Totaal per jaar</p>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={totalPricePerYear}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-3xl font-bold"
                      >
                        €{totalPricePerYear.toLocaleString('nl-NL', { maximumFractionDigits: 0 })}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                <Link
                  href="/afspraak"
                  className="mt-8 block w-full bg-brandGreen text-white text-center font-bold px-6 py-4 rounded-xl hover:bg-brandGreenHover transition-all shadow-lg hover:shadow-xl group"
                >
                  <span className="flex items-center justify-center gap-2">
                    Vraag offerte aan
                    <ArrowRight
                      size={20}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </span>
                </Link>
              </motion.div>

              {/* Value & Impact */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-gradient-to-br from-brandGreen to-daar-mint rounded-3xl p-8 text-white shadow-2xl"
              >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <TrendingUp size={28} />
                  Jouw impact
                </h2>

                <div className="space-y-6">
                  {/* Volunteer Value */}
                  <div className="bg-white/10 rounded-2xl p-5">
                    <p className="text-white/80 text-sm mb-2">Waarde vrijwilligers per maand</p>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={volunteerValuePerMonth}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="text-4xl font-extrabold"
                      >
                        €{volunteerValuePerMonth.toLocaleString('nl-NL', { maximumFractionDigits: 0 })}
                      </motion.div>
                    </AnimatePresence>
                    <p className="text-white/60 text-xs mt-2">
                      Gebaseerd op €25,04 per uur
                    </p>
                  </div>

                  {/* Happiness Moments */}
                  <div className="bg-white/10 rounded-2xl p-5">
                    <p className="text-white/80 text-sm mb-2 flex items-center gap-2">
                      <Heart size={16} />
                      Geluksmomenten per maand
                    </p>
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={happinessMomentsPerMonth}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="text-4xl font-extrabold"
                      >
                        {happinessMomentsPerMonth.toLocaleString('nl-NL')}
                      </motion.div>
                    </AnimatePresence>
                    <p className="text-white/60 text-xs mt-2">
                      Gemiddeld 5 geluksmomenten per uur
                    </p>
                  </div>

                  {/* ROI */}
                  {totalPricePerYear > 0 && (
                    <div className="bg-white/10 rounded-2xl p-5">
                      <p className="text-white/80 text-sm mb-2">Return on Investment (ROI)</p>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={roi}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.1 }}
                          className="text-5xl font-extrabold text-daar-geel"
                        >
                          {roi.toFixed(0)}%
                        </motion.div>
                      </AnimatePresence>
                      <p className="text-white/80 text-sm mt-3">
                        Besparing per jaar:{' '}
                        <span className="font-bold">
                          €{(volunteerValuePerYear - totalPricePerYear).toLocaleString('nl-NL', { maximumFractionDigits: 0 })}
                        </span>
                      </p>
                    </div>
                  )}

                  {/* Cost & Value per Happiness Moment */}
                  {happinessMomentsPerMonth > 0 && totalPricePerMonth > 0 && (
                    <div className="pt-6 border-t border-white/20 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-sm">Kosten per geluksmoment</span>
                        <span className="font-bold text-lg">
                          €{costPerHappinessMoment.toFixed(4)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/80 text-sm">Waarde per geluksmoment</span>
                        <span className="font-bold text-lg text-daar-geel">
                          €{valuePerHappinessMoment.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Info Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-brandGreen/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-brandGreen" />
                  </div>
                  <div>
                    <h3 className="font-bold text-daar-blue mb-2">Wat is inbegrepen?</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>✓ Gratis demo en onboarding</li>
                      <li>✓ Maandelijks opzegbaar</li>
                      <li>✓ Geen setup kosten</li>
                      <li>✓ Automatische updates</li>
                      <li>✓ Email support (Premium: dedicated)</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-offWhite to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-3xl md:text-4xl font-extrabold text-daar-blue mb-6"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              Klaar om te starten?
            </h2>
            <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
              Plan een gratis demo en ontdek hoe Daar jouw organisatie helpt meer impact te maken
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/afspraak"
                className="bg-brandGreen text-white font-bold px-8 py-4 rounded-full hover:bg-brandGreenHover transition-all shadow-lg shadow-green-200/50 flex items-center justify-center group"
              >
                Vraag een demo aan
                <ArrowRight
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                  size={20}
                />
              </Link>
              <Link
                href="/contact"
                className="bg-white text-daar-blue border-2 border-daar-blue font-bold px-8 py-4 rounded-full hover:bg-daar-blue/5 transition-colors text-center shadow-sm"
              >
                Neem contact op
              </Link>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              Vragen? Bel ons op{' '}
              <a href="tel:+31201234567" className="text-brandGreen font-semibold hover:underline">
                020 123 45 67
              </a>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Custom Slider Styles */}
      <style jsx>{`
        .slider-green::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #3BA273;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(59, 162, 115, 0.4);
        }

        .slider-green::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #3BA273;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(59, 162, 115, 0.4);
        }

        .slider-blue::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #8ECAE6;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(142, 202, 230, 0.4);
        }

        .slider-blue::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #8ECAE6;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(142, 202, 230, 0.4);
        }

        input[type='range']::-webkit-slider-runnable-track {
          height: 12px;
          border-radius: 6px;
        }

        input[type='range']::-moz-range-track {
          height: 12px;
          border-radius: 6px;
        }
      `}</style>
    </div>
  );
}
