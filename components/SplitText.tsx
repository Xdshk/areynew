"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

interface SplitTextProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  animation?: "fadeUp" | "fadeDown" | "reveal" | "chars";
}

export default function SplitText({
  children,
  className = "",
  delay = 0,
  stagger = 0.04,
  animation = "fadeUp",
}: SplitTextProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll(".split-char, .split-line");
    if (targets.length === 0) return;

    const animations: Record<string, gsap.TweenVars> = {
      fadeUp: { y: 80, opacity: 0, rotationX: -40 },
      fadeDown: { y: -60, opacity: 0 },
      reveal: { y: 100, opacity: 0 },
      chars: { y: 40, opacity: 0, rotationZ: 5 },
    };

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        animations[animation],
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          rotationZ: 0,
          duration: 1.2,
          ease: "power3.out",
          stagger,
          delay,
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay, stagger, animation]);

  return (
    <div ref={ref} className={className} style={{ perspective: "600px" }}>
      {children}
    </div>
  );
}

interface AnimatedLineProps {
  text: string;
  className?: string;
  as?: React.ElementType;
}

export function AnimatedLine({ text, className = "", as: Tag = "span" }: AnimatedLineProps) {
  return (
    <Tag className={`split-line inline-block ${className}`}>
      {text}
    </Tag>
  );
}
