import type { Metadata } from "next";
import Link from 'next/link';
import { Sparkles, ArrowRight, Check, Heart, Clock } from 'lucide-react';
import { SoftwareApplicationSchema, FAQSchema } from "@/components/seo/JsonLd";
import { LatestArticles } from '@/components/home/LatestArticles';
import ProblemSolution from '@/components/ProblemSolution';
import FeatureTabShowcase from '@/components/FeatureTabShowcase';
import ImpactStats from '@/components/ImpactStats';
import Testimonials from '@/components/Testimonials';

export const metadata: Metadata = {
  title: "Grip op vrijwilligers, focus op geluk",
  description: "Het complete platform dat werving, beheer en impactmeting verbindt. Verhoog de betrokkenheid en maak elk uur meetbaar waardevol. 667% ROI in jaar 1.",
  keywords: [
    "vrijwilligers",
    "vrijwilligersmanagement",
    "vrijwilligersplatform",
    "impact meten",
    "beheer",
    "welzijn",
    "AVG-proof",
    "geluksformule",
    "vrijwilligers werving",
    "vrijwilligers matching",
    "retentie vrijwilligers",
  ],
  openGraph: {
    title: "Daar - Grip op vrijwilligers, focus op geluk",
    description: "Het complete platform dat werving, beheer en impactmeting verbindt. 667% ROI in jaar 1.",
    type: "website",
    url: "https://daar.nl",
    siteName: "Daar",
    locale: "nl_NL",
    // OG image auto-generated via opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: "Daar - Grip op vrijwilligers, focus op geluk",
    description: "Het complete platform dat werving, beheer en impactmeting verbindt.",
    // Twitter image auto-generated via twitter-image.tsx
  },
  alternates: {
    canonical: "https://daar.nl",
  },
};

const homepageFAQs = [
  {
    question: "Wat is Daar?",
    answer: "Daar is het complete platform voor vrijwilligersmanagement. Van werving tot impactmeting, met de unieke Geluksformule die het welbevinden van vrijwilligers meet.",
  },
  {
    question: "Wat kost Daar?",
    answer: "Daar biedt flexibele prijsmodellen op basis van het aantal vrijwilligers. Neem contact op voor een persoonlijke offerte en ontdek hoe je 667% ROI kunt behalen.",
  },
  {
    question: "Hoe werkt de Geluksformule?",
    answer: "De Geluksformule meet het welbevinden van vrijwilligers via regelmatige check-ins. Het stoplicht-systeem waarschuwt automatisch wanneer iemand extra aandacht nodig heeft.",
  },
  {
    question: "Is Daar AVG-proof?",
    answer: "Ja, Daar is volledig AVG-compliant. Alle gegevens worden veilig opgeslagen in Nederland en je hebt volledige controle over wie toegang heeft tot welke informatie.",
  },
];

export default function Home() {
  return (
    <div className="bg-white">
      <SoftwareApplicationSchema
        name="Daar Vrijwilligersplatform"
        description="Het complete platform voor vrijwilligersmanagement met werving, matching, beheer en impactmeting."
        features={[
          "Smart Matching voor vrijwilligers",
          "Geluksformule impactmeting",
          "Centraal documentbeheer (AVG-proof)",
          "Real-time rapportages en dashboards",
          "Communicatie en engagement tools",
          "Geluksmonitor assessment",
        ]}
        aggregateRating={{
          ratingValue: 4.8,
          reviewCount: 50,
        }}
      />
      <FAQSchema items={homepageFAQs} />

      {/* Hero Section */}
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
                <span className="block mt-3 font-semibold text-brandGreen">Nodig uw organisatie uit voor een gratis Geluksmonitor scan!</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/platform"
                  className="bg-brandGreen text-white font-bold px-8 py-4 rounded-full hover:bg-brandGreenHover transition-all shadow-lg shadow-green-200/50 flex items-center justify-center group"
                >
                  Bekijk de modules
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
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

            {/* Right Visual - Dashboard Card */}
            <div className="lg:col-span-6 relative">
              <div className="bg-white rounded-3xl p-6 shadow-2xl border border-gray-100">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <span className="inline-block px-3 py-1 bg-brandGreen/10 text-brandGreen text-xs font-semibold rounded-full mb-2">
                      VRIJWILLIGER
                    </span>
                    <h3 className="text-xl font-bold text-daar-blue" style={{ fontFamily: 'Nunito, sans-serif' }}>Sanne Jansen</h3>
                    <p className="text-gray-500 text-sm">Barvrijwilliger & Coach</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-daar-blue/10 flex items-center justify-center text-daar-blue font-bold">
                    SJ
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-lightGreen rounded-2xl p-4">
                    <div className="flex items-center gap-2 text-brandGreen text-xs font-semibold mb-1">
                      <Sparkles size={14} />
                      GELUKSMOMENTEN
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-brandGreen">124</span>
                      <span className="text-sm text-brandGreen/70">+12%</span>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-4">
                    <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold mb-1">
                      <Clock size={14} />
                      UREN INZET
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-daar-blue">18</span>
                      <span className="text-sm text-gray-400">u</span>
                      <span className="text-sm text-gray-400">Deze maand</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-daar-blue">Impact Trend</span>
                    <span className="text-xs text-gray-400">Laatste 6 maanden</span>
                  </div>
                  <div className="flex items-end gap-2 h-20">
                    <div className="flex-1 bg-gray-100 rounded-lg" style={{height: '45%'}}></div>
                    <div className="flex-1 bg-gray-100 rounded-lg" style={{height: '60%'}}></div>
                    <div className="flex-1 bg-gray-100 rounded-lg" style={{height: '50%'}}></div>
                    <div className="flex-1 bg-gray-100 rounded-lg" style={{height: '70%'}}></div>
                    <div className="flex-1 bg-gray-100 rounded-lg" style={{height: '55%'}}></div>
                    <div className="flex-1 bg-daar-geel rounded-lg" style={{height: '100%'}}></div>
                  </div>
                </div>

                <button className="w-full bg-daar-blue text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-daar-blue/90 transition-colors">
                  <Heart size={18} />
                  Stuur een bedankje
                </button>
              </div>

              <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full bg-brandGreen/10 rounded-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <ProblemSolution />
      <div id="producten"></div>
      <FeatureTabShowcase />
      <ImpactStats />
      <Testimonials />
      <LatestArticles />
    </div>
  );
}
