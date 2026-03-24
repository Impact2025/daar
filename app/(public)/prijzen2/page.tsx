'use client';

import React, { useState, useMemo } from 'react';
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
  Calculator,
  MessageSquare,
  FileText,
  Zap,
  ChevronDown,
  ChevronUp,
  Tag,
  Receipt,
} from 'lucide-react';

// ─── Tariefschijven uit Excel 20260209-prijsDaar ─────────────────────────────
interface Schijf {
  label: string;
  min: number;
  max: number;
  centraalDossier: number;
  communicatie: number;
  vrijwilligersCheck: number;
  declaratie: number;
}

const SCHIJVEN: Schijf[] = [
  { label: 'Schijf 1', min: 15,   max: 50,   centraalDossier: 1.70, communicatie: 0.75, vrijwilligersCheck: 1.00, declaratie: 2.00 },
  { label: 'Schijf 2', min: 51,   max: 100,  centraalDossier: 1.55, communicatie: 0.75, vrijwilligersCheck: 1.00, declaratie: 1.90 },
  { label: 'Schijf 3', min: 101,  max: 250,  centraalDossier: 1.40, communicatie: 0.75, vrijwilligersCheck: 1.00, declaratie: 1.80 },
  { label: 'Schijf 4', min: 251,  max: 500,  centraalDossier: 1.25, communicatie: 0.60, vrijwilligersCheck: 0.90, declaratie: 1.70 },
  { label: 'Schijf 5', min: 501,  max: 750,  centraalDossier: 1.05, communicatie: 0.60, vrijwilligersCheck: 0.90, declaratie: 1.60 },
  { label: 'Schijf 6', min: 751,  max: 1000, centraalDossier: 0.90, communicatie: 0.60, vrijwilligersCheck: 0.90, declaratie: 1.60 },
  { label: 'Schijf 7', min: 1001, max: 1500, centraalDossier: 0.75, communicatie: 0.45, vrijwilligersCheck: 0.80, declaratie: 1.60 },
  { label: 'Schijf 8', min: 1501, max: 2000, centraalDossier: 0.60, communicatie: 0.45, vrijwilligersCheck: 0.80, declaratie: 1.60 },
  { label: 'Schijf 9', min: 2001, max: 2500, centraalDossier: 0.45, communicatie: 0.45, vrijwilligersCheck: 0.80, declaratie: 1.60 },
];

const ANNUAL_DISCOUNT = 0.15; // 15% korting bij jaarcontract

function getSchijf(volunteers: number): Schijf | null {
  return SCHIJVEN.find(s => volunteers >= s.min && volunteers <= s.max) ?? null;
}

// ─── Module definities ────────────────────────────────────────────────────────
interface ModuleDef {
  id: 'cd' | 'comm' | 'vcheck' | 'declaratie';
  name: string;
  shortName: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  includes: string[];
  aiPowered?: boolean;
}

