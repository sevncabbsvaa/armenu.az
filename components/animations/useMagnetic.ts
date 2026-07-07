import { useRef } from "react";

export function useMagnetic<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(max-width: 768px)").matches
    ) {
      return;
    }
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width / 2) / r.width;
    const dy = (e.clientY - r.top - r.height / 2) / r.height;
    el.style.transform = `translate(${dx * 8}px, ${dy * 8}px)`;
  };

  const onMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "none";
  };

  return { ref, onMouseMove, onMouseLeave };
}
