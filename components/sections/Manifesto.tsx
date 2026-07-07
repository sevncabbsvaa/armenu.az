"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clamp } from "@/components/animations/scrollMath";

gsap.registerPlugin(ScrollTrigger);

const SENTENCE = "Bunu Azərbaycanda ilk dəfə biz etdik. Sıradakı restoran sizinki ola bilər.";
const HIGHLIGHTED = new Set(["ilk", "dəfə"]);
const WORDS = SENTENCE.split(" ");

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const n = WORDS.length;
      const applyMan = (p: number) => {
        wordRefs.current.forEach((word, i) => {
          if (!word) return;
          const t = clamp(p * (n + 3) - i, 0, 1);
          gsap.set(word, { opacity: 0.12 + 0.88 * t });
        });
      };

      const mm = gsap.matchMedia();

      mm.add("(min-width: 769px) and (prefers-reduced-motion: no-preference)", () => {
        const st = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => applyMan(self.progress),
        });
        return () => st.kill();
      });

      mm.add("(max-width: 768px), (prefers-reduced-motion: reduce)", () => {
        wordRefs.current.forEach((word) => word && gsap.set(word, { opacity: 1 }));
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="man"
      ref={sectionRef}
      className="relative md:h-screen flex items-center justify-center overflow-hidden py-32 md:py-0"
    >
      <p className="font-display font-semibold text-center max-w-[20ch] m-0 px-6 leading-[1.35] tracking-[-0.5px] text-[clamp(26px,4.2vw,60px)]">
        {WORDS.map((word, i) => (
          <span
            key={i}
            ref={(el) => {
              wordRefs.current[i] = el;
            }}
            className={HIGHLIGHTED.has(word) ? "text-saffron" : undefined}
            style={{ opacity: 0.12 }}
          >
            {word}
            {i < WORDS.length - 1 ? " " : ""}
          </span>
        ))}
      </p>
    </section>
  );
}
