'use client';

import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Heart, Users, Clock, PiggyBank, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface StatCard {
  id: number;
  category: string;
  value: string;
  prefix?: string;
  suffix?: string;
  title: string;
  description: string;
  highlight?: string;
  color: string;
  bgColor: string;
  textColor: string;
  icon: React.ReactNode;
  animated?: boolean;
}

const stats: StatCard[] = [
  {
    id: 1,
    category: 'TIJDSBESPARING',
    value: '156',
    suffix: 'u',
    title: 'Administratieve efficiëntie per jaar',
    description: '12-15 uur/week besparing voor coördinatoren',
    highlight: '€26.500 waarde/jaar',
    color: 'daar-geel',
    bgColor: '#D4A84B',
    textColor: '#FFFFFF',
    icon: <Clock className="w-5 h-5" />,
    animated: false
  },
  {
    id: 2,
    category: 'TEVREDENHEID',
    value: '90',
    suffix: '%',
    title: 'Van gemotiveerd gematchte vrijwilligers',
    description: '+2.5 punten op VSI-schaal (3.5x hoger dan ongematchd)',
    highlight: '90% kans op doorgaan',
    color: 'daar-koraal',
    bgColor: '#E07A5A',
    textColor: '#FFFFFF',
    icon: <Heart className="w-5 h-5" />,
    animated: false
  },
  {
    id: 3,
    category: 'RETENTIE',
    value: '17',
    prefix: '+',
    suffix: '%',
    title: 'Verbeterde retentierate',
    description: '65% baseline → 75-80% met Daar (eerste 30 dagen cruciaal)',
    highlight: '~10-15 extra vrijwilligers per 100',
    color: 'daar-helder',
    bgColor: '#5BA3BD',
    textColor: '#FFFFFF',
    icon: <Users className="w-5 h-5" />,
    animated: false
  },
  {
    id: 4,
    category: 'IMPACT',
    value: '3',
    prefix: '+',
    suffix: 'x',
    title: 'Meer inzicht in sociaal impact',
    description: 'Via GMU/GMA meting + Geluksmomentenshop',
    highlight: '13% productiviteitsstijging',
    color: 'daar-mint',
    bgColor: '#4BA99B',
    textColor: '#FFFFFF',
    icon: <TrendingUp className="w-5 h-5" />,
    animated: false
  },
  {
    id: 5,
    category: 'ROI',
    value: '667',
    suffix: '%',
    title: 'Return on Investment in jaar 1',
    description: '30-45% administratieve overhead reductie',
    highlight: 'Payback in 3-4 maanden',
    color: 'daar-blue',
    bgColor: '#2D334A',
    textColor: '#FFFFFF',
    icon: <PiggyBank className="w-5 h-5" />,
    animated: true
  }
];

// Animated counter hook
const useCountUp = (end: number, duration: number = 2000, start: number = 0, shouldStart: boolean = false) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime: number | null = null;
    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * (end - start) + start));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, start, shouldStart]);

  return count;
};

const StatCardComponent: React.FC<{ stat: StatCard; index: number; isVisible: boolean }> = ({ stat, index, isVisible }) => {
  const numericValue = parseInt(stat.value);
  // Only animate if stat.animated is true
  const shouldAnimate = stat.animated === true;
  const count = useCountUp(numericValue, 2500, 0, isVisible && shouldAnimate);

  // Display value: animated count or static value
  const displayValue = shouldAnimate ? (isVisible ? count : 0) : stat.value;

  return (
    <div
      className="group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1"
      style={{
        backgroundColor: stat.bgColor
      }}
    >
      {/* Decorative gradient overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)`
        }}
      />

      {/* Content */}
      <div className="relative p-5 lg:p-6 h-full flex flex-col min-h-[280px]">
        {/* Category Badge */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold tracking-wider mb-4 w-fit"
          style={{
            backgroundColor: 'rgba(255,255,255,0.2)',
            color: '#FFFFFF'
          }}
        >
          {stat.icon}
          {stat.category}
        </div>

        {/* Value */}
        <div className="mb-2">
          <span
            className="text-4xl lg:text-5xl font-extrabold leading-none"
            style={{ color: stat.textColor, fontFamily: 'Nunito, sans-serif' }}
          >
            {stat.prefix}
            {displayValue}
            {stat.suffix}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-sm lg:text-base font-bold mb-2 leading-tight"
          style={{ color: stat.textColor }}
        >
          {stat.title}
        </h3>

        {/* Description */}
        <p
          className="text-xs leading-relaxed flex-grow"
          style={{
            color: 'rgba(255,255,255,0.8)'
          }}
        >
          {stat.description}
        </p>

        {/* Highlight Badge */}
        {stat.highlight && (
          <div
            className="mt-3 px-3 py-2 rounded-xl text-xs font-semibold text-center"
            style={{
              backgroundColor: 'rgba(255,255,255,0.15)',
              color: '#FFFFFF'
            }}
          >
            {stat.highlight}
          </div>
        )}

        {/* Decorative corner element */}
        <div
          className="absolute -bottom-8 -right-8 w-20 h-20 rounded-full opacity-20"
          style={{
            backgroundColor: '#FFFFFF',
            filter: 'blur(20px)'
          }}
        />
      </div>
    </div>
  );
};

const ImpactStats: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #2D334A 1px, transparent 0)`,
          backgroundSize: '32px 32px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mb-12 lg:mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-daar-mint/10 text-daar-mint text-sm font-semibold mb-6">
            <Sparkles size={16} className="mr-2" />
            Bewezen resultaten
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-daar-blue mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Impact die je kunt{' '}
<span className="text-brandGreen">meten.</span>
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed">
            Organisaties die Daar gebruiken zien direct resultaat. Van minder administratie tot gelukkigere vrijwilligers — onze cijfers spreken voor zich.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
          {stats.map((stat, index) => (
            <StatCardComponent
              key={stat.id}
              stat={stat}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Footnote & CTA */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-xs text-gray-500 max-w-xl">
            *Bronnen: Better Impact case studies, NCVO (2023), VSI-framework, Oxford-onderzoek, DAAR Geluksformule, VolunteerHub/BetterImpact ROI-analyse
          </p>

          <Link
            href="/afspraak"
            className="inline-flex items-center gap-2 bg-daar-blue text-white font-bold px-6 py-3 rounded-full hover:bg-daar-blue/90 transition-all shadow-lg group whitespace-nowrap"
          >
            Bereken jouw ROI
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
