"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Eyebrow from "@/components/ui/Eyebrow";
import HoverBrackets from "@/components/ui/HoverBrackets";
import { revealOnScroll } from "@/components/animations/scrollReveal";

gsap.registerPlugin(ScrollTrigger);

type CardData = {
  number: string;
  title: string;
  desc: string;
  icon: React.ReactNode;
};

const QR_DOTS = ["ink", "saffron", "ink", "ink", "ink", "saffron", "saffron", "ink", "ink"];

const CARDS: CardData[] = [
  {
    number: "01",
    title: "QR skan",
    desc: "Masadakı QR kodu skan edir.",
    icon: (
      <span className="inline-grid gap-[3px]" style={{ gridTemplateColumns: "repeat(3, 7px)" }}>
        {QR_DOTS.map((color, i) => (
          <span key={i} className={`w-[7px] h-[7px] ${color === "saffron" ? "bg-saffron" : "bg-ink"}`} />
        ))}
      </span>
    ),
  },
  {
    number: "02",
    title: "3D + AR masada",
    desc: "Yemək telefonda canlanır — real ölçüdə.",
    icon: (
      <>
        <span className="absolute left-3 top-3 w-[9px] h-[9px] border-l-2 border-t-2 border-saffron" />
        <span className="absolute right-3 bottom-3 w-[9px] h-[9px] border-r-2 border-b-2 border-saffron" />
        <span className="w-4 h-4 rounded-full bg-ink" />
      </>
    ),
  },
  {
    number: "03",
    title: "İnamlı sifariş",
    desc: "Gözlənti = reallıq. Orta çek artır.",
    icon: (
      <svg viewBox="0 0 24 24" style={{ width: 26, height: 26 }}>
        <ellipse cx={12} cy={15} rx={9} ry={4} fill="none" stroke="#221A12" strokeWidth={1.8} />
        <path d="M7 11 l3.4 3.4 L17.5 7.5" stroke="#E8962E" strokeWidth={2.4} fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

function HowCard({ card, numberRef }: { card: CardData; numberRef: (el: HTMLSpanElement | null) => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      data-rv
      className="relative flex-shrink-0 bg-porcelain border border-[#EBDFC9] rounded-[26px] shadow-[0_18px_44px_rgba(138,106,60,0.12)] px-10 pt-11 pb-10"
      style={{ width: "min(520px, 80vw)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        ref={numberRef}
        className="absolute right-[18px] -top-14 font-heading font-bold text-transparent pointer-events-none select-none"
        style={{ fontSize: 150, lineHeight: 1, WebkitTextStroke: "2px rgba(232,150,46,0.45)", willChange: "transform" }}
      >
        {card.number}
      </span>
      <div className="relative w-14 h-14 rounded-2xl bg-ivory border border-[#EBDFC9] grid place-items-center mb-[22px]">
        {card.icon}
      </div>
      <h3 className="font-heading font-bold text-[28px] mb-[10px]">{card.title}</h3>
      <p className="text-clay leading-[1.65] text-base m-0">{card.desc}</p>
      <HoverBrackets hovered={hovered} />
    </div>
  );
}

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 769px) and (prefers-reduced-motion: no-preference)", () => {
        const getDist = () => Math.max(0, track.scrollWidth - section.clientWidth + window.innerWidth * 0.16);

        const st = ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: () => `+=${getDist()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const dist = getDist();
            gsap.set(track, { x: -self.progress * dist });
            numberRefs.current.forEach((n) => n && gsap.set(n, { x: self.progress * dist * 0.16 }));
          },
        });
        return () => st.kill();
      });

      mm.add("(max-width: 768px), (prefers-reduced-motion: reduce)", () => {
        revealOnScroll(section);
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="nece"
      ref={sectionRef}
      className="relative bg-sand md:h-screen overflow-hidden flex flex-col justify-center py-24 md:py-0"
    >
      <div className="max-w-[1240px] mx-auto px-8 w-full box-border mb-[26px] md:mb-0 md:pt-20">
        <Eyebrow>Necə işləyir</Eyebrow>
        <h2 className="font-heading font-bold leading-[1.12] mt-[14px] tracking-[-0.5px] text-[clamp(28px,3vw,44px)]">
          Üç addım. Otuz saniyə.
        </h2>
      </div>

      <div
        ref={trackRef}
        className="flex flex-col md:flex-row gap-11 px-6 md:px-[8vw] items-center md:items-stretch w-full md:w-max"
      >
        {CARDS.map((card, i) => (
          <HowCard
            key={card.number}
            card={card}
            numberRef={(el) => {
              numberRefs.current[i] = el;
            }}
          />
        ))}
      </div>
    </section>
  );
}
