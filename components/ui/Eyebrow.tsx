export default function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`inline-flex items-center gap-[10px] ${className}`}>
      <span className="w-[11px] h-[11px] border-l-2 border-t-2 border-saffron inline-block" />
      <span className="font-heading text-[13px] font-semibold tracking-[2px] uppercase text-saffron">
        {children}
      </span>
      <span className="w-[11px] h-[11px] border-r-2 border-b-2 border-saffron inline-block" />
    </div>
  );
}
