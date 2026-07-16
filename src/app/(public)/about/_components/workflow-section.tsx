"use client";

import { motion } from "framer-motion";

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
    <section className="py-24 bg-[#0F172A] text-white relative overflow-hidden">
      {/* Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-900/20 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F97316]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:flex md:justify-between md:items-end"
        >
          <div className="max-w-2xl">
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4 text-white">
              Alur Pelaksanaan Diklat
            </h2>
            <p className="text-slate-400 text-lg">
              Proses yang terstruktur dan transparan dari tahap perencanaan hingga evaluasi pasca-pelatihan.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Connector line for desktop */}
              {index < steps.length - 1 && (index + 1) % 3 !== 0 && (
                <div className="hidden lg:block absolute top-6 left-12 w-[calc(100%-3rem)] h-[1px] border-t border-dashed border-slate-700" />
              )}
              {/* Connector line for tablet */}
              {index < steps.length - 1 && (index + 1) % 2 !== 0 && (
                <div className="hidden md:block lg:hidden absolute top-6 left-12 w-[calc(100%-3rem)] h-[1px] border-t border-dashed border-slate-700" />
              )}

              <div className="relative z-10 flex gap-6">
                <div className="shrink-0 flex items-center justify-center h-12 w-12 rounded-xl bg-slate-800 text-slate-300 font-display font-bold border border-slate-700 group-hover:bg-[#F97316] group-hover:text-white group-hover:border-[#F97316] transition-colors">
                  {step.num}
                </div>
                <div>
                  <h3 className="font-display font-bold text-xl mb-3 text-white">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    {step.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
