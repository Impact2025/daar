'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ChevronRight, BarChart2, Users, Heart, Shield, Check, Globe, MessageCircle, Smile, ClipboardCheck, BookOpen, Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { LatestArticles } from '@/components/home/LatestArticles';

const DaarLandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    '/Creatieve middag in de kunstklas-min.png',
    '/Gezelligheid in het Nederlandse landschap-min.png'
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
    }, 5000); // Wissel elke 5 seconden
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
    <div className="font-sans antialiased text-navy bg-offWhite selection:bg-brandGreen selection:text-white">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Logo className="h-8" color="#1A2332" />
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
                  href="/admin/login"
                  className="text-navy font-semibold px-4 py-2 hover:text-brandGreen transition-colors tracking-tight"
                >
                  Inloggen
                </Link>
                <Link
                  href="/afspraak"
                  className="bg-brandGreen text-white font-bold px-6 py-2.5 rounded-xl hover:bg-brandGreenHover transition-all shadow-lg shadow-green-900/10 transform hover:-translate-y-0.5 tracking-tight"
                >
                  Plan gesprek
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-navy focus:outline-none">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl rounded-b-2xl">
            <div className="flex flex-col p-4 space-y-2">
              <MobileNavLink href="/platform" text="Platform" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink href="/kennisbank" text="Kennisbank" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink href="/quiz" text="VrijwilligersCheck" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink href="/over-ons" text="Over ons" onClick={() => setIsMenuOpen(false)} />
              <MobileNavLink href="/contact" text="Contact" onClick={() => setIsMenuOpen(false)} />
              <Link
                href="/afspraak"
                className="bg-brandGreen text-white font-bold w-full py-3 mt-4 rounded-xl text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Plan gesprek
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-offWhite">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-lightGreen rounded-full opacity-60 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-blue-50 rounded-full opacity-60 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">

            {/* Left Content */}
            <div className="lg:col-span-6 text-center lg:text-left mb-12 lg:mb-0">
               <div className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm text-navy text-sm font-semibold mb-8 animate-fade-in-up tracking-tight">
                  <span className="w-2 h-2 rounded-full bg-brandGreen mr-2"></span>
                  Nieuw: Impact Dashboard 2.0 live
               </div>

               <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy leading-[1.1] mb-6 tracking-tighter">
                 Grip op vrijwilligers,<br/>
                 focus op <span className="text-brandGreen relative inline-block">
                    geluk.
                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-brandGreen opacity-30" viewBox="0 0 100 10" preserveAspectRatio="none">
                       <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                    </svg>
                 </span>
               </h1>

               <p className="text-lg text-gray-600 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-normal">
                 Het complete platform dat werving, beheer en impactmeting verbindt.
                 Verhoog de betrokkenheid en maak elk uur meetbaar waardevol.
               </p>

               <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <button
                     onClick={() => scrollToSection('producten')}
                     className="bg-navy text-white font-bold px-8 py-4 rounded-xl hover:bg-navy/90 transition-all shadow-lg hover:shadow-xl flex items-center justify-center group tracking-tight"
                  >
                     Bekijk de modules
                     <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </button>
                  <Link
                     href="/afspraak"
                     className="bg-white text-navy border border-gray-200 font-bold px-8 py-4 rounded-xl hover:bg-gray-50 transition-colors text-center shadow-sm tracking-tight"
                  >
                     Vraag demo aan
                  </Link>
               </div>

               <div className="mt-12 flex items-center justify-center lg:justify-start space-x-8 text-sm text-gray-600 font-medium tracking-tight">
                  <span className="flex items-center"><Check size={18} className="text-brandGreen mr-2" /> AVG-Proof</span>
                  <span className="flex items-center"><Check size={18} className="text-brandGreen mr-2" /> Modulair</span>
                  <span className="flex items-center"><Check size={18} className="text-brandGreen mr-2" /> Data-gedreven</span>
               </div>
            </div>

            {/* Right Visual */}
            <div className="lg:col-span-6 relative">
               <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform lg:rotate-2 hover:rotate-0 transition-all duration-500">
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

                  {/* Speech Bubble Overlay 1 */}
                  <div className="absolute top-8 left-8 bg-white/95 backdrop-blur p-4 rounded-2xl rounded-bl-none shadow-lg max-w-[200px] animate-bounce-slow">
                     <div className="flex items-center mb-1">
                        <Smile className="text-brandGreen w-5 h-5 mr-2" />
                        <span className="font-bold text-navy text-sm tracking-tight">Nieuwe match!</span>
                     </div>
                     <p className="text-xs text-gray-500">Sarah heeft zich aangemeld voor de sponsorloop.</p>
                  </div>

                  {/* Speech Bubble Overlay 2 */}
                  <div className="absolute bottom-8 right-8 bg-navy text-white p-4 rounded-2xl rounded-tr-none shadow-lg max-w-[220px]">
                     <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-gray-300 tracking-wide">TEVREDENHEID</span>
                        <span className="text-brandGreen font-bold">8.9/10</span>
                     </div>
                     <div className="w-full bg-gray-700 rounded-full h-1.5">
                        <div className="bg-brandGreen h-1.5 rounded-full" style={{width: '89%'}}></div>
                     </div>
                  </div>
               </div>

               {/* Decorative Graphic Elements */}
               <div className="absolute -z-10 top-1/2 -right-12 w-24 h-24 bg-brandGreen rounded-full opacity-10"></div>
               <svg className="absolute -z-10 -bottom-8 -left-8 text-navy w-32 h-32 opacity-5" viewBox="0 0 100 100" fill="currentColor">
                  <circle cx="10" cy="10" r="4" /> <circle cx="30" cy="10" r="4" /> <circle cx="50" cy="10" r="4" />
                  <circle cx="10" cy="30" r="4" /> <circle cx="30" cy="30" r="4" /> <circle cx="50" cy="30" r="4" />
                  <circle cx="10" cy="50" r="4" /> <circle cx="30" cy="50" r="4" /> <circle cx="50" cy="50" r="4" />
               </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Stats Bar */}
      <section className="bg-white py-16 border-y border-gray-200">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
               <StatsCard
                 icon={<Shield size={24} />}
                 iconColor="text-navy"
                 title="Veilig Dossier"
                 description="AVG-proof en centraal. Al je documenten op één veilige plek."
               />
               <StatsCard
                 icon={<BarChart2 size={24} />}
                 iconColor="text-brandGreen"
                 title="Meetbare Impact"
                 description="Harde cijfers voor stakeholders. Koppel inzet direct aan SDG's."
               />
               <StatsCard
                 icon={<Heart size={24} fill="#3BA273" fillOpacity={0.2} />}
                 iconColor="text-brandGreen"
                 title="Geluksmomenten"
                 description="Meet het welzijn van je mensen. Want gelukkige vrijwilligers blijven."
               />
            </div>
         </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 bg-offWhite">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-gray-500 mb-8 tracking-tight">Vertrouwd door 500+ vrijwilligersorganisaties in Nederland</p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
               {/* Placeholder logos - replace with real client logos */}
               <div className="h-8 px-4 bg-gray-300 rounded flex items-center justify-center text-gray-500 text-sm font-medium">Gemeente Amsterdam</div>
               <div className="h-8 px-4 bg-gray-300 rounded flex items-center justify-center text-gray-500 text-sm font-medium">Rode Kruis</div>
               <div className="h-8 px-4 bg-gray-300 rounded flex items-center justify-center text-gray-500 text-sm font-medium">Humanitas</div>
               <div className="h-8 px-4 bg-gray-300 rounded flex items-center justify-center text-gray-500 text-sm font-medium">Scouting NL</div>
               <div className="h-8 px-4 bg-gray-300 rounded flex items-center justify-center text-gray-500 text-sm font-medium">NOV</div>
            </div>
         </div>
      </section>

      {/* Modules Grid */}
      <section id="producten" className="py-24 bg-offWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-4 tracking-tight">Alles voor je vrijwilligers.</h2>
            <p className="text-gray-600 text-lg">Modulair opgebouwd, dus je betaalt alleen voor wat je gebruikt.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card
               title="Vrijwilligers Check"
               desc="Signaleer overbelasting vroegtijdig met onze slimme welzijnsmonitor en stoplicht-systeem."
               icon={<Smile size={28} />}
               accent="green"
            />
            <Card
               title="Smart Matching"
               desc="Een Tinder-achtige ervaring om de perfecte vrijwilliger te vinden voor elke klus."
               icon={<Users size={28} />}
               accent="navy"
            />
            <Card
               title="Impact Dashboard"
               desc="Genereer real-time rapporten voor gemeenten en fondsen. Maak je waarde zichtbaar."
               icon={<BarChart2 size={28} />}
               accent="green"
            />
            <Card
               title="Centraal Dossier"
               desc="Alle VOG's, contracten en notities veilig opgeslagen in één AVG-proof omgeving."
               icon={<Shield size={28} />}
               accent="navy"
            />
            <Card
               title="Declaratie App"
               desc="Laat vrijwilligers bonnetjes scannen en declareren. Snel, foutloos en transparant."
               icon={<Globe size={28} />}
               accent="navy"
            />
            <Card
               title="Communicatie"
               desc="Chat met groepen, deel nieuws en verstuur 'Vrijwilliger van de maand' updates."
               icon={<MessageCircle size={28} />}
               accent="green"
            />
          </div>
        </div>
      </section>

      {/* "Geluksmomenten" Feature Section */}
      <section id="over-ons" className="py-24 bg-white overflow-hidden relative">
         <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-lightGreen to-transparent rounded-full opacity-50 blur-3xl"></div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="lg:grid lg:grid-cols-2 lg:gap-20 items-center">

               {/* Illustration Area */}
               <div className="relative mb-16 lg:mb-0">
                  <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-200 relative">
                     <div className="absolute -top-6 -left-6 bg-brandGreen text-white p-4 rounded-2xl shadow-lg">
                        <Heart className="w-8 h-8 fill-current" />
                     </div>
                     <h3 className="text-2xl font-bold text-navy mb-6 mt-4 tracking-tight">Geluksmeter</h3>

                     <div className="space-y-6">
                        <ProgressBar label="Plezier in werk" value={92} icon={<Smile size={24} strokeWidth={2} />} color="brandGreen" />
                        <ProgressBar label="Betrokkenheid" value={88} icon={<Users size={24} strokeWidth={2} />} color="navy" />
                        <ProgressBar label="Waardering" value={95} icon={<Heart size={24} strokeWidth={2} />} color="brandGreen" bgColor="lightGreen" />
                     </div>
                  </div>
               </div>

               {/* Text Content */}
               <div>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-6 tracking-tight">
                     Meet wat er écht toe doet.
                  </h2>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                     De meeste tools stoppen bij urenregistratie. Daar gaat verder.
                     Wij visualiseren de 'zachte' kant van vrijwilligerswerk: de glimlach,
                     de voldoening en de sociale verbinding.
                  </p>

                  <div className="space-y-4">
                     <FeatureItem text="Automatische tevredenheids-checks" />
                     <FeatureItem text="Rapportages voor gemeenten en fondsen" />
                     <FeatureItem text="Inzicht in verloop en retentie" />
                  </div>

                  <div className="mt-10 pt-10 border-t border-gray-200">
                     <div className="flex items-start">
                        <div className="flex-shrink-0 mr-4">
                           <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                              <Image
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
                                alt="Avatar"
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                              />
                           </div>
                        </div>
                        <div className="speech-bubble speech-bubble-navy bg-navy text-white p-4 rounded-2xl rounded-bl-none shadow-md">
                           <p className="text-sm italic">"Eindelijk hebben we harde cijfers voor onze subsidieaanvraag, zonder dat het menselijke aspect verloren gaat."</p>
                           <p className="text-xs font-bold mt-2 text-brandGreen">- Marieke, Coördinator Buurtwerk</p>
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
         <div className="absolute top-0 right-0 w-96 h-96 bg-brandGreen opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
               <div className="mb-12 lg:mb-0">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-brandGreen/20 text-brandGreen text-sm font-semibold mb-6 tracking-tight">
                     <ClipboardCheck size={16} className="mr-2" />
                     Gratis tool
                  </div>

                  <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-6 tracking-tight">
                     Hoe gezond is jouw vrijwilligersbeleid?
                  </h2>

                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                     Doe de VrijwilligersCheck en ontdek in 2 minuten hoe je scoort op 5 cruciale
                     dimensies. Inclusief benchmark vergelijking en concrete ROI-berekeningen.
                  </p>

                  <div className="space-y-3 mb-8">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                           <Check size={16} className="text-brandGreen" />
                        </div>
                        <span className="text-navy font-medium">11 vragen, 2 minuten</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                           <Check size={16} className="text-brandGreen" />
                        </div>
                        <span className="text-navy font-medium">Vergelijk met 500+ organisaties</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                           <Check size={16} className="text-brandGreen" />
                        </div>
                        <span className="text-navy font-medium">Direct inzicht in verbeterpunten</span>
                     </div>
                  </div>

                  <Link
                     href="/quiz"
                     className="inline-flex items-center bg-brandGreen text-white font-bold px-8 py-4 rounded-xl hover:bg-brandGreenHover transition-all shadow-lg hover:shadow-xl group tracking-tight"
                  >
                     Start de VrijwilligersCheck
                     <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </Link>
               </div>

               {/* Visual */}
               <div className="relative">
                  <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100">
                     <div className="text-center mb-6">
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-brandGreen/10 text-brandGreen text-sm font-medium mb-4">
                           Goed op weg
                        </div>
                        <div className="text-5xl font-bold text-navy mb-2">68%</div>
                        <p className="text-gray-500">Totale score</p>
                     </div>

                     {/* Mini radar representation */}
                     <div className="space-y-4">
                        <QuizDimensionBar label="Beheer" value={75} color="brandGreen" />
                        <QuizDimensionBar label="Communicatie" value={62} color="blue-500" />
                        <QuizDimensionBar label="Onboarding" value={58} color="purple-500" />
                        <QuizDimensionBar label="Retentie" value={72} color="pink-500" />
                        <QuizDimensionBar label="Impact" value={45} color="amber-500" />
                     </div>

                     <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                        <p className="text-sm text-gray-500">Potentiele besparing</p>
                        <p className="text-2xl font-bold text-brandGreen">156 uur/jaar</p>
                     </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full bg-brandGreen/10 rounded-3xl"></div>
               </div>
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section id="gemeenten" className="bg-navy py-20 relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-2xl"></div>
         <div className="absolute bottom-0 left-0 w-48 h-48 bg-brandGreen opacity-10 rounded-full blur-2xl"></div>

         <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Klaar voor meer grip en geluk?</h2>
            <p className="text-xl text-gray-300 mb-10 font-light max-w-2xl mx-auto">
               Ontdek hoe Daar jouw organisatie kan versterken. Vraag vandaag nog een demo aan.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <Link
                  href="/quiz"
                  className="bg-brandGreen text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-brandGreenHover transition-all shadow-lg hover:shadow-green-900/20 transform hover:-translate-y-1 tracking-tight text-center"
               >
                  Doe de VrijwilligersCheck
               </Link>
               <Link
                  href="/afspraak"
                  className="bg-transparent border border-gray-600 text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-white/5 transition-colors tracking-tight text-center"
               >
                  Plan adviesgesprek
               </Link>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#151B26] text-white pt-20 pb-10 text-sm">
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
                  <h4 className="font-bold text-lg mb-6 text-white tracking-tight">Contact</h4>
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

