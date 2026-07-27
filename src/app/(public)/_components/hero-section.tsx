"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#FAFAF9] pt-28 sm:pt-32 lg:pt-36 pb-16 sm:pb-20 lg:pb-24">
      {/* Background Decor Glows */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 pointer-events-none">
        <div className="w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] lg:w-[800px] lg:h-[800px] rounded-full bg-gradient-to-br from-[#1E1B4B]/5 to-[#F97316]/5 blur-3xl" />
      </div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 pointer-events-none">
        <div className="w-[250px] h-[250px] sm:w-[500px] sm:h-[500px] lg:w-[700px] lg:h-[700px] rounded-full bg-gradient-to-tr from-[#1E1B4B]/5 to-transparent blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center">
          
          {/* Left Content (6 cols on LG, 5 cols on XL) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, staggerChildren: 0.2 }}
            className="lg:col-span-6 xl:col-span-5 max-w-2xl mx-auto lg:mx-0 text-center lg:text-left z-10"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-display font-extrabold text-[#1E1B4B] tracking-tight leading-tight sm:leading-[1.1] mb-4 sm:mb-6"
            >
              Platform Diklat <span className="text-[#F97316]">Terintegrasi</span> untuk Pengembangan SDM
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-base sm:text-lg lg:text-xl text-slate-600 mb-6 sm:mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Kelola pelatihan LMS, kelas online, tatap muka, hybrid, sertifikasi digital, hingga monitoring kinerja peserta dalam satu platform tersentralisasi.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 mb-8 sm:mb-10 w-full"
            >
              <Button className="h-12 px-6 sm:px-8 bg-[#1E1B4B] hover:bg-[#312E81] text-white rounded-xl font-medium shadow-xl shadow-indigo-900/20 flex items-center justify-center gap-2 w-full sm:w-auto">
                Jadwalkan Demo <ArrowRight className="h-4 w-4" />
              </Button>
              <Button className="h-12 px-6 sm:px-8 bg-[#F97316] hover:bg-[#EA580C] text-white rounded-xl font-medium shadow-xl shadow-orange-500/20 flex items-center justify-center gap-2 w-full sm:w-auto">
                Konsultasi Program
              </Button>
              <Button variant="outline" className="h-12 px-6 sm:px-8 border-slate-300 text-slate-700 hover:bg-slate-50 rounded-xl font-medium flex items-center justify-center gap-2 w-full sm:w-auto">
                <BookOpen className="h-4 w-4" /> Katalog Pelatihan
              </Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm text-slate-500 font-medium"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500 shrink-0" />
                <span>Siap BNSP</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500 shrink-0" />
                <span>Laporan Realtime</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-500 shrink-0" />
                <span>Skalabilitas Tinggi</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visuals (6 cols on LG, 7 cols on XL with responsive dynamic expansion) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 xl:col-span-7 relative flex items-center justify-center w-full"
          >
            <div className="relative w-full sm:w-[90%] lg:w-[118%] xl:w-[128%] 2xl:w-[138%] lg:-mr-10 xl:-mr-20 transition-all duration-300 flex justify-center items-center">
              <Image
                src="/assets/images/home/Hero.webp"
                alt="Platform Diklat Terintegrasi"
                width={1200}
                height={800}
                className="w-full h-auto object-contain drop-shadow-xl"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 1200px"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
