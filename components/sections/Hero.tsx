"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArBrackets from "@/components/ui/ArBrackets";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const dishRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 769px) and (prefers-reduced-motion: no-preference)", () => {
        const brackets = gsap.utils.toArray<HTMLElement>(".ar-bracket", section);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=100%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl.to(
            headRef.current,
            { scale: 1.38, y: -26, transformOrigin: "50% 0%", ease: "none", duration: 1 },
            0
          )
          .to(headRef.current, { opacity: 0, ease: "none", duration: 0.667 }, 0)
          .to(subRef.current, { opacity: 0, ease: "none", duration: 0.4545 }, 0)
          .to(badgeRef.current, { opacity: 0, ease: "none", duration: 0.357 }, 0)
          .to(
            dishRef.current,
            { scale: 1.12, y: -18, transformOrigin: "50% 100%", ease: "none", duration: 1 },
            0
          )
          .to(glowRef.current, { opacity: 0.48, ease: "none", duration: 1 }, 0)
          .to(hintRef.current, { opacity: 0, ease: "none", duration: 0.2 }, 0);

        brackets.forEach((bracket) => {
          const bx = Number(bracket.dataset.bx);
          const by = Number(bracket.dataset.by);
          tl.to(bracket, { x: bx * 76, y: by * 60, ease: "none", duration: 1 }, 0).to(
            bracket,
            { opacity: 0, ease: "none", duration: 0.4 },
            0.55
          );
        });
      });

      mm.add("(max-width: 768px), (prefers-reduced-motion: reduce)", () => {
        const targets = [
          badgeRef.current,
          headRef.current,
          subRef.current,
          dishRef.current,
          ...gsap.utils.toArray<HTMLElement>(".ar-bracket", section),
        ];

        gsap.set(targets, { opacity: 0, y: 40 });

        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: section, start: "top 75%", once: true },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-[90px]"
    >
      <div
        ref={badgeRef}
        className="inline-flex items-center gap-2 border border-saffron/50 text-ink font-heading text-[13px] font-semibold tracking-[1.5px] uppercase px-4 py-2 rounded-full mb-[clamp(10px,2vh,26px)] bg-porcelain/70"
      >
        <span className="w-[7px] h-[7px] rounded-full bg-saffron inline-block" />
        Azərbaycanda ilk
      </div>

      <h1
        ref={headRef}
        className="font-display font-bold text-center leading-[1.06] mb-[clamp(10px,1.8vh,20px)] max-w-[14ch] tracking-[-1px] text-[clamp(28px,6vw,min(84px,13vh))]"
      >
        Yemək artıq masanızdadır.
      </h1>

      <p
        ref={subRef}
        className="text-clay text-center max-w-[560px] mb-[clamp(8px,1.4vh,12px)] leading-[1.65] text-[clamp(15px,1.4vw,min(19px,2.6vh))]"
      >
        Azərbaycanda ilk AR Menyu — qonaq yeməyi sifarişdən əvvəl 3D formada, real ölçüdə görür.
      </p>

      <div className="relative mt-1.5" style={{ width: "min(500px, 72vw, 38vh)" }}>
        <div
          ref={glowRef}
          className="absolute pointer-events-none"
          style={{
            left: "50%",
            top: "55%",
            width: "130%",
            aspectRatio: "1.4",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(ellipse at center, rgba(196,80,27,0.28) 0%, rgba(232,150,46,0.14) 42%, rgba(250,246,239,0) 72%)",
            filter: "blur(10px)",
            opacity: 0.8,
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            left: "50%",
            bottom: "-6%",
            width: "80%",
            height: "16%",
            transform: "translateX(-50%)",
            background:
              "radial-gradient(ellipse at center, rgba(196,80,27,0.26) 0%, rgba(196,80,27,0.1) 45%, rgba(196,80,27,0) 75%)",
            filter: "blur(7px)",
          }}
        />
        <div ref={dishRef} className="relative" style={{ aspectRatio: "677 / 369" }}>
          <Image
            src="/images/hero-dolma.png"
            alt="Dolma yeməyi — AR menyuda 3D görünüş"
            fill
            priority
            sizes="(max-width: 768px) 72vw, 500px"
            style={{ objectFit: "contain" }}
          />
          <svg
            viewBox="0 0 80 90"
            className="absolute pointer-events-none"
            style={{
              left: "47%",
              bottom: "78%",
              width: "20%",
              height: "auto",
              transform: "translateX(-50%)",
            }}
          >
            <path
              d="M20 88 q10 -18 0 -38 q-10 -18 2 -36"
              stroke="#E5C9A0"
              strokeWidth={4.5}
              strokeLinecap="round"
              fill="none"
              style={{ animation: "steam 3.8s ease-in-out infinite" }}
            />
            <path
              d="M40 82 q12 -20 0 -42 q-10 -18 4 -34"
              stroke="#E5C9A0"
              strokeWidth={4.5}
              strokeLinecap="round"
              fill="none"
              style={{ animation: "steam 3.8s ease-in-out infinite", animationDelay: "1.2s" }}
            />
            <path
              d="M60 88 q9 -16 0 -34 q-9 -16 2 -32"
              stroke="#E5C9A0"
              strokeWidth={4}
              strokeLinecap="round"
              fill="none"
              style={{ animation: "steam 3.8s ease-in-out infinite", animationDelay: "2.2s" }}
            />
          </svg>
        </div>
        <ArBrackets />
      </div>

      <div
        ref={hintRef}
        className="flex flex-col items-center gap-2 mt-[clamp(10px,2vh,20px)]"
      >
        <span className="font-heading text-xs tracking-[2px] uppercase text-clay">Kəşf et</span>
        <span
          className="w-[2px] h-[34px] bg-saffron block"
          style={{ animation: "hintline 1.8s ease-in-out infinite" }}
        />
      </div>
    </section>
  );
}
