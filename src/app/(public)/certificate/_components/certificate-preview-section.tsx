"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, QrCode, FileCheck, ShieldCheck, Download, Award } from "lucide-react";
import { motion } from "framer-motion";

export function CertificatePreviewSection() {
  return (
    <section id="certificate" className="py-24 bg-white relative overflow-hidden border-t border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-xl order-2 lg:order-1"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#1E1B4B] mb-6">
              Sertifikasi Digital Terverifikasi
            </h2>
            <p className="text-slate-600 mb-8 text-lg leading-relaxed">
              Setiap kelulusan peserta dihargai dengan sertifikat kompetensi digital yang sah, aman dari pemalsuan, dan mudah divalidasi keasliannya melalui sistem pelacakan terpusat.
            </p>
            
            <div className="space-y-6 mb-10">
              <div className="flex gap-4">
                <div className="shrink-0 h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center">
                  <ShieldCheck className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">BNSP Ready</h4>
                  <p className="text-sm text-slate-600">Terintegrasi dengan format standar dari Badan Nasional Sertifikasi Profesi.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 h-12 w-12 rounded-full bg-orange-50 flex items-center justify-center">
                  <QrCode className="h-6 w-6 text-[#F97316]" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">QR Verification</h4>
                  <p className="text-sm text-slate-600">Pindai kode QR untuk memvalidasi keaslian sertifikat langsung ke database kami.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                  <FileCheck className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">Nomor Unik Seri</h4>
                  <p className="text-sm text-slate-600">Penerbitan nomor seri otomatis untuk setiap peserta yang lulus evaluasi.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 h-12 w-12 rounded-full bg-purple-50 flex items-center justify-center">
                  <Download className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">Unduh Mandiri</h4>
                  <p className="text-sm text-slate-600">Peserta dapat mengunduh ulang sertifikat kapan saja melalui LMS.</p>
                </div>
              </div>
            </div>

            <Button className="bg-[#1E1B4B] hover:bg-[#312E81] text-white flex items-center gap-2">
              Lihat Contoh Sertifikat <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>

          {/* Visual Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 lg:order-2 relative perspective-1000"
          >
            {/* Certificate Mockup */}
            <div className="relative w-full aspect-[1.414/1] bg-white border-8 border-[#1E1B4B] p-8 shadow-[0_20px_50px_-12px_rgba(30,27,75,0.3)] transform rotate-y-[-5deg] rotate-x-[5deg] transition-transform hover:rotate-0 duration-700">
              {/* Internal borders */}
              <div className="absolute inset-4 border-2 border-[#1E1B4B]/20" />
              <div className="absolute inset-5 border border-[#1E1B4B]/10" />
              
              <div className="h-full flex flex-col justify-between relative z-10">
                <div className="flex justify-between items-start">
                  <div className="w-16 h-16 bg-[#F97316] rounded-md flex items-center justify-center text-white font-display font-bold text-xl">HA</div>
                  <div className="w-20 h-20 border-4 border-slate-200 rounded-full flex items-center justify-center text-slate-300 font-bold text-xs text-center leading-none">LOGO<br/>BNSP</div>
                </div>
                
                <div className="text-center space-y-4">
                  <h3 className="font-display font-bold text-3xl sm:text-4xl text-[#1E1B4B] uppercase tracking-widest opacity-90">Sertifikat</h3>
                  <p className="text-slate-500 uppercase tracking-widest text-xs">Kompetensi Keahlian</p>
                  
                  <div className="py-4">
                    <p className="text-sm text-slate-600 mb-2">Diberikan kepada:</p>
                    <h4 className="font-display font-bold text-2xl text-slate-800 italic">Budi Santoso, S.T.</h4>
                    <div className="w-48 h-[1px] bg-slate-300 mx-auto mt-2" />
                  </div>
                  
                  <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                    Atas partisipasi dan kelulusannya dalam program <strong>Pelatihan Manajemen Proyek Lanjutan</strong> yang diselenggarakan pada 12-14 Agustus 2025.
                  </p>
                </div>
                
                <div className="flex justify-between items-end">
                  <div className="text-center">
                    <div className="w-24 h-12 bg-slate-100 rounded mb-2 border border-slate-200" />
                    <div className="w-24 h-[1px] bg-slate-800 mb-1" />
                    <p className="text-[10px] text-slate-800 font-bold">Direktur Utama</p>
                  </div>
                  <div className="w-16 h-16 bg-white border border-slate-200 p-1 rounded-sm shadow-sm">
                    <div className="w-full h-full bg-slate-800" style={{ backgroundImage: 'radial-gradient(white 15%, transparent 16%), radial-gradient(white 15%, transparent 16%)', backgroundSize: '4px 4px', backgroundPosition: '0 0, 2px 2px' }} />
                  </div>
                </div>
              </div>
              
              {/* Ribbon badge overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 opacity-10 pointer-events-none flex items-center justify-center">
                <Award className="w-full h-full text-[#1E1B4B]" />
              </div>
            </div>
            
            {/* Decor blob */}
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-[#F97316]/20 rounded-full blur-3xl -z-10" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
