'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Smile,
  Users,
  BarChart2,
  Shield,
  Receipt,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Heart,
  TrendingUp,
  Check
} from 'lucide-react';

interface Tool {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgGradient: string;
  accentColor: string;
  features: string[];
  stats?: { label: string; value: string };
}

const tools: Tool[] = [
  {
    id: 1,
    title: 'Vrijwilligers Check',
    subtitle: 'De Geluksformule',
    description: 'Signaleer overbelasting vroegtijdig met ons slimme stoplicht-systeem. Gebaseerd op jarenlange praktijkervaring.',
    icon: <Smile className="w-8 h-8" />,
    color: 'daar-geel',
    bgGradient: 'from-daar-geel via-daar-geel/90 to-amber-400',
    accentColor: '#FFD166',
    features: ['Stoplicht-systeem', 'Automatische checks', 'Vroege signalering'],
    stats: { label: 'Tevredenheid', value: '94%' }
  },
  {
    id: 2,
    title: 'Smart Matching',
    subtitle: 'De perfecte match',
    description: 'Een Tinder-achtige ervaring om de perfecte vrijwilliger te vinden voor elke klus. Swipe naar succes.',
    icon: <Users className="w-8 h-8" />,
    color: 'daar-koraal',
    bgGradient: 'from-daar-koraal via-daar-koraal/90 to-orange-400',
    accentColor: '#FF8C66',
    features: ['Swipe interface', 'Skill matching', 'Beschikbaarheid sync'],
    stats: { label: 'Match rate', value: '87%' }
  },
  {
    id: 3,
    title: 'Impact Dashboard',
    subtitle: 'Maak je waarde zichtbaar',
    description: 'Genereer real-time rapporten voor gemeenten en fondsen. Koppel inzet direct aan SDG\'s.',
    icon: <BarChart2 className="w-8 h-8" />,
    color: 'daar-mint',
    bgGradient: 'from-daar-mint via-daar-mint/90 to-teal-400',
    accentColor: '#83D4C8',
    features: ['Real-time data', 'SDG koppeling', 'Export rapporten'],
    stats: { label: 'Uren bespaard', value: '156u' }
  },
  {
    id: 4,
    title: 'Centraal Dossier',
    subtitle: 'Alles op één plek',
    description: 'Alle VOG\'s, contracten en notities veilig opgeslagen in één AVG-proof omgeving.',
    icon: <Shield className="w-8 h-8" />,
    color: 'daar-helder',
    bgGradient: 'from-daar-helder via-daar-helder/90 to-sky-400',
    accentColor: '#8ECAE6',
    features: ['AVG-proof', 'Documentbeheer', 'Veilige opslag'],
    stats: { label: 'Compliance', value: '100%' }
  },
  {
    id: 5,
    title: 'Declaratie App',
    subtitle: 'Snel & foutloos',
    description: 'Laat vrijwilligers bonnetjes scannen en declareren. Transparant en makkelijk te verwerken.',
    icon: <Receipt className="w-8 h-8" />,
    color: 'daar-geel',
    bgGradient: 'from-amber-400 via-daar-geel to-yellow-300',
    accentColor: '#FFD166',
    features: ['Scan & go', 'Auto-categorisatie', 'Snelle goedkeuring'],
    stats: { label: 'Verwerktijd', value: '-80%' }
  },
  {
    id: 6,
    title: 'Communicatie Hub',
    subtitle: 'Blijf verbonden',
    description: 'Chat met groepen, deel nieuws en vier successen met \'Vrijwilliger van de maand\' updates.',
    icon: <MessageCircle className="w-8 h-8" />,
    color: 'daar-koraal',
    bgGradient: 'from-rose-400 via-daar-koraal to-orange-400',
    accentColor: '#FF8C66',
    features: ['Groepschat', 'Nieuwsfeed', 'Erkenning systeem'],
    stats: { label: 'Engagement', value: '+45%' }
  }
];

const ToolsCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % tools.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + tools.length) % tools.length);
  }, []);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Touch/drag handlers
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setIsAutoPlaying(false);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragStartX(clientX);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    setDragOffset(clientX - dragStartX);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (Math.abs(dragOffset) > 80) {
      if (dragOffset > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    }

    setDragOffset(0);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Calculate card positions
  const getCardStyle = (index: number): React.CSSProperties => {
    const diff = index - activeIndex;
    const totalCards = tools.length;

    // Handle wrapping
    let normalizedDiff = diff;
    if (diff > totalCards / 2) normalizedDiff = diff - totalCards;
    if (diff < -totalCards / 2) normalizedDiff = diff + totalCards;

    const isActive = normalizedDiff === 0;
    const isNext = normalizedDiff === 1;
    const isPrev = normalizedDiff === -1;
    const isSecondNext = normalizedDiff === 2;
    const isSecondPrev = normalizedDiff === -2;

    let translateX = normalizedDiff * 320;
    let translateZ = 0;
    let rotateY = 0;
    let scale = 0.7;
    let opacity = 0;
    let zIndex = 0;

    if (isActive) {
      translateX = 0 + (isDragging ? dragOffset * 0.5 : 0);
      translateZ = 100;
      scale = 1;
      opacity = 1;
      zIndex = 50;
    } else if (isNext) {
      translateX = 280 + (isDragging ? dragOffset * 0.3 : 0);
      translateZ = 0;
      rotateY = -15;
      scale = 0.85;
      opacity = 0.9;
      zIndex = 40;
    } else if (isPrev) {
      translateX = -280 + (isDragging ? dragOffset * 0.3 : 0);
      translateZ = 0;
      rotateY = 15;
      scale = 0.85;
      opacity = 0.9;
      zIndex = 40;
    } else if (isSecondNext) {
      translateX = 480;
      translateZ = -50;
      rotateY = -25;
      scale = 0.7;
      opacity = 0.5;
      zIndex = 30;
    } else if (isSecondPrev) {
      translateX = -480;
      translateZ = -50;
      rotateY = 25;
      scale = 0.7;
      opacity = 0.5;
      zIndex = 30;
    }

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex,
      transition: isDragging ? 'none' : 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    };
  };

  const activeTool = tools[activeIndex];

  return (
    <section className="py-24 bg-gradient-to-b from-white via-daar-helder/5 to-daar-mint/10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-daar-geel/20 border border-daar-geel/30 text-daar-blue text-sm font-semibold mb-6">
            <Sparkles size={16} className="mr-2 text-daar-koraal" />
            Ontdek onze tools
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-daar-blue mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Alles wat je nodig hebt,{' '}
<span className="text-brandGreen">op één plek.</span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            Modulair opgebouwd, dus je betaalt alleen voor wat je gebruikt.
            Swipe door onze tools of klik om te ontdekken.
          </p>
        </div>

        {/* Carousel */}
        <div
          ref={containerRef}
          className="relative h-[520px] perspective-1500"
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          style={{ perspective: '1500px' }}
        >
          {/* Cards Container */}
          <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
            {tools.map((tool, index) => (
              <div
                key={tool.id}
                className="absolute w-[320px] cursor-grab active:cursor-grabbing select-none"
                style={getCardStyle(index)}
                onClick={() => !isDragging && goToSlide(index)}
              >
                {/* Card */}
                <div
                  className={`relative rounded-[2rem] overflow-hidden shadow-2xl bg-gradient-to-br ${tool.bgGradient} p-1`}
                  style={{
                    boxShadow: index === activeIndex
                      ? `0 25px 60px -15px ${tool.accentColor}66, 0 10px 30px -10px ${tool.accentColor}44`
                      : '0 10px 40px -15px rgba(0,0,0,0.2)'
                  }}
                >
                  <div className="bg-white rounded-[1.75rem] p-6 h-[420px] flex flex-col">
                    {/* Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide"
                        style={{ backgroundColor: `${tool.accentColor}22`, color: tool.accentColor }}
                      >
                        {tool.subtitle}
                      </span>
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                        style={{ backgroundColor: tool.accentColor }}
                      >
                        {tool.icon}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-daar-blue mb-3" style={{ fontFamily: 'Nunito, sans-serif' }}>
                      {tool.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                      {tool.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {tool.features.map((feature, i) => (
                        <div key={i} className="flex items-center text-sm">
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center mr-2"
                            style={{ backgroundColor: `${tool.accentColor}22` }}
                          >
                            <Check size={12} style={{ color: tool.accentColor }} strokeWidth={3} />
                          </div>
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Stats */}
                    {tool.stats && (
                      <div
                        className="rounded-2xl p-4 flex items-center justify-between"
                        style={{ backgroundColor: `${tool.accentColor}15` }}
                      >
                        <span className="text-gray-600 text-sm font-medium">{tool.stats.label}</span>
                        <span
                          className="text-2xl font-bold"
                          style={{ color: tool.accentColor }}
                        >
                          {tool.stats.value}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); prevSlide(); }}
            className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-50 w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-daar-blue hover:bg-daar-helder/20 hover:scale-110 transition-all group"
            aria-label="Previous tool"
          >
            <ChevronLeft size={28} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); nextSlide(); }}
            className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-50 w-14 h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-daar-blue hover:bg-daar-helder/20 hover:scale-110 transition-all group"
            aria-label="Next tool"
          >
            <ChevronRight size={28} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center mt-8 gap-6">
          {/* Avatar of active tool */}
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-500"
            style={{ backgroundColor: activeTool.accentColor }}
          >
            {activeTool.icon}
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-2">
            {tools.map((tool, index) => (
              <button
                key={tool.id}
                onClick={() => goToSlide(index)}
                className="group relative h-2 rounded-full overflow-hidden transition-all duration-300"
                style={{
                  width: index === activeIndex ? '80px' : '32px',
                  backgroundColor: index === activeIndex ? `${tool.accentColor}30` : '#E5E7EB'
                }}
                aria-label={`Go to ${tool.title}`}
              >
                {index === activeIndex && (
                  <div
                    className="absolute inset-y-0 left-0 rounded-full animate-progress"
                    style={{ backgroundColor: tool.accentColor }}
                  />
                )}
                {index !== activeIndex && (
                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: tool.accentColor }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Tool counter */}
          <div className="flex items-center gap-1 text-sm font-medium text-gray-500">
            <span className="text-daar-blue font-bold">{String(activeIndex + 1).padStart(2, '0')}</span>
            <span>/</span>
            <span>{String(tools.length).padStart(2, '0')}</span>
          </div>
        </div>

        {/* Active tool info - mobile friendly */}
        <div className="mt-12 text-center lg:hidden">
          <h3
            className="text-xl font-bold mb-2"
            style={{ color: activeTool.accentColor, fontFamily: 'Nunito, sans-serif' }}
          >
            {activeTool.title}
          </h3>
          <p className="text-gray-600 text-sm max-w-md mx-auto">
            {activeTool.description}
          </p>
        </div>
      </div>

      {/* Custom keyframes for progress animation */}
      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-progress {
          animation: progress 4s linear forwards;
        }
      `}</style>
    </section>
  );
};

export default ToolsCarousel;
