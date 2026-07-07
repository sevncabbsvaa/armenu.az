import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function revealOnScroll(scope: HTMLElement) {
  const targets = gsap.utils.toArray<HTMLElement>("[data-rv]", scope);
  if (!targets.length) return;

  gsap.set(targets, { opacity: 0, y: 40 });

  gsap.to(targets, {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: "power3.out",
    stagger: 0.08,
    scrollTrigger: {
      trigger: scope,
      start: "top 75%",
      once: true,
    },
  });
}
