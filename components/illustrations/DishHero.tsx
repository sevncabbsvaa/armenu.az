export default function DishHero({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 460 360"
      className={className}
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      <path
        d="M195 168 q12 -20 0 -42 q-12 -20 2 -40"
        stroke="#E5C9A0"
        strokeWidth={5}
        strokeLinecap="round"
        fill="none"
        style={{ animation: "steam 3.8s ease-in-out infinite" }}
      />
      <path
        d="M232 160 q14 -22 0 -46 q-12 -20 4 -38"
        stroke="#E5C9A0"
        strokeWidth={5}
        strokeLinecap="round"
        fill="none"
        style={{ animation: "steam 3.8s ease-in-out infinite", animationDelay: "1.2s" }}
      />
      <path
        d="M268 170 q10 -18 0 -38 q-10 -18 2 -36"
        stroke="#E5C9A0"
        strokeWidth={4}
        strokeLinecap="round"
        fill="none"
        style={{ animation: "steam 3.8s ease-in-out infinite", animationDelay: "2.2s" }}
      />
      <ellipse cx={230} cy={308} rx={172} ry={24} fill="#E2D2B6" opacity={0.55} />
      <ellipse cx={230} cy={272} rx={185} ry={56} fill="#FFFDF8" stroke="#EBDFC9" strokeWidth={2} />
      <ellipse cx={230} cy={266} rx={146} ry={42} fill="#F4EBD9" />
      <ellipse cx={230} cy={252} rx={118} ry={36} fill="#D8964B" />
      <circle cx={180} cy={240} r={20} fill="#9C5230" />
      <circle cx={250} cy={232} r={18} fill="#8B4728" />
      <circle cx={285} cy={250} r={15} fill="#A65A33" />
      <circle cx={207} cy={258} r={15} fill="#8B4728" />
      <circle cx={155} cy={256} r={13} fill="#E9BB63" />
      <circle cx={266} cy={264} r={12} fill="#E9BB63" />
      <circle cx={231} cy={224} r={11} fill="#EFC876" />
      <rect x={212} y={244} width={34} height={9} rx={4.5} fill="#B54A2A" transform="rotate(-18 229 248)" />
      <rect x={252} y={252} width={28} height={8} rx={4} fill="#B54A2A" transform="rotate(12 266 256)" />
      <path
        d="M172 228 q30 -18 60 0"
        stroke="#F3E3C0"
        fill="none"
        strokeWidth={4}
        strokeLinecap="round"
      />
      <circle cx={168} cy={222} r={3.5} fill="#6F8F4F" />
      <circle cx={243} cy={216} r={3.5} fill="#6F8F4F" />
      <circle cx={292} cy={238} r={3} fill="#6F8F4F" />
      <circle cx={196} cy={244} r={3} fill="#6F8F4F" />
      <circle cx={262} cy={240} r={3} fill="#6F8F4F" />
    </svg>
  );
}
