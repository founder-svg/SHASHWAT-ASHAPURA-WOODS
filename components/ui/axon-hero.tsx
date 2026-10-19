"use client";

import React from "react";
import { ArrowRight, Sparkles, PhoneCall } from "lucide-react";

export interface AxonHeroProps {
  brandName?: string;
  taglineLine1?: string;
  taglineLine2?: string;
  badgeText?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  videoSrc?: string;
  phone?: string;
}

export const AxonHero = ({
  brandName = "SHASHWAT ASHAPURA WOODS",
  taglineLine1 = "Premium Shutter Plywood",
  taglineLine2 = "engineered for maximum pours",
  badgeText = "Direct Mill Sourcing • Gandhidham Timber Hub",
  subtitle = "Eliminate formwork failures and 10x your concrete pour capacity. Heavy-compression densified shuttering plywood and 6 certified global pinewood species delivered straight from the port to your construction site.",
  ctaText = "Get Wholesale Quote",
  ctaHref = "https://wa.me/919099514179?text=Hello%20Shashwat%20Ashapura%20Woods%2C%20I%20am%20looking%20for%20bulk%20shuttering%20plywood%20and%20pinewood%20quotation.",
  videoSrc = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260714_113715_c7e0daa0-8bdd-4486-a2da-040901f8f0ea.mp4",
  phone = "+91 90995 14179",
}: AxonHeroProps) => {
  return (
    <>
      {/* Load required Google Fonts: Instrument Serif and Inter */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&display=swap');
        
        .axon-hero-root {
          font-family: 'Inter', sans-serif;
          color: #1B133C;
        }

        .axon-heading-serif {
          font-family: 'Instrument Serif', Georgia, serif;
        }
      `}</style>

      <section className="axon-hero-root relative h-screen w-full overflow-hidden flex flex-col justify-between select-none">
        
        {/* Background Looping Video: 130% height anchored to top */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-[130%] object-cover object-top"
            src={videoSrc}
          />
          {/* Subtle Ambient Tint for High Contrast Legibility */}
          <div className="absolute inset-0 bg-white/20 backdrop-brightness-[0.96]" />
        </div>

        {/* 1. TOP NAVIGATION BAR (Centered Pill) */}
        <header className="relative z-10 w-full flex justify-center pt-4 md:pt-6 px-4">
          <div className="flex items-center justify-between gap-6 sm:gap-10 bg-white/70 backdrop-blur-md rounded-xl px-4 md:px-6 py-3 shadow-sm border border-[#1B133C]/10 max-w-4xl w-full">
            
            {/* Custom SVG Geometric Logo */}
            <a href="#home" className="flex items-center gap-3 group">
              <svg
                viewBox="0 0 256 256"
                className="w-6 h-6 fill-[#1B133C] transition-transform duration-300 group-hover:scale-105"
                aria-hidden="true"
              >
                <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z" />
                <path d="M 256 128 L 128 128 L 0 0 L 128 0 Z" />
              </svg>
              <span className="font-semibold text-xs sm:text-sm tracking-wider uppercase text-[#1B133C]">
                {brandName}
              </span>
            </a>

            {/* Navigation links (hidden on mobile, shown sm: and up) */}
            <nav className="hidden sm:flex items-center gap-6">
              <a
                href="#plywood"
                className="text-sm font-medium text-[#1B133C]/80 hover:text-[#1B133C] transition-colors"
              >
                Plywood
              </a>
              <a
                href="#species"
                className="text-sm font-medium text-[#1B133C]/80 hover:text-[#1B133C] transition-colors"
              >
                Pinewood Species
              </a>
              <a
                href="#products"
                className="text-sm font-medium text-[#1B133C]/80 hover:text-[#1B133C] transition-colors"
              >
                Products
              </a>
              <a
                href="#quality"
                className="text-sm font-medium text-[#1B133C]/80 hover:text-[#1B133C] transition-colors"
              >
                Quality
              </a>
              <a
                href="#contact"
                className="text-sm font-medium text-[#1B133C]/80 hover:text-[#1B133C] transition-colors"
              >
                Contact
              </a>
            </nav>

            {/* Quick Phone Call Action */}
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1B133C] hover:opacity-80 transition-opacity"
            >
              <PhoneCall className="w-3.5 h-3.5 text-orange-600" />
              <span className="hidden md:inline">{phone}</span>
            </a>

          </div>
        </header>

        {/* 2. CENTERED HERO CONTENT */}
        <main className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-4 mt-8 md:mt-16 max-w-5xl mx-auto">
          
          {/* Badge: YC-styled pill with vibrant orange icon */}
          <div className="mb-6 inline-flex items-center gap-2.5 rounded-xl border border-[#1B133C]/10 bg-white/70 backdrop-blur-sm px-4 py-2 text-sm font-medium text-[#1B133C] shadow-xs">
            <span className="bg-orange-500 text-white rounded w-5 h-5 flex items-center justify-center text-xs font-bold shadow-xs">
              ★
            </span>
            <span>{badgeText}</span>
          </div>

          {/* Heading in Instrument Serif */}
          <h1 className="axon-heading-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[0.95] tracking-tight text-[#1B133C] max-w-4xl">
            <span className="block">{taglineLine1}</span>
            <span className="block italic font-normal">{taglineLine2}</span>
          </h1>

          {/* Subtitle in Inter */}
          <p className="mt-5 sm:mt-6 max-w-3xl text-xs sm:text-sm md:text-base leading-relaxed text-[#1B133C]/70">
            {subtitle}
          </p>

          {/* High-Impact CTA Button */}
          <div className="mt-7 sm:mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#FEFEFE] px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-semibold text-[#1B133C] shadow-[0px_4px_12px_rgba(0,0,0,0.15)] hover:shadow-[0px_6px_16px_rgba(0,0,0,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              <span>{ctaText}</span>
              <ArrowRight className="w-4 h-4 text-[#1B133C]" />
            </a>

            <a
              href="#plywood"
              className="inline-flex items-center gap-2 rounded-xl bg-white/60 backdrop-blur-sm border border-[#1B133C]/10 px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-medium text-[#1B133C] hover:bg-white/80 transition-all duration-300"
            >
              <span>Explore Plywood Brands</span>
            </a>
          </div>

        </main>

        {/* Bottom Ambient Margin */}
        <div className="relative z-10 pb-6 md:pb-8 text-center">
          <span className="text-[11px] uppercase tracking-widest text-[#1B133C]/60 font-semibold">
            Gandhidham Port Timber Zone • Gujarat • Nationwide Supply
          </span>
        </div>

      </section>
    </>
  );
};

export default AxonHero;
