"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Eyebrow from "@/components/ui/Eyebrow";
import DishClosed from "@/components/illustrations/DishClosed";
import { clamp, easeQuad } from "@/components/animations/scrollMath";
import { revealOnScroll } from "@/components/animations/scrollReveal";

gsap.registerPlugin(ScrollTrigger);

type Ingredient = {
  label: string;
  style: React.CSSProperties;
  centered?: boolean;
  icon: React.ReactNode;
};

const INGREDIENTS: Ingredient[] = [
  {
    label: "Quzu əti",
    style: { left: "1%", top: "20%" },
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: 24, height: 24 }}>
        <circle cx={12} cy={12} r={9} fill="#9C5230" />
        <circle cx={9.5} cy={10} r={2.6} fill="#B96A42" />
      </svg>
    ),
  },
  {
    label: "Kartof",
    style: { right: "2%", top: "17%" },
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: 24, height: 24 }}>
        <ellipse cx={12} cy={12} rx={9} ry={7.5} fill="#E9BB63" />
        <circle cx={9} cy={10} r={1.4} fill="#D8A24A" />
        <circle cx={15} cy={13} r={1.4} fill="#D8A24A" />
      </svg>
    ),
  },
  {
    label: "Badımcan",
    style: { left: "1%", top: "71%" },
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: 24, height: 24 }}>
        <ellipse cx={12} cy={13.5} rx={7} ry={8} fill="#5B3A6E" />
        <ellipse cx={12} cy={5.5} rx={3.4} ry={2.2} fill="#6F8F4F" />
      </svg>
    ),
  },
  {
    label: "Bibər",
    style: { right: "1%", top: "71%" },
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: 24, height: 24 }}>
        <rect x={4} y={9} width={16} height={7} rx={3.5} fill="#B54A2A" transform="rotate(-14 12 12.5)" />
        <rect x={16} y={6} width={3} height={4} rx={1.5} fill="#6F8F4F" transform="rotate(-14 17.5 8)" />
      </svg>
    ),
  },
  {
    label: "Göyərti",
    style: { left: "50%", top: "9%" },
    centered: true,
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: 24, height: 24 }}>
        <circle cx={8} cy={14} r={4} fill="#6F8F4F" />
        <circle cx={14} cy={10} r={4.5} fill="#7EA05B" />
        <circle cx={16} cy={16} r={3} fill="#6F8F4F" />
      </svg>
    ),
  },
];

const LINES = [
  { x1: 240, y1: 290, x2: 152, y2: 168 },
  { x1: 360, y1: 285, x2: 448, y2: 150 },
  { x1: 248, y1: 360, x2: 150, y2: 452 },
  { x1: 356, y1: 362, x2: 452, y2: 452 },
  { x1: 300, y1: 262, x2: 300, y2: 118 },
];

