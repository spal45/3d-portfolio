import { Preloader } from "@/components/system/Preloader";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/layout/BackToTop";
import { AmbientSequence } from "@/components/3d/AmbientSequence";
import { Hero } from "@/components/sections/Hero";
import { Pitch } from "@/components/sections/Pitch";
import { TrackRecord } from "@/components/sections/TrackRecord";
import { Work } from "@/components/sections/Work";
import { Arsenal } from "@/components/sections/Arsenal";
import { Philosophy } from "@/components/sections/Philosophy";
import { WhyHire } from "@/components/sections/WhyHire";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Preloader />
      <AmbientSequence />
      <Nav />
      <BackToTop />

      <main className="relative z-10">
        <Hero />
        <Pitch />
        <TrackRecord />
        <Work />
        <Arsenal />
        <Philosophy />
        <WhyHire />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
