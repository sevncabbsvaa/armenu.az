"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Eyebrow from "@/components/ui/Eyebrow";
import PhoneFrame from "@/components/ui/PhoneFrame";
import DishModel from "@/components/three/DishModel";
import QrCard from "@/components/ui/QrCard";
import { clamp, easeQuad } from "@/components/animations/scrollMath";
import { revealOnScroll } from "@/components/animations/scrollReveal";

gsap.registerPlugin(ScrollTrigger);

const BRACKET_POSITIONS = [
  { side: "left" as const, edge: "top" as const, offset: "50%" },
  { side: "right" as const, edge: "top" as const, offset: "50%" },
  { side: "left" as const, edge: "bottom" as const, offset: "24%" },
  { side: "right" as const, edge: "bottom" as const, offset: "24%" },
];

export default function ArPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const dishRef = useRef<HTMLDivElement>(null);
  const chipRef = useRef<HTMLDivElement>(null);
  const bracketRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const qrRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(0);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      gsap.set(chipRef.current, { xPercent: -50 });

      gsap.set(qrRef.current, { opacity: 0, y: 24 });
      gsap.to(qrRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: qrRef.current, start: "top 88%", once: true },
      });

      const applyAr = (p: number) => {
        scrollProgressRef.current = p;
        gsap.set(sceneRef.current, { opacity: clamp(p / 0.22, 0, 1) });

        const d = easeQuad(clamp((p - 0.18) / 0.35, 0, 1));
        gsap.set(dishRef.current, { opacity: d, y: (1 - d) * -120, scale: 0.5 + 0.5 * d });

        const b = clamp((p - 0.5) / 0.15, 0, 1);
        bracketRefs.current.forEach((el) => el && gsap.set(el, { opacity: b, scale: 0.7 + 0.3 * b }));

        const c = clamp((p - 0.64) / 0.15, 0, 1);
        gsap.set(chipRef.current, { opacity: c, y: (1 - c) * 24 });
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
          onUpdate: (self) => applyAr(self.progress),
        });
        return () => st.kill();
      });

      mm.add("(max-width: 768px), (prefers-reduced-motion: reduce)", () => {
        applyAr(1);
        revealOnScroll(section);
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="ar"
      ref={sectionRef}
      className="relative md:h-screen overflow-hidden flex items-center py-24 md:py-0"
    >
      <div className="max-w-[1140px] mx-auto px-8 w-full box-border grid grid-cols-1 md:grid-cols-[1fr_min(310px,78vw)] gap-16 items-center">
        <div data-rv>
          <Eyebrow className="mb-[18px]">AR önizləmə</Eyebrow>
          <h2 className="font-heading font-bold leading-[1.12] mb-[18px] tracking-[-0.5px] text-[clamp(30px,3.4vw,50px)]">
            Menyu telefonda canlanır.
          </h2>
          <p className="text-clay leading-[1.7] max-w-[42ch] text-[17px] m-0">
            Heç bir tətbiq yüklənmir. Skan et, gör, sifariş ver.
          </p>
        </div>

        <div className="relative mx-auto" style={{ width: "100%", maxWidth: "min(310px, 78vw)" }}>
          <div
            data-rv
            className="relative mx-auto"
            style={{
              aspectRatio: "9 / 19.5",
              width: "100%",
              maxHeight: "86vh",
            }}
          >
            <PhoneFrame innerStyle={{ background: "#F1E8D8" }}>
              <div ref={sceneRef} className="absolute inset-0 opacity-0">
                <Image
                  src="/images/ar-table.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 768px) 78vw, 310px"
                  style={{ objectFit: "cover" }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse at center, rgba(0,0,0,0) 55%, rgba(0,0,0,0.12) 100%)",
                  }}
                />
              </div>

              <div ref={dishRef} className="absolute inset-0 opacity-0">
                <DishModel scrollProgressRef={scrollProgressRef} className="w-full h-full" />
              </div>

              {BRACKET_POSITIONS.map(({ side, edge, offset }, i) => (
                <span
                  key={`${side}-${edge}`}
                  ref={(el) => {
                    bracketRefs.current[i] = el;
                  }}
                  className="absolute opacity-0"
                  style={{
                    [side]: "30%",
                    [edge]: offset,
                    width: 26,
                    height: 26,
                    borderLeft: side === "left" ? "3px solid var(--color-saffron)" : undefined,
                    borderRight: side === "right" ? "3px solid var(--color-saffron)" : undefined,
                    borderTop: edge === "top" ? "3px solid var(--color-saffron)" : undefined,
                    borderBottom: edge === "bottom" ? "3px solid var(--color-saffron)" : undefined,
                  }}
                />
              ))}

              <div
                ref={chipRef}
                className="absolute left-1/2 opacity-0 bg-[rgba(255,253,248,0.94)] border border-[#EBDFC9] rounded-full px-[18px] py-[10px] font-heading text-[13px] font-semibold whitespace-nowrap shadow-[0_10px_26px_rgba(138,106,60,0.2)]"
                style={{ bottom: "6%" }}
              >
                Sac içi · 24 ₼ · <span className="text-saffron">360° baxış</span>
              </div>
            </PhoneFrame>
          </div>

          <div
            ref={qrRef}
            className="relative mt-6 mx-auto w-fit md:mt-0 md:absolute md:left-0 md:bottom-[4%] md:mx-0 z-10"
          >
            <div className="md:-translate-x-[78%]">
              <QrCard />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
