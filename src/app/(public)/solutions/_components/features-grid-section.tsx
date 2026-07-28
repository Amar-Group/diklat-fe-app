"use client";

import Image from "next/image";
import { 
  ScanLine, 
  ShieldCheck, 
  Video, 
  Award, 
  BarChart3, 
  Building2, 
  FileUp, 
  MessageSquareQuote, 
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";

export function FeaturesGridSection() {
  const features = [
    {
      icon: ScanLine,
      title: "QR Attendance Presisi",
      desc: "Absensi kehadiran fisik & online instan dengan pemindaian QR Code berbasis lokasi & waktu.",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-200/60",
      accentBg: "group-hover:bg-emerald-600"
    },
    {
      icon: ShieldCheck,
      title: "Anti-Skip Video Learning",
      desc: "Sistem pengawasan pintar memastikan video diklat wajib disimak tuntas tanpa bisa dilewati.",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200/60",
      accentBg: "group-hover:bg-indigo-600"
    },
    {
      icon: Video,
      title: "Integrasi Zoom & G-Meet",
      desc: "Akses otomatis ke sesi web seminar langsung dari dashboard tanpa tautan terpisah.",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200/60",
      accentBg: "group-hover:bg-blue-600"
    },
    {
      icon: Award,
      title: "Sertifikat Digital (QR Validation)",
      desc: "Penerbitan e-sertifikat otomatis dilengkapi QR verification yang sah dan terautentikasi.",
      color: "text-[#F97316]",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200/60",
      accentBg: "group-hover:bg-[#F97316]"
    },
    {
      icon: BarChart3,
      title: "Dashboard Analitik Real-Time",
      desc: "Pantau keseluruhan progres belajar, tingkat kelulusan, dan nilai statistik peserta secara visual.",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200/60",
      accentBg: "group-hover:bg-purple-600"
    },
    {
      icon: Building2,
      title: "Portal Khusus Instansi & HRD",
      desc: "Akses khusus pengelola HRD/BKD untuk memantau, mengelola, dan mengunduh laporan staf.",
      color: "text-sky-600",
      bgColor: "bg-sky-50",
      borderColor: "border-sky-200/60",
      accentBg: "group-hover:bg-sky-600"
    },
    {
      icon: FileUp,
      title: "Import Data Peserta Masal",
      desc: "Pendaftaran ratusan pegawai sekaligus dalam hitungan detik via pengunggahan berkas Excel.",
      color: "text-rose-600",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-200/60",
      accentBg: "group-hover:bg-rose-600"
    },
    {
      icon: MessageSquareQuote,
      title: "Evaluasi & Survey Kepuasan",
      desc: "Pengumpulan masukan, kuesioner, dan ulasan peserta secara digital pasca pelatihan.",
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200/60",
      accentBg: "group-hover:bg-amber-600"
    }
  ];

  return (
    <section className="py-20 sm:py-24 bg-[#FAFAF9] relative overflow-hidden">
      {/* Background Soft Glow Accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#1E1B4B]/5 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F97316]/5 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* Main 2 Columns Layout (40:60 Ratio) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 lg:mb-20">
          
          {/* Left Column: Text & Overview (40% -> lg:col-span-5) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1E1B4B] mb-5 leading-tight">
              Fitur Unggulan Platform
            </h2>

            <p className="text-slate-600 text-base sm:text-lg mb-8 leading-relaxed">
              Dilengkapi dengan teknologi E-Government & Enterprise terkini untuk meminimalisir proses manual, meningkatkan keamanan data, dan memaksimalkan pengalaman pembelajaran ASN maupun Korporasi.
            </p>

            <div className="space-y-3.5">
              <div className="flex items-start gap-3 text-slate-700 text-sm sm:text-base font-medium">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Terintegrasi Standar E-Government & Sistem Informasi Desa</span>
              </div>
              <div className="flex items-start gap-3 text-slate-700 text-sm sm:text-base font-medium">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Sistem Sertifikasi & Kelulusan Berbasis Kompetensi Resmi</span>
              </div>
              <div className="flex items-start gap-3 text-slate-700 text-sm sm:text-base font-medium">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Keamanan Data & Sistem Absensi Presisi Tinggi</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Illustration Image Solusi-PNS.webp (60% -> lg:col-span-7) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 flex justify-center items-center w-full"
          >
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              className="relative w-full aspect-[16/10] max-h-[480px] rounded-2xl overflow-hidden"
            >
              <Image
                src="/assets/images/program/Solusi-PNS.webp"
                alt="Fitur Unggulan Platform Diklat Solutions"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </motion.div>
          </motion.div>

        </div>

        {/* Refined Feature Cards Grid (Responsive: 1 col on XS, 2 col on SM, 4 col on LG) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.07 }}
              className="group p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-slate-300 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              {/* Subtle Top Colored Edge Highlight */}
              <div className={`absolute top-0 left-0 right-0 h-1 ${feature.bgColor}`} />

              <div>
                {/* Tailored Icon Container with Soft Colored Background & Border */}
                <div className={`h-12 w-12 rounded-xl ${feature.bgColor} ${feature.borderColor} border flex items-center justify-center mb-5 transition-all duration-300 ${feature.accentBg} group-hover:border-transparent group-hover:scale-110 shadow-sm`}>
                  <feature.icon className={`h-6 w-6 ${feature.color} group-hover:text-white transition-colors duration-300`} />
                </div>

                <h3 className="font-display font-bold text-base sm:text-lg text-[#1E1B4B] mb-2.5 leading-snug group-hover:text-[#F97316] transition-colors">
                  {feature.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Abstract Bottom Curve Divider with Color Adjustment */}
      <div className="w-full overflow-hidden leading-none pointer-events-none mt-16 sm:mt-24 -mb-24">
        <svg
          className="relative block w-full h-12 sm:h-16 lg:h-20 text-[#1E1B4B] fill-current"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z"
            fill="url(#feature-bottom-gradient)"
          ></path>
          <defs>
            <linearGradient id="feature-bottom-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1E1B4B" />
              <stop offset="50%" stopColor="#2E2A72" />
              <stop offset="100%" stopColor="#1E1B4B" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}
