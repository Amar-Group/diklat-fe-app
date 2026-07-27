"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ChevronDown } from "lucide-react";

export function WorkflowSection() {
  const steps = [
    {
      num: "01",
      title: "Konsultasi Kebutuhan",
      desc: "Diskusi mendalam untuk memahami objektif bisnis dan kebutuhan kompetensi spesifik perusahaan Anda."
    },
    {
      num: "02",
      title: "Penentuan Metode",
      desc: "Memilih format optimal: Full LMS, Online live sessions, Offline in-house, atau format Hybrid."
    },
    {
      num: "03",
      title: "Pendaftaran Peserta",
      desc: "Registrasi mandiri oleh peserta atau bulk import via Excel langsung oleh admin HRD Anda."
    },
    {
      num: "04",
      title: "Pelaksanaan",
      desc: "Proses pembelajaran dengan monitoring kehadiran dan progress secara terpusat."
    },
    {
      num: "05",
      title: "Evaluasi & Sertifikasi",
      desc: "Ujian kompetensi, penilaian akhir, dan penerbitan sertifikat digital berbasis QR."
    },
    {
      num: "06",
      title: "Laporan HRD",
      desc: "Unduh laporan komprehensif performa peserta secara realtime melalui dashboard korporat."
    }
  ];

  return (
    <div className="relative w-full overflow-hidden bg-[#0F172A]">
      {/* Abstract Top Curve SVG Divider (Opposite Direction) */}
      <div className="w-full overflow-hidden leading-none bg-white -mb-1">
        <svg
          className="relative block w-full h-10 sm:h-14 md:h-18 lg:h-22"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 C300,10 900,90 1200,0 L1200,120 L0,120 Z"
            fill="#0F172A"
          ></path>
        </svg>
      </div>

      <section className="py-12 sm:py-16 lg:py-20 text-white relative">
        {/* Decorative background glows */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-900/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F97316]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 relative z-10">
          
          {/* Pure 1 Row 2 Columns (40 : 60 Split) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Header + Compact Frameless Stacked Steps (40% Width) */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              
              {/* Header inside Left Column */}
              <motion.div 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
                className="mb-6 text-left"
              >
                <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white mb-2 leading-tight">
                  Alur Pelaksanaan Diklat
                </h2>
                <div className="h-1 w-16 bg-[#F97316] rounded-full mb-3"></div>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  Proses yang terstruktur dan transparan dari tahap perencanaan hingga evaluasi pasca-pelatihan.
                </p>
              </motion.div>

              {/* Stacked Frameless Steps */}
              <div className="space-y-1 sm:space-y-1.5">
                {steps.map((step, index) => (
                  <div key={index} className="flex flex-col">
                    <motion.div 
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className="flex items-start gap-3 group py-1"
                    >
                      <div className="shrink-0 flex items-center justify-center h-8 w-8 rounded-lg bg-[#F97316] text-white font-display font-bold text-xs shadow-sm mt-0.5">
                        {step.num}
                      </div>
                      <div>
                        <h3 className="font-display font-bold text-sm sm:text-base text-white mb-0.5 group-hover:text-[#F97316] transition-colors leading-snug">
                          {step.title}
                        </h3>
                        <p className="text-slate-400 text-xs leading-normal">
                          {step.desc}
                        </p>
                      </div>
                    </motion.div>

                    {/* Compact Arrow Connector */}
                    {index < steps.length - 1 && (
                      <div className="pl-3.5 my-0.5 flex items-center text-[#F97316]/70">
                        <ChevronDown className="h-3.5 w-3.5" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>

            {/* Right Column: Full Frameless Illustration Image with Gentle Floating Animation (60% Width) */}
            <motion.div 
              initial={{ opacity: 0, x: 25 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 flex justify-center items-center w-full h-full"
            >
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="relative w-full aspect-[4/3] lg:aspect-[16/11] max-h-[620px] rounded-2xl overflow-hidden"
              >
                <Image
                  src="/assets/images/profil/flow/Flow-Diklat.webp"
                  alt="Ilustrasi Alur Pelaksanaan Diklat"
                  fill
                  className="object-contain"
                  priority
                />
              </motion.div>
            </motion.div>

          </div>

        </div>
      </section>
    </div>
  );
}


