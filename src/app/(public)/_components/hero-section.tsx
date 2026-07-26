"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    // <section className="relative overflow-hidden bg-[#FAFAF9] pt-12 pb-16 sm:pt-20 sm:pb-28 lg:pt-32 lg:pb-36">
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#FAFAF9] pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-16 lg:pb-20">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 pointer-events-none">
        <div className="w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] rounded-full bg-gradient-to-br from-[#1E1B4B]/5 to-[#F97316]/5 blur-3xl" />
      </div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 pointer-events-none">
        <div className="w-[250px] h-[250px] sm:w-[500px] sm:h-[500px] rounded-full bg-gradient-to-tr from-[#1E1B4B]/5 to-transparent blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-16 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, staggerChildren: 0.2 }}
            className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-[#1E1B4B] tracking-tight leading-tight sm:leading-[1.1] mb-4 sm:mb-6"
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
              <Button className="h-12 px-6 sm:px-8 bg-[#1E1B4B] hover:bg-[#312E81] text-white rounded-lg font-medium shadow-xl shadow-indigo-900/20 flex items-center justify-center gap-2 w-full sm:w-auto">
                Jadwalkan Demo <ArrowRight className="h-4 w-4" />
              </Button>
              <Button className="h-12 px-6 sm:px-8 bg-[#F97316] hover:bg-[#EA580C] text-white rounded-lg font-medium shadow-xl shadow-orange-500/20 flex items-center justify-center gap-2 w-full sm:w-auto">
                Konsultasi Program
              </Button>
              <Button variant="outline" className="h-12 px-6 sm:px-8 border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg font-medium flex items-center justify-center gap-2 w-full sm:w-auto">
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

          {/* Right Visuals */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex items-center justify-center w-full"
          >
          <div className="relative w-[580px] sm:w-[950px] lg:w-[1550px] max-w-full mx-auto">
            <Image
              src="/assets/images/home/Hero.webp"
              alt="Platform Diklat Terintegrasi"
              width={700}
              height={500}
              className="w-full h-auto object-contain drop-shadow-md"
              priority
            />
          </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