// Helper Components

interface NavButtonProps {
  text: string;
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ text, onClick }) => (
  <button
    onClick={onClick}
    className="text-navy font-semibold px-3 py-2 hover:text-brandGreen transition-colors relative group tracking-tight"
  >
    {text}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brandGreen transition-all duration-300 group-hover:w-full rounded-full"></span>
  </button>
);

interface NavLinkProps {
  href: string;
  text: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, text }) => (
  <Link
    href={href}
    className="text-navy font-semibold px-3 py-2 hover:text-brandGreen transition-colors relative group tracking-tight"
  >
    {text}
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brandGreen transition-all duration-300 group-hover:w-full rounded-full"></span>
  </Link>
);

const MobileNavButton: React.FC<NavButtonProps> = ({ text, onClick }) => (
  <button
    onClick={onClick}
    className="text-left text-lg font-medium text-navy py-3 px-2 border-b border-gray-50 hover:bg-gray-50 rounded-lg tracking-tight"
  >
    {text}
  </button>
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
    className="text-left text-lg font-medium text-navy py-3 px-2 border-b border-gray-50 hover:bg-gray-50 rounded-lg tracking-tight block"
  >
    {text}
  </Link>
);

interface CardProps {
  title: string;
  desc: string;
  icon: React.ReactNode;
  accent: 'navy' | 'green';
}

