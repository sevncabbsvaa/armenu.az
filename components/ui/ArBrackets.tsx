type ArBracketsProps = {
  size?: number;
  thickness?: number;
  color?: string;
  insetX?: number;
  insetTop?: number;
  insetBottom?: number;
  className?: string;
};

export default function ArBrackets({
  size = 38,
  thickness = 3,
  color = "var(--color-saffron)",
  insetX = 14,
  insetTop = 6,
  insetBottom = -6,
  className = "",
}: ArBracketsProps) {
  const base = { width: size, height: size, position: "absolute" as const };
  const border = `${thickness}px solid ${color}`;

  return (
    <>
      <span
        className={`ar-bracket ${className}`}
        data-bx={-1}
        data-by={-1}
        style={{
          ...base,
          left: -insetX,
          top: insetTop,
          borderLeft: border,
          borderTop: border,
          borderRadius: `${thickness}px 0 0 0`,
        }}
      />
      <span
        className={`ar-bracket ${className}`}
        data-bx={1}
        data-by={-1}
        style={{
          ...base,
          right: -insetX,
          top: insetTop,
          borderRight: border,
          borderTop: border,
          borderRadius: `0 ${thickness}px 0 0`,
        }}
      />
      <span
        className={`ar-bracket ${className}`}
        data-bx={-1}
        data-by={1}
        style={{
          ...base,
          left: -insetX,
          bottom: insetBottom,
          borderLeft: border,
          borderBottom: border,
          borderRadius: `0 0 0 ${thickness}px`,
        }}
      />
      <span
        className={`ar-bracket ${className}`}
        data-bx={1}
        data-by={1}
        style={{
          ...base,
          right: -insetX,
          bottom: insetBottom,
          borderRight: border,
          borderBottom: border,
          borderRadius: `0 0 ${thickness}px 0`,
        }}
      />
    </>
  );
}
