"use client";

import { PrismaHero } from "@/components/ui/prisma-hero";
import { AxonHero } from "@/components/ui/axon-hero";
import { CinematicFooter } from "@/components/ui/motion-footer";

export default function Demo() {
  return (
    <div className="relative w-full bg-[#071810] min-h-screen font-sans selection:bg-[#C69255]/30 overflow-x-hidden">

      {/* 
        HERO VARIATION A: AXON-STYLE INSTRUMENT SERIF HERO (With Video & Nav Pill)
      */}
      <AxonHero
        brandName="SHASHWAT ASHAPURA WOODS"
        taglineLine1="Premium Shutter Plywood"
        taglineLine2="engineered for maximum concrete pours"
        badgeText="IS: 4990 Certified • Direct Seaport Mill Sourcing"
        subtitle="Eliminate formwork failures and 10x your concrete pour capacity. Heavy-compression densified shuttering plywood and 6 certified global pinewood species delivered straight from Gandhidham timber port to your jobsite."
        ctaText="Get Wholesale Quote"
      />

      {/* 
        MID-PAGE CONTENT WRAPPER: PLYWOOD & PINEWOOD SPECIFICATIONS
      */}
      <main className="relative z-10 w-full min-h-[60vh] bg-[#F5F0E7] flex flex-col items-center justify-center text-[#1D211E] border-b border-[#123C2A]/20 shadow-2xl rounded-b-[40px] px-6 py-20 text-center my-6">
        <span className="text-xs font-bold tracking-[0.25em] text-[#7A4E2D] uppercase mb-4">
          Gandhidham Port Timber Zone • Gujarat
        </span>
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#123C2A] max-w-3xl mb-6">
          WudPlus™ &amp; COMMANDO™ Shuttering Plywood
        </h2>
        <p className="text-base md:text-lg text-[#4A524D] max-w-2xl mb-12">
          Featuring All-Layers-Glued technology, 120 GSM phenolic mirror-finish coating, and 6 global pinewood species (Uruguay, Austral, USA SYP, NZ, Spruce, Silk). Scroll down to experience the curtain reveal footer.
        </p>

        <div className="w-[2px] h-20 bg-gradient-to-b from-[#7A4E2D] to-transparent animate-pulse" />
      </main>

      {/* 
        CINEMATIC FOOTER
        Curtain reveal with ambient aurora glow, giant masked SHASHWAT text, and magnetic pills
      */}
      <CinematicFooter />

    </div>
  );
}

// Standalone export for PrismaHero Demo
export function DemoPrisma() {
  return (
    <div className="relative w-full bg-[#071810] min-h-screen">
      <PrismaHero />
      <CinematicFooter />
    </div>
  );
}
