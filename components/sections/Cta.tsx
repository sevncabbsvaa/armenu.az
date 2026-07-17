"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import HoverBrackets from "@/components/ui/HoverBrackets";
import { useMagnetic } from "@/components/animations/useMagnetic";
import { revealOnScroll } from "@/components/animations/scrollReveal";

type FieldName = "name" | "restaurant" | "phone";
type Status = "idle" | "loading" | "success" | "error";

const FIELDS: { name: FieldName; placeholder: string; type: string }[] = [
  { name: "name", placeholder: "Ad", type: "text" },
  { name: "restaurant", placeholder: "Restoran adı", type: "text" },
  { name: "phone", placeholder: "Telefon", type: "tel" },
];

const REQUIRED_MESSAGE: Record<FieldName, string> = {
  name: "Adınızı daxil edin.",
  restaurant: "Restoran adını daxil edin.",
  phone: "Telefon nömrənizi daxil edin.",
};

const WHATSAPP_NUMBER = "994553186049";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Salam!%20AR%20menyu%20demosu%20ist%C9%99yir%C9%99m`;

const CONTACT_EMAIL = "abbasovasevinc889@gmail.com";
const CONTACT_PHONE = "+994 55 318 60 49";

function CheckIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="23" stroke="var(--color-saffron)" strokeWidth="2" fill="rgba(232,150,46,0.12)" />
      <path
        d="M15 24.5L21 30.5L33 17.5"
        stroke="var(--color-saffron)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.004 2.003c-5.514 0-9.997 4.483-9.997 9.997 0 1.762.462 3.484 1.34 5.001L2 22l5.117-1.334a9.96 9.96 0 004.887 1.28h.004c5.514 0 9.996-4.483 9.996-9.997 0-2.67-1.04-5.18-2.928-7.07a9.933 9.933 0 00-7.072-2.876zm0 18.176a8.19 8.19 0 01-4.174-1.144l-.299-.178-3.037.792.81-2.96-.194-.304a8.163 8.163 0 01-1.254-4.385c0-4.508 3.667-8.175 8.175-8.175a8.13 8.13 0 015.783 2.396 8.128 8.128 0 012.392 5.784c0 4.508-3.667 8.174-8.175 8.174z" />
    </svg>
  );
}

export default function Cta() {
  const sectionRef = useRef<HTMLElement>(null);
  const [values, setValues] = useState<Record<FieldName, string>>({ name: "", restaurant: "", phone: "" });
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [hovered, setHovered] = useState(false);
  const { ref: magnetRef, onMouseMove: onMagnetMove, onMouseLeave: onMagnetLeave } = useMagnetic<HTMLDivElement>();

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      revealOnScroll(section);
    },
    { scope: sectionRef }
  );

  const handleChange = (field: FieldName, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => (prev[field] ? { ...prev, [field]: undefined } : prev));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    const nextErrors: Partial<Record<FieldName, string>> = {};
    FIELDS.forEach((field) => {
      if (!values[field.name].trim()) nextErrors[field.name] = REQUIRED_MESSAGE[field.name];
    });
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setStatus("loading");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          subject: "armenu.az — Yeni demo sorğusu",
          from_name: "armenu.az sayt",
          name: values.name,
          restaurant: values.restaurant,
          phone: values.phone,
        }),
      });
      const data = await res.json();
      setStatus(res.ok && data.success ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  const whatsappButton = (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 font-heading text-base font-semibold text-ink bg-transparent border-2 border-ink/15 rounded-2xl px-6 py-[17px] hover:border-saffron transition-colors duration-300 sm:flex-1"
    >
      <WhatsAppIcon />
      WhatsApp-la yaz
    </a>
  );

  return (
    <section id="cta" ref={sectionRef} className="bg-ivory px-8 pt-[140px]">
      <div className="max-w-[760px] mx-auto text-center">
        <h2
          data-rv
          className="font-display font-bold leading-[1.15] mb-[18px] tracking-[-0.5px] text-[clamp(30px,4.4vw,58px)]"
        >
          Restoranını gələcəyə daşı.
        </h2>
        <p data-rv className="text-clay leading-[1.65] text-lg mb-[46px]">
          Demo pulsuzdur — öz menyunuzdan bir yemək 3D-də.
        </p>

        <div
          data-rv
          className="bg-porcelain border border-[#EBDFC9] rounded-[26px] p-[38px] shadow-[0_18px_44px_rgba(138,106,60,0.12)] text-left"
        >
          {status === "success" ? (
            <div className="flex flex-col items-center text-center gap-4 py-2">
              <CheckIcon />
              <p className="font-heading font-semibold text-lg text-ink max-w-[38ch]">
                Sorğunuz alındı! Tezliklə sizinlə əlaqə saxlayacağıq.
              </p>
              {whatsappButton}
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))" }}>
                {FIELDS.map((field) => (
                  <div key={field.name} className="flex flex-col gap-1.5">
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={values[field.name]}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className={`font-body text-base text-ink bg-ivory border rounded-2xl px-[18px] py-[15px] outline-none w-full box-border focus:border-saffron transition-colors duration-300 ${
                        errors[field.name] ? "border-ink/30" : "border-[#EBDFC9]"
                      }`}
                    />
                    {errors[field.name] && (
                      <span className="text-xs text-ink/70 font-medium px-1">{errors[field.name]}</span>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <div
                  ref={magnetRef}
                  onMouseMove={onMagnetMove}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => {
                    onMagnetLeave();
                    setHovered(false);
                  }}
                  className="relative sm:flex-1"
                >
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full font-heading text-lg font-bold text-ink bg-saffron border-none rounded-2xl px-7 py-[19px] cursor-pointer shadow-[0_12px_32px_rgba(232,150,46,0.4)] hover:shadow-[0_18px_44px_rgba(232,150,46,0.55)] disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{ transition: "box-shadow .3s ease" }}
                  >
                    {status === "loading" ? "Göndərilir..." : "15 dəqiqəlik demo istə"}
                  </button>
                  <HoverBrackets
                    hovered={hovered}
                    size={18}
                    thickness={3}
                    idleColor="var(--color-saffron)"
                    hoverColor="var(--color-saffron)"
                    translate={7}
                    inset={-8}
                    fadeIn
                  />
                </div>
                {whatsappButton}
              </div>

              {status === "error" && (
                <p className="mt-1 text-center font-heading font-medium text-sm text-ink/70">
                  Xəta baş verdi — yenidən cəhd edin və ya WhatsApp-la yazın.
                </p>
              )}
            </form>
          )}
        </div>
      </div>

      <footer className="max-w-[1140px] mx-auto mt-[110px] pt-[34px] pb-10 border-t border-ink/[0.09] flex flex-wrap gap-x-[34px] gap-y-[18px] items-center justify-between">
        <div className="flex flex-wrap gap-x-[26px] gap-y-[10px] font-heading text-sm text-clay">
          <span>{CONTACT_PHONE}</span>
          <span>{CONTACT_EMAIL}</span>
          <span>@armenu.az</span>
        </div>
        <div className="font-heading text-sm text-clay">SSH Company · Bakı · © 2026</div>
      </footer>
    </section>
  );
}
