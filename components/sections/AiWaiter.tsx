"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Eyebrow from "@/components/ui/Eyebrow";
import PhoneFrame from "@/components/ui/PhoneFrame";
import { revealOnScroll } from "@/components/animations/scrollReveal";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  "Canlı səsli söhbət — Azərbaycan dilində",
  "Büdcəyə, dietaya, əhvala uyğun tövsiyə",
  "Hər söhbətdə nəzakətli əlavə satış",
];

const MESSAGES: { from: "user" | "ai"; content: React.ReactNode }[] = [
  { from: "user", content: "120 manata 4 nəfərlik süfrə qur, biri vegandır." },
  {
    from: "ai",
    content: (
      <>
        Təklifim: 2 × Sac içi, 1 × Vegan dolma, mövsüm salatı və qutab seti. Cəmi: <strong>112 ₼</strong>. İçki
        əlavə edək?
      </>
    ),
  },
  { from: "user", content: "Bəli." },
  {
    from: "ai",
    content: (
      <>
        Ev limonadı məsləhətdir. Yekun: <strong className="text-saffron">120 ₼</strong>. Nuş olsun!
      </>
    ),
  },
];

const WAVE_DELAYS = [0, 0.15, 0.3, 0.45, 0.6];
const DOT_DELAYS = [0, 0.2, 0.4];

export default function AiWaiter() {
  const sectionRef = useRef<HTMLElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const msgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const typingRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const chat = chatRef.current;
      if (!section) return;

      revealOnScroll(section);

      if (!chat) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        msgRefs.current.forEach((m) => m && gsap.set(m, { opacity: 1, y: 0 }));
        return;
      }

      let ran = false;
      const timeouts: ReturnType<typeof setTimeout>[] = [];

      const runChat = () => {
        if (ran) return;
        ran = true;
        let i = 0;

        const next = () => {
          const typing = typingRef.current;
          if (!typing || i >= msgRefs.current.length) {
            if (typing) typing.style.display = "none";
            return;
          }
          typing.style.display = "flex";
          typing.style.alignSelf = i % 2 === 0 ? "flex-end" : "flex-start";

          timeouts.push(
            setTimeout(
              () => {
                typing.style.display = "none";
                const msg = msgRefs.current[i];
                if (msg) gsap.to(msg, { opacity: 1, y: 0, duration: 0.5 });
                i += 1;
                timeouts.push(setTimeout(next, 700));
              },
              i % 2 === 0 ? 900 : 1400
            )
          );
        };

        next();
      };

      const st = ScrollTrigger.create({
        trigger: chat,
        start: "top 80%",
        once: true,
        onEnter: runChat,
      });

      return () => {
        timeouts.forEach(clearTimeout);
        st.kill();
      };
    },
    { scope: sectionRef }
  );

  return (
    <section id="ai" ref={sectionRef} className="bg-ivory px-8 py-[130px]">
      <div className="max-w-[1140px] mx-auto flex flex-wrap gap-16 items-center">
        <div data-rv className="flex-[1_1_420px] min-w-[300px]">
          <Eyebrow className="mb-[18px]">AI Ofisiant</Eyebrow>
          <h2 className="font-heading font-bold leading-[1.12] mb-[26px] tracking-[-0.5px] text-[clamp(30px,3.4vw,50px)]">
            Heç vaxt yorulmayan ofisiant.
          </h2>
          <div className="flex flex-col gap-4 max-w-[46ch]">
            {FEATURES.map((feature) => (
              <div key={feature} className="flex items-start gap-[14px]">
                <span
                  className="w-[10px] h-[10px] border-l-2 border-b-2 border-saffron mt-[7px] flex-shrink-0"
                  style={{ transform: "rotate(-45deg)" }}
                />
                <p className="m-0 text-[17px] leading-[1.6] text-ink">{feature}</p>
              </div>
            ))}
          </div>
          <div className="inline-flex items-center gap-3 mt-[30px] bg-porcelain border border-[#EBDFC9] rounded-full px-5 py-[11px] shadow-[0_8px_22px_rgba(138,106,60,0.1)]">
            <span className="inline-flex items-center gap-[3px] h-5">
              {WAVE_DELAYS.map((delay) => (
                <span
                  key={delay}
                  className="w-[3px] h-5 bg-saffron rounded-sm inline-block"
                  style={{ animation: "wave 1.1s ease-in-out infinite", animationDelay: `${delay}s` }}
                />
              ))}
            </span>
            <span className="font-heading text-sm font-semibold text-ink">Səsli rejim aktivdir</span>
          </div>
        </div>

        <div data-rv className="flex-[0_1_360px] min-w-[300px] mx-auto">
          <PhoneFrame
            innerClassName="min-h-[480px] flex flex-col gap-3 pt-[56px] pb-6 px-[18px]"
            innerStyle={{ background: "#FFFDF8" }}
          >
            <div ref={chatRef} className="contents">
              <div className="absolute top-11 left-0 right-0 text-center font-heading text-[13px] font-semibold text-clay">
                <span className="text-saffron">ar</span>menu · AI Ofisiant
              </div>
              <div className="h-[26px]" />
              {MESSAGES.map((message, i) => (
                <div
                  key={i}
                  ref={(el) => {
                    msgRefs.current[i] = el;
                  }}
                  className={`max-w-[82%] rounded-[18px] px-4 py-3 text-[14.5px] leading-[1.55] opacity-0 ${
                    message.from === "user"
                      ? "self-end bg-sand rounded-br-[4px]"
                      : "self-start bg-ivory border border-[#EBDFC9] rounded-bl-[4px]"
                  }`}
                  style={{ transform: "translateY(12px)" }}
                >
                  {message.content}
                </div>
              ))}
              <div
                ref={typingRef}
                className="self-start bg-ivory border border-[#EBDFC9] rounded-2xl px-4 py-3 hidden items-center gap-[5px]"
              >
                {DOT_DELAYS.map((delay) => (
                  <span
                    key={delay}
                    className="w-[7px] h-[7px] rounded-full bg-clay inline-block"
                    style={{ animation: `dotp 1s ${delay}s infinite` }}
                  />
                ))}
              </div>
            </div>
          </PhoneFrame>
        </div>
      </div>
    </section>
  );
}
