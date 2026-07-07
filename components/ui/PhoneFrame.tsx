type PhoneFrameProps = {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  innerStyle?: React.CSSProperties;
};

export default function PhoneFrame({
  children,
  className = "",
  innerClassName = "",
  innerStyle,
}: PhoneFrameProps) {
  return (
    <div
      className={`bg-[#2A2019] rounded-[46px] p-3 shadow-[0_30px_70px_rgba(90,64,30,0.28)] w-full h-full box-border ${className}`}
    >
      <div
        className={`relative w-full h-full rounded-[36px] overflow-hidden ${innerClassName}`}
        style={innerStyle}
      >
        <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[86px] h-[22px] bg-[#2A2019] rounded-xl z-[5]" />
        {children}
      </div>
    </div>
  );
}