const Card: React.FC<CardProps> = ({ title, desc, icon, accent }) => {
   const accentColor = accent === 'navy' ? 'text-navy' : 'text-brandGreen';
   const bgHover = accent === 'navy' ? 'group-hover:bg-navy' : 'group-hover:bg-brandGreen';

   return (
     <div className="group bg-white rounded-2xl p-8 border border-gray-200 hover:border-transparent hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col h-full relative overflow-hidden">
        <div className={`w-14 h-14 rounded-2xl bg-offWhite flex items-center justify-center mb-6 ${accentColor} ${bgHover} group-hover:text-white transition-colors duration-300`}>
           {icon}
        </div>
        <h3 className="text-xl font-bold text-navy mb-3 tracking-tight">{title}</h3>
        <p className="text-gray-600 leading-relaxed mb-6 flex-grow">{desc}</p>
        <div className={`flex items-center font-semibold text-sm ${accentColor} group-hover:translate-x-1 transition-transform cursor-pointer`}>
           Ontdek meer <ChevronRight size={16} className="ml-1" />
        </div>
     </div>
   );
};

interface FeatureItemProps {
  text: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ text }) => (
   <div className="flex items-start">
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-50 flex items-center justify-center mt-0.5 mr-3">
         <Check size={14} className="text-navy" strokeWidth={3} />
      </div>
      <span className="text-navy font-medium">{text}</span>
   </div>
);

