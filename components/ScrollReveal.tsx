"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  start?: string;
  markers?: boolean;
  stagger?: number;
  animation?: "fadeUp" | "fadeIn" | "scaleUp" | "slideLeft";
}

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 1,
  y = 50,
  start = "top 85%",
  stagger = 0,
  animation = "fadeUp",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets: gsap.TweenTarget =
      stagger > 0
        ? el.querySelectorAll(".reveal-target")
        : el;

    const animations: Record<string, { from: gsap.TweenVars; to: gsap.TweenVars }> = {
      fadeUp: {
        from: { y, opacity: 0 },
        to: { y: 0, opacity: 1, duration, ease: "power3.out", delay },
      },
      fadeIn: {
        from: { opacity: 0 },
        to: { opacity: 1, duration: duration * 1.2, ease: "power2.out", delay },
      },
      scaleUp: {
        from: { y: y * 0.5, opacity: 0, scale: 0.96 },
        to: { y: 0, opacity: 1, scale: 1, duration, ease: "power3.out", delay },
      },
      slideLeft: {
        from: { x: 60, opacity: 0 },
        to: { x: 0, opacity: 1, duration, ease: "power3.out", delay },
      },
    };

    const { from, to } = animations[animation];

    const ctx = gsap.context(() => {
      if (stagger > 0) {
        gsap.fromTo(targets, from, {
          ...to,
          stagger,
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: "play none none reverse",
          },
        });
      } else {
        gsap.fromTo(targets, from, {
          ...to,
          scrollTrigger: {
            trigger: el,
            start,
            toggleActions: "play none none reverse",
          },
        });
      }
    }, el);

    return () => ctx.revert();
  }, [delay, duration, y, start, stagger, animation]);

  return (
    <div ref={ref} className={className}>
      {stagger > 0 ? (
        <div className="contents">
          {Array.isArray(children)
            ? children.map((child, i) => (
                <div key={i} className="reveal-target">
                  {child}
                </div>
              ))
            : children}
        </div>
      ) : (
        children
      )}
    </div>
  );
}
