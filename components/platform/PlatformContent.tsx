'use client';

import React from 'react';
import { ArrowRight, Check, Users, BarChart2, Shield, Zap, RefreshCw, Database } from 'lucide-react';

export const PlatformContent = () => {
  return (
    <div className="font-sans antialiased text-navy bg-offWhite">

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden bg-gradient-to-br from-navy to-navy/90">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brandGreen rounded-full opacity-10 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6 tracking-tighter">
              Hoe werkt het <span className="text-brandGreen">Daar</span> platform?
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Een complete oplossing die werving, beheer en impactmeting naadloos met elkaar verbindt.
              Ontdek hoe Daar jouw vrijwilligersorganisatie naar een hoger niveau tilt.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-400 font-medium">
              <span className="flex items-center"><Check size={18} className="text-brandGreen mr-2" /> Cloud-based</span>
              <span className="flex items-center"><Check size={18} className="text-brandGreen mr-2" /> Realtime</span>
              <span className="flex items-center"><Check size={18} className="text-brandGreen mr-2" /> Schaalbaar</span>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-4 tracking-tight">
              Alles-in-één ecosysteem voor vrijwilligersbeheer
            </h2>
            <p className="text-gray-600 text-lg">
              Het Daar platform bestaat uit zes geïntegreerde modules die samen zorgen voor een complete vrijwilligersmanagement ervaring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PlatformFeature
              icon={<Users size={32} />}
              title="Smart Matching"
              description="AI-gedreven matching tussen vrijwilligers en opdrachten op basis van skills, beschikbaarheid en voorkeuren."
              tags={["AI", "Matching", "Automatisch"]}
            />
            <PlatformFeature
              icon={<Shield size={32} />}
              title="Centraal Dossier"
              description="AVG-proof documentbeheer met VOG's, contracten en certificaten centraal opgeslagen en altijd toegankelijk."
              tags={["AVG", "Veilig", "Cloud"]}
            />
            <PlatformFeature
              icon={<BarChart2 size={32} />}
              title="Impact Dashboard"
              description="Real-time analytics met koppeling naar SDG's voor rapportage aan gemeenten en fondsen."
              tags={["Analytics", "SDG", "Realtime"]}
            />
            <PlatformFeature
              icon={<Zap size={32} />}
              title="Vrijwilligers Check"
              description="Welzijnsmonitor met stoplicht-systeem om overbelasting vroegtijdig te signaleren."
              tags={["Welzijn", "Preventie", "Monitor"]}
            />
            <PlatformFeature
              icon={<RefreshCw size={32} />}
              title="Declaratie App"
              description="Scan bonnetjes, declareer direct en krijg automatische goedkeuring via smart workflows."
              tags={["Mobiel", "Automatisch", "OCR"]}
            />
            <PlatformFeature
              icon={<Database size={32} />}
              title="Communicatie Hub"
              description="Centrale inbox voor groepschats, nieuws en updates. Alles op één plek."
              tags={["Chat", "Notificaties", "Groepen"]}
            />
          </div>
        </div>
      </section>

      {/* How It Works - Step by Step */}
      <section className="py-24 bg-offWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-4 tracking-tight">
              Van aanmelding tot impact
            </h2>
            <p className="text-gray-600 text-lg">
              Volg de reis van een vrijwilliger door het Daar platform
            </p>
          </div>

          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brandGreen via-navy to-brandGreen transform -translate-x-1/2"></div>

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
                title="Actieve Inzet & Monitoring"
                description="Tijdens de inzet registreert het systeem uren, declaraties en tevredenheid. De Vrijwilligers Check monitort het welzijn en stuurt alerts bij signalen van overbelasting."
                icon={<Shield size={28} />}
                highlight="Real-time welzijns-monitoring"
                side="left"
              />

              <WorkflowStep
                stepNumber={4}
                title="Impact Meting"
                description="Alle data wordt automatisch omgezet naar impact-rapporten. Denk aan aantal geholpen personen, CO2-besparing en SDG-bijdragen. Deze cijfers zijn direct beschikbaar voor subsidieaanvragen."
                icon={<BarChart2 size={28} />}
                highlight="Automatische SDG-mapping"
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
            <h2 className="text-3xl md:text-4xl font-extrabold text-navy mb-4 tracking-tight">
              Integraties met bestaande tools
            </h2>
            <p className="text-gray-600 text-lg">
              Daar werkt naadloos samen met je bestaande tools en systemen
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
      <section className="py-20 bg-navy relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-2xl"></div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
            Klaar om te starten?
          </h2>
          <p className="text-xl text-gray-300 mb-10 font-light max-w-2xl mx-auto">
            Plan een demo en ontdek hoe Daar jouw vrijwilligerswerk transformeert
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-brandGreen text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-brandGreenHover transition-all shadow-lg hover:shadow-green-900/20 transform hover:-translate-y-1 tracking-tight flex items-center justify-center group">
              Plan een demo
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <button className="bg-transparent border border-gray-600 text-white font-bold px-8 py-4 rounded-xl text-lg hover:bg-white/5 transition-colors tracking-tight">
              Bekijk prijzen
            </button>
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
              "Vrijwilligers Check welzijnsmonitor",
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

interface PlatformFeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  tags: string[];
}

const PlatformFeature: React.FC<PlatformFeatureProps> = ({ icon, title, description, tags }) => (
  <article className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 group">
    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brandGreen to-brandGreenHover flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-navy mb-3 tracking-tight">{title}</h3>
    <p className="text-gray-600 leading-relaxed mb-4">{description}</p>
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, idx) => (
        <span key={idx} className="text-xs bg-blue-50 text-navy px-3 py-1 rounded-full font-medium">
          {tag}
        </span>
      ))}
    </div>
  </article>
);

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
    <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-brandGreen text-white font-bold text-2xl items-center justify-center shadow-lg z-10">
      {stepNumber}
    </div>

    {/* Content Card */}
    <div className={`w-full lg:w-5/12 ${side === 'left' ? 'lg:pr-16' : 'lg:pl-16'}`}>
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all">
        <div className="flex items-center mb-4 lg:hidden">
          <div className="w-12 h-12 rounded-full bg-brandGreen text-white font-bold text-xl flex items-center justify-center mr-4">
            {stepNumber}
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-brandGreen flex items-center justify-center">
            {icon}
          </div>
        </div>
        <div className="hidden lg:block w-12 h-12 rounded-xl bg-blue-50 text-brandGreen flex items-center justify-center mb-4">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-navy mb-3 tracking-tight">{title}</h3>
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
  <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-brandGreen transition-colors text-center group">
    <div className="w-12 h-12 bg-gray-100 rounded-xl mb-3 mx-auto group-hover:bg-brandGreen/10 transition-colors"></div>
    <h4 className="font-bold text-navy text-sm mb-1">{name}</h4>
    <p className="text-xs text-gray-500">{description}</p>
  </div>
);
