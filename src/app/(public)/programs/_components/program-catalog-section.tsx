"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Award, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export function ProgramCatalogSection() {
  const programs = [
    {
      title: "Manajemen ASN",
      duration: "3 Hari",
      method: "Hybrid",
      certification: "BNSP / Internal",
      category: "Manajemen",
      image: "bg-slate-200"
    }
  ];

  return (
    <section id="programs" className="py-24 bg-[#FAFAF9] relative overflow-hidden">
      {/* Background Abstract Glow Accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1E1B4B]/5 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-1/3 -left-20 w-[400px] h-[400px] bg-[#F97316]/5 rounded-full blur-3xl pointer-events-none -z-0" />

      {/* Container for 40:60 Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        
        {/* Header: 1 Row 2 Columns (40:60 Ratio) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Text (40% -> lg:col-span-5) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1E1B4B] mb-5 leading-tight">
              Katalog Program Pelatihan
            </h2>

            <p className="text-slate-600 text-base sm:text-lg mb-8 leading-relaxed">
              Beragam pilihan program diklat berkualitas yang disusun berdasarkan standar kompetensi kerja nasional dan internasional untuk pengembangan kapasitas SDM unggul.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button className="bg-[#F97316] hover:bg-[#EA580C] text-white px-6 py-3 h-auto rounded-xl font-semibold shadow-md shadow-orange-500/20 flex items-center gap-2 group transition-all">
                Lihat Semua Program 
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>

          {/* Right Column: Illustration Image (60% -> lg:col-span-7) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 flex justify-center items-center w-full"
          >
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="relative w-full aspect-[16/10] max-h-[460px] rounded-2xl overflow-hidden"
            >
              <Image
                src="/assets/images/program/list-program.webp"
                alt="Katalog Program Pelatihan"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Abstract SVG Wave/Pattern Divider with Custom Colors (Full Width Edge-to-Edge) */}
      <div className="w-full relative my-10 sm:my-14 overflow-hidden pointer-events-none">
        <svg 
          viewBox="0 0 1200 80" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-10 sm:h-14 lg:h-16 opacity-90"
          preserveAspectRatio="none"
        >
          <path 
            d="M0,0 C300,60 600,10 900,50 C1050,70 1150,20 1200,30 L1200,80 L0,80 Z" 
            fill="url(#catalog-header-abstract-gradient)"
          />
          <path 
            d="M0,20 C400,80 700,30 1000,70 C1100,80 1170,40 1200,50" 
            stroke="url(#catalog-header-stroke-gradient)"
            strokeWidth="2.5"
            strokeDasharray="6 6"
          />
          <defs>
            <linearGradient id="catalog-header-abstract-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1E1B4B" stopOpacity="0.05" />
              <stop offset="50%" stopColor="#F97316" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0.04" />
            </linearGradient>
            <linearGradient id="catalog-header-stroke-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1E1B4B" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#F97316" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0.15" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Container for Program Cards */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        
        {/* Grid Programs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Image Placeholder */}
              <div className={`h-48 w-full ${program.image} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-slate-800/10 group-hover:bg-transparent transition-colors" />
                <Badge className="absolute top-4 left-4 bg-white/90 text-slate-800 hover:bg-white border-0 shadow-sm">
                  {program.category}
                </Badge>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-display font-bold text-xl text-[#1E1B4B] mb-4 line-clamp-2">
                  {program.title}
                </h3>
                
                <div className="space-y-3 mb-8 mt-auto">
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Clock className="h-4 w-4 text-slate-400" />
                    <span>Durasi {program.duration}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <span>Metode {program.method}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <Award className="h-4 w-4 text-slate-400" />
                    <span>Sertifikat {program.certification}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 mt-auto pt-6 border-t border-slate-100">
                  <Button variant="outline" className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50">
                    Detail
                  </Button>
                  <Button className="flex-1 bg-[#F97316] hover:bg-[#EA580C] text-white">
                    Daftar
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button variant="ghost" className="text-[#F97316] hover:text-[#EA580C] hover:bg-orange-50">
            Lihat Semua Program &rarr;
          </Button>
        </div>

      </div>

      {/* Abstract SVG Bottom Curve with Color Adjustment */}
      <div className="w-full overflow-hidden leading-none pointer-events-none mt-16 -mb-24">
        <svg
          className="relative block w-full h-12 sm:h-16 lg:h-20 text-[#1E1B4B] fill-current"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z"
            fill="url(#bottom-abstract-gradient)"
          ></path>
          <defs>
            <linearGradient id="bottom-abstract-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1E1B4B" />
              <stop offset="50%" stopColor="#2E2A72" />
              <stop offset="100%" stopColor="#1E1B4B" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}


