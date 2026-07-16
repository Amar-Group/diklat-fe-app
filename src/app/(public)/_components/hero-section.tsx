"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle, BookOpen, Users, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#FAFAF9] pt-20 pb-28 lg:pt-32 lg:pb-36">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3">
        <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#1E1B4B]/5 to-[#F97316]/5 blur-3xl" />
      </div>
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3">
        <div className="w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#1E1B4B]/5 to-transparent blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, staggerChildren: 0.2 }}
            className="max-w-2xl"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm mb-6"
            >
              <span className="flex h-2 w-2 rounded-full bg-[#F97316] animate-pulse"></span>
              <span className="text-sm font-medium text-slate-700">Terpercaya oleh 500+ Perusahaan BUMN & Swasta</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-6xl font-display font-extrabold text-[#1E1B4B] tracking-tight leading-[1.1] mb-6"
            >
              Platform Diklat <span className="text-[#F97316]">Terintegrasi</span> untuk Pengembangan SDM
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg lg:text-xl text-slate-600 mb-8 leading-relaxed max-w-xl"
            >
              Kelola pelatihan LMS, kelas online, tatap muka, hybrid, sertifikasi digital, hingga monitoring kinerja peserta dalam satu platform tersentralisasi.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <Button className="h-12 px-8 bg-[#1E1B4B] hover:bg-[#312E81] text-white rounded-lg font-medium shadow-xl shadow-indigo-900/20 flex items-center gap-2">
                Jadwalkan Demo <ArrowRight className="h-4 w-4" />
              </Button>
              <Button className="h-12 px-8 bg-[#F97316] hover:bg-[#EA580C] text-white rounded-lg font-medium shadow-xl shadow-orange-500/20 flex items-center gap-2">
                Konsultasi Program
              </Button>
              <Button variant="outline" className="h-12 px-8 border-slate-300 text-slate-700 hover:bg-slate-50 rounded-lg font-medium flex items-center gap-2">
                <BookOpen className="h-4 w-4" /> Katalog Pelatihan
              </Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="flex items-center gap-6 text-sm text-slate-500 font-medium"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <span>Siap BNSP</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <span>Laporan Realtime</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                <span>Skalabilitas Tinggi</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visuals */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:h-[600px] flex items-center justify-center"
          >
            {/* Base Mockup (HRD Dashboard) */}
            <div className="absolute right-0 top-0 w-5/6 h-5/6 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-10 translate-x-4 translate-y-4">
              <div className="h-12 border-b border-slate-100 flex items-center px-4 gap-2 bg-slate-50/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="ml-4 h-6 w-32 bg-slate-200 rounded-md" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="h-6 w-48 bg-slate-200 rounded-md" />
                  <div className="h-8 w-24 bg-[#1E1B4B]/10 rounded-md" />
                </div>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="h-24 bg-slate-50 rounded-xl border border-slate-100 p-4">
                    <div className="h-4 w-16 bg-slate-200 rounded mb-2" />
                    <div className="h-8 w-12 bg-[#1E1B4B] rounded" />
                  </div>
                  <div className="h-24 bg-slate-50 rounded-xl border border-slate-100 p-4">
                    <div className="h-4 w-20 bg-slate-200 rounded mb-2" />
                    <div className="h-8 w-16 bg-[#F97316] rounded" />
                  </div>
                  <div className="h-24 bg-slate-50 rounded-xl border border-slate-100 p-4">
                    <div className="h-4 w-24 bg-slate-200 rounded mb-2" />
                    <div className="h-8 w-14 bg-emerald-500 rounded" />
                  </div>
                </div>
                <div className="h-32 bg-slate-50 rounded-xl border border-slate-100" />
              </div>
            </div>

            {/* Floating Element 1 (LMS Mobile/Card) */}
            <div className="absolute left-0 bottom-12 w-2/3 bg-white/90 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.2)] border border-white/50 p-5 z-20 animate-[float_6s_ease-in-out_infinite]">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-lg bg-orange-100 flex items-center justify-center">
                  <PlayCircle className="h-6 w-6 text-[#F97316]" />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800">LMS Anti-Skip Active</div>
                  <div className="text-xs text-slate-500">Materi Kepemimpinan Bab 2</div>
                </div>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-[#F97316] h-2 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <div className="mt-2 text-right text-xs font-medium text-slate-600">65% Selesai</div>
            </div>

            {/* Floating Element 2 (Stats Badge) */}
            <div className="absolute -right-6 top-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-30 animate-[float_5s_ease-in-out_infinite_1s]">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Users className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-800">5k+</div>
                  <div className="text-xs font-medium text-slate-500">Peserta Aktif</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
