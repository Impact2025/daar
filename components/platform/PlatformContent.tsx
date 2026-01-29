'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Check, Users, BarChart2, Shield, Zap, RefreshCw, Database, Sparkles, Heart, Clock } from 'lucide-react';
import FeatureTabShowcase from '@/components/FeatureTabShowcase';

export const PlatformContent = () => {
  return (
    <div className="font-sans antialiased text-daar-blue bg-offWhite">

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-offWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 text-center lg:text-left mb-12 lg:mb-0">
              <div className="inline-flex items-center px-5 py-2.5 rounded-full bg-daar-geel/20 border border-daar-geel/30 text-daar-blue text-sm font-semibold mb-8 animate-fade-in-up">
                <Sparkles size={16} className="mr-2 text-brandGreen" />
                Complete workflow
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-daar-blue leading-[1.1] mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
                Hoe werkt het <span className="text-brandGreen">Daar</span> platform?
              </h1>

              <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                Een complete oplossing die werving, beheer en impactmeting naadloos met elkaar verbindt.
                Ontdek hoe Daar jouw vrijwilligersorganisatie naar een hoger niveau tilt.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <Link
                  href="/afspraak"
                  className="bg-brandGreen text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-brandGreenHover transition-all shadow-lg shadow-green-200/50 flex items-center justify-center group text-sm sm:text-base"
                >
                  Plan een demo
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                </Link>
                <Link
                  href="/quiz"
                  className="bg-white text-daar-blue border-2 border-daar-helder font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-daar-helder/10 transition-colors text-center shadow-sm text-sm sm:text-base"
                >
                  Doe de Geluksmonitor
                </Link>
              </div>

              <div className="mt-12 flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-600 font-medium">
                <span className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                  <Check size={18} className="text-daar-mint mr-2" /> Cloud-based
                </span>
                <span className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                  <Check size={18} className="text-daar-mint mr-2" /> Realtime
                </span>
                <span className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                  <Check size={18} className="text-daar-mint mr-2" /> Schaalbaar
                </span>
              </div>
            </div>

            {/* Right Visual - Workflow Card */}
            <div className="lg:col-span-6 relative">
              <div className="bg-white rounded-3xl p-6 shadow-2xl border border-gray-100">
                {/* Workflow Steps Mini Preview */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-lightGreen rounded-2xl">
                    <div className="w-12 h-12 rounded-full bg-brandGreen/20 flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-brandGreen" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-brandGreen mb-1">STAP 1</div>
                      <div className="font-semibold text-daar-blue">Aanmelding & Onboarding</div>
                      <div className="text-sm text-gray-600">Smart formulieren met auto-complete</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-2xl">
                    <div className="w-12 h-12 rounded-full bg-daar-helder/20 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-6 h-6 text-daar-helder" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-daar-helder mb-1">STAP 2</div>
                      <div className="font-semibold text-daar-blue">Smart Matching</div>
                      <div className="text-sm text-gray-600">AI-matching binnen 3 seconden</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-purple-50 rounded-2xl">
                    <div className="w-12 h-12 rounded-full bg-purple-200/50 flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-purple-600 mb-1">STAP 3</div>
                      <div className="font-semibold text-daar-blue">Planning & Actieve Inzet</div>
                      <div className="text-sm text-gray-600">Geïntegreerde agenda & welzijn</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-2xl">
                    <div className="w-12 h-12 rounded-full bg-amber-200/50 flex items-center justify-center flex-shrink-0">
                      <BarChart2 className="w-6 h-6 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-amber-600 mb-1">STAP 4</div>
                      <div className="font-semibold text-daar-blue">Impact Meting</div>
                      <div className="text-sm text-gray-600">Automatische SDG-rapportage</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full bg-brandGreen/10 rounded-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Tab Showcase */}
      <FeatureTabShowcase />

      {/* How It Works - Step by Step */}
      <section className="py-24 bg-offWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-daar-blue mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Van aanmelding tot impact
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Volg de reis van een vrijwilliger door het Daar platform
            </p>
          </div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brandGreen via-daar-blue to-brandGreen transform -translate-x-1/2"></div>

            <div className="space-y-12">
              <WorkflowStep
                stepNumber={1}
                title="Aanmelding & Onboarding"
                description="Een vrijwilliger meldt zich aan via de website of app. Het systeem verzamelt skills, beschikbaarheid en voorkeuren. Een digitale VOG en contract worden direct in het Centraal Dossier opgeslagen."
                icon={<Users size={28} />}
                highlight="Smart formulieren met auto-complete"
                side="left"
              />

              <WorkflowStep
                stepNumber={2}
                title="Smart Matching"
                description="Zodra er een nieuwe opdracht binnenkomt, zoekt het platform automatisch naar geschikte kandidaten. De vrijwilliger krijgt een notificatie met een Tinder-achtige interface om te accepteren of door te swipen."
                icon={<Zap size={28} />}
                highlight="AI-matching binnen 3 seconden"
                side="right"
              />

              <WorkflowStep
                stepNumber={3}
                title="Planning & Actieve Inzet"
                description="Vrijwilligers beheren hun agenda, zien hun geplande activiteiten en registreren hun inzet. Het systeem synchroniseert met persoonlijke kalenders en stuurt herinneringen. De Stemmingsmeter houdt het welzijn bij via positieve check-ins."
                icon={<Shield size={28} />}
                highlight="Geïntegreerde agenda & planning"
                side="left"
              />

              <WorkflowStep
                stepNumber={4}
                title="Impact Meting & Persoonlijk Dashboard"
                description="Vrijwilligers zien hun eigen impact en verzamelde geluksmomenten in hun persoonlijke dashboard. Organisaties krijgen automatische impact-rapporten met SDG-bijdragen voor subsidieaanvragen."
                icon={<BarChart2 size={28} />}
                highlight="Persoonlijk dashboard voor elke vrijwilliger"
                side="right"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-daar-blue mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
              Integraties met bestaande tools
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Daar werkt naadloos samen met je bestaande tools en systemen
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <IntegrationCard name="Google Workspace" description="Agenda sync" />
            <IntegrationCard name="Microsoft 365" description="Teams + Outlook" />
            <IntegrationCard name="Slack" description="Notificaties" />
            <IntegrationCard name="Exact Online" description="Boekhouding" />
            <IntegrationCard name="Mollie" description="Betalingen" />
            <IntegrationCard name="Zapier" description="1000+ apps" />
            <IntegrationCard name="WhatsApp" description="Messaging" />
            <IntegrationCard name="API" description="Custom" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-daar-blue relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6" style={{ fontFamily: 'Nunito, sans-serif' }}>
            Klaar om te starten?
          </h2>
          <p className="text-xl text-gray-300 mb-10 font-light max-w-2xl mx-auto">
            Plan een demo en ontdek hoe Daar jouw vrijwilligerswerk transformeert
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/afspraak"
              className="bg-brandGreen text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-brandGreenHover transition-all shadow-lg shadow-green-900/20 transform hover:-translate-y-1 flex items-center justify-center group"
            >
              Plan een demo
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </Link>
            <Link
              href="https://samen.daar.nl/register"
              className="bg-transparent border-2 border-white/30 text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-white/10 transition-colors text-center"
            >
              Start gratis
            </Link>
          </div>
        </div>
      </section>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Daar Platform",
            "applicationCategory": "BusinessApplication",
            "description": "Complete vrijwilligersmanagement platform met AI-matching, impact dashboard en welzijnsmonitoring voor non-profit organisaties.",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "EUR"
            },
            "operatingSystem": "Web, iOS, Android",
            "provider": {
              "@type": "Organization",
              "name": "DAAR",
              "url": "https://daar.nl"
            },
            "featureList": [
              "Smart Matching met AI",
              "Centraal AVG-proof Dossier",
              "Impact Dashboard met SDG-koppeling",
              "Stemmingsmeter welzijnsmonitor",
              "Declaratie App met OCR",
              "Communicatie Hub"
            ]
          })
        }}
      />
    </div>
  );
};

