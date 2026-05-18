"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "./MagneticButton";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      tl.from(".hero-eyebrow", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      })
        .from(
          ".hero-line",
          {
            y: 100,
            opacity: 0,
            rotationX: -20,
            duration: 1.4,
            stagger: 0.12,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          ".hero-desc",
          {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .from(
          ".hero-cta-wrap",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .from(
          ".hero-scroll",
          {
            opacity: 0,
            duration: 1,
            ease: "power2.out",
          },
          "-=0.2"
        );

      // Parallax on scroll
      gsap.to(bgRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".hero-content", {
        yPercent: -8,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "60% top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 md:px-10"
    >
      {/* Atmospheric background */}
      <div ref={bgRef} className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_45%,rgba(139,111,111,0.06),transparent_70%)]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(139,111,111,0.04),transparent_60%)] blur-3xl" />
      </div>

      {/* Grid lines decoration */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute left-[20%] top-0 bottom-0 w-px bg-white" />
        <div className="absolute left-[80%] top-0 bottom-0 w-px bg-white" />
        <div className="absolute top-[30%] left-0 right-0 h-px bg-white" />
        <div className="absolute top-[70%] left-0 right-0 h-px bg-white" />
      </div>

      <div className="hero-content relative z-10 mx-auto w-full max-w-[1300px]">
        {/* Eyebrow */}
        <div className="hero-eyebrow mb-8 md:mb-12">
          <span className="section-label font-editorial text-[10px] md:text-[11px]">
            Креативное агентство
          </span>
        </div>

        {/* Main heading — editorial oversized */}
        <h1
          className="font-editorial font-semibold leading-[0.88] tracking-[-0.04em] text-white"
          style={{ perspective: "800px" }}
        >
          <div className="hero-line overflow-hidden">
            <span className="block text-[clamp(3.5rem,11vw,10rem)]">Дизайн,</span>
          </div>
          <div className="hero-line overflow-hidden">
            <span className="block text-[clamp(3.5rem,11vw,10rem)] text-[#b09090]">
              который
            </span>
          </div>
          <div className="hero-line overflow-hidden">
            <span className="block text-[clamp(3.5rem,11vw,10rem)]">
              невозможно
            </span>
          </div>
          <div className="hero-line overflow-hidden">
            <span className="block text-[clamp(3.5rem,11vw,10rem)]">
              игнорировать
            </span>
          </div>
        </h1>

        {/* Divider line */}
        <div className="mt-8 md:mt-12 mb-8 md:mb-10 h-px w-20 bg-gradient-to-r from-[#8b6f6f] to-transparent" />

        {/* Description */}
        <div className="hero-desc max-w-lg">
          <p className="text-[15px] md:text-[17px] leading-relaxed text-white/35 font-light">
            Афиши, визуал и брендинг для фестивалей
            <br className="hidden md:block" />
            <span className="text-white/20 mx-2 hidden md:inline">·</span>
            и брендов
          </p>
        </div>

        {/* CTAs */}
        <div className="hero-cta-wrap mt-10 md:mt-14 flex flex-wrap items-center gap-4 md:gap-6">
          <MagneticButton
            href="/works"
            className="border border-white/15 px-8 md:px-10 py-3.5 md:py-4 text-[11px] md:text-[12px] uppercase tracking-[0.2em] text-white/70 hover:text-white hover:border-[#8b6f6f]/40"
          >
            Работы
          </MagneticButton>
          <MagneticButton
            href="/contact"
            className="bg-white/[0.04] border border-transparent px-8 md:px-10 py-3.5 md:py-4 text-[11px] md:text-[12px] uppercase tracking-[0.2em] text-white/60 hover:text-white hover:bg-white/[0.08]"
          >
            Связаться
          </MagneticButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-[9px] uppercase tracking-[0.3em] text-white/15">
          Scroll
        </span>
        <div className="relative h-12 w-px overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent animate-[scrollLine_2s_ease-in-out_infinite]" />
        </div>
      </div>

      {/* Side counter */}
      <div className="absolute right-6 md:right-10 bottom-8 md:bottom-12">
        <span className="counter text-[10px] font-mono text-white/10">01 / 04</span>
      </div>

      <style jsx>{`
        @keyframes scrollLine {
          0% {
            transform: translateY(-100%);
            opacity: 0;
          }
          30% {
            opacity: 1;
          }
          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
}
