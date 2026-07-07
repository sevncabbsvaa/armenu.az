import type { Metadata } from "next";
import { Unbounded, Space_Grotesk, Inter } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import Grain from "@/components/ui/Grain";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "armenu.az — Azərbaycanda ilk AR Menyu",
  description:
    "Qonaq yeməyi sifarişdən əvvəl 3D formada, real ölçüdə görür. AR Menyu və AI Ofisiant — MR Technology, Bakı.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="az"
      className={`${unbounded.variable} ${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ivory text-ink">
        <Grain />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
