import type { Metadata } from "next";
import DaarLandingPage2 from "@/components/DaarLandingPage2";

export const metadata: Metadata = {
  title: "Daar 2.0 - Grip op vrijwilligers, focus op geluk",
  description: "Het complete platform dat werving, beheer en impactmeting verbindt. Verhoog de betrokkenheid en maak elk uur meetbaar waardevol.",
  keywords: ["vrijwilligers", "impact", "beheer", "welzijn", "AVG"],
  openGraph: {
    title: "Daar 2.0 - Grip op vrijwilligers, focus op geluk",
    description: "Het complete platform voor vrijwilligersmanagement",
    type: "website",
  },
};

export default function Home() {
  return <DaarLandingPage2 />;
}
