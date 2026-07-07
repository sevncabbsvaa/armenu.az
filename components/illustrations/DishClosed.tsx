export default function DishClosed({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 460 340"
      className={className}
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      <ellipse cx={230} cy={288} rx={172} ry={24} fill="#E2D2B6" opacity={0.55} />
      <ellipse cx={230} cy={252} rx={185} ry={56} fill="#FFFDF8" stroke="#EBDFC9" strokeWidth={2} />
      <ellipse cx={230} cy={246} rx={146} ry={42} fill="#F4EBD9" />
      <ellipse cx={230} cy={232} rx={118} ry={36} fill="#D8964B" />
      <circle cx={180} cy={220} r={20} fill="#9C5230" />
      <circle cx={250} cy={212} r={18} fill="#8B4728" />
      <circle cx={285} cy={230} r={15} fill="#A65A33" />
      <circle cx={155} cy={236} r={13} fill="#E9BB63" />
      <circle cx={266} cy={244} r={12} fill="#E9BB63" />
      <rect x={212} y={224} width={34} height={9} rx={4.5} fill="#B54A2A" transform="rotate(-18 229 228)" />
      <circle cx={168} cy={202} r={3.5} fill="#6F8F4F" />
      <circle cx={243} cy={196} r={3.5} fill="#6F8F4F" />
      <circle cx={292} cy={218} r={3} fill="#6F8F4F" />
    </svg>
  );
}