interface StatsCardProps {
  icon: React.ReactNode;
  iconColor: string;
  title: string;
  description: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, iconColor, title, description }) => (
  <div className="p-6 rounded-2xl bg-blue-50/50 hover:bg-blue-50 transition-colors group">
    <div className={`bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm mb-4 ${iconColor} mx-auto md:mx-0 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2 tracking-tight">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
  </div>
);

interface ProgressBarProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: 'brandGreen' | 'navy';
  bgColor?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ label, value, icon, color, bgColor = 'blue-50' }) => {
  const barColor = color === 'brandGreen' ? 'bg-brandGreen' : 'bg-navy';
  const iconBgColor = bgColor === 'lightGreen' ? 'bg-lightGreen' : 'bg-blue-50';
  const iconTextColor = color === 'brandGreen' && bgColor === 'lightGreen' ? 'text-brandGreen' : 'text-navy';

  return (
    <div className="flex items-center">
      <div className={`w-12 h-12 rounded-full ${iconBgColor} flex items-center justify-center mr-4 ${iconTextColor}`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex justify-between mb-1">
          <span className="font-medium text-sm">{label}</span>
          <span className="font-bold text-navy">{value}%</span>
        </div>
        <div className="h-2 bg-offWhite rounded-full overflow-hidden">
          <div className={`h-full ${barColor} rounded-full`} style={{width: `${value}%`}}></div>
        </div>
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
    <h4 className="font-bold text-lg mb-6 text-white tracking-tight">{title}</h4>
    <ul className="space-y-4 text-gray-400">
      {links.map((link, index) => (
        <li key={index}>
          <Link href={link.href} className="hover:text-brandGreen transition-colors">{link.label}</Link>
        </li>
      ))}
    </ul>
  </div>
);

interface QuizDimensionBarProps {
  label: string;
  value: number;
  color: string;
}

const QuizDimensionBar: React.FC<QuizDimensionBarProps> = ({ label, value, color }) => {
  const colorClasses: Record<string, string> = {
    'brandGreen': 'bg-brandGreen',
    'blue-500': 'bg-blue-500',
    'purple-500': 'bg-purple-500',
    'pink-500': 'bg-pink-500',
    'amber-500': 'bg-amber-500',
  };

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-bold text-navy">{value}%</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${colorClasses[color] || 'bg-gray-400'}`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
};

export default DaarLandingPage;
