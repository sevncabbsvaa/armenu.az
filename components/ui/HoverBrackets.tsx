type HoverBracketsProps = {
  hovered: boolean;
  size?: number;
  thickness?: number;
  idleColor?: string;
  hoverColor?: string;
  translate?: number;
  fadeIn?: boolean;
  inset?: number;
};

export default function HoverBrackets({
  hovered,
  size = 16,
  thickness = 2,
  idleColor = "#D9CBB2",
  hoverColor = "var(--color-saffron)",
  translate = 7,
  fadeIn = false,
  inset = 10,
}: HoverBracketsProps) {
  const color = hovered ? hoverColor : idleColor;
  const base = {
    position: "absolute" as const,
    width: size,
    height: size,
    opacity: fadeIn ? (hovered ? 1 : 0) : 1,
    transition: "transform .35s, border-color .35s, opacity .35s",
  };

  return (
    <>
      <span
        style={{
          ...base,
          left: inset,
          top: inset,
          borderLeft: `${thickness}px solid ${color}`,
          borderTop: `${thickness}px solid ${color}`,
          transform: hovered ? `translate(${-translate}px, ${-translate}px)` : "none",
        }}
      />
      <span
        style={{
          ...base,
          right: inset,
          top: inset,
          borderRight: `${thickness}px solid ${color}`,
          borderTop: `${thickness}px solid ${color}`,
          transform: hovered ? `translate(${translate}px, ${-translate}px)` : "none",
        }}
      />
      <span
        style={{
          ...base,
          left: inset,
          bottom: inset,
          borderLeft: `${thickness}px solid ${color}`,
          borderBottom: `${thickness}px solid ${color}`,
          transform: hovered ? `translate(${-translate}px, ${translate}px)` : "none",
        }}
      />
      <span
        style={{
          ...base,
          right: inset,
          bottom: inset,
          borderRight: `${thickness}px solid ${color}`,
          borderBottom: `${thickness}px solid ${color}`,
          transform: hovered ? `translate(${translate}px, ${translate}px)` : "none",
        }}
      />
    </>
  );
}
