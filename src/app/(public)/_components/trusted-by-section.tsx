"use client";

import { motion } from "framer-motion";

export function TrustedBySection() {
  return (
    <section className="py-16 bg-white border-y border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Logos */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-center text-sm font-semibold text-slate-500 tracking-wider uppercase mb-8">
            Dipercaya Oleh Lebih Dari 30 Mitra Korporasi
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Dummy Logos */}
            <div className="flex items-center gap-2 font-display font-bold text-xl text-slate-800">
              <div className="w-8 h-8 bg-slate-800 rounded-md" /> BUMN Tech
            </div>
            <div className="flex items-center gap-2 font-display font-bold text-xl text-slate-800">
              <div className="w-8 h-8 rounded-full border-4 border-slate-800" /> Pemda Maros
            </div>
            <div className="flex items-center gap-2 font-display font-bold text-xl text-slate-800">
              <div className="w-0 h-0 border-l-[16px] border-l-transparent border-t-[24px] border-t-slate-800 border-r-[16px] border-r-transparent" /> Swasta Corp
            </div>
            <div className="flex items-center gap-2 font-display font-bold text-xl text-slate-800">
              <div className="w-8 h-8 bg-slate-800 rotate-45" /> Asosiasi Profesi
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="font-display font-bold text-4xl text-[#1E1B4B] mb-2">5000+</div>
            <div className="text-sm font-medium text-slate-500">Peserta Lulus</div>
          </div>
          <div className="text-center">
            <div className="font-display font-bold text-4xl text-[#1E1B4B] mb-2">150+</div>
            <div className="text-sm font-medium text-slate-500">Kelas Terselenggara</div>
          </div>
          <div className="text-center">
            <div className="font-display font-bold text-4xl text-[#1E1B4B] mb-2">50+</div>
            <div className="text-sm font-medium text-slate-500">Instruktur Profesional</div>
          </div>
          <div className="text-center">
            <div className="font-display font-bold text-4xl text-[#1E1B4B] mb-2">30+</div>
            <div className="text-sm font-medium text-slate-500">Mitra Korporasi</div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
