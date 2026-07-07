"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Eyebrow from "@/components/ui/Eyebrow";
import { revealOnScroll } from "@/components/animations/scrollReveal";

gsap.registerPlugin(ScrollTrigger);

const BARS = [
  { label: "Sac içi", width: 92, value: 1284 },
  { label: "Qutab seti", width: 71, value: 946 },
  { label: "Toyuq ləvəngi", width: 55, value: 731 },
  { label: "Düşbərə", width: 39, value: 512 },
];

const formatNumber = (n: number) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

export default function Analytics() {
  const sectionRef = useRef<HTMLElement>(null);
  const dashRef = useRef<HTMLDivElement>(null);
  const fillRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const dash = dashRef.current;
      if (!section) return;

      revealOnScroll(section);

      if (!dash) return;

      const st = ScrollTrigger.create({
        trigger: dash,
        start: "top 80%",
        once: true,
        onEnter: () => {
          BARS.forEach((bar, i) => {
            const fill = fillRefs.current[i];
            if (fill) {
              gsap.to(fill, { width: `${bar.width}%`, duration: 1.3, delay: i * 0.12, ease: "power2.out" });
            }

            const valueEl = valueRefs.current[i];
            if (valueEl) {
              const proxy = { val: 0 };
              gsap.to(proxy, {
                val: bar.value,
                duration: 1.3 + i * 0.12,
                ease: "power2.out",
                onUpdate: () => {
                  valueEl.textContent = formatNumber(proxy.val);
                },
              });
            }
          });
        },
      });

      return () => st.kill();
    },
    { scope: sectionRef }
  );

  return (
    <section id="analitika" ref={sectionRef} className="bg-sand px-8 py-[130px]">
      <div className="max-w-[1140px] mx-auto flex flex-wrap gap-16 items-center">
        <div data-rv className="flex-[1_1_460px] min-w-[300px]">
          <div
            ref={dashRef}
            className="bg-porcelain border border-[#EBDFC9] rounded-[26px] p-9 shadow-[0_18px_44px_rgba(138,106,60,0.14)]"
          >
            <div className="flex items-center justify-between gap-3 flex-wrap mb-7">
              <span className="font-heading font-bold text-lg">Yemək baxışları</span>
              <span className="font-heading text-xs font-semibold tracking-wide uppercase text-clay border border-[#EBDFC9] rounded-full px-[13px] py-[6px]">
                Nümunə göstəricilər
              </span>
            </div>

            <div className="flex flex-col gap-5">
              {BARS.map((bar, i) => (
                <div key={bar.label} className="grid grid-cols-[118px_1fr_58px] items-center gap-[14px]">
                  <span className="font-heading text-sm font-semibold">{bar.label}</span>
                  <span className="h-3 bg-sand rounded-full overflow-hidden block">
                    <span
                      ref={(el) => {
                        fillRefs.current[i] = el;
                      }}
                      className="block h-full w-0 rounded-full"
                      style={{ background: "linear-gradient(90deg, #E8962E, #D9822A)" }}
                    />
                  </span>
                  <span
                    ref={(el) => {
                      valueRefs.current[i] = el;
                    }}
                    className="font-heading text-sm font-bold text-right"
                  >
                    0
                  </span>
                </div>
              ))}
            </div>

            <div className="flex gap-[22px] mt-[30px] pt-6 border-t border-sand flex-wrap">
              <div>
                <div className="font-heading text-xs tracking-wide uppercase text-clay mb-1">Qonaq dilləri</div>
                <div className="font-heading font-bold text-base">AZ · EN · RU</div>
              </div>
              <div>
                <div className="font-heading text-xs tracking-wide uppercase text-clay mb-1">Pik saatlar</div>
                <div className="font-heading font-bold text-base">19:00 – 22:00</div>
              </div>
            </div>
          </div>
        </div>

        <div data-rv className="flex-[1_1_380px] min-w-[300px]">
          <Eyebrow className="mb-[18px]">Analitika</Eyebrow>
          <h2 className="font-heading font-bold leading-[1.12] mb-[18px] tracking-[-0.5px] text-[clamp(30px,3.4vw,50px)]">
            Menyunuz sizə hesabat verəcək.
          </h2>
          <p className="text-clay leading-[1.7] max-w-[46ch] text-[17px] m-0">
            Hansı yeməyə baxılır, hansı ötürülür, qonaqlar hansı dildə oxuyur — qərarları hisslə yox, data ilə verin.
          </p>
        </div>
      </div>
    </section>
  );
}
