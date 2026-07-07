import type { Metadata } from "next";
import Link from "next/link";
import ArDemoViewer from "@/components/demo/ArDemoViewer";

export const metadata: Metadata = {
  title: "AR Demo — armenu.az",
  description: "Yeməyi 360° fırlat və ya AR ilə öz masanda gör.",
};

export default function DemoPage() {
  return (
    <div className="h-screen flex flex-col items-center bg-ivory px-6 py-6">
      <div className="font-heading font-bold text-[19px] tracking-[-0.5px] text-ink shrink-0">
        <span className="text-saffron">ar</span>menu
        <span className="text-clay font-normal text-[13px]">.az</span>
      </div>

      <ArDemoViewer />

      <Link
        href="/"
        className="mt-4 shrink-0 text-clay text-[12px] font-heading hover:text-saffron transition-colors duration-200"
      >
        armenu.az — Azərbaycanda ilk AR Menyu
      </Link>
    </div>
  );
}
