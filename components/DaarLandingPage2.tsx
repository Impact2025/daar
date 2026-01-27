'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ChevronRight, BarChart2, Users, Heart, Shield, Check, Globe, MessageCircle, Smile, ClipboardCheck, Sparkles, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { LatestArticles } from '@/components/home/LatestArticles';
import ToolsCarouselPremium from '@/components/ToolsCarouselPremium';
import ImpactStats from '@/components/ImpactStats';
import FeatureTabShowcase from '@/components/FeatureTabShowcase';

const DaarLandingPage2 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    '/Creatieve middag in de kunstklas-min.png',
    '/Gezelligheid in het Nederlandse landschap-min.png'
  ];

  const heroQuotes = [
    'Je denkt dat je komt om te geven, maar stiekem krijg je er net zoveel energie voor terug.',
    'Samen op pad. Voor hen een uitje, voor mij mijn wekelijkse portie geluk.'
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="font-sans antialiased text-daar-blue bg-white selection:bg-brandGreen selection:text-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Logo className="h-8" color="#2D334A" />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6 items-center">
              <NavLink href="/platform" text="Platform" />
              <NavLink href="/kennisbank" text="Kennisbank" />
              <NavLink href="/quiz" text="VrijwilligersCheck" />
              <NavLink href="/over-ons" text="Over ons" />
              <NavLink href="/contact" text="Contact" />

              <div className="flex items-center space-x-3 ml-4">
                <Link
                  href="https://samen.daar.nl/login"
                  className="text-daar-blue font-semibold px-4 py-2 hover:text-brandGreen transition-colors"
                >
                  Inloggen
                </Link>
                <Link
                  href="/afspraak"
                  className="bg-brandGreen text-white font-bold px-6 py-3 rounded-full hover:bg-brandGreenHover transition-all shadow-lg shadow-green-200/50 transform hover:-translate-y-0.5"
                >
                  Plan gesprek
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-daar-blue focus:outline-none">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl rounded-b-3xl">
            <div className="flex flex-col p-4 space-y-2">
              <MobileNavLink href="/platform" text="Platform" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink href="/kennisbank" text="Kennisbank" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink href="/quiz" text="VrijwilligersCheck" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink href="/over-ons" text="Over ons" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink href="/contact" text="Contact" onClick={() => setIsMenuOpen(false)} />
              <Link
                href="/afspraak"
                className="bg-brandGreen text-white font-bold w-full py-3 mt-4 rounded-full text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Plan gesprek
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section - Soft & Warm */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-offWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">

            {/* Left Content */}
            <div className="lg:col-span-6 text-center lg:text-left mb-12 lg:mb-0">
              <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-daar-geel/20 border border-daar-geel/30 text-daar-blue text-sm font-semibold mb-8 animate-fade-in-up">
                <Sparkles size={16} className="mr-2 text-brandGreen" />
                Nieuw: Impact Dashboard 2.0 live
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-daar-blue leading-[1.1] mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Grip op vrijwilligers,<br/>
                focus op <span className="text-brandGreen">geluk.</span>
              </h1>

              <p className="text-lg text-gray-600 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Het complete platform dat werving, beheer en impactmeting verbindt.
                Verhoog de betrokkenheid en maak elk uur meetbaar waardevol.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => scrollToSection('producten')}
                  className="bg-brandGreen text-white font-bold px-8 py-4 rounded-full hover:bg-brandGreenHover transition-all shadow-lg shadow-green-200/50 flex items-center justify-center group"
                >
                  Bekijk de modules
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </button>
                <Link
                  href="/afspraak"
                  className="bg-white text-daar-blue border-2 border-daar-helder font-bold px-8 py-4 rounded-full hover:bg-daar-helder/10 transition-colors text-center shadow-sm"
                >
                  Vraag demo aan
                </Link>
              </div>

              <div className="mt-12 flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-600 font-medium">
                <span className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                  <Check size={18} className="text-daar-mint mr-2" /> AVG-Proof
                </span>
                <span className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                  <Check size={18} className="text-daar-mint mr-2" /> Modulair
                </span>
                <span className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                  <Check size={18} className="text-daar-mint mr-2" /> Data-gedreven
                </span>
              </div>
            </div>

            {/* Right Visual */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white transform lg:rotate-1 hover:rotate-0 transition-all duration-500">
                <div className="relative w-full aspect-[3/2]">
                  {heroImages.map((image, index) => (
                    <Image
                      key={image}
                      src={image}
                      alt={index === 0 ? "Creatieve middag in de kunstklas" : "Gezelligheid in het Nederlandse landschap"}
                      width={1200}
                      height={800}
                      className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                        index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  ))}
                </div>

                {/* Quote Overlay */}
                {heroQuotes.map((quote, index) => (
                  <div
                    key={index}
                    className={`absolute bottom-6 right-6 bg-white/95 backdrop-blur p-5 rounded-3xl shadow-lg max-w-[280px] transition-opacity duration-1000 ${
                      index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <p className="text-sm text-daar-blue italic leading-relaxed">"{quote}"</p>
                  </div>
                ))}
              </div>

              {/* Decorative organic shapes */}
              <div className="absolute -z-10 top-1/2 -right-8 w-20 h-20 bg-daar-geel rounded-full opacity-60"></div>
              <div className="absolute -z-10 -bottom-4 -left-4 w-16 h-16 bg-daar-mint rounded-full opacity-60"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Cards met subtiele kleuren */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatsCard2
              icon={<Shield size={28} />}
              bgColorHex="#5BA3BD"
              iconColorHex="#FFFFFF"
              title="Veilig Dossier"
              description="AVG-proof en centraal. Al je documenten op één veilige plek."
            />
            <StatsCard2
              icon={<TrendingUp size={28} />}
              bgColorHex="#D4A84B"
              iconColorHex="#FFFFFF"
              title="Meetbare Impact"
              description="Harde cijfers voor stakeholders. Koppel inzet direct aan SDG's."
            />
            <StatsCard2
              icon={<Heart size={28} />}
              bgColorHex="#4BA99B"
              iconColorHex="#FFFFFF"
              title="De Geluksformule"
              description="Onze unieke methodiek meet welbevinden op basis van jarenlange expertise."
            />
          </div>
        </div>
      </section>

      {/* Expertise Statement */}
      <section className="py-20 bg-gradient-to-b from-white to-daar-helder/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-daar-blue mb-4" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Gebouwd vanuit de praktijk, voor de praktijk.
          </h2>
          <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            Daar is nieuw, maar onze expertise is dat niet. Met een team van drie specialisten
            bundelen we jarenlange ervaring in de vrijwilligerssector en de zorg.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 px-5 py-3 bg-white rounded-full border border-gray-100 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-daar-koraal/20 flex items-center justify-center">
                <Users size={16} className="text-daar-koraal" />
              </div>
              <span className="font-medium text-daar-blue">3 experts met gedeelde passie</span>
            </div>
            <div className="flex items-center gap-2 px-5 py-3 bg-white rounded-full border border-gray-100 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-daar-mint/20 flex items-center justify-center">
                <Heart size={16} className="text-daar-mint" />
              </div>
              <span className="font-medium text-daar-blue">Ervaring in zorg & vrijwilligerswerk</span>
            </div>
            <div className="flex items-center gap-2 px-5 py-3 bg-white rounded-full border border-gray-100 shadow-sm">
              <div className="w-8 h-8 rounded-full bg-daar-geel/30 flex items-center justify-center">
                <BarChart2 size={16} className="text-daar-koraal" />
              </div>
              <span className="font-medium text-daar-blue">Slimme, praktische oplossingen</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Carousel - Premium Slider */}
      <div id="producten">
        <ToolsCarouselPremium />
      </div>

      {/* Impact Stats - Evidence-based outcomes */}
      <ImpactStats />

      {/* Feature Tab Showcase */}
      <FeatureTabShowcase />

      {/* Geluksmeter Feature Section */}
      <section className="py-24 bg-gradient-to-br from-daar-helder/10 via-white to-daar-mint/10 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-2 lg:gap-20 items-center">

            {/* Illustration Area */}
            <div className="relative mb-16 lg:mb-0">
              <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-gray-100 relative">
                <div className="absolute -top-5 -left-5 bg-brandGreen text-white p-4 rounded-2xl shadow-lg">
                  <Heart className="w-7 h-7 fill-current" />
                </div>
                <h3 className="text-2xl font-bold text-daar-blue mb-6 mt-4" style={{ fontFamily: 'Nunito, sans-serif' }}>Geluksmeter</h3>

                <div className="space-y-6">
                  <ProgressBar2 label="Plezier in werk" value={92} color="daar-koraal" />
                  <ProgressBar2 label="Betrokkenheid" value={88} color="daar-helder" />
                  <ProgressBar2 label="Waardering" value={95} color="daar-mint" />
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full bg-daar-geel/20 rounded-[2rem]"></div>
            </div>

            {/* Text Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-daar-blue mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Meet wat er écht toe doet.
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                De meeste tools stoppen bij urenregistratie. Daar gaat verder met onze unieke
                <span className="font-semibold text-brandGreen"> Geluksformule</span>.
                Wij visualiseren de 'zachte' kant van vrijwilligerswerk: de glimlach,
                de voldoening en de sociale verbinding.
              </p>

              <div className="space-y-4">
                <FeatureItem2 text="Automatische tevredenheids-checks" color="daar-mint" />
                <FeatureItem2 text="Rapportages voor gemeenten en fondsen" color="daar-helder" />
                <FeatureItem2 text="Inzicht in verloop en retentie" color="daar-geel" />
              </div>

              <div className="mt-10 pt-10 border-t border-gray-100">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-full bg-daar-helder/30 overflow-hidden">
                      <Image
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                        alt="Avatar"
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="bg-daar-blue text-white p-5 rounded-3xl rounded-bl-none shadow-md">
                    <p className="text-sm italic leading-relaxed">"Eindelijk hebben we harde cijfers voor onze subsidieaanvraag, zonder dat het menselijke aspect verloren gaat."</p>
                    <p className="text-xs font-bold mt-2 text-daar-geel">- Marieke, Coördinator Buurtwerk</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Laatste Artikelen */}
      <LatestArticles />

      {/* VrijwilligersCheck CTA */}
      <section className="py-24 bg-lightGreen relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="mb-12 lg:mb-0">
              <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-white border border-daar-mint/30 text-daar-mint text-sm font-semibold mb-6">
                <ClipboardCheck size={16} className="mr-2" />
                Gratis tool
              </div>

              <h2 className="text-3xl md:text-4xl font-extrabold text-daar-blue mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Hoe gezond is jouw vrijwilligersbeleid?
              </h2>

              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Doe de VrijwilligersCheck en ontdek in 2 minuten hoe je scoort op 5 cruciale
                dimensies. Gebaseerd op onze unieke Geluksformule.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Check size={18} className="text-daar-mint" />
                  </div>
                  <span className="text-daar-blue font-medium">11 vragen, 2 minuten</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Check size={18} className="text-daar-mint" />
                  </div>
                  <span className="text-daar-blue font-medium">Gebaseerd op jarenlange praktijkervaring</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <Check size={18} className="text-daar-mint" />
                  </div>
                  <span className="text-daar-blue font-medium">Direct inzicht in verbeterpunten</span>
                </div>
              </div>

              <Link
                href="/quiz"
                className="inline-flex items-center bg-brandGreen text-white font-bold px-8 py-4 rounded-full hover:bg-brandGreenHover transition-all shadow-lg shadow-green-200/50 group"
              >
                Start de VrijwilligersCheck
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
            </div>

            {/* Visual */}
            <div className="relative">
              <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-gray-100">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-daar-mint/20 text-daar-mint text-sm font-medium mb-4">
                    Goed op weg
                  </div>
                  <div className="text-5xl font-bold text-daar-blue mb-2">68%</div>
                  <p className="text-gray-500">Totale score</p>
                </div>

                <div className="space-y-4">
                  <QuizDimensionBar2 label="Beheer" value={75} color="daar-mint" />
                  <QuizDimensionBar2 label="Communicatie" value={62} color="daar-helder" />
                  <QuizDimensionBar2 label="Onboarding" value={58} color="daar-koraal" />
                  <QuizDimensionBar2 label="Retentie" value={72} color="daar-geel" />
                  <QuizDimensionBar2 label="Impact" value={45} color="daar-blue" />
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                  <p className="text-sm text-gray-500">Potentiele besparing</p>
                  <p className="text-2xl font-bold text-brandGreen">156 uur/jaar</p>
                </div>
              </div>

              <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full bg-daar-geel/20 rounded-[2rem]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-daar-blue py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Klaar voor meer grip en geluk?
          </h2>
          <p className="text-xl text-gray-300 mb-10 font-light max-w-2xl mx-auto">
            Ontdek hoe Daar jouw organisatie kan versterken. Vraag vandaag nog een demo aan.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/quiz"
              className="bg-brandGreen text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-brandGreenHover transition-all shadow-lg shadow-green-900/20 transform hover:-translate-y-1 text-center"
            >
              Doe de VrijwilligersCheck
            </Link>
            <Link
              href="/afspraak"
              className="bg-transparent border-2 border-white/30 text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-white/10 transition-colors text-center"
            >
              Plan adviesgesprek
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1E2433] text-white pt-20 pb-10 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="mb-6 opacity-90">
                <Logo className="h-6" color="white" />
              </div>
              <p className="text-gray-400 leading-relaxed">
                Wij maken vrijwilligerswerk slimmer, leuker en duurzamer. De partner voor organisaties die vooruit willen.
              </p>
            </div>
            <FooterColumn
              title="Product"
              links={[
                { label: 'Modules', href: '/platform' },
                { label: 'Vrijwilligers Check', href: '/vrijwilligerscheck' },
                { label: 'Quiz', href: '/quiz' },
                { label: 'Afspraak maken', href: '/afspraak' }
              ]}
            />
            <FooterColumn
              title="Over Daar"
              links={[
                { label: 'Onze Missie', href: '/over-ons' },
                { label: 'Kennisbank', href: '/kennisbank' },
                { label: 'Contact', href: '/contact' }
              ]}
            />
            <div>
              <h4 className="font-bold text-lg mb-6 text-white">Contact</h4>
              <ul className="space-y-4 text-gray-400">
                <li><Link href="/contact" className="hover:text-brandGreen transition-colors">Support</Link></li>
                <li><Link href="/afspraak" className="hover:text-brandGreen transition-colors">Afspraak plannen</Link></li>
                <li><a href="mailto:info@daar.nl" className="hover:text-brandGreen transition-colors">info@daar.nl</a></li>
                <li className="flex space-x-4 pt-2">
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-brandGreen transition-colors cursor-pointer text-xs">Li</a>
                  <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-brandGreen transition-colors cursor-pointer text-xs">X</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500">
            <p>&copy; 2025 Daar B.V.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-white">Privacy</Link>
              <Link href="/voorwaarden" className="hover:text-white">Voorwaarden</Link>
              <Link href="/cookies" className="hover:text-white">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Helper Components for 2.0 Design

interface NavLinkProps {
  href: string;
  text: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, text }) => (
  <Link
    href={href}
    className="text-daar-blue font-semibold px-3 py-2 hover:text-brandGreen transition-colors relative group"
  >
    {text}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brandGreen transition-all duration-300 group-hover:w-full rounded-full"></span>
  </Link>
);

interface MobileNavLinkProps {
  href: string;
  text: string;
  onClick: () => void;
}

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ href, text, onClick }) => (
  <Link
    href={href}
    onClick={onClick}
    className="text-left text-lg font-medium text-daar-blue py-3 px-2 border-b border-gray-50 hover:bg-daar-helder/10 rounded-xl block"
  >
    {text}
  </Link>
);

interface Card2Props {
  title: string;
  desc: string;
  icon: React.ReactNode;
  accentBg: string;
  accentColor: string;
}

const Card2: React.FC<Card2Props> = ({ title, desc, icon, accentBg, accentColor }) => {
  return (
    <div className="group bg-white rounded-3xl p-8 border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300 flex flex-col h-full relative overflow-hidden">
      <div className={`w-16 h-16 rounded-2xl ${accentBg} flex items-center justify-center mb-6 ${accentColor} group-hover:scale-110 transition-transform duration-300`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-daar-blue mb-3" style={{ fontFamily: 'Nunito, sans-serif' }}>{title}</h3>
      <p className="text-gray-600 leading-relaxed mb-6 flex-grow">{desc}</p>
      <div className={`flex items-center font-semibold text-sm ${accentColor} group-hover:translate-x-1 transition-transform cursor-pointer`}>
        Ontdek meer <ChevronRight size={16} className="ml-1" />
      </div>
    </div>
  );
};

interface FeatureItem2Props {
  text: string;
  color: string;
}

const FeatureItem2: React.FC<FeatureItem2Props> = ({ text, color }) => {
  const bgColors: Record<string, string> = {
    'daar-mint': 'bg-daar-mint/20',
    'daar-helder': 'bg-daar-helder/20',
    'daar-geel': 'bg-daar-geel/30',
  };
  const textColors: Record<string, string> = {
    'daar-mint': 'text-daar-mint',
    'daar-helder': 'text-daar-blue',
    'daar-geel': 'text-daar-koraal',
  };

  return (
    <div className="flex items-start">
      <div className={`flex-shrink-0 w-7 h-7 rounded-full ${bgColors[color]} flex items-center justify-center mt-0.5 mr-3`}>
        <Check size={14} className={textColors[color]} strokeWidth={3} />
      </div>
      <span className="text-daar-blue font-medium">{text}</span>
    </div>
  );
};

interface StatsCard2Props {
  icon: React.ReactNode;
  bgColorHex: string;
  iconColorHex: string;
  title: string;
  description: string;
}

const StatsCard2: React.FC<StatsCard2Props> = ({ icon, bgColorHex, iconColorHex, title, description }) => (
  <div
    className="p-8 rounded-3xl hover:shadow-lg transition-all group"
    style={{ backgroundColor: bgColorHex }}
  >
    <div
      className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm mb-5 group-hover:scale-110 transition-transform"
      style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: '#FFFFFF' }}
    >
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2 text-white" style={{ fontFamily: 'Nunito, sans-serif' }}>{title}</h3>
    <p className="text-white/80 leading-relaxed">{description}</p>
  </div>
);

interface ProgressBar2Props {
  label: string;
  value: number;
  color: string;
}

const ProgressBar2: React.FC<ProgressBar2Props> = ({ label, value, color }) => {
  const barColors: Record<string, string> = {
    'daar-koraal': 'bg-daar-koraal',
    'daar-helder': 'bg-daar-helder',
    'daar-mint': 'bg-daar-mint',
    'daar-geel': 'bg-daar-geel',
    'daar-blue': 'bg-daar-blue',
  };

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="font-medium text-sm text-gray-700">{label}</span>
        <span className="font-bold text-daar-blue">{value}%</span>
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${barColors[color]} rounded-full transition-all duration-500`} style={{width: `${value}%`}}></div>
      </div>
    </div>
  );
};

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
}

const FooterColumn: React.FC<FooterColumnProps> = ({ title, links }) => (
  <div>
    <h4 className="font-bold text-lg mb-6 text-white">{title}</h4>
    <ul className="space-y-4 text-gray-400">
      {links.map((link, index) => (
        <li key={index}>
          <Link href={link.href} className="hover:text-brandGreen transition-colors">{link.label}</Link>
        </li>
      ))}
    </ul>
  </div>
);

interface QuizDimensionBar2Props {
  label: string;
  value: number;
  color: string;
}

const QuizDimensionBar2: React.FC<QuizDimensionBar2Props> = ({ label, value, color }) => {
  const barColors: Record<string, string> = {
    'daar-koraal': 'bg-daar-koraal',
    'daar-helder': 'bg-daar-helder',
    'daar-mint': 'bg-daar-mint',
    'daar-geel': 'bg-daar-geel',
    'daar-blue': 'bg-daar-blue',
  };

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-bold text-daar-blue">{value}%</span>
      </div>
      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${barColors[color]}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

export default DaarLandingPage2;