const MODULE_DEFS: ModuleDef[] = [
  {
    id: 'cd',
    name: 'Centraal Dossier',
    shortName: 'Dossier',
    description: 'Het hart van jouw vrijwilligersorganisatie. Alles op één plek.',
    icon: <FileText className="w-5 h-5" />,
    color: '#3BA273',
    bgColor: 'bg-brandGreen/10',
    includes: [
      'Vrijwilligersdossiers & overzichten',
      'Rooster & planning',
      'Automatische urenregistratie',
      'AI onboarding (basis)',
    ],
    aiPowered: true,
  },
  {
    id: 'comm',
    name: 'Communicatie & Engagement',
    shortName: 'Communicatie',
    description: 'Houd vrijwilligers betrokken met slimme communicatietools.',
    icon: <MessageSquare className="w-5 h-5" />,
    color: '#8ECAE6',
    bgColor: 'bg-daar-helder/10',
    includes: [
      'Interne chat & berichten',
      'Geautomatiseerde nieuwsbrief (AI)',
    ],
    aiPowered: true,
  },
  {
    id: 'vcheck',
    name: 'VrijwilligersCheck',
    shortName: 'Welzijn & Impact',
    description: 'Meet het welzijn van vrijwilligers en toon de maatschappelijke impact.',
    icon: <Heart className="w-5 h-5" />,
    color: '#E76F51',
    bgColor: 'bg-daar-koraal/10',
    includes: [
      'Welzijnscheck (stoplicht-systeem)',
      'Geluksmomenten registreren',
      'Impact dashboard voor bestuur',
      'Subsidie-rapportages',
    ],
  },
  {
    id: 'declaratie',
    name: 'Declaratie',
    shortName: 'Declaratie',
    description: 'Onkostendeclaraties eenvoudig ingediend en goedgekeurd, rechtstreeks in het platform.',
    icon: <Receipt className="w-5 h-5" />,
    color: '#F4A261',
    bgColor: 'bg-orange-100',
    includes: [
      'Onkostendeclaraties indienen',
      'Goedkeuringsworkflow voor coördinatoren',
      'Overzicht per vrijwilliger & periode',
      'Exporteren voor administratie',
    ],
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function Prijzen2Page() {
  const [numVolunteers, setNumVolunteers] = useState(125);
  const [selectedModules, setSelectedModules] = useState<Set<string>>(
    new Set(['cd', 'comm', 'vcheck'])
  );
  const [isAnnual, setIsAnnual] = useState(false);
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [hoursPerMonth, setHoursPerMonth] = useState(6);
  const [showTiersTable, setShowTiersTable] = useState(false);

  const isOnRequest = numVolunteers > 2500;
  const currentSchijf = useMemo(() => getSchijf(numVolunteers), [numVolunteers]);

  const toggleModule = (id: string) => {
    setSelectedModules(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Prijs per vrijwilliger per maand (gesommeerd over geselecteerde modules)
  const pricePerVolunteerPerMonth = useMemo(() => {
    if (!currentSchijf || isOnRequest) return 0;
    let total = 0;
    if (selectedModules.has('cd')) total += currentSchijf.centraalDossier;
    if (selectedModules.has('comm')) total += currentSchijf.communicatie;
    if (selectedModules.has('vcheck')) total += currentSchijf.vrijwilligersCheck;
    if (selectedModules.has('declaratie')) total += currentSchijf.declaratie;
    return total;
  }, [currentSchijf, selectedModules, isOnRequest]);

  const monthlyTotal = pricePerVolunteerPerMonth * numVolunteers;
  const yearlyTotal = monthlyTotal * 12;
  const yearlyTotalDiscounted = yearlyTotal * (1 - ANNUAL_DISCOUNT);
  const monthlyEquivalentAnnual = yearlyTotalDiscounted / 12;

  const displayMonthly = isAnnual ? monthlyEquivalentAnnual : monthlyTotal;
  const displayYearly = isAnnual ? yearlyTotalDiscounted : yearlyTotal;

  // ROI / impact
  const volunteerHourValue = 25.04;
  const volunteerValuePerMonth = numVolunteers * hoursPerMonth * volunteerHourValue;
  const roi = displayYearly > 0
    ? ((volunteerValuePerMonth * 12 - displayYearly) / displayYearly) * 100
    : 0;

  const fmt = (n: number) =>
    n.toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtInt = (n: number) =>
    n.toLocaleString('nl-NL', { maximumFractionDigits: 0 });

  return (
    <div className="bg-white">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-10 pb-16 lg:pt-16 lg:pb-20 overflow-hidden bg-gradient-to-br from-offWhite via-white to-lightGreen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-5 py-2.5 rounded-full bg-brandGreen/10 border border-brandGreen/30 text-brandGreen text-sm font-semibold mb-8"
            >
              <Calculator size={16} className="mr-2" />
              Volumetarieven &mdash; eerlijk schalen
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
              className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Betaal per vrijwilliger per maand. Hoe meer vrijwilligers, hoe lager het tarief.
              Kies de modules die bij jouw organisatie passen.
            </motion.p>

            {/* Annual toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex items-center gap-4 bg-white rounded-full px-6 py-3 shadow-md border border-gray-100"
            >
              <span className={`text-sm font-semibold ${!isAnnual ? 'text-daar-blue' : 'text-gray-400'}`}>
                Maandelijks
              </span>
              <button
                onClick={() => setIsAnnual(!isAnnual)}
                className={`relative w-14 h-7 rounded-full transition-colors ${
                  isAnnual ? 'bg-brandGreen' : 'bg-gray-200'
                }`}
              >
                <motion.div
                  className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow"
                  animate={{ x: isAnnual ? 28 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </button>
              <span className={`text-sm font-semibold ${isAnnual ? 'text-brandGreen' : 'text-gray-400'}`}>
                Jaarlijks
              </span>
              {isAnnual && (
                <span className="bg-brandGreen text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  15% korting
                </span>
              )}
            </motion.div>
          </div>
        </div>
        <div className="absolute top-20 right-10 w-72 h-72 bg-brandGreen/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-daar-helder/10 rounded-full blur-3xl" />
      </section>

      {/* ── Calculator ────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Left: Input & modules */}
            <div className="space-y-8">

              {/* Vrijwilligers slider */}
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

                {/* Schijf indicator */}
                <AnimatePresence mode="wait">
                  {isOnRequest ? (
                    <motion.div
                      key="aanvraag"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-5 p-4 bg-daar-geel/20 border border-daar-geel/40 rounded-2xl flex items-center gap-3"
                    >
                      <Tag size={18} className="text-daar-blue flex-shrink-0" />
                      <p className="text-sm text-daar-blue font-semibold">
                        Meer dan 2.500 vrijwilligers? Wij maken een offerte op maat voor jouw organisatie.
                      </p>
                    </motion.div>
                  ) : currentSchijf ? (
                    <motion.div
                      key={currentSchijf.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-5 p-4 bg-lightGreen border border-brandGreen/20 rounded-2xl flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-brandGreen" />
                        <span className="text-sm font-bold text-daar-blue">{currentSchijf.label}</span>
                        <span className="text-sm text-gray-600">
                          ({currentSchijf.min}–{currentSchijf.max} vrijwilligers)
                        </span>
                      </div>
                      <button
                        onClick={() => setShowTiersTable(!showTiersTable)}
                        className="text-xs text-brandGreen font-semibold flex items-center gap-1 hover:underline"
                      >
                        Alle schijven
                        {showTiersTable ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                {/* Tariefschijven tabel */}
                <AnimatePresence>
                  {showTiersTable && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 overflow-hidden"
                    >
                      <div className="overflow-x-auto rounded-2xl border border-gray-100">
                        <table className="w-full text-xs">
                          <thead>
                            <tr className="bg-gray-50 text-gray-500 uppercase">
                              <th className="px-3 py-2 text-left font-semibold">Vrijwilligers</th>
                              <th className="px-3 py-2 text-right font-semibold">Dossier</th>
                              <th className="px-3 py-2 text-right font-semibold">Comm.</th>
                              <th className="px-3 py-2 text-right font-semibold">Check</th>
                              <th className="px-3 py-2 text-right font-semibold">Decl.</th>
                              <th className="px-3 py-2 text-right font-semibold text-brandGreen">Totaal</th>
                            </tr>
                          </thead>
                          <tbody>
                            {SCHIJVEN.map((s) => {
                              const isActive = currentSchijf?.label === s.label;
                              return (
                                <tr
                                  key={s.label}
                                  className={`border-t border-gray-50 ${
                                    isActive ? 'bg-lightGreen font-bold text-daar-blue' : 'text-gray-600'
                                  }`}
                                >
                                  <td className="px-3 py-2">
                                    {s.min}–{s.max}
                                  </td>
                                  <td className="px-3 py-2 text-right">€{s.centraalDossier.toFixed(2)}</td>
                                  <td className="px-3 py-2 text-right">€{s.communicatie.toFixed(2)}</td>
                                  <td className="px-3 py-2 text-right">€{s.vrijwilligersCheck.toFixed(2)}</td>
                                  <td className="px-3 py-2 text-right">€{s.declaratie.toFixed(2)}</td>
                                  <td className="px-3 py-2 text-right text-brandGreen">
                                    €{(s.centraalDossier + s.communicatie + s.vrijwilligersCheck + s.declaratie).toFixed(2)}
                                  </td>
                                </tr>
                              );
                            })}
                            <tr className="border-t border-gray-200 bg-gray-50 text-gray-500 italic">
                              <td className="px-3 py-2">&gt; 2.500</td>
                              <td colSpan={5} className="px-3 py-2 text-center">Op aanvraag</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p className="text-xs text-gray-400 mt-2 px-1">
                        * Prijzen per vrijwilliger per maand, excl. BTW. Bij jaarcontract 15% korting.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Module selectie */}
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
                  {MODULE_DEFS.map((mod, index) => {
                    const isSelected = selectedModules.has(mod.id);
                    const isExpanded = expandedModule === mod.id;
                    const tierPrice = currentSchijf
                      ? mod.id === 'cd'
                        ? currentSchijf.centraalDossier
                        : mod.id === 'comm'
                        ? currentSchijf.communicatie
                        : mod.id === 'vcheck'
                        ? currentSchijf.vrijwilligersCheck
                        : currentSchijf.declaratie
                      : null;

                    return (
                      <motion.div
                        key={mod.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={`rounded-2xl border-2 transition-all ${
                          isSelected
                            ? 'border-brandGreen bg-lightGreen shadow-md'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        {/* Module header */}
                        <div
                          className="p-5 cursor-pointer"
                          onClick={() => toggleModule(mod.id)}
                        >
                          <div className="flex items-start gap-4">
                            {/* Toggle */}
                            <div className="flex-shrink-0 mt-0.5">
                              <div
                                className={`relative w-14 h-8 rounded-full transition-all ${
                                  isSelected ? 'bg-brandGreen' : 'bg-gray-300'
                                }`}
                              >
                                <motion.div
                                  className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md"
                                  animate={{ x: isSelected ? 24 : 0 }}
                                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                                />
                              </div>
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <div
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${mod.bgColor}`}
                                    style={{ color: mod.color }}
                                  >
                                    {mod.icon}
                                  </div>
                                  <h3 className="font-bold text-daar-blue">{mod.name}</h3>
                                  {mod.aiPowered && (
                                    <span className="text-xs bg-purple-100 text-purple-600 font-semibold px-2 py-0.5 rounded-full">
                                      AI
                                    </span>
                                  )}
                                </div>
                                <div className="text-right flex-shrink-0">
                                  {tierPrice !== null && !isOnRequest ? (
                                    <>
                                      <div className="font-bold text-brandGreen">€{fmt(tierPrice)}</div>
                                      <div className="text-xs text-gray-500">p/vw/mnd</div>
                                    </>
                                  ) : (
                                    <div className="text-xs text-gray-400 italic">op aanvraag</div>
                                  )}
                                </div>
                              </div>
                              <p className="text-sm text-gray-600">{mod.description}</p>
                            </div>
                          </div>
                        </div>

                        {/* Inbegrepen uitklappen */}
                        <div className="px-5 pb-3">
                          <button
                            onClick={() => setExpandedModule(isExpanded ? null : mod.id)}
                            className="text-xs text-gray-500 hover:text-brandGreen flex items-center gap-1 transition-colors"
                          >
                            Wat is inbegrepen?
                            {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                          </button>

                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="overflow-hidden"
                              >
                                <ul className="mt-3 space-y-1.5 border-t border-gray-100 pt-3">
                                  {mod.includes.map((item) => (
                                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                                      <Check size={14} className="text-brandGreen flex-shrink-0" />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Maandtotaal indien geselecteerd */}
                        {isSelected && tierPrice !== null && !isOnRequest && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="mx-5 mb-4 pt-3 border-t border-brandGreen/20"
                          >
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">Subtotaal ({numVolunteers} vw)</span>
                              <span className="font-semibold text-daar-blue">
                                €{fmtInt(tierPrice * numVolunteers)}/mnd
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {selectedModules.size === 0 && (
                  <div className="mt-6 p-4 bg-daar-geel/20 rounded-2xl border border-daar-geel/30">
                    <p className="text-sm text-daar-blue">
                      Selecteer minimaal één module om de prijs te berekenen.
                    </p>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Right: Resultaten */}
            <div className="lg:sticky lg:top-8 space-y-6" style={{ height: 'fit-content' }}>

              {/* Prijs samenvatting */}
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

                {isOnRequest ? (
                  <div className="space-y-6">
                    <div className="bg-white/10 rounded-2xl p-6 text-center">
                      <p className="text-4xl font-extrabold text-daar-geel mb-3">Maatwerk</p>
                      <p className="text-white/80 text-sm leading-relaxed">
                        Met meer dan 2.500 vrijwilligers werken we met een prijsvoorstel op maat.
                        Neem contact op voor een persoonlijk gesprek.
                      </p>
                    </div>
                    <Link
                      href="/afspraak"
                      className="block w-full bg-brandGreen text-white text-center font-bold px-6 py-4 rounded-xl hover:bg-brandGreenHover transition-all shadow-lg group"
                    >
                      <span className="flex items-center justify-center gap-2">
                        Plan een gesprek
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  </div>
                ) : selectedModules.size === 0 ? (
                  <div className="bg-white/10 rounded-2xl p-6 text-center">
                    <p className="text-white/70 text-sm">Selecteer modules om de prijs te berekenen.</p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {/* Per vrijwilliger */}
                    <div className="pb-5 border-b border-white/20">
                      <p className="text-white/70 text-sm mb-1">Per vrijwilliger per maand</p>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={pricePerVolunteerPerMonth}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="text-3xl font-extrabold"
                        >
                          €{fmt(isAnnual ? pricePerVolunteerPerMonth * (1 - ANNUAL_DISCOUNT) : pricePerVolunteerPerMonth)}
                        </motion.div>
                      </AnimatePresence>
                      {isAnnual && (
                        <p className="text-white/50 text-xs mt-1 line-through">
                          €{fmt(pricePerVolunteerPerMonth)} normaal
                        </p>
                      )}
                    </div>

                    {/* Totaal per maand */}
                    <div className="pb-5 border-b border-white/20">
                      <p className="text-white/70 text-sm mb-1">
                        Totaal per maand{isAnnual ? ' (bij jaarcontract)' : ''}
                      </p>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={displayMonthly}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.05 }}
                          className="text-5xl font-extrabold text-daar-geel"
                        >
                          €{fmtInt(displayMonthly)}
                        </motion.div>
                      </AnimatePresence>
                      <p className="text-white/60 text-xs mt-1">excl. BTW</p>
                    </div>

                    {/* Totaal per jaar */}
                    <div className="pb-5 border-b border-white/20">
                      <p className="text-white/70 text-sm mb-1">Totaal per jaar</p>
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={displayYearly}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-3xl font-bold"
                        >
                          €{fmtInt(displayYearly)}
                        </motion.div>
                      </AnimatePresence>
                      {isAnnual && (
                        <p className="text-white/50 text-xs mt-1">
                          Besparing: €{fmtInt(yearlyTotal - yearlyTotalDiscounted)} per jaar
                        </p>
                      )}
                    </div>

                    {/* Prijsopbouw */}
                    {currentSchijf && (
                      <div className="space-y-2">
                        <p className="text-white/70 text-xs font-semibold uppercase tracking-wide mb-3">
                          Opbouw per vrijwilliger
                        </p>
                        {selectedModules.has('cd') && (
                          <div className="flex justify-between text-sm">
                            <span className="text-white/80">Centraal Dossier</span>
                            <span className="font-semibold">€{fmt(currentSchijf.centraalDossier)}</span>
                          </div>
                        )}
                        {selectedModules.has('comm') && (
                          <div className="flex justify-between text-sm">
                            <span className="text-white/80">Communicatie</span>
                            <span className="font-semibold">€{fmt(currentSchijf.communicatie)}</span>
                          </div>
                        )}
                        {selectedModules.has('vcheck') && (
                          <div className="flex justify-between text-sm">
                            <span className="text-white/80">VrijwilligersCheck</span>
                            <span className="font-semibold">€{fmt(currentSchijf.vrijwilligersCheck)}</span>
                          </div>
                        )}
                        {selectedModules.has('declaratie') && (
                          <div className="flex justify-between text-sm">
                            <span className="text-white/80">Declaratie</span>
                            <span className="font-semibold">€{fmt(currentSchijf.declaratie)}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-sm pt-2 border-t border-white/20 font-bold">
                          <span>Totaal p/vw/mnd</span>
                          <span className="text-daar-geel">
                            €{fmt(isAnnual ? pricePerVolunteerPerMonth * (1 - ANNUAL_DISCOUNT) : pricePerVolunteerPerMonth)}
                          </span>
                        </div>
                      </div>
                    )}

                    <Link
                      href="/afspraak"
                      className="block w-full bg-brandGreen text-white text-center font-bold px-6 py-4 rounded-xl hover:bg-brandGreenHover transition-all shadow-lg group"
                    >
                      <span className="flex items-center justify-center gap-2">
                        Vraag offerte aan
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  </div>
                )}
              </motion.div>

              {/* Impact & ROI */}
              {!isOnRequest && selectedModules.size > 0 && displayYearly > 0 && (
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
                      <p className="text-white/80 text-sm mb-2">Return on Investment (ROI)</p>
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={roi}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.1 }}
                          className="text-5xl font-extrabold text-daar-geel"
                        >
                          {fmtInt(roi)}%
                        </motion.p>
                      </AnimatePresence>
                      <p className="text-white/80 text-sm mt-2">
                        Besparing per jaar:{' '}
                        <span className="font-bold">
                          €{fmtInt(volunteerValuePerMonth * 12 - displayYearly)}
                        </span>
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
              )}

              {/* Inbegrepen in alle pakketten */}
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
                    <h3 className="font-bold text-daar-blue mb-3">Altijd inbegrepen</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center gap-2">
                        <Check size={14} className="text-brandGreen flex-shrink-0" />
                        Gratis demo & begeleide onboarding
                      </li>
                      <li className="flex items-center gap-2">
                        <Check size={14} className="text-brandGreen flex-shrink-0" />
                        Maandelijks opzegbaar (of 15% korting op jaarbasis)
                      </li>
                      <li className="flex items-center gap-2">
                        <Check size={14} className="text-brandGreen flex-shrink-0" />
                        Geen setup- of implementatiekosten
                      </li>
                      <li className="flex items-center gap-2">
                        <Check size={14} className="text-brandGreen flex-shrink-0" />
                        Automatische updates & nieuwe features
                      </li>
                      <li className="flex items-center gap-2">
                        <Check size={14} className="text-brandGreen flex-shrink-0" />
                        AVG/GDPR-compliant platform
                      </li>
                      <li className="flex items-center gap-2">
                        <Zap size={14} className="text-brandGreen flex-shrink-0" />
                        Minimale afname: 15 vrijwilligers
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tariefschijven overzicht ──────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-br from-offWhite to-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2
              className="text-3xl font-extrabold text-daar-blue mb-3"
              style={{ fontFamily: 'Nunito, sans-serif' }}
            >
              Hoe groter, hoe voordeliger
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Onze tarieven schalen mee met jouw organisatie. Alle drie modules samen,
              excl. BTW per vrijwilliger per maand.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-daar-blue text-white">
                    <th className="px-6 py-4 text-left font-semibold">Vrijwilligers</th>
                    <th className="px-6 py-4 text-right font-semibold">Centraal Dossier</th>
                    <th className="px-6 py-4 text-right font-semibold">Communicatie</th>
                    <th className="px-6 py-4 text-right font-semibold">VrijwilligersCheck</th>
                    <th className="px-6 py-4 text-right font-semibold">Declaratie</th>
                    <th className="px-6 py-4 text-right font-semibold text-daar-geel">Totaal p/vw/mnd</th>
                  </tr>
                </thead>
                <tbody>
                  {SCHIJVEN.map((s, i) => {
                    const total = s.centraalDossier + s.communicatie + s.vrijwilligersCheck + s.declaratie;
                    const isActive = currentSchijf?.label === s.label;
                    return (
                      <tr
                        key={s.label}
                        className={`border-t border-gray-100 transition-colors ${
                          isActive
                            ? 'bg-lightGreen font-bold'
                            : i % 2 === 0
                            ? 'bg-white'
                            : 'bg-gray-50/50'
                        }`}
                      >
                        <td className="px-6 py-4 text-daar-blue">
                          {isActive && (
                            <span className="inline-flex items-center gap-1.5 text-brandGreen mr-2 text-xs font-bold">
                              <div className="w-2 h-2 rounded-full bg-brandGreen" />
                              Jij
                            </span>
                          )}
                          {s.min}–{s.max} vrijwilligers
                        </td>
                        <td className="px-6 py-4 text-right text-gray-700">€{s.centraalDossier.toFixed(2)}</td>
                        <td className="px-6 py-4 text-right text-gray-700">€{s.communicatie.toFixed(2)}</td>
                        <td className="px-6 py-4 text-right text-gray-700">€{s.vrijwilligersCheck.toFixed(2)}</td>
                        <td className="px-6 py-4 text-right text-gray-700">€{s.declaratie.toFixed(2)}</td>
                        <td className="px-6 py-4 text-right font-bold text-brandGreen text-lg">
                          €{total.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                  <tr className="border-t-2 border-gray-200 bg-gray-50 text-gray-500">
                    <td className="px-6 py-4 italic">&gt; 2.500 vrijwilligers</td>
                    <td colSpan={5} className="px-6 py-4 text-center italic">Op aanvraag</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 text-xs text-gray-500">
              Alle prijzen excl. BTW • Bij jaarcontract 15% korting op bovenstaande tarieven
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
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
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link
                href="/contact"
                className="bg-white text-daar-blue border-2 border-daar-blue font-bold px-8 py-4 rounded-full hover:bg-daar-blue/5 transition-colors text-center shadow-sm"
              >
                Neem contact op
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
