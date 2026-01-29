import type { Metadata } from "next";
import DaarLandingPage2 from "@/components/DaarLandingPage2";
import { SoftwareApplicationSchema, FAQSchema } from "@/components/seo/JsonLd";

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
    <>
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
      <DaarLandingPage2 />
    </>
  );
}
