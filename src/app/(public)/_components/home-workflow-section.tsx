"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Workflow, ShieldCheck, FileSpreadsheet, Award } from "lucide-react";
import { motion } from "framer-motion";

export function HomeWorkflowSection() {
  const steps = [
    {
      num: "01",
      title: "Konsultasi & Registrasi Data",
      desc: "Pendaftaran peserta instansi secara mandiri maupun massal (bulk import Excel) ke portal.",
      icon: FileSpreadsheet,
    },
    {
      num: "02",
      title: "Pembelajaran Fleksibel",
      desc: "Kombinasi modul LMS interaktif anti-skip, kelas Zoom online, dan diklat tatap muka.",
      icon: Workflow,
    },
    {
      num: "03",
      title: "Monitoring & Evaluasi Realtime",
      desc: "Pantau presensi QR Code, progres materi, kuis, dan tugas peserta langsung oleh HRD.",
      icon: ShieldCheck,
    },
    {
      num: "04",
      title: "Sertifikasi Digital Terverifikasi",
      desc: "Penerbitan e-sertifikat kompetensi berstandar BNSP lengkap dengan verifikasi QR Code.",
      icon: Award,
    },
  ];

  return (
    <section className="pt-28 pb-20 bg-[#FAFAF9] relative overflow-hidden">
      {/* Abstract Top Curved Divider Matching DashboardsPreviewSection (#0F172A) */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-10">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-8 sm:h-12 lg:h-16 text-[#0F172A] fill-current"
        >
          <path d="M0,0 Q600,80 1200,0 L1200,0 L0,0 Z"></path>
        </svg>
      </div>

      {/* Soft Background Accents */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 -left-20 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* Main 2 Columns Layout (40:60 Ratio) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12">
          
          {/* Left Column: Workflow Description & Steps (40% -> lg:col-span-5) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1E1B4B] mb-5 leading-tight">
              Alur Pelaksanaan Diklat Terstruktur
            </h2>

            <div className="h-1.5 w-20 bg-[#F97316] rounded-full mb-6" />

            <p className="text-slate-600 text-base sm:text-lg mb-8 leading-relaxed">
              Setiap tahapan diklat dirancang secara sistematis dan terukur untuk menjamin peserta meraih kompetensi kerja yang sah, relevan, dan siap pakai.
            </p>

            {/* Timeline Steps List */}
            <div className="space-y-4 mb-8">
              {steps.map((step, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-start gap-4 hover:border-orange-300 transition-colors">
                  <div className="shrink-0 h-10 w-10 rounded-xl bg-orange-100/80 text-[#F97316] font-bold font-display text-sm flex items-center justify-center">
                    {step.num}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-[#1E1B4B] mb-1">
                      {step.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button className="w-full sm:w-auto bg-[#F97316] hover:bg-[#EA580C] text-white px-7 py-3 h-auto rounded-xl font-semibold text-sm sm:text-base shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5">
                Konsultasi Alur Diklat <ArrowRight className="h-4.5 w-4.5" />
              </Button>
            </div>
          </motion.div>

          {/* Right Column: Flow-Diklat.webp Illustration (60% -> lg:col-span-7) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 flex justify-center items-center w-full relative"
          >
            {/* Ambient Soft Glow Behind Image */}
            <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-r from-indigo-500/15 via-orange-500/20 to-indigo-500/15 rounded-3xl blur-3xl opacity-80 pointer-events-none" />

            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              className="relative w-full aspect-[16/11] max-h-[540px] overflow-hidden"
            >
              <Image
                src="/assets/images/profil/flow/Flow-Diklat.webp"
                alt="Alur Pelaksanaan Diklat PT Harapan Amar Jaya"
                fill
                className="object-contain drop-shadow-xl"
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </motion.div>
          </motion.div>

        </div>

      </div>

      {/* Abstract Multi-Layer Organic Wave Divider (New Distinct Style) */}
      <div className="w-full overflow-hidden leading-none pointer-events-none mt-16 sm:mt-24 -mb-24">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-12 sm:h-16 lg:h-20"
        >
          <path 
            d="M0,40 C200,100 400,0 600,60 C800,120 1000,20 1200,80 L1200,120 L0,120 Z" 
            fill="url(#flow-organic-gradient-1)"
            className="opacity-40"
          />
          <path 
            d="M0,60 C300,10 600,90 900,30 C1050,0 1150,70 1200,50 L1200,120 L0,120 Z" 
            fill="url(#flow-organic-gradient-2)"
          />
          <defs>
            <linearGradient id="flow-organic-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#1E1B4B" />
            </linearGradient>
            <linearGradient id="flow-organic-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}
