export default function DishArPreview({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 460 340"
      className={className}
      style={{ width: "100%", height: "auto", display: "block", filter: "drop-shadow(0 14px 18px rgba(90,50,20,0.3))" }}
    >
      <ellipse cx={230} cy={272} rx={185} ry={56} fill="#FFFDF8" stroke="#EBDFC9" strokeWidth={2} />
      <ellipse cx={230} cy={266} rx={146} ry={42} fill="#F4EBD9" />
      <ellipse cx={230} cy={252} rx={118} ry={36} fill="#D8964B" />
      <circle cx={180} cy={240} r={20} fill="#9C5230" />
      <circle cx={250} cy={232} r={18} fill="#8B4728" />
      <circle cx={285} cy={250} r={15} fill="#A65A33" />
      <circle cx={155} cy={256} r={13} fill="#E9BB63" />
      <rect x={212} y={244} width={34} height={9} rx={4.5} fill="#B54A2A" transform="rotate(-18 229 248)" />
      <circle cx={168} cy={222} r={3.5} fill="#6F8F4F" />
      <circle cx={243} cy={216} r={3.5} fill="#6F8F4F" />
    </svg>
  );
}
