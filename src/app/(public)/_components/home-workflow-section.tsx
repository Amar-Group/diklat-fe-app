"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Workflow, 
  ShieldCheck, 
  FileSpreadsheet, 
  Award, 
  BookOpen, 
  CheckCircle2,
  ChevronRight,
  CornerDownLeft
} from "lucide-react";
import { motion } from "framer-motion";

export function HomeWorkflowSection() {
  const steps = [
    {
      num: "01",
      title: "Pendaftaran & Data",
      desc: "Registrasi peserta instansi & bulk import Excel.",
      icon: FileSpreadsheet,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100",
      iconColor: "text-blue-600"
    },
    {
      num: "02",
      title: "Penyusunan Kurikulum",
      desc: "Modul berbasis SKKNI & silabus terstruktur.",
      icon: BookOpen,
      bgColor: "bg-purple-50",
      borderColor: "border-purple-100",
      iconColor: "text-purple-600"
    },
    {
      num: "03",
      title: "Pembelajaran LMS",
      desc: "Modul anti-skip interaktif, Zoom & offline.",
      icon: Workflow,
      bgColor: "bg-orange-50",
      borderColor: "border-orange-100",
      iconColor: "text-[#F97316]"
    },
    {
      num: "04",
      title: "Monitoring Presensi",
      desc: "Presensi QR Code & tracking keaktifan HRD.",
      icon: ShieldCheck,
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-100",
      iconColor: "text-emerald-600"
    },
    {
      num: "05",
      title: "Evaluasi & Post-Test",
      desc: "Ujian kelulusan, kuis & penilaian tugas.",
      icon: CheckCircle2,
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-100",
      iconColor: "text-indigo-600"
    },
    {
      num: "06",
      title: "Sertifikasi BNSP",
      desc: "E-sertifikat terverifikasi QR Code otomatis.",
      icon: Award,
      bgColor: "bg-amber-50",
      borderColor: "border-amber-100",
      iconColor: "text-amber-600"
    },
  ];

  return (
    <section className="pt-0 pb-16 sm:pb-20 bg-[#FAFAF9] relative overflow-hidden">
      {/* Abstract Top Wave Divider matching DashboardsPreviewSection (#0F172A) */}
      <div className="w-full overflow-hidden leading-none pointer-events-none -mt-1 sm:-mt-2 mb-8 sm:mb-12 relative z-10">
        <svg 
          viewBox="0 0 1200 80" 
          preserveAspectRatio="none" 
          className="relative block w-full h-8 sm:h-12 lg:h-14 text-[#0F172A] fill-current"
        >
          {/* Path melengkung halus ke atas di tengah (~40% kedalaman/ketinggian) */}
          <path d="M0,0 L1200,0 L1200,40 Q600,0 0,40 Z"></path>
        </svg>
      </div>

      {/* Background Soft Glow Accents */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 -left-20 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* Main 2 Columns Layout (1 Row, 2 Cols -> Flow Content Left, Illustration Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center mb-10">
          
          {/* Left Column: 6-Step Flow Grid 2 Rows x 3 Cols (60% width -> lg:col-span-7) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-4xl text-[#1E1B4B] mb-3 leading-tight">
              6 Tahapan Alur Pelaksanaan Diklat
            </h2>

            <div className="h-1.5 w-20 bg-[#F97316] rounded-full mb-5" />

            <p className="text-slate-600 text-sm sm:text-base mb-6 leading-relaxed max-w-2xl">
              Alur kerja terintegrasi dari pendaftaran massal, pelaksanaan LMS hybrid, monitoring real-time, hingga penerbitan sertifikat kompetensi digital.
            </p>

            {/* 6 Steps Grid: 2 Rows x 3 Columns with Arrow Connectors */}
            <div className="relative mb-8">
              
              {/* Row 1 (Steps 01, 02, 03) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-3 sm:mb-4 relative">
                {steps.slice(0, 3).map((step, idx) => (
                  <div key={idx} className="relative group">
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-[#F97316] hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between">
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 group-hover:bg-orange-100 text-[#1E1B4B] group-hover:text-[#F97316] font-display font-extrabold text-xs transition-colors">
                          {step.num}
                        </span>
                        <div className={`p-1.5 rounded-xl ${step.bgColor} ${step.borderColor} border`}>
                          <step.icon className={`h-4 w-4 ${step.iconColor}`} />
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-[#1E1B4B] mb-1 group-hover:text-[#F97316] transition-colors leading-snug">
                          {step.title}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>

                    {/* Arrow Right Connector for Step 01 & Step 02 */}
                    {idx < 2 && (
                      <div className="hidden sm:flex absolute -right-3 sm:-right-4 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-[#F97316] border border-orange-200 shadow-sm pointer-events-none">
                        <ChevronRight className="h-3.5 w-3.5" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Connecting Flow Line between Row 1 & Row 2 */}
              <div className="hidden sm:flex justify-end pr-6 my-1">
                <div className="flex items-center gap-1.5 text-xs text-[#F97316] font-semibold bg-orange-50 px-3 py-1 rounded-full border border-orange-200/60">
                  <span>Lanjut ke Tahap Monitoring</span>
                  <CornerDownLeft className="h-3.5 w-3.5 text-[#F97316]" />
                </div>
              </div>

              {/* Row 2 (Steps 04, 05, 06) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 relative mt-2 sm:mt-1">
                {steps.slice(3, 6).map((step, idx) => (
                  <div key={idx} className="relative group">
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-[#F97316] hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between">
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 group-hover:bg-orange-100 text-[#1E1B4B] group-hover:text-[#F97316] font-display font-extrabold text-xs transition-colors">
                          {step.num}
                        </span>
                        <div className={`p-1.5 rounded-xl ${step.bgColor} ${step.borderColor} border`}>
                          <step.icon className={`h-4 w-4 ${step.iconColor}`} />
                        </div>
                      </div>

                      <div>
                        <h4 className="font-bold text-xs sm:text-sm text-[#1E1B4B] mb-1 group-hover:text-[#F97316] transition-colors leading-snug">
                          {step.title}
                        </h4>
                        <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                          {step.desc}
                        </p>
                      </div>
                    </div>

                    {/* Arrow Right Connector for Step 04 & Step 05 */}
                    {idx < 2 && (
                      <div className="hidden sm:flex absolute -right-3 sm:-right-4 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-6 h-6 rounded-full bg-orange-100 text-[#F97316] border border-orange-200 shadow-sm pointer-events-none">
                        <ChevronRight className="h-3.5 w-3.5" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button 
                className="w-full sm:w-auto bg-[#F97316] hover:bg-[#EA580C] text-white px-7 py-3 h-auto rounded-xl font-semibold text-sm sm:text-base shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 cursor-pointer"
                onClick={() => { window.location.href = `mailto:ptharapanamarjaya@gmail.com?subject=${encodeURIComponent('Konsultasi Alur Pelatihan Diklat')}`; }}
              >
                Konsultasi Alur Pelatihan <ArrowRight className="h-4.5 w-4.5" />
              </Button>
            </div>
          </motion.div>

          {/* Right Column: Flow-Diklat.webp Illustration (40% width -> lg:col-span-5) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center items-center w-full relative"
          >
            {/* Ambient Soft Glow Behind Image */}
            <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-r from-indigo-500/15 via-orange-500/20 to-indigo-500/15 rounded-3xl blur-3xl opacity-80 pointer-events-none" />

            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              className="relative w-full aspect-[16/11] max-h-[500px] overflow-hidden"
            >
              <Image
                src="/assets/images/profil/flow/Flow-Diklat.webp"
                alt="Alur 6 Tahap Pelaksanaan Diklat PT Harapan Amar Jaya"
                fill
                className="object-contain drop-shadow-xl"
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </motion.div>
          </motion.div>

        </div>

      </div>

      {/* Smooth Wave Transition into HomeInstructorsSection (#FFFFFF) */}
      <div className="w-full overflow-hidden leading-none pointer-events-none mt-12 sm:mt-16 -mb-20">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-10 sm:h-14 lg:h-16 text-white fill-current"
        >
          <path d="M0,0 C300,90 600,-30 900,70 C1050,110 1150,30 1200,40 L1200,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  );
}
