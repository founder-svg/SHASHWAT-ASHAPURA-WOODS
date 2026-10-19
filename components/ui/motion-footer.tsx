"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

// Register ScrollTrigger safely for React
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// -------------------------------------------------------------------------
// 1. SHASHWAT ASHAPURA WOODS — THEME-ADAPTIVE INLINE STYLES
// -------------------------------------------------------------------------
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,500;0,700;1,600&family=Cinzel:wght@700&display=swap');

.cinematic-footer-wrapper {
  font-family: 'Plus Jakarta Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  
  /* Brand Tokens: Deep Forest Green (#123C2A) & Wood Brown (#7A4E2D) */
  --pill-bg-1: rgba(18, 60, 42, 0.45);
  --pill-bg-2: rgba(11, 36, 25, 0.7);
  --pill-shadow: rgba(0, 0, 0, 0.45);
  --pill-highlight: rgba(198, 146, 85, 0.35);
  --pill-inset-shadow: rgba(7, 24, 16, 0.85);
  --pill-border: rgba(198, 146, 85, 0.25);
  
  --pill-bg-1-hover: rgba(122, 78, 45, 0.55);
  --pill-bg-2-hover: rgba(18, 60, 42, 0.85);
  --pill-border-hover: rgba(198, 146, 85, 0.7);
  --pill-shadow-hover: rgba(0, 0, 0, 0.65);
  --pill-highlight-hover: rgba(255, 255, 255, 0.3);
}

@keyframes footer-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  100% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.9; }
}

