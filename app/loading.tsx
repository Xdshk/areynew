"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Loading() {
  const containerRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(
        brandRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        }
      ).from(
        lineRef.current,
        {
          scaleX: 0,
          duration: 1.4,
          ease: "power3.out",
        },
        "-=0.4"
      );

      // Auto-fade out
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.8,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]"
    >
      <div className="text-center">
        <div ref={brandRef} className="mb-6">
          <span className="font-brand text-5xl md:text-6xl text-white/80">
            Arey
          </span>
        </div>
        <div
          ref={lineRef}
          className="h-px bg-gradient-to-r from-transparent via-[#8b6f6f]/60 to-transparent mx-auto origin-center"
          style={{ width: 80 }}
        />
      </div>
    </div>
  );
}
