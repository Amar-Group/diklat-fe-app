"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Building2 } from "lucide-react";
import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-[#FAFAF9] relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Visual Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-2xl bg-slate-200 overflow-hidden relative z-10 shadow-lg">
              {/* Image Placeholder */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#1E1B4B]/80 to-transparent flex items-end p-8">
                <div className="text-white font-display font-bold text-2xl max-w-sm">
                  Berdedikasi untuk mencetak SDM unggul dan berdaya saing.
                </div>
              </div>
            </div>
            
            {/* Decor */}
            <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-[#F97316]/10 rounded-full z-0" />
            <div className="absolute -top-6 -right-6 w-full h-full border-2 border-slate-200 rounded-2xl z-0" />
            
            <div className="absolute -bottom-8 right-8 bg-white p-6 rounded-xl shadow-xl z-20 w-64 border border-slate-100">
              <div className="flex items-center gap-4 mb-2">
                <Building2 className="h-8 w-8 text-[#F97316]" />
                <div className="font-display font-bold text-2xl text-[#1E1B4B]">10+</div>
              </div>
              <div className="text-sm font-medium text-slate-600">
                Tahun pengalaman dalam penyelenggaraan pendidikan vokasi.
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-xl"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-6">
              <span className="text-sm font-semibold text-[#1E1B4B] tracking-wide uppercase">Tentang Kami</span>
            </div>
            
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#1E1B4B] mb-6 leading-tight">
              Mitra Terpercaya untuk Pengembangan Kompetensi SDM
            </h2>
            
            <p className="text-slate-600 mb-6 text-lg leading-relaxed">
              <strong className="text-slate-800">PT HARAPAN AMAR JAYA</strong> merupakan penyelenggara program pendidikan dan pelatihan yang berfokus pada peningkatan kompetensi sumber daya manusia.
            </p>
            
            <p className="text-slate-600 mb-10 text-lg leading-relaxed">
              Kami memadukan pendekatan teknologi melalui LMS yang handal, kelas tatap muka yang interaktif, serta program sertifikasi standar industri untuk memastikan setiap alumni siap menghadapi tantangan dunia kerja modern.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button className="bg-[#1E1B4B] hover:bg-[#312E81] text-white">
                Profil Perusahaan
              </Button>
              <Button variant="outline" className="text-slate-700 border-slate-300 hover:bg-slate-50 flex items-center gap-2">
                Hubungi Kami <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