// Helper Components

interface WorkflowStepProps {
  stepNumber: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  highlight: string;
  side: 'left' | 'right';
}

const WorkflowStep: React.FC<WorkflowStepProps> = ({ stepNumber, title, description, icon, highlight, side }) => (
  <article className={`relative flex items-center ${side === 'right' ? 'lg:flex-row-reverse' : ''}`}>
    {/* Step Number Circle */}
    <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-brandGreen text-white font-bold text-2xl items-center justify-center shadow-lg shadow-green-200/50 z-10">
      {stepNumber}
    </div>

    {/* Content Card */}
    <div className={`w-full lg:w-5/12 ${side === 'left' ? 'lg:pr-16' : 'lg:pl-16'}`}>
      <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
        <div className="flex items-center mb-4 lg:hidden">
          <div className="w-12 h-12 rounded-full bg-brandGreen text-white font-bold text-xl flex items-center justify-center mr-4 shadow-md shadow-green-200/50">
            {stepNumber}
          </div>
          <div className="w-12 h-12 rounded-xl bg-lightGreen text-brandGreen flex items-center justify-center">
            {icon}
          </div>
        </div>
        <div className="hidden lg:flex w-12 h-12 rounded-xl bg-lightGreen text-brandGreen items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-daar-blue mb-3" style={{ fontFamily: 'Nunito, sans-serif' }}>{title}</h3>
        <p className="text-gray-600 leading-relaxed mb-4">{description}</p>
        <div className="flex items-center text-sm font-semibold text-brandGreen">
          <Check size={16} className="mr-2" />
          {highlight}
        </div>
      </div>
    </div>
  </article>
);

interface IntegrationCardProps {
  name: string;
  description: string;
}

const IntegrationCard: React.FC<IntegrationCardProps> = ({ name, description }) => (
  <div className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-brandGreen hover:shadow-lg transition-all text-center group hover:-translate-y-1">
    <div className="w-12 h-12 bg-lightGreen rounded-xl mb-3 mx-auto group-hover:bg-brandGreen/20 transition-colors"></div>
    <h4 className="font-bold text-daar-blue text-sm mb-1" style={{ fontFamily: 'Nunito, sans-serif' }}>{name}</h4>
    <p className="text-xs text-gray-600">{description}</p>
  </div>
);
