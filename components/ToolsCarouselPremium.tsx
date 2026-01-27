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
  Check,
  Star,
  Clock,
  Zap
} from 'lucide-react';
import Image from 'next/image';

interface Tool {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  bgGradient: string;
  accentColor: string;
  lightBg: string;
  features: string[];
  mockupType: 'chat' | 'dashboard' | 'cards' | 'form' | 'list';
}

const tools: Tool[] = [
  {
    id: 1,
    title: 'Vrijwilligers Check',
    subtitle: 'De Geluksformule',
    description: 'Signaleer overbelasting vroegtijdig met ons slimme stoplicht-systeem. Gebaseerd op jarenlange praktijkervaring.',
    icon: <Smile className="w-6 h-6" />,
    color: 'daar-geel',
    bgGradient: 'from-daar-geel via-amber-400 to-yellow-300',
    accentColor: '#FFD166',
    lightBg: '#FFF8E6',
    features: ['Stoplicht-systeem', 'Automatische checks', 'Vroege signalering'],
    mockupType: 'chat'
  },
  {
    id: 2,
    title: 'Smart Matching',
    subtitle: 'De perfecte match',
    description: 'Een Tinder-achtige ervaring om de perfecte vrijwilliger te vinden voor elke klus.',
    icon: <Users className="w-6 h-6" />,
    color: 'daar-koraal',
    bgGradient: 'from-daar-koraal via-orange-400 to-rose-400',
    accentColor: '#FF8C66',
    lightBg: '#FFF0EB',
    features: ['Swipe interface', 'Skill matching', 'Beschikbaarheid sync'],
    mockupType: 'cards'
  },
  {
    id: 3,
    title: 'Impact Dashboard',
    subtitle: 'Maak je waarde zichtbaar',
    description: 'Genereer real-time rapporten voor gemeenten en fondsen. Koppel inzet direct aan SDG\'s.',
    icon: <BarChart2 className="w-6 h-6" />,
    color: 'daar-mint',
    bgGradient: 'from-daar-mint via-teal-400 to-emerald-400',
    accentColor: '#83D4C8',
    lightBg: '#E8F8F5',
    features: ['Real-time data', 'SDG koppeling', 'Export rapporten'],
    mockupType: 'dashboard'
  },
  {
    id: 4,
    title: 'Centraal Dossier',
    subtitle: 'Alles op één plek',
    description: 'Alle VOG\'s, contracten en notities veilig opgeslagen in één AVG-proof omgeving.',
    icon: <Shield className="w-6 h-6" />,
    color: 'daar-helder',
    bgGradient: 'from-daar-helder via-sky-400 to-blue-400',
    accentColor: '#8ECAE6',
    lightBg: '#EBF7FC',
    features: ['AVG-proof', 'Documentbeheer', 'Veilige opslag'],
    mockupType: 'list'
  },
  {
    id: 5,
    title: 'Declaratie App',
    subtitle: 'Snel & foutloos',
    description: 'Laat vrijwilligers bonnetjes scannen en declareren. Transparant en makkelijk.',
    icon: <Receipt className="w-6 h-6" />,
    color: 'daar-geel',
    bgGradient: 'from-amber-400 via-daar-geel to-yellow-300',
    accentColor: '#FFD166',
    lightBg: '#FFF8E6',
    features: ['Scan & go', 'Auto-categorisatie', 'Snelle goedkeuring'],
    mockupType: 'form'
  },
  {
    id: 6,
    title: 'Communicatie Hub',
    subtitle: 'Blijf verbonden',
    description: 'Chat met groepen, deel nieuws en vier successen samen.',
    icon: <MessageCircle className="w-6 h-6" />,
    color: 'daar-koraal',
    bgGradient: 'from-rose-400 via-daar-koraal to-orange-400',
    accentColor: '#FF8C66',
    lightBg: '#FFF0EB',
    features: ['Groepschat', 'Nieuwsfeed', 'Erkenning systeem'],
    mockupType: 'chat'
  }
];

