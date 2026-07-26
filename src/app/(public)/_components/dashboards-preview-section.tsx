"use client";

import Image from "next/image";
import Link from "next/link";
import { Tabs, TabList, Tab, TabPanel } from "@/components/ui/tabs";
import { CheckCircle2, LayoutDashboard, UserCheck, Presentation, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface PreviewPlatform {
  id: string;
  label: string;
  badge: string;
  icon: React.ElementType;
  title: string;
  description: string;
  image: string;
  features: string[];
  checkColor: string;
  buttonText: string;
  previewUrl: string;
}

const PLATFORM_PREVIEWS: PreviewPlatform[] = [
  {
    id: "hrd",
    label: "Dashboard HRD",
    badge: "Corporate HRD Portal",
    icon: LayoutDashboard,
    title: "Corporate HRD Portal",
    description: "Pusat kendali untuk memonitor seluruh aktivitas pelatihan karyawan secara komprehensif.",
    image: "/assets/images/home/dashboard-preview/HRD.webp",
    features: [
      "Import peserta massal via Excel & integrasi HRIS",
      "Monitoring kehadiran & nilai pelatihan secara realtime",
      "Analytics dashboard komprehensif & grafik performa",
      "Unduh laporan resmi & sertifikat (PDF/Excel)",
    ],
    checkColor: "text-[#F97316]",
    buttonText: "Preview Platform HRD",
    previewUrl: "/login",
  },
  {
    id: "peserta",
    label: "LMS Peserta",
    badge: "LMS Peserta Interaktif",
    icon: UserCheck,
    title: "LMS Peserta Interaktif",
    description: "Pengalaman belajar mandiri yang terstruktur dengan tracking progress otomatis.",
    image: "/assets/images/home/dashboard-preview/LMS.webp",
    features: [
      "Video pembelajaran anti-skip & modul interaktif",
      "Tracking progress belajar real-time",
      "Kuis, tugas, & evaluasi otomatis",
      "Akses & klaim sertifikat digital BNSP",
    ],
    checkColor: "text-emerald-400",
    buttonText: "Preview LMS Peserta",
    previewUrl: "/login",
  },
  {
    id: "instruktur",
    label: "Portal Instruktur",
    badge: "Portal Instruktur",
    icon: Presentation,
    title: "Portal Instruktur",
    description: "Fasilitasi pengelolaan kelas dan peserta untuk para pengajar profesional.",
    image: "/assets/images/home/dashboard-preview/Instruktur.webp",
    features: [
      "Manajemen jadwal mengajar & materi pelatihan",
      "Data & logistik kehadiran peserta",
      "Generate QR Code absensi otomatis",
      "Upload materi & penilaian hasil ujian",
    ],
    checkColor: "text-blue-400",
    buttonText: "Preview Portal Instruktur",
    previewUrl: "/login",
  },
];

export function DashboardsPreviewSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#0F172A] relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] bg-[#1E1B4B] rounded-full blur-[120px] opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] bg-[#F97316]/20 rounded-full blur-[100px] opacity-30 translate-y-1/2 -translate-x-1/4 pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-14"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4 sm:mb-6 tracking-tight">
            Satu Platform, Multi-Akses
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Akses khusus yang dirancang sesuai kebutuhan peran masing-masing pengguna untuk pengalaman yang efisien.
          </p>
        </motion.div>

        {/* Tabs Component */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Tabs defaultValue="hrd" className="w-full">
            {/* Tab Navigation */}
            <div className="flex justify-center mb-8 sm:mb-12 overflow-x-auto pb-2">
              <TabList variant="pill" className="bg-slate-800/80 border border-slate-700 p-1.5 flex flex-wrap sm:flex-nowrap justify-center gap-1 max-w-full rounded-2xl shadow-lg backdrop-blur-md">
                {PLATFORM_PREVIEWS.map((item) => (
                  <Tab 
                    key={item.id} 
                    value={item.id} 
                    icon={item.icon} 
                    className="data-[state=active]:bg-[#F97316] data-[state=active]:text-white text-slate-300 gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-300"
                  >
                    {item.label}
                  </Tab>
                ))}
              </TabList>
            </div>

            {/* Tab Panels */}
            <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-5 sm:p-8 lg:p-10 shadow-2xl">
              {PLATFORM_PREVIEWS.map((platform) => (
                <TabPanel key={platform.id} value={platform.id} className="m-0 focus-visible:outline-none focus-visible:ring-0">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    
                    {/* Clean Illustration Image (No background frame, no terminal wrapper) */}
                    <div className="lg:col-span-7 order-2 lg:order-1 flex items-center justify-center">
                      <div className="relative w-full max-w-lg lg:max-w-none">
                        <Image
                          src={platform.image}
                          alt={platform.title}
                          width={1200}
                          height={750}
                          className="w-full h-auto object-contain drop-shadow-xl"
                          priority
                        />
                      </div>
                    </div>

                    {/* Content Details & Dynamic Button (Right / Bottom) */}
                    <div className="lg:col-span-5 order-1 lg:order-2 space-y-5 sm:space-y-6 text-left">
                      <div>
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-slate-300 bg-slate-800 border border-slate-700 mb-3">
                          {platform.badge}
                        </span>
                        <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight leading-snug">
                          {platform.title}
                        </h3>
                      </div>

                      <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                        {platform.description}
                      </p>

                      <ul className="space-y-3 pt-1">
                        {platform.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                            <CheckCircle2 className={`h-5 w-5 ${platform.checkColor} shrink-0 mt-0.5`} />
                            <span className="leading-snug">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Dynamic Preview Platform Button */}
                      <div className="pt-3 sm:pt-4">
                        <Link 
                          href={platform.previewUrl}
                          className="w-full sm:w-auto h-12 px-6 sm:px-8 bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold rounded-xl inline-flex items-center justify-center gap-2.5 shadow-xl shadow-orange-500/20 transition-all duration-300 group"
                        >
                          <span>{platform.buttonText}</span>
                          <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>

                  </div>
                </TabPanel>
              ))}
            </div>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}


