"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";

export function FinalCtaSection() {
  return (
    <section className="py-24 bg-[#1E1B4B] relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[140%] rounded-full border border-indigo-500/20 rotate-12" />
        <div className="absolute -top-[10%] -right-[5%] w-[60%] h-[120%] rounded-full border border-indigo-500/20 rotate-12" />
        <div className="absolute top-0 right-0 w-[50%] h-[100%] rounded-full bg-gradient-to-l from-indigo-600/20 to-transparent blur-3xl rotate-12" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F97316]/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-900/50 border border-indigo-500/30 mb-8 backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-[#F97316] animate-pulse"></span>
            <span className="text-sm font-medium text-indigo-200">Mulai Transformasi SDM Anda Hari Ini</span>
          </div>
          
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-white mb-8 leading-tight">
            Tingkatkan Kompetensi SDM Perusahaan Anda Bersama Kami
          </h2>
          
          <p className="text-xl text-indigo-200 mb-12 leading-relaxed">
            Bergabung dengan lebih dari 30 mitra korporasi yang telah mempercayakan pengembangan karyawannya melalui platform kami.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="h-14 px-8 bg-[#F97316] hover:bg-[#EA580C] text-white rounded-lg font-bold text-lg shadow-xl shadow-orange-500/20 flex items-center gap-2">
              Konsultasi Sekarang <ArrowRight className="h-5 w-5" />
            </Button>
            <Button variant="outline" className="h-14 px-8 border-indigo-500 text-white hover:bg-indigo-900/50 rounded-lg font-bold text-lg flex items-center gap-2 bg-transparent backdrop-blur-sm">
              <CalendarDays className="h-5 w-5" /> Minta Demo Platform
            </Button>
          </div>
          
          <p className="mt-8 text-sm text-indigo-300">
            Tim konsultan kami siap merespon dalam waktu kurang dari 24 jam.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
