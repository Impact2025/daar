'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Users,
  TrendingUp,
  Heart,
  Clock,
  Calculator,
  MessageSquare,
} from 'lucide-react';

// ─── Component ────────────────────────────────────────────────────────────────
// Prijzen staan niet op de site: prijsopgave op aanvraag via contact.
export default function PrijzenPage() {
  const [numVolunteers, setNumVolunteers] = useState(125);
  const [hoursPerMonth, setHoursPerMonth] = useState(6);

  // Impact
  const volunteerHourValue = 25.04;
  const volunteerValuePerMonth = numVolunteers * hoursPerMonth * volunteerHourValue;

  const fmtInt = (n: number) =>
    n.toLocaleString('nl-NL', { maximumFractionDigits: 0 });

  return (
    <div className="bg-white">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-10 pb-12 lg:pt-16 lg:pb-16 overflow-hidden bg-offWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-brandGreen/10 border border-brandGreen/30 text-brandGreen text-sm font-semibold mb-8"
            >
              <Calculator size={16} className="mr-2" />
              Prijs op maat
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-daar-blue leading-tight mb-6"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              Wat levert <span className="text-brandGreen">Daar</span> jouw organisatie op?
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              Vul het aantal vrijwilligers en hun inzet in en zie direct de waarde van jouw
              vrijwilligers. Je prijs stemmen we samen af op wat jouw organisatie nodig heeft.
            </motion.p>
          </div>
        </div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-brandGreen/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-daar-helder/10 rounded-full blur-3xl" />
      </section>

      {/* ── Calculator ────────────────────────────────────────────────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Vrijwilligers slider */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
              >
                <h2
                  className="text-2xl font-bold text-daar-blue mb-6 flex items-center gap-3"
                  style={{ fontFamily: 'Nunito, sans-serif' }}
                >
                  <Users className="text-brandGreen" size={28} />
                  Jouw organisatie
                </h2>

                <div className="mb-2">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-daar-blue font-semibold">Aantal vrijwilligers</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        value={numVolunteers}
                        min={15}
                        max={2600}
                        onChange={(e) =>
                          setNumVolunteers(Math.max(15, Math.min(2600, parseInt(e.target.value) || 15)))
                        }
                        className="w-24 px-3 py-2 border-2 border-brandGreen rounded-xl font-bold text-daar-blue text-right focus:outline-none focus:ring-2 focus:ring-brandGreen/50"
                      />
                      <span className="text-gray-500">vrijwilligers</span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min={15}
                    max={2600}
                    step={5}
                    value={numVolunteers}
                    onChange={(e) => setNumVolunteers(parseInt(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer slider-green"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>15 (min)</span>
                    <span>500</span>
                    <span>1.000</span>
                    <span>2.000</span>
                    <span>2.500+</span>
                  </div>
                </div>

                {/* Uren per vrijwilliger */}
                <div className="mt-8">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-daar-blue font-semibold">
                      Uren per vrijwilliger per maand
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        value={hoursPerMonth}
                        min={1}
                        max={40}
                        onChange={(e) =>
                          setHoursPerMonth(Math.max(1, Math.min(40, parseInt(e.target.value) || 1)))
                        }
                        className="w-20 px-3 py-2 border-2 border-daar-helder rounded-xl font-bold text-daar-blue text-right focus:outline-none focus:ring-2 focus:ring-daar-helder/50"
                      />
                      <span className="text-gray-500">uur</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={40}
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

                <div className="mt-4 p-4 bg-lightGreen rounded-2xl">
                  <p className="text-sm text-gray-600">
                    <Clock className="inline w-4 h-4 mr-1 text-brandGreen" />
                    Totaal: <span className="font-bold text-daar-blue">
                      {(numVolunteers * hoursPerMonth).toLocaleString('nl-NL')} uur/maand
                    </span>
                  </p>
                </div>
              </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-brandGreen rounded-3xl p-8 text-white shadow-2xl"
                >
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                    <TrendingUp size={28} />
                    Jouw impact
                  </h2>

                  <div className="space-y-5">
                    <div className="bg-white/10 rounded-2xl p-5">
                      <p className="text-white/80 text-sm mb-2 flex items-center gap-2">
                        <Clock size={14} />
                        Waarde vrijwilligers per maand
                      </p>
                      <p className="text-3xl font-extrabold">
                        €{fmtInt(volunteerValuePerMonth)}
                      </p>
                      <p className="text-white/60 text-xs mt-1">
                        {numVolunteers} vw × {hoursPerMonth}u × €25,04/u (CBS)
                      </p>
                    </div>

                    <div className="bg-white/10 rounded-2xl p-5">
                      <p className="text-white/80 text-sm mb-2 flex items-center gap-2">
                        <Heart size={14} />
                        Geluksmomenten per maand
                      </p>
                      <p className="text-3xl font-extrabold">
                        {fmtInt(numVolunteers * hoursPerMonth * 5)}
                      </p>
                      <p className="text-white/60 text-xs mt-1">Gemiddeld 5 per uur</p>
                    </div>
                  </div>
                </motion.div>
          </div>

          {/* ── Prijsopgave ──────────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-12 bg-offWhite rounded-3xl p-8 md:p-12 text-center border border-gray-100"
          >
            <h2
              className="text-3xl md:text-4xl font-extrabold text-daar-blue mb-4"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              Benieuwd wat Daar voor jullie kost?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Elke organisatie is anders. Neem contact met ons op voor een prijsopgave op maat.
              We kijken samen welke onderdelen bij jullie passen en sturen je een voorstel dat
              past bij het aantal vrijwilligers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-brandGreen text-white font-bold px-8 py-4 rounded-full hover:bg-brandGreenHover transition-all shadow-lg shadow-green-200/50 flex items-center justify-center group"
              >
                <MessageSquare className="mr-2" size={20} />
                Vraag een prijsopgave aan
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link
                href="/afspraak"
                className="bg-white text-daar-blue border-2 border-daar-blue font-bold px-8 py-4 rounded-full hover:bg-daar-blue/5 transition-colors text-center shadow-sm"
              >
                Plan een kennismaking
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Slider styles */}
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