// Phone mockup content components
const ChatMockup: React.FC<{ color: string }> = ({ color }) => (
  <div className="space-y-3 p-4">
    <div className="flex items-start gap-2">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-daar-koraal to-orange-400 flex-shrink-0" />
      <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-4 py-2 max-w-[180px]">
        <p className="text-xs text-gray-700">Hoi! Hoe gaat het met je vrijwilligerswerk?</p>
      </div>
    </div>
    <div className="flex items-start gap-2 justify-end">
      <div className="rounded-2xl rounded-tr-sm px-4 py-2 max-w-[180px] text-white" style={{ backgroundColor: color }}>
        <p className="text-xs">Super! Ik voel me energiek en gewaardeerd 😊</p>
      </div>
    </div>
    <div className="flex items-center gap-2 mt-4">
      <div className="flex -space-x-2">
        <div className="w-6 h-6 rounded-full bg-daar-helder border-2 border-white" />
        <div className="w-6 h-6 rounded-full bg-daar-mint border-2 border-white" />
        <div className="w-6 h-6 rounded-full bg-daar-geel border-2 border-white" />
      </div>
      <span className="text-[10px] text-gray-500">+12 actieve vrijwilligers</span>
    </div>
  </div>
);

const DashboardMockup: React.FC<{ color: string }> = ({ color }) => (
  <div className="p-4">
    <div className="flex items-center justify-between mb-4">
      <span className="text-xs font-semibold text-gray-700">Impact deze maand</span>
      <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ backgroundColor: `${color}30`, color }}>+12%</span>
    </div>
    <div className="flex items-end gap-1.5 h-20 mb-4">
      {[40, 65, 45, 80, 55, 90, 75].map((height, i) => (
        <div
          key={i}
          className="flex-1 rounded-t-lg transition-all duration-500"
          style={{
            height: `${height}%`,
            backgroundColor: i === 6 ? color : `${color}40`,
          }}
        />
      ))}
    </div>
    <div className="grid grid-cols-2 gap-2">
      <div className="bg-gray-50 rounded-xl p-2 text-center">
        <p className="text-lg font-bold text-daar-blue">156</p>
        <p className="text-[10px] text-gray-500">Uren</p>
      </div>
      <div className="bg-gray-50 rounded-xl p-2 text-center">
        <p className="text-lg font-bold" style={{ color }}>94%</p>
        <p className="text-[10px] text-gray-500">Tevredenheid</p>
      </div>
    </div>
  </div>
);

const CardsMockup: React.FC<{ color: string }> = ({ color }) => (
  <div className="p-4 space-y-3">
    <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 transform rotate-2">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-daar-helder to-sky-400" />
        <div>
          <p className="text-xs font-semibold text-daar-blue">Sanne J.</p>
          <p className="text-[10px] text-gray-500">Barvrijwilliger</p>
        </div>
        <Heart className="w-5 h-5 ml-auto" style={{ color }} fill={color} />
      </div>
    </div>
    <div className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 transform -rotate-1">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-daar-mint to-emerald-400" />
        <div>
          <p className="text-xs font-semibold text-daar-blue">Peter K.</p>
          <p className="text-[10px] text-gray-500">Coach</p>
        </div>
        <Star className="w-5 h-5 ml-auto text-daar-geel" fill="#FFD166" />
      </div>
    </div>
    <div className="flex justify-center gap-4 mt-2">
      <button className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
        <ChevronLeft className="w-6 h-6 text-gray-400" />
      </button>
      <button className="w-12 h-12 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: color }}>
        <Heart className="w-6 h-6" />
      </button>
    </div>
  </div>
);

const ListMockup: React.FC<{ color: string }> = ({ color }) => (
  <div className="p-4 space-y-2">
    {['VOG Certificaat', 'Vrijwilligerscontract', 'ID Verificatie'].map((item, i) => (
      <div key={i} className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <Check className="w-4 h-4" style={{ color }} />
        </div>
        <div className="flex-1">
          <p className="text-xs font-medium text-daar-blue">{item}</p>
          <p className="text-[10px] text-gray-500">Geüpload</p>
        </div>
        <Shield className="w-4 h-4 text-daar-mint" />
      </div>
    ))}
  </div>
);

const FormMockup: React.FC<{ color: string }> = ({ color }) => (
  <div className="p-4 space-y-3">
    <div className="bg-gray-50 rounded-xl p-3 text-center">
      <div className="w-16 h-16 mx-auto bg-white rounded-2xl shadow-sm flex items-center justify-center mb-2">
        <Receipt className="w-8 h-8" style={{ color }} />
      </div>
      <p className="text-[10px] text-gray-500">Scan een bonnetje</p>
    </div>
    <div className="space-y-2">
      <div className="h-8 bg-white rounded-lg border border-gray-200 px-3 flex items-center">
        <span className="text-[10px] text-gray-400">€ 24,50</span>
      </div>
      <div className="h-8 bg-white rounded-lg border border-gray-200 px-3 flex items-center">
        <span className="text-[10px] text-gray-400">Reiskosten</span>
      </div>
    </div>
    <button
      className="w-full h-10 rounded-xl text-white text-xs font-semibold"
      style={{ backgroundColor: color }}
    >
      Indienen
    </button>
  </div>
);

