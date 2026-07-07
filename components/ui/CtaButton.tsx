"use client";

import { useMagnetic } from "@/components/animations/useMagnetic";

type CtaButtonProps = {
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
};

const CLASSES =
  "inline-block font-heading text-[15px] font-semibold text-ink bg-saffron px-[22px] py-[11px] rounded-full shadow-[0_6px_18px_rgba(232,150,46,0.35)] hover:shadow-[0_10px_26px_rgba(232,150,46,0.5)]";
const STYLE = { transition: "box-shadow .3s ease, transform .25s ease" };

export default function CtaButton({
  href,
  type = "button",
  onClick,
  children,
  className = "",
}: CtaButtonProps) {
  const { ref, onMouseMove, onMouseLeave } = useMagnetic<HTMLAnchorElement & HTMLButtonElement>();

  if (href) {
    return (
      <a
        ref={ref}
        href={href}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={`${CLASSES} ${className}`}
        style={STYLE}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`${CLASSES} ${className}`}
      style={STYLE}
    >
      {children}
    </button>
  );
}
