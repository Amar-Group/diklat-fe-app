"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Award, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function ProgramCatalogSection() {
  const programs = [
    {
      title: "Manajemen ASN",
      duration: "3 Hari",
      method: "Hybrid",
      certification: "BNSP / Internal",
      category: "Manajemen",
      image: "bg-slate-200"
    },
    {
      title: "Pelatihan Pra Pensiun",
      duration: "5 Hari",
      method: "Offline",
      certification: "Sertifikat",
      category: "Pengembangan Diri",
      image: "bg-slate-200"
    },
    {
      title: "Pelatihan kapasitas Perangkat Desa",
      duration: "4 Hari",
      method: "Offline",
      certification: "Sertifikat",
      category: "Pemerintahan",
      image: "bg-slate-200"
    },
    {
      title: "Pemrograman Website & Aplikasi",
      duration: "2 Bulan",
      method: "LMS Mandiri",
      certification: "BNSP",
      category: "IT & Komputer",
      image: "bg-slate-200"
    },
    {
      title: "Pelatihan Motivasi dan Pengembangan diri, pengembangan karier",
      duration: "2 Hari",
      method: "Online",
      certification: "Internal",
      category: "Pengembangan Diri",
      image: "bg-slate-200"
    },
    {
      title: "Pelatihan Programming, Multimedia, data base dan system analyst",
      duration: "3 Bulan",
      method: "Hybrid",
      certification: "BNSP",
      category: "IT & Komputer",
      image: "bg-slate-200"
    },
    {
      title: "Pelatihan IT Governance, Public Relation, Publik Speaking",
      duration: "4 Hari",
      method: "Hybrid",
      certification: "Sertifikat",
      category: "Komunikasi",
      image: "bg-slate-200"
    },
    {
      title: "Pelatihan kompensasi Perusahaan/karyawan",
      duration: "3 Hari",
      method: "Online",
      certification: "Sertifikat",
      category: "HR & Bisnis",
      image: "bg-slate-200"
    },
    {
      title: "Pelatihan Pajak Perusahaan",
      duration: "5 Hari",
      method: "Offline",
      certification: "Brevet",
      category: "Keuangan",
      image: "bg-slate-200"
    }
  ];

  return (
    <section id="programs" className="py-24 bg-[#FAFAF9]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div className="max-w-2xl">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#1E1B4B] mb-4">
              Katalog Program Pelatihan
            </h2>
            <p className="text-slate-600 text-lg">
              Beragam pilihan program diklat berkualitas yang disusun berdasarkan standar kompetensi kerja nasional dan internasional.
            </p>
          </div>
          <Button variant="outline" className="border-slate-300 text-slate-700 hover:bg-slate-50 flex items-center gap-2">
            Lihat Semua Program <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>

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
    </section>
  );
}