const getMockupComponent = (type: string, color: string) => {
  switch (type) {
    case 'chat': return <ChatMockup color={color} />;
    case 'dashboard': return <DashboardMockup color={color} />;
    case 'cards': return <CardsMockup color={color} />;
    case 'list': return <ListMockup color={color} />;
    case 'form': return <FormMockup color={color} />;
    default: return <ChatMockup color={color} />;
  }
};

const ToolsCarouselPremium: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev + 1) % tools.length);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev - 1 + tools.length) % tools.length);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning]);

  const goToSlide = (index: number) => {
    if (isTransitioning || index === activeIndex) return;
    setIsTransitioning(true);
    setActiveIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => {
      setIsTransitioning(false);
      setTimeout(() => setIsAutoPlaying(true), 8000);
    }, 600);
  };

  // Auto-play
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const getCardTransform = (index: number): React.CSSProperties => {
    const diff = index - activeIndex;
    const total = tools.length;

    let normalizedDiff = diff;
    if (diff > total / 2) normalizedDiff = diff - total;
    if (diff < -total / 2) normalizedDiff = diff + total;

    const isActive = normalizedDiff === 0;
    const isNext = normalizedDiff === 1;
    const isPrev = normalizedDiff === -1;
    const isSecondNext = normalizedDiff === 2;
    const isSecondPrev = normalizedDiff === -2;

    let x = 0, z = 0, rotateY = 0, scale = 0.6, opacity = 0, zIndex = 0;

    if (isActive) {
      x = 0; z = 50; scale = 1; opacity = 1; zIndex = 50;
    } else if (isNext) {
      x = 300; z = 0; rotateY = -20; scale = 0.8; opacity = 0.8; zIndex = 40;
    } else if (isPrev) {
      x = -300; z = 0; rotateY = 20; scale = 0.8; opacity = 0.8; zIndex = 40;
    } else if (isSecondNext) {
      x = 520; z = -30; rotateY = -30; scale = 0.65; opacity = 0.4; zIndex = 30;
    } else if (isSecondPrev) {
      x = -520; z = -30; rotateY = 30; scale = 0.65; opacity = 0.4; zIndex = 30;
    }

    return {
      transform: `translateX(${x}px) translateZ(${z}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex,
      transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    };
  };

  const activeTool = tools[activeIndex];

  return (
    <section className="py-20 lg:py-28 overflow-hidden relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white" />

      {/* Decorative blobs */}
      <div
        className="absolute top-20 right-10 w-[400px] h-[400px] rounded-full blur-3xl opacity-30 transition-colors duration-1000"
        style={{ backgroundColor: activeTool.accentColor }}
      />
      <div
        className="absolute bottom-20 left-10 w-[300px] h-[300px] rounded-full blur-3xl opacity-20 transition-colors duration-1000"
        style={{ backgroundColor: activeTool.accentColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
          <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-white shadow-sm border border-gray-100 text-daar-blue text-sm font-semibold mb-6">
            <Sparkles size={16} className="mr-2 text-daar-koraal" />
            6 krachtige modules
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-daar-blue mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Ondersteun je vrijwilligers met{' '}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-daar-koraal to-orange-500 bg-clip-text text-transparent">
                bewezen tools.
              </span>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-daar-geel/40 -z-0 rounded-full"></span>
            </span>
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Van check-ins tot impact-rapporten. Elke module is gebouwd op basis van wat écht werkt in de praktijk.
          </p>
        </div>

        {/* Main Carousel Area */}
        <div className="relative">
          {/* Cards Carousel */}
          <div
            className="relative h-[480px] lg:h-[520px]"
            style={{ perspective: '1500px' }}
          >
            <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
              {tools.map((tool, index) => (
                <div
                  key={tool.id}
                  className="absolute cursor-pointer"
                  style={getCardTransform(index)}
                  onClick={() => goToSlide(index)}
                >
                  {/* Phone Mockup */}
                  <div className="relative">
                    {/* Phone Frame */}
                    <div
                      className="w-[260px] lg:w-[280px] rounded-[3rem] p-2 shadow-2xl"
                      style={{
                        background: `linear-gradient(145deg, ${tool.accentColor}, ${tool.accentColor}dd)`,
                        boxShadow: index === activeIndex
                          ? `0 30px 60px -15px ${tool.accentColor}66, 0 20px 40px -20px rgba(0,0,0,0.3)`
                          : '0 15px 40px -15px rgba(0,0,0,0.2)'
                      }}
                    >
                      {/* Screen */}
                      <div className="bg-white rounded-[2.5rem] overflow-hidden">
                        {/* Status Bar */}
                        <div className="h-8 px-6 flex items-center justify-between bg-gray-50">
                          <span className="text-[10px] font-medium text-gray-400">9:41</span>
                          <div className="flex items-center gap-1">
                            <div className="w-4 h-2 border border-gray-300 rounded-sm">
                              <div className="w-3 h-1.5 bg-daar-mint rounded-sm" />
                            </div>
                          </div>
                        </div>

                        {/* App Header */}
                        <div
                          className="px-4 py-3 flex items-center gap-3"
                          style={{ backgroundColor: tool.lightBg }}
                        >
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                            style={{ backgroundColor: tool.accentColor }}
                          >
                            {tool.icon}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-daar-blue">{tool.title}</p>
                            <p className="text-[10px] text-gray-500">{tool.subtitle}</p>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="h-[280px] lg:h-[300px] bg-gray-50">
                          {getMockupComponent(tool.mockupType, tool.accentColor)}
                        </div>

                        {/* Bottom Nav */}
                        <div className="h-16 bg-white border-t border-gray-100 flex items-center justify-around px-4">
                          <div className="w-6 h-6 rounded-full bg-gray-100" />
                          <div
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: `${tool.accentColor}20` }}
                          >
                            {tool.icon}
                          </div>
                          <div className="w-6 h-6 rounded-full bg-gray-100" />
                        </div>
                      </div>
                    </div>

                    {/* Floating badge for active */}
                    {index === activeIndex && (
                      <div
                        className="absolute -top-4 -right-4 px-3 py-1.5 rounded-full text-white text-xs font-bold shadow-lg animate-bounce-slow"
                        style={{ backgroundColor: tool.accentColor }}
                      >
                        <Zap className="w-3 h-3 inline mr-1" />
                        Populair
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-2 lg:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-daar-blue hover:scale-110 transition-all border border-gray-100"
              aria-label="Vorige"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 lg:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white shadow-lg flex items-center justify-center text-daar-blue hover:scale-110 transition-all border border-gray-100"
              aria-label="Volgende"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Progress & Info Bar */}
          <div className="mt-8 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-10">
            {/* Avatar */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg transition-all duration-500"
              style={{
                backgroundColor: activeTool.accentColor,
                boxShadow: `0 10px 30px -10px ${activeTool.accentColor}88`
              }}
            >
              {React.cloneElement(activeTool.icon as React.ReactElement<{ className?: string }>, { className: 'w-8 h-8' })}
            </div>

            {/* Progress dots */}
            <div className="flex items-center gap-2">
              {tools.map((tool, index) => (
                <button
                  key={tool.id}
                  onClick={() => goToSlide(index)}
                  className="relative h-2.5 rounded-full overflow-hidden transition-all duration-500"
                  style={{
                    width: index === activeIndex ? '60px' : '24px',
                    backgroundColor: index === activeIndex ? `${tool.accentColor}30` : '#E5E7EB'
                  }}
                >
                  {index === activeIndex && (
                    <div
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{
                        backgroundColor: tool.accentColor,
                        animation: 'progress-fill 5s linear forwards'
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Counter */}
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-daar-blue">{String(activeIndex + 1).padStart(2, '0')}</span>
              <span className="text-gray-300">/</span>
              <span className="text-gray-400">{String(tools.length).padStart(2, '0')}</span>
            </div>
          </div>

          {/* Active Tool Description */}
          <div className="mt-10 text-center max-w-xl mx-auto">
            <h3
              className="text-2xl font-bold mb-3 transition-all duration-500"
              style={{ color: activeTool.accentColor, fontFamily: 'Nunito, sans-serif' }}
            >
              {activeTool.title}
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              {activeTool.description}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {activeTool.features.map((feature, i) => (
                <span
                  key={i}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
                  style={{
                    backgroundColor: `${activeTool.accentColor}15`,
                    color: activeTool.accentColor
                  }}
                >
                  <Check className="w-4 h-4 inline mr-1" />
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Inline keyframes */}
      <style jsx>{`
        @keyframes progress-fill {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </section>
  );
};

export default ToolsCarouselPremium;
