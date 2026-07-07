"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CtaButton from "@/components/ui/CtaButton";

gsap.registerPlugin(ScrollTrigger);

const LINKS = [
  { href: "#mehsul", label: "Məhsul" },
  { href: "#nece", label: "Necə işləyir" },
  { href: "#ai", label: "AI Ofisiant" },
  { href: "#analitika", label: "Analitika" },
];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const nav = navRef.current;
      if (!nav) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const show = () =>
          gsap.to(nav, { yPercent: 0, duration: 0.4, ease: "power3.out", overwrite: true });
        const hide = () =>
          gsap.to(nav, { yPercent: -100, duration: 0.4, ease: "power3.out", overwrite: true });

        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            if (self.direction === 1 && self.scroll() > 80) hide();
            else if (self.direction === -1) show();
          },
        });
      });

      return () => mm.revert();
    },
    { scope: navRef }
  );

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[1000] bg-ivory/[0.82] backdrop-blur-2xl border-b border-ink/[0.07]"
    >
      <div className="max-w-[1200px] mx-auto px-[28px] h-[68px] flex items-center justify-between gap-6">
        <a
          href="#hero"
          className="font-heading font-bold text-[23px] tracking-[-0.5px] text-ink"
        >
          <span className="text-saffron">ar</span>menu
          <span className="text-clay font-normal text-[15px]">.az</span>
        </a>

        <div className="hidden md:flex items-center gap-[30px]">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-heading text-[15px] font-medium text-ink hover:text-saffron transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <CtaButton href="#cta">Demo istə</CtaButton>
      </div>
    </nav>
  );
}
