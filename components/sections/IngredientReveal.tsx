"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Eyebrow from "@/components/ui/Eyebrow";
import ScrollSequence, { FRAME_COUNT, type ScrollSequenceHandle } from "@/components/ScrollSequence";
import { clamp } from "@/components/animations/scrollMath";
import { revealOnScroll } from "@/components/animations/scrollReveal";

gsap.registerPlugin(ScrollTrigger);

export default function IngredientReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const calWrapRef = useRef<HTMLDivElement>(null);
  const calNumRef = useRef<HTMLSpanElement>(null);
  const sequenceRef = useRef<ScrollSequenceHandle>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const applyIng = (p: number) => {
        const frame = gsap.utils.snap(1, p * (FRAME_COUNT - 1));
        sequenceRef.current?.setFrame(frame);

        const infoIn = clamp((p - 0.55) / 0.2, 0, 1);
        const countP = clamp((p - 0.55) / 0.3, 0, 1);
        gsap.set(calWrapRef.current, { opacity: infoIn, y: (1 - infoIn) * 22 });
        if (calNumRef.current) {
          calNumRef.current.textContent = String(Math.round(540 * countP));
        }
      };

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const st = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () => (window.innerWidth <= 768 ? "+=150%" : "+=300%"),
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => applyIng(self.progress),
        });
        return () => st.kill();
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(calWrapRef.current, { opacity: 1, y: 0 });
        if (calNumRef.current) calNumRef.current.textContent = "540";
        revealOnScroll(section);
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="mehsul"
      ref={sectionRef}
      className="relative min-h-screen md:h-screen overflow-hidden flex items-center py-20 md:py-0"
    >
      <div className="max-w-[1240px] mx-auto px-8 py-8 md:pt-20 grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr] gap-12 items-center w-full box-border">
        <div data-rv>
          <Eyebrow className="mb-[18px]">Animasiyalı tərkib</Eyebrow>
          <h2 className="font-heading font-bold leading-[1.12] mb-[18px] tracking-[-0.5px] text-[clamp(30px,3.4vw,50px)]">
            Qonaq nə yediyini dəqiq görür.
          </h2>
          <p className="text-clay leading-[1.7] mb-[30px] max-w-[44ch] text-[17px]">
            Hər yeməyin tərkibi animasiya ilə açılır — allergiyası, dietası olan qonaq üçün tam şəffaflıq.
          </p>
          <div ref={calWrapRef} className="opacity-0">
            <div className="flex items-baseline gap-[10px] mb-[14px]">
              <span ref={calNumRef} className="font-heading font-bold text-[52px] tracking-[-1px]">
                0
              </span>
              <span className="font-heading text-[18px] text-clay">kkal · porsiya</span>
            </div>
            <div className="flex flex-wrap gap-[10px]">
              {["Vegan variantı", "Halal", "Allergen məlumatı"].map((tag) => (
                <span
                  key={tag}
                  className="font-heading text-sm font-medium px-4 py-2 rounded-full bg-porcelain border border-[#EBDFC9] text-ink"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mx-auto w-full flex items-center justify-center">
          <div
            className="absolute pointer-events-none"
            style={{
              left: "50%",
              top: "50%",
              width: "90%",
              aspectRatio: "1.3",
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(ellipse at center, rgba(196,80,27,0.18) 0%, rgba(250,246,239,0) 68%)",
              filter: "blur(8px)",
            }}
          />
          <div className="relative w-[88vw] aspect-720/893 h-auto md:w-auto md:h-[min(72vh,620px)] md:aspect-720/893 md:max-w-full">
            <ScrollSequence ref={sequenceRef} className="relative" />
          </div>
        </div>
      </div>
    </section>
  );
}
