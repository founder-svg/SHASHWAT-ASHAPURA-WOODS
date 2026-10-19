"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, PhoneCall, Sparkles } from "lucide-react";

/* --------------------------------------------------------------------------
   WordsPullUp Primitive
   Splits text into words and applies a staggered spring reveal on view
   -------------------------------------------------------------------------- */
export interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: React.CSSProperties;
}

export const WordsPullUp = ({
  text,
  className = "",
  showAsterisk = false,
  style,
}: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1;
        return (
          <motion.span
            key={i}
            initial={{ y: 24, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.7,
              delay: i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block relative"
            style={{ marginRight: isLast ? 0 : "0.25em" }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="absolute top-[0.45em] -right-[0.35em] text-[0.32em] text-[#C69255] font-light">
                ✦
              </span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
};

/* --------------------------------------------------------------------------
   WordsPullUpMultiStyle Primitive
   Allows distinct per-segment typographic styling
   -------------------------------------------------------------------------- */
export interface Segment {
  text: string;
  className?: string;
}

export interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
  style?: React.CSSProperties;
}

export const WordsPullUpMultiStyle = ({
  segments,
  className = "",
  style,
}: WordsPullUpMultiStyleProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const words: { word: string; className?: string }[] = [];
  segments.forEach((seg) => {
    seg.text.split(" ").forEach((w) => {
      if (w) words.push({ word: w, className: seg.className });
    });
  });

  return (
    <div
      ref={ref}
      className={`inline-flex flex-wrap justify-center ${className}`}
      style={style}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{
            duration: 0.6,
            delay: i * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`inline-block ${w.className ?? ""}`}
          style={{ marginRight: "0.25em" }}
        >
          {w.word}
        </motion.span>
      ))}
    </div>
  );
};

/* --------------------------------------------------------------------------
   PrismaHero Adapted for Shashwat Ashapura Woods
   -------------------------------------------------------------------------- */
const navItems = [
  { label: "Products", href: "#products" },
  { label: "Pinewood Species", href: "#species" },
  { label: "Our Process", href: "#process" },
  { label: "Applications", href: "#applications" },
  { label: "Estimator", href: "#calculator" },
  { label: "Contact", href: "#contact" },
];

export interface PrismaHeroProps {
  brandTitle?: string;
  subtitle?: string;
  phone?: string;
  whatsappLink?: string;
  videoSrc?: string;
  posterSrc?: string;
}

export const PrismaHero = ({
  brandTitle = "SHASHWAT",
  subtitle = "Direct mill-sourced Shutter Plywood and six certified global Pinewood species imported directly via Gandhidham timber port zone. Engineered for maximum repetitions, zero-void stability, and structural endurance.",
  phone = "+91 90995 14179",
  whatsappLink = "https://wa.me/919099514179?text=Hello%20Shashwat%20Ashapura%20Woods%2C%20I%20am%20interested%20in%20bulk%20shuttering%20plywood%20and%20pinewood%20quotation.",
  videoSrc = "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4",
  posterSrc = "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=2000&q=80",
}: PrismaHeroProps) => {
  return (
    <section className="relative h-screen w-full bg-[#071810] text-[#F5F0E7] overflow-hidden p-2 sm:p-4">
      <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2.5rem] border border-[#C69255]/20 shadow-2xl">
        
        {/* Background video with cinematic timber atmosphere */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={posterSrc}
          className="absolute inset-0 h-full w-full object-cover scale-105"
          src={videoSrc}
        />

        {/* Cinematic Wood Grain & Film Grain Overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay"
          style={{
            backgroundImage: `radial-gradient(rgba(198, 146, 85, 0.15) 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        />

        {/* Ambient Vignette Gradients */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#071810]/75 via-black/30 to-[#071810]/95" />
        <div className="pointer-events-none absolute inset-0 bg-radial-gradient from-transparent via-[#071810]/40 to-[#071810]/80" />

        {/* Floating Top Navbar Pill */}
        <nav className="absolute left-1/2 top-0 z-30 -translate-x-1/2">
          <div className="flex items-center gap-3 sm:gap-6 md:gap-8 rounded-b-2xl md:rounded-b-3xl bg-[#0B2419]/90 px-5 py-2.5 backdrop-blur-md border-x border-b border-[#C69255]/30 shadow-xl">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[11px] sm:text-xs md:text-sm font-medium tracking-wide transition-colors text-[#F5F0E7]/80 hover:text-[#C69255]"
              >
                {item.label}
              </a>
            ))}
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="hidden lg:inline-flex items-center gap-1.5 ml-2 pl-3 border-l border-[#C69255]/30 text-xs text-[#C69255] font-semibold hover:text-white transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-[#C69255]" />
              {phone}
            </a>
          </div>
        </nav>

        {/* Top subtle badge */}
        <div className="absolute top-16 left-6 md:left-12 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#123C2A]/60 backdrop-blur-sm border border-[#C69255]/30 text-[11px] font-semibold tracking-wider text-[#C69255] uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#C69255]" />
          <span>Shashwat Ashapura Woods • Gandhidham Timber Hub</span>
        </div>

        {/* Bottom Hero Editorial & Giant Title */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 sm:px-8 sm:pb-8 md:px-12 md:pb-12 z-20">
          <div className="grid grid-cols-12 items-end gap-6">
            
            {/* Giant Brand Typography */}
            <div className="col-span-12 lg:col-span-8">
              <span className="block text-xs sm:text-sm md:text-base uppercase tracking-[0.35em] text-[#C69255] font-bold mb-2">
                Premium Shutter Plywood &amp; Global Pinewood
              </span>
              <h1
                className="font-black leading-[0.82] tracking-[-0.06em] text-[22vw] sm:text-[20vw] md:text-[18vw] lg:text-[16vw] xl:text-[15vw] select-none text-[#F5F0E7]"
                style={{
                  textShadow: "0 10px 40px rgba(0,0,0,0.8)",
                }}
              >
                <WordsPullUp text={brandTitle} showAsterisk />
              </h1>
            </div>

            {/* Editorial Narrative & CTA */}
            <div className="col-span-12 flex flex-col gap-5 pb-2 lg:col-span-4 lg:pb-6">
              
              <motion.p
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.45,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-xs sm:text-sm md:text-base text-[#F5F0E7]/85 font-normal leading-relaxed"
              >
                {subtitle}
              </motion.p>

              <div className="flex flex-wrap items-center gap-3">
                <motion.a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.65,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group inline-flex items-center gap-3 rounded-full bg-[#C69255] hover:bg-[#d4a266] py-1.5 pl-6 pr-1.5 text-xs sm:text-sm md:text-base font-bold text-[#071810] shadow-lg hover:shadow-[#C69255]/30 transition-all hover:gap-4"
                >
                  Get Bulk Quote
                  <span className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#071810] transition-transform group-hover:scale-110">
                    <ArrowRight className="h-4 w-4 text-[#C69255]" />
                  </span>
                </motion.a>

                <motion.a
                  href="#species"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.75,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-flex items-center px-5 py-2.5 rounded-full bg-[#0B2419]/70 hover:bg-[#123C2A] text-xs sm:text-sm font-semibold text-[#F5F0E7] border border-[#C69255]/30 backdrop-blur-md transition-colors"
                >
                  View 6 Pine Species
                </motion.a>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PrismaHero;
