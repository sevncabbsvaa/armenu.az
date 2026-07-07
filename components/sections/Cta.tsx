"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import HoverBrackets from "@/components/ui/HoverBrackets";
import { useMagnetic } from "@/components/animations/useMagnetic";
import { revealOnScroll } from "@/components/animations/scrollReveal";

const FIELDS = [
  { name: "ad", placeholder: "Ad", type: "text" },
  { name: "restoran", placeholder: "Restoran adı", type: "text" },
  { name: "telefon", placeholder: "Telefon", type: "tel" },
];

export default function Cta() {
  const sectionRef = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { ref: magnetRef, onMouseMove: onMagnetMove, onMouseLeave: onMagnetLeave } = useMagnetic<HTMLDivElement>();

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      revealOnScroll(section);
    },
    { scope: sectionRef }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: wire up once a demo-request endpoint exists
    setSent(true);
  };

  return (
    <section id="cta" ref={sectionRef} className="bg-ivory px-8 pt-[140px]">
      <div className="max-w-[760px] mx-auto text-center">
        <h2
          data-rv
          className="font-display font-bold leading-[1.15] mb-[18px] tracking-[-0.5px] text-[clamp(30px,4.4vw,58px)]"
        >
          Restoranını gələcəyə daşı.
        </h2>
        <p data-rv className="text-clay leading-[1.65] text-lg mb-[46px]">
          Demo pulsuzdur — öz menyunuzdan bir yemək 3D-də.
        </p>

        <form
          data-rv
          onSubmit={handleSubmit}
          className="bg-porcelain border border-[#EBDFC9] rounded-[26px] p-[38px] shadow-[0_18px_44px_rgba(138,106,60,0.12)] flex flex-col gap-4 text-left"
        >
          <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))" }}>
            {FIELDS.map((field) => (
              <input
                key={field.name}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                required
                className="font-body text-base text-ink bg-ivory border border-[#EBDFC9] rounded-2xl px-[18px] py-[15px] outline-none w-full box-border focus:border-saffron transition-colors duration-300"
              />
            ))}
          </div>

          <div
            ref={magnetRef}
            onMouseMove={onMagnetMove}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => {
              onMagnetLeave();
              setHovered(false);
            }}
            className="relative mt-2"
          >
            <button
              type="submit"
              className="w-full font-heading text-lg font-bold text-ink bg-saffron border-none rounded-2xl px-7 py-[19px] cursor-pointer shadow-[0_12px_32px_rgba(232,150,46,0.4)] hover:shadow-[0_18px_44px_rgba(232,150,46,0.55)]"
              style={{ transition: "box-shadow .3s ease" }}
            >
              15 dəqiqəlik demo istə
            </button>
            <HoverBrackets
              hovered={hovered}
              size={18}
              thickness={3}
              idleColor="var(--color-saffron)"
              hoverColor="var(--color-saffron)"
              translate={7}
              inset={-8}
              fadeIn
            />
          </div>

          {sent && (
            <p className="mt-1 text-center font-heading font-semibold text-[15px] text-saffron">
              Sorğunuz qəbul olundu — tezliklə əlaqə saxlayacağıq.
            </p>
          )}
        </form>
      </div>

      <footer className="max-w-[1140px] mx-auto mt-[110px] pt-[34px] pb-10 border-t border-ink/[0.09] flex flex-wrap gap-x-[34px] gap-y-[18px] items-center justify-between">
        <div className="flex flex-wrap gap-x-[26px] gap-y-[10px] font-heading text-sm text-clay">
          <span>+994 50 569 05 21</span>
          <span>info@armenu.az</span>
          <span>@armenu.az</span>
        </div>
        <div className="font-heading text-sm text-clay">SSH Company · Bakı · © 2026</div>
      </footer>
    </section>
  );
}
