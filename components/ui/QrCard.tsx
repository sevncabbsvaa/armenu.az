import { QRCodeSVG } from "qrcode.react";

const QR_URL = "https://armenu.az/demo";

export default function QrCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bg-porcelain rounded-2xl border border-[#EBDFC9] shadow-[0_18px_40px_rgba(138,106,60,0.22)] px-5 py-5 flex flex-col items-center gap-3 ${className}`}
    >
      <span className="font-heading font-semibold text-sm tracking-[0.3px] text-ink">Özün sına</span>
      <QRCodeSVG value={QR_URL} size={92} bgColor="#FFFDF8" fgColor="#221A12" level="M" marginSize={0} />
      <p className="text-clay text-[12px] leading-[1.5] text-center max-w-[150px] m-0">
        Skan et — AR menyunu öz telefonunda gör.
      </p>
    </div>
  );
}