export default function IngredientReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const dishRef = useRef<HTMLDivElement>(null);
  const calWrapRef = useRef<HTMLDivElement>(null);
  const calNumRef = useRef<HTMLSpanElement>(null);
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);
  const vecs = useRef<{ dx: number; dy: number }[]>([]);
  const lineLengths = useRef<number[]>([]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const stage = stageRef.current;
      if (!section || !stage) return;

      // centered chip uses a static -50% correction so it sits on the stage's
      // vertical axis; measurements below account for that offset explicitly.
      chipRefs.current.forEach((chip, i) => {
        if (chip && INGREDIENTS[i].centered) gsap.set(chip, { xPercent: -50 });
      });

      lineRefs.current.forEach((line, i) => {
        if (!line) return;
        const { x1, y1, x2, y2 } = LINES[i];
        const len = Math.hypot(x2 - x1, y2 - y1);
        lineLengths.current[i] = len;
        gsap.set(line, { strokeDasharray: len, strokeDashoffset: len, opacity: 0 });
      });

      const measure = () => {
        const cx = stage.clientWidth / 2;
        const cy = stage.clientHeight * 0.52;
        vecs.current = chipRefs.current.map((chip, i) => {
          if (!chip) return { dx: 0, dy: 0 };
          const px = INGREDIENTS[i].centered ? chip.offsetLeft : chip.offsetLeft + chip.offsetWidth / 2;
          const py = chip.offsetTop + chip.offsetHeight / 2;
          return { dx: cx - px, dy: cy - py };
        });
      };
      measure();
      window.addEventListener("resize", measure);

      const applyIng = (p: number) => {
        const open = p < 0.45 ? easeQuad(p / 0.45) : p < 0.7 ? 1 : 1 - easeQuad((p - 0.7) / 0.3);

        chipRefs.current.forEach((chip, i) => {
          if (!chip) return;
          const ti = clamp((open - i * 0.13) / 0.48, 0, 1);
          const e = easeQuad(ti);
          const { dx, dy } = vecs.current[i] ?? { dx: 0, dy: 0 };
          gsap.set(chip, { opacity: e, x: dx * (1 - e), y: dy * (1 - e), scale: 0.4 + 0.6 * e });
        });

        lineRefs.current.forEach((line, i) => {
          if (!line) return;
          const ti = clamp((open - i * 0.13) / 0.48, 0, 1);
          const e = easeQuad(ti);
          const len = lineLengths.current[i] ?? 0;
          gsap.set(line, { strokeDashoffset: len * (1 - e), opacity: e * 0.85 });
        });

        gsap.set(dishRef.current, { scale: 1 - open * 0.05 });

        const infoIn = clamp((p - 0.3) / 0.12, 0, 1);
        const infoOut = clamp((p - 0.78) / 0.12, 0, 1);
        const info = infoIn * (1 - infoOut);
        gsap.set(calWrapRef.current, { opacity: info, y: (1 - info) * 22 });
        if (calNumRef.current) {
          calNumRef.current.textContent = String(Math.round(540 * clamp((p - 0.3) / 0.22, 0, 1)));
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
        chipRefs.current.forEach((chip) => chip && gsap.set(chip, { opacity: 1, x: 0, y: 0, scale: 1 }));
        gsap.set(dishRef.current, { scale: 1 });
        gsap.set(calWrapRef.current, { opacity: 1, y: 0 });
        if (calNumRef.current) calNumRef.current.textContent = "540";
        revealOnScroll(section);
      });

      return () => {
        window.removeEventListener("resize", measure);
        mm.revert();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="mehsul"
      ref={sectionRef}
      className="relative min-h-screen md:h-screen overflow-hidden flex items-center py-20 md:py-0"
    >
      <div
        className="max-w-[1240px] mx-auto px-8 py-8 md:pt-20 grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr] gap-12 items-center w-full box-border"
      >
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

        <div
          ref={stageRef}
          className="relative mx-auto aspect-square w-full max-w-[min(440px,86vw)] md:max-w-[min(600px,44vw)]"
        >
          <div
            className="absolute pointer-events-none"
            style={{
              left: "50%",
              top: "55%",
              width: "110%",
              aspectRatio: "1.3",
              transform: "translate(-50%, -50%)",
              background: "radial-gradient(ellipse at center, rgba(196,80,27,0.18) 0%, rgba(250,246,239,0) 68%)",
              filter: "blur(8px)",
            }}
          />
          <svg viewBox="0 0 600 600" className="absolute inset-0 w-full h-full pointer-events-none">
            {LINES.map((line, i) => (
              <line
                key={i}
                ref={(el) => {
                  lineRefs.current[i] = el;
                }}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke="#E8962E"
                strokeWidth={1.5}
              />
            ))}
          </svg>
          <div
            ref={dishRef}
            className="absolute"
            style={{ left: "50%", top: "54%", width: "62%", transform: "translate(-50%, -50%)" }}
          >
            <DishClosed />
          </div>
          <div className="absolute inset-0">
            {INGREDIENTS.map((ing, i) => (
              <div
                key={ing.label}
                ref={(el) => {
                  chipRefs.current[i] = el;
                }}
                className="absolute flex items-center gap-[9px] bg-porcelain border border-[#EBDFC9] rounded-full py-2 pr-[15px] pl-2 shadow-[0_8px_22px_rgba(138,106,60,0.14)] opacity-0"
                style={ing.style}
              >
                {ing.icon}
                <span className="font-heading text-sm font-semibold whitespace-nowrap">{ing.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
