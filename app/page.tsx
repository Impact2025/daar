import type { Metadata } from "next";
import DaarLandingPage from "@/components/DaarLandingPage";

export const metadata: Metadata = {
  title: "Daar - Grip op vrijwilligers, focus op geluk",
  description: "Het complete platform dat werving, beheer en impactmeting verbindt. Verhoog de betrokkenheid en maak elk uur meetbaar waardevol.",
  keywords: ["vrijwilligers", "impact", "beheer", "welzijn", "AVG"],
  openGraph: {
    title: "Daar - Grip op vrijwilligers, focus op geluk",
    description: "Het complete platform voor vrijwilligersmanagement",
    type: "website",
  },
};

export default function Home() {
  return <DaarLandingPage />;
}
