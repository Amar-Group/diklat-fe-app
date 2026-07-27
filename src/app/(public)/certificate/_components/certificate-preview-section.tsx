"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  QrCode, 
  FileCheck, 
  ShieldCheck, 
  Download, 
  Eye,
  X
} from "lucide-react";
import { motion } from "framer-motion";
import { Modal } from "@/components/ui/modal";

export function CertificatePreviewSection() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const certificateFeatures = [
    {
      icon: ShieldCheck,
      title: "BNSP Ready",
      desc: "Terintegrasi dengan format standar dari Badan Nasional Sertifikasi Profesi.",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-100",
      iconColor: "text-emerald-600"
    },
    {
      icon: QrCode,
      title: "QR Verification",
      desc: "Pindai kode QR untuk memvalidasi keaslian sertifikat langsung ke database kami.",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-100",
      iconColor: "text-[#F97316]"
    },
    {
      icon: FileCheck,
      title: "Nomor Unik Seri",
      desc: "Penerbitan nomor seri otomatis untuk setiap peserta yang lulus evaluasi.",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100",
      iconColor: "text-blue-600"
    },
    {
      icon: Download,
      title: "Unduh Mandiri",
      desc: "Peserta dapat mengunduh ulang sertifikat kapan saja melalui platform LMS.",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-100",
      iconColor: "text-purple-600"
    }
  ];

  return (
    <section id="certificate" className="pt-28 pb-20 bg-[#FAFAF9] relative overflow-hidden">
      {/* Background Soft Glow Accents */}
      <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 -left-20 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* Main 2 Columns Layout (40:60 Ratio) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Content Column (40% -> lg:col-span-5) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1E1B4B] mb-4 sm:mb-5 leading-tight">
              Sertifikasi Digital Terverifikasi
            </h1>

            <div className="h-1.5 w-20 bg-[#F97316] rounded-full mb-6" />

            <p className="text-slate-600 text-base sm:text-lg mb-8 leading-relaxed">
              Setiap kelulusan peserta dihargai dengan sertifikat kompetensi digital yang sah, aman dari pemalsuan, dan mudah divalidasi keasliannya melalui sistem pelacakan terpusat.
            </p>
            
            {/* Feature Cards Grid (1 col on mobile, 2 col on sm) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-8 sm:mb-10">
              {certificateFeatures.map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="flex items-center gap-3 mb-2.5">
                    <div className={`shrink-0 h-10 w-10 rounded-xl ${item.bgColor} ${item.borderColor} border flex items-center justify-center`}>
                      <item.icon className={`h-5 w-5 ${item.iconColor}`} />
                    </div>
                    <h4 className="font-bold text-slate-800 text-sm sm:text-base leading-snug">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Button 
                onClick={() => setIsPreviewOpen(true)}
                className="w-full sm:w-auto bg-[#1E1B4B] hover:bg-[#312E81] text-white px-7 py-3 h-auto rounded-xl font-semibold text-sm sm:text-base shadow-lg shadow-indigo-950/20 flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 cursor-pointer"
              >
                <Eye className="h-4.5 w-4.5 text-orange-400" />
                Lihat Contoh Sertifikat
              </Button>
            </div>
          </motion.div>

          {/* Image Illustration Column: Sertifikat.webp (60% -> lg:col-span-7) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 flex justify-center items-center w-full relative"
          >
            {/* Soft Glow Background Aura */}
            <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-r from-indigo-500/15 via-orange-500/20 to-indigo-500/15 rounded-3xl blur-3xl opacity-80 pointer-events-none" />

            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              onClick={() => setIsPreviewOpen(true)}
              className="relative w-full aspect-[16/11] max-h-[520px] overflow-hidden cursor-pointer group"
            >
              <Image
                src="/assets/images/program/Sertifikat.webp"
                alt="Pratinjau Sertifikat Digital PT Harapan Amar Jaya"
                fill
                className="object-contain drop-shadow-xl transition-transform duration-300 group-hover:scale-105"
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </motion.div>
          </motion.div>

        </div>

      </div>

      {/* Pure Image Preview Lightbox Modal (Direct Image Only, No Extra Card / Header Borders) */}
      <Modal 
        open={isPreviewOpen} 
        onClose={() => setIsPreviewOpen(false)}
        className="max-w-4xl bg-transparent border-0 shadow-none p-0 overflow-visible"
      >
        <div className="relative w-full flex flex-col items-center justify-center p-2 sm:p-4">
          {/* Close Button Top Right */}
          <button 
            onClick={() => setIsPreviewOpen(false)}
            aria-label="Close Preview"
            className="absolute -top-10 right-0 sm:right-2 text-white/80 hover:text-white bg-black/60 hover:bg-black/90 rounded-full p-2 transition-colors z-50 cursor-pointer"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Pure Direct Image Preview */}
          <div className="relative w-full aspect-[16/11] max-h-[85vh] overflow-hidden">
            <Image
              src="/assets/images/program/Sertifikat.webp"
              alt="Pratinjau Sertifikat Digital PT Harapan Amar Jaya"
              fill
              className="object-contain drop-shadow-2xl"
              priority
              sizes="100vw"
            />
          </div>
        </div>
      </Modal>

      {/* Abstract Solid Curved Wave Divider (Full Width Edge-to-Edge, Smooth Fill without Dashed Lines) */}
      <div className="w-full overflow-hidden leading-none pointer-events-none mt-16 sm:mt-24 -mb-24">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-12 sm:h-16 lg:h-20 text-[#1E1B4B] fill-current"
        >
          <path 
            d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z" 
            fill="url(#cert-bottom-smooth-gradient)"
          />
          <defs>
            <linearGradient id="cert-bottom-smooth-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
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
