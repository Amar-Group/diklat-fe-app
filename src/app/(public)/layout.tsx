import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";

const fontDisplay = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const fontBody = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata = {
  title: "Diklat Terintegrasi | B2B & B2C Training Platform",
  description:
    "Platform Diklat Terintegrasi untuk Pelatihan, Sertifikasi, dan Pengembangan Kompetensi Karyawan. Kelola LMS, kelas online, tatap muka, dan sertifikasi digital dalam satu platform.",
};

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${fontDisplay.variable} ${fontBody.variable} scroll-smooth antialiased bg-[#FAFAF9] min-h-screen text-slate-800 flex flex-col`}
      style={{ fontFamily: "var(--font-body), sans-serif" }}
    >
      <PublicNavbar />
      <div className="flex-1">
        {children}
      </div>
      <PublicFooter />
    </div>
  );
}
