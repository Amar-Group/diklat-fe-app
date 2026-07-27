"use client";

import Image from "next/image";
import { GraduationCap, MonitorPlay, Building, RefreshCcw, Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function SolutionsSection() {
  const solutions = [
    {
      icon: GraduationCap,
      title: "LMS Mandiri",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100",
      features: [
        "Video pembelajaran interaktif",
        "Sistem anti-skip learning",
        "Kuis & penugasan otomatis",
        "Tracking progress real-time"
      ]
    },
    {
      icon: MonitorPlay,
      title: "Kelas Online",
      color: "text-[#F97316]",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-100",
      features: [
        "Integrasi Zoom Meetings",
        "Integrasi Google Meet",
        "Absensi otomatis by sistem",
        "Akses rekaman kelas"
      ]
    },
    {
      icon: Building,
      title: "Kelas Tatap Muka",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-100",
      features: [
        "QR Attendance System",
        "Manajemen logistik peserta",
        "Field trip management",
        "Monitoring kehadiran fisik"
      ]
    },
    {
      icon: RefreshCcw,
      title: "Hybrid Learning",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-100",
      features: [
        "LMS + Online + Offline",
        "Progress terintegrasi penuh",
        "Penjadwalan otomatis",
        "Sertifikasi digital BNSP"
      ]
    }
  ];

  return (
    <section id="solutions" className="pt-28 pb-20 bg-[#FAFAF9] relative overflow-hidden">
      {/* Background Soft Glow Accents */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[350px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-1/3 -right-20 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        
        {/* Header Text (Centered) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10 sm:mb-12"
        >
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1E1B4B] mb-5 leading-tight">
            Solusi yang Kami Tawarkan
          </h1>
          <div className="h-1.5 w-24 bg-[#F97316] mx-auto rounded-full mb-6" />
          <p className="text-slate-600 text-base sm:text-lg md:text-xl leading-relaxed">
            Apapun kebutuhan bisnis dan instansi Anda, kami menyediakan infrastruktur pelatihan yang fleksibel, terstruktur, dan terukur untuk memastikan efektivitas pembelajaran.
          </p>
        </motion.div>

        {/* Premium Solution Hero Illustration (solusi.webp) with Glow Effect */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="relative w-full max-w-3xl lg:max-w-4xl mx-auto mb-16 sm:mb-20"
        >
          {/* Subtle Ambient Light Glow Aura */}
          <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-r from-indigo-500/15 via-orange-500/20 to-indigo-500/15 rounded-3xl blur-3xl opacity-80 pointer-events-none" />
          
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
            className="relative w-full aspect-[16/9] max-h-[480px] overflow-hidden"
          >
            <Image
              src="/assets/images/program/solution.webp"
              alt="Premium Solusi Pelatihan Diklat"
              fill
              className="object-contain drop-shadow-xl"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
            />
          </motion.div>
        </motion.div>

        {/* Responsive Solution Cards (HP: 1 col, Tablet: 2 cols, Desktop: 4 cols) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {solutions.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="group rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 hover:shadow-xl hover:border-slate-300 transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
            >
              <div className={`absolute top-0 right-0 w-28 sm:w-32 h-28 sm:h-32 ${item.bgColor} rounded-bl-full -z-0 opacity-50 group-hover:scale-110 transition-transform`} />
              
              <div className="relative z-10">
                <div className={`h-12 sm:h-14 w-12 sm:w-14 rounded-xl ${item.bgColor} ${item.borderColor} border flex items-center justify-center mb-6`}>
                  <item.icon className={`h-6 sm:h-7 w-6 sm:w-7 ${item.color}`} />
                </div>
                
                <h3 className="font-display font-bold text-lg sm:text-xl text-[#1E1B4B] mb-5">
                  {item.title}
                </h3>
                
                <ul className="space-y-3">
                  {item.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5">
                      <div className="mt-1 shrink-0 h-4 w-4 rounded-full bg-slate-100 flex items-center justify-center">
                        <Check className="h-3 w-3 text-slate-600" strokeWidth={3} />
                      </div>
                      <span className="text-xs sm:text-sm text-slate-600 leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