@keyframes footer-scroll-marquee {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes footer-heartbeat {
  0%, 100% { transform: scale(1); filter: drop-shadow(0 0 5px rgba(198, 146, 85, 0.6)); }
  15%, 45% { transform: scale(1.25); filter: drop-shadow(0 0 12px rgba(198, 146, 85, 0.9)); }
  30% { transform: scale(1); }
}

.animate-footer-breathe {
  animation: footer-breathe 8s ease-in-out infinite alternate;
}

.animate-footer-scroll-marquee {
  animation: footer-scroll-marquee 35s linear infinite;
}

.animate-footer-heartbeat {
  animation: footer-heartbeat 2s cubic-bezier(0.25, 1, 0.5, 1) infinite;
}

/* Theme-adaptive Grid Background with Wood Grain Atmosphere */
.footer-bg-grid {
  background-size: 60px 60px;
  background-image: 
    linear-gradient(to right, rgba(198, 146, 85, 0.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(198, 146, 85, 0.06) 1px, transparent 1px);
  mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
  -webkit-mask-image: linear-gradient(to bottom, transparent, black 30%, black 70%, transparent);
}

/* Forest Emerald & Amber Aurora Glow */
.footer-aurora {
  background: radial-gradient(
    circle at 50% 50%, 
    rgba(18, 60, 42, 0.45) 0%, 
    rgba(122, 78, 45, 0.35) 40%, 
    transparent 70%
  );
}

/* Glass Pill Theming */
.footer-glass-pill {
  background: linear-gradient(145deg, var(--pill-bg-1) 0%, var(--pill-bg-2) 100%);
  box-shadow: 
      0 10px 30px -10px var(--pill-shadow), 
      inset 0 1px 1px var(--pill-highlight), 
      inset 0 -1px 2px var(--pill-inset-shadow);
  border: 1px solid var(--pill-border);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.footer-glass-pill:hover {
  background: linear-gradient(145deg, var(--pill-bg-1-hover) 0%, var(--pill-bg-2-hover) 100%);
  border-color: var(--pill-border-hover);
  box-shadow: 
      0 20px 40px -10px var(--pill-shadow-hover), 
      inset 0 1px 1px var(--pill-highlight-hover);
  color: #FFFFFF;
}

/* Giant Background Text Masking: SHASHWAT */
.footer-giant-bg-text {
  font-family: 'Cinzel', serif;
  font-size: 23vw;
  line-height: 0.75;
  font-weight: 900;
  letter-spacing: -0.02em;
  color: transparent;
  -webkit-text-stroke: 1px rgba(198, 146, 85, 0.12);
  background: linear-gradient(180deg, rgba(198, 146, 85, 0.18) 0%, transparent 65%);
  -webkit-background-clip: text;
  background-clip: text;
}

/* Metallic Text Glow */
.footer-text-glow {
  font-family: 'Cormorant Garamond', Georgia, serif;
  background: linear-gradient(180deg, #FFFFFF 0%, rgba(245, 240, 231, 0.75) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 24px rgba(198, 146, 85, 0.25));
}
`;

// -------------------------------------------------------------------------
// 2. MAGNETIC BUTTON PRIMITIVE
// -------------------------------------------------------------------------
export type MagneticButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & 
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    as?: React.ElementType;
  };

const MagneticButton = React.forwardRef<HTMLElement, MagneticButtonProps>(
  ({ className, children, as: Component = "button", ...props }, forwardedRef) => {
    const localRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (typeof window === "undefined") return;
      const element = localRef.current;
      if (!element) return;

      const ctx = gsap.context(() => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = element.getBoundingClientRect();
          const h = rect.width / 2;
          const w = rect.height / 2;
          const x = e.clientX - rect.left - h;
          const y = e.clientY - rect.top - w;

          gsap.to(element, {
            x: x * 0.4,
            y: y * 0.4,
            rotationX: -y * 0.15,
            rotationY: x * 0.15,
            scale: 1.05,
            ease: "power2.out",
            duration: 0.4,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(element, {
            x: 0,
            y: 0,
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "elastic.out(1, 0.3)",
            duration: 1.2,
          });
        };

        element.addEventListener("mousemove", handleMouseMove as any);
        element.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          element.removeEventListener("mousemove", handleMouseMove as any);
          element.removeEventListener("mouseleave", handleMouseLeave);
        };
      }, element);

      return () => ctx.revert();
    }, []);

    return (
      <Component
        ref={(node: HTMLElement) => {
          (localRef as any).current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as any).current = node;
        }}
        className={cn("cursor-pointer", className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
MagneticButton.displayName = "MagneticButton";

// -------------------------------------------------------------------------
// 3. SHASHWAT MARQUEE TICKER
// -------------------------------------------------------------------------
const MarqueeItem = () => (
  <div className="flex items-center space-x-10 px-6">
    <span>Direct Mill Sourcing</span> <span className="text-[#C69255]">✦</span>
    <span>30+ Repetitive Pours</span> <span className="text-[#C69255]">✦</span>
    <span>6 Certified Pinewood Species</span> <span className="text-[#C69255]">✦</span>
    <span>Gandhidham Port Timber Zone</span> <span className="text-[#C69255]">✦</span>
    <span>BWP Shuttering Plywood</span> <span className="text-[#C69255]">✦</span>
    <span>USA / SYP Heavy Pine</span> <span className="text-[#C69255]">✦</span>
    <span>Nationwide Dispatch</span> <span className="text-[#C69255]">✦</span>
  </div>
);

// -------------------------------------------------------------------------
// 4. MAIN CINEMATIC FOOTER COMPONENT
// -------------------------------------------------------------------------
export function CinematicFooter() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const giantTextRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax for giant SHASHWAT backdrop
      gsap.fromTo(
        giantTextRef.current,
        { y: "12vh", scale: 0.82, opacity: 0 },
        {
          y: "0vh",
          scale: 1,
          opacity: 1,
          ease: "power1.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );

      // Staggered reveal for headings & interactive buttons
      gsap.fromTo(
        [headingRef.current, linksRef.current],
        { y: 55, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 45%",
            end: "bottom bottom",
            scrub: 1,
          },
        }
      );
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />
      
      {/* 
        The "Curtain Reveal" Wrapper:
        Clip path provides the sliding stage illusion as the user scrolls.
      */}
      <div
        ref={wrapperRef}
        className="relative h-screen w-full"
        style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
      >
        <footer className="fixed bottom-0 left-0 flex h-screen w-full flex-col justify-between overflow-hidden bg-[#071810] text-[#F5F0E7] cinematic-footer-wrapper">
          
          {/* Ambient Forest & Amber Glow */}
          <div className="footer-aurora absolute left-1/2 top-1/2 h-[65vh] w-[85vw] -translate-x-1/2 -translate-y-1/2 animate-footer-breathe rounded-[50%] blur-[90px] pointer-events-none z-0" />
          <div className="footer-bg-grid absolute inset-0 z-0 pointer-events-none" />

          {/* Giant background text: SHASHWAT */}
          <div
            ref={giantTextRef}
            className="footer-giant-bg-text absolute -bottom-[4vh] left-1/2 -translate-x-1/2 whitespace-nowrap z-0 pointer-events-none select-none"
          >
            SHASHWAT
          </div>

          {/* 1. Diagonal Sleek Marquee */}
          <div className="absolute top-10 left-0 w-full overflow-hidden border-y border-[#C69255]/25 bg-[#0B2419]/70 backdrop-blur-md py-4 z-10 -rotate-2 scale-110 shadow-2xl">
            <div className="flex w-max animate-footer-scroll-marquee text-xs md:text-sm font-bold tracking-[0.25em] text-[#C69255] uppercase">
              <MarqueeItem />
              <MarqueeItem />
            </div>
          </div>

          {/* 2. Main Center Content */}
          <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 mt-20 w-full max-w-5xl mx-auto">
            <h2
              ref={headingRef}
              className="text-4xl md:text-7xl font-bold footer-text-glow tracking-tight mb-4 text-center"
            >
              Ready to Build Strong?
            </h2>
            <p className="text-sm md:text-lg text-[#F5F0E7]/80 text-center max-width-2xl mb-10 max-w-xl">
              Connect directly with our Gandhidham port sales desk for live vessel stock, container rates &amp; site delivery schedules.
            </p>

            {/* Interactive Magnetic Pills */}
            <div ref={linksRef} className="flex flex-col items-center gap-6 w-full">
              {/* Primary Direct Contact Channels */}
              <div className="flex flex-wrap justify-center gap-4 w-full">
                <MagneticButton 
                  as="a" 
                  href="https://wa.me/919099514179?text=Hello%20Shashwat%20Ashapura%20Woods%2C%20I%20would%20like%20to%20inquire%20about%20Plywood%20and%20Pinewood%20pricing." 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-glass-pill px-8 py-4 rounded-full text-white font-bold text-sm md:text-base flex items-center gap-3 group"
                >
                  <svg className="w-5 h-5 text-[#25D366] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.82.49 3.53 1.36 5L2 22l5.17-1.34c1.43.81 3.09 1.34 4.83 1.34 5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.57 0-3.04-.44-4.3-1.22l-.31-.19-3.2.83.85-3.12-.2-.33C4.1 14.73 3.6 13.4 3.6 12c0-4.63 3.77-8.4 8.4-8.4s8.4 3.77 8.4 8.4-3.77 8.4-8.4 8.4z"/>
                  </svg>
                  WhatsApp: +91 90995 14179
                </MagneticButton>
                
                <MagneticButton 
                  as="a" 
                  href="tel:+919714495348" 
                  className="footer-glass-pill px-8 py-4 rounded-full text-white font-bold text-sm md:text-base flex items-center gap-3 group"
                >
                  <svg className="w-5 h-5 text-[#C69255] group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  Call: +91 97144 95348
                </MagneticButton>
              </div>

              {/* Secondary Wood Offerings & Location */}
              <div className="flex flex-wrap justify-center gap-3 md:gap-5 w-full mt-2">
                <MagneticButton as="a" href="#products" className="footer-glass-pill px-6 py-2.5 rounded-full text-[#F5F0E7]/80 font-medium text-xs md:text-sm hover:text-white">
                  Film Faced Shuttering Ply
                </MagneticButton>
                <MagneticButton as="a" href="#species" className="footer-glass-pill px-6 py-2.5 rounded-full text-[#F5F0E7]/80 font-medium text-xs md:text-sm hover:text-white">
                  Pine Wood
                </MagneticButton>
                <MagneticButton 
                  as="a" 
                  href="https://www.google.com/maps/place/SHASHWAT+ASHAPURA+WOODS/@23.0575801,70.0747585,17z/data=!3m1!4b1!4m6!3m5!1s0x3950b93732efe5e7:0xf277388baae316ae!8m2!3d23.0575801!4d70.0773334!16s%2Fg%2F11xtdzryb9?hl=en" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="footer-glass-pill px-6 py-2.5 rounded-full text-[#C69255] font-medium text-xs md:text-sm hover:text-white"
                >
                  📍 SHASHWAT ASHAPURA WOODS (Google Maps)
                </MagneticButton>
              </div>
            </div>
          </div>

          {/* 3. Bottom Bar / Credits */}
          <div className="relative z-20 w-full pb-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/5 pt-6 bg-[#071810]/60 backdrop-blur-sm">
            
            {/* Copyright */}
            <div className="text-[#F5F0E7]/60 text-[11px] md:text-xs font-semibold tracking-wider uppercase order-2 md:order-1 text-center md:text-left">
              &copy; 2026 Shashwat Ashapura Woods. Built From Nature. Made for Strength.
            </div>

            {/* "Made with Strength" Badge */}
            <div className="footer-glass-pill px-6 py-2.5 rounded-full flex items-center gap-2 order-1 md:order-2 cursor-default border-[#C69255]/30">
              <span className="text-[#F5F0E7]/70 text-[10px] md:text-xs font-bold uppercase tracking-widest">Crafted with</span>
              <span className="animate-footer-heartbeat text-sm md:text-base text-[#C69255]">✦</span>
              <span className="text-[#F5F0E7]/70 text-[10px] md:text-xs font-bold uppercase tracking-widest">for</span>
              <span className="text-white font-black text-xs md:text-sm tracking-normal ml-1">Builders &amp; Contractors</span>
            </div>

            {/* Back to top */}
            <MagneticButton
              as="button"
              onClick={scrollToTop}
              className="w-12 h-12 rounded-full footer-glass-pill flex items-center justify-center text-[#F5F0E7] hover:text-[#C69255] group order-3"
              aria-label="Scroll to top"
            >
              <svg className="w-5 h-5 transform group-hover:-translate-y-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
            </MagneticButton>

          </div>
        </footer>
      </div>
    </>
  );
}

export default CinematicFooter;
