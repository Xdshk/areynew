"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cases } from "./cases";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const categories = ["Все", ...Array.from(new Set(cases.map((c) => c.category)))];

export default function WorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("Все");
  const [, setHoveredIndex] = useState<number | null>(null);

  const filtered =
    activeCategory === "Все"
      ? cases
      : cases.filter((c) => c.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".works-eyebrow", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".works-eyebrow",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".works-title-line", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".works-title-line",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.from(".filter-btn", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".filter-row",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate grid items when filter changes
  useEffect(() => {
    if (!gridRef.current) return;
    const items = gridRef.current.querySelectorAll(".work-card");
    gsap.fromTo(
      items,
      { y: 40, opacity: 0, scale: 0.98 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
      }
    );
  }, [activeCategory]);

  const handleCardMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, index: number) => {
      setHoveredIndex(index);
      const card = e.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const img = card.querySelector(".card-image") as HTMLElement;
      if (img) {
        gsap.to(img, {
          x: x * 15,
          y: y * 15,
          rotationY: x * 5,
          rotationX: -y * 5,
          duration: 0.6,
          ease: "power2.out",
        });
      }
    },
    []
  );

  const handleCardMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      setHoveredIndex(null);
      const img = e.currentTarget.querySelector(".card-image") as HTMLElement;
      if (img) {
        gsap.to(img, {
          x: 0,
          y: 0,
          rotationY: 0,
          rotationX: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      }
    },
    []
  );

  return (
    <section
      ref={sectionRef}
      className="relative px-6 py-24 md:py-40 md:px-10"
    >
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="mb-12 md:mb-20">
          <div className="works-eyebrow mb-6">
            <span className="section-label">Портфолио</span>
          </div>
          <h2
            className="font-editorial font-semibold leading-[0.9] tracking-[-0.03em] text-white"
            style={{ perspective: "600px" }}
          >
            <div className="works-title-line overflow-hidden">
              <span className="block text-[clamp(2.5rem,7vw,6rem)]">Избранные</span>
            </div>
            <div className="works-title-line overflow-hidden">
              <span className="block text-[clamp(2.5rem,7vw,6rem)] text-[#b09090]">
                работы
              </span>
            </div>
          </h2>
          <div className="mt-6 md:mt-8 h-px w-16 bg-gradient-to-r from-[#8b6f6f]/60 to-transparent" />
        </div>

        {/* Filters */}
        <div className="filter-row mb-10 md:mb-14 flex flex-wrap gap-2 md:gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`filter-btn px-4 md:px-5 py-2 text-[10px] md:text-[11px] uppercase tracking-[0.15em] border transition-all duration-500 ${
                activeCategory === cat
                  ? "border-[#8b6f6f]/40 text-white bg-[#8b6f6f]/10"
                  : "border-white/[0.06] text-white/30 hover:text-white/50 hover:border-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid — asymmetric masonry-like */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4"
        >
          {filtered.map((item, i) => (
            <div
              key={item.id}
              className={`work-card group relative overflow-hidden cursor-pointer ${
                i % 3 === 0 ? "md:row-span-2" : ""
              }`}
              onMouseMove={(e) => handleCardMouseMove(e, i)}
              onMouseLeave={handleCardMouseLeave}
            >
              <div
                className={`relative overflow-hidden ${
                  i % 3 === 0 ? "aspect-[3/4]" : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={item.thumb || item.media}
                  alt={item.title}
                  fill
                  className="card-image object-cover will-change-transform"
                  loading="lazy"
                  style={{
                    transform: "scale(1.02)",
                  }}
                />

                {/* Overlay */}
                <div className="card-overlay" />

                {/* Content */}
                <div className="card-content">
                  <p className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-white/30 mb-2 md:mb-3">
                    {item.category}
                  </p>
                  <h3 className="font-editorial text-xl md:text-2xl lg:text-3xl text-white font-medium leading-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 md:mt-3 text-[12px] md:text-[13px] text-white/30 max-w-sm leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>

                {/* Counter */}
                <div className="absolute top-4 md:top-6 right-4 md:right-6">
                  <span className="counter text-[10px] md:text-[11px] font-mono text-white/15 group-hover:text-white/30 transition-colors duration-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-[#8b6f6f]/0 via-[#8b6f6f]/40 to-[#8b6f6f]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 md:mt-24 flex justify-center">
          <a
            href="/works"
            className="magnetic-btn border border-white/[0.08] px-10 md:px-14 py-4 md:py-5 text-[11px] uppercase tracking-[0.2em] text-white/30 hover:text-white/60 hover:border-white/15 transition-all duration-500"
          >
            Все проекты
          </a>
        </div>
      </div>
    </section>
  );
}
