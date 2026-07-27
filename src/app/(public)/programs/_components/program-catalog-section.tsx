"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Award, ArrowRight, BookOpen, CheckCircle2, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ProgramDetailModal, ProgramDetailData } from "@/components/shared/program-detail-modal";

const PROGRAM_LIST: ProgramDetailData[] = [
  {
    id: "pensiun",
    title: "Pelatihan Persiapan Pensiun / Pra-Pensiun",
    category: "Pengembangan SDM & Purna Tugas",
    duration: "3 Hari",
    method: "Public / Hybrid / In-House",
    certification: "BNSP / Sertifikat Digital",
    price: "Rp 5.500.000 / orang",
    image: "/assets/images/program/Solusi-PNS.webp",
    overview: "Pelatihan Masa Persiapan Pensiun bertujuan membantu pegawai (PNS/BUMN/Swasta) menghadapi masa purna tugas secara optimal agar tetap sejahtera, mandiri, dan bermakna. Persiapan idealnya dilakukan 5-10 tahun sebelum batas usia pensiun.",
    objectives: [
      "Membangun kesiapan mental dan emosional menghadapi masa purna tugas",
      "Memberikan pemahaman pengelolaan keuangan dan investasi yang aman",
      "Mendorong produktivitas melalui wirausaha, UMKM & kegiatan sosial",
      "Meningkatkan kesadaran kesehatan fisik dan psikologis di usia lanjut",
      "Menyusun Rencana Tindak Lanjut (RTL) wirausaha yang realistis"
    ],
    scheduleLocations: [
      { city: "Jakarta", date: "26 - 28 Agustus 2026" },
      { city: "Yogyakarta", date: "23 - 25 September 2026" },
      { city: "Makassar", date: "21 - 23 Oktober 2026" },
      { city: "Bandung", date: "18 - 20 November 2026" }
    ],
    curriculum: [
      "Hari 1: Pembukaan, Kebijakan Pensiun, Perencanaan Keuangan (Financial Planning), Manajemen Tabungan & Bebas Hutang",
      "Hari 2: Kiat UMKM, Pendirian PT/CV, Usaha Ekspor & Peluang Usaha Kuliner",
      "Hari 3: Kemitraan Pemodalan, Stress Management & Adaptasi Perubahan, Pola Hidup Sehat Lansia & Rencana Tindak Lanjut (RTL)"
    ],
    contactPersons: [
      { name: "Siti Adinda Dewi Saraswati, S.H., M.K.n", phone: "0877-8624-2517" },
      { name: "Siti Nurul Azizah, S.H", phone: "0859-5991-0075" },
      { name: "Siti Azzahrah Nur Fadhilah", phone: "0819-1733-4442" }
    ],
    organizer: "PT Harapan Amar Jaya"
  },
  {
    id: "aparatur-desa",
    title: "Pelatihan Peningkatan Kapasitas Aparatur Desa",
    category: "Pemerintahan & Otonomi Desa",
    duration: "4 Hari",
    method: "Tatap Muka / Hybrid / In-House",
    certification: "BNSP / Sertifikat Digital",
    price: "Rp 5.500.000 / orang",
    image: "/assets/images/program/Solusi.webp",
    overview: "Peningkatan kapasitas aparatur desa yang mencakup pengembangan sumber daya manusia, penguatan organisasi, dan reformasi institusi agar tata kelola administrasi dan pelayanan publik berjalan mandiri dan akuntabel sesuai UU No. 6 Tahun 2014 & RPJMN.",
    regulations: [
      "Undang-Undang Nomor 6 Tahun 2014 tentang Desa",
      "Peraturan Pemerintah Nomor 43 Tahun 2014 (dan Perubahannya)",
      "Permendagri No. 83/2015 & Permendagri No. 67/2017 tentang Pengangkatan & Pemberhentian Perangkat Desa"
    ],
    objectives: [
      "Perbaikan kinerja pemerintah desa melalui sistem peningkatan kapasitas berbasis kebutuhan",
      "Penguatan sistem pendampingan untuk meningkatkan partisipasi masyarakat dalam pembangunan desa",
      "Penguatan sistem informasi & data desa berbasis teknologi (E-Government, SISKEUDES & SIPADES)"
    ],
    scheduleNote: "Pelaksanaan direncanakan tahun 2026 - 2027. Tempat pelaksanaan disesuaikan dengan permintaan/kebutuhan lokasi instansi.",
    curriculum: [
      "Penyusunan RPJM Desa, RKP Desa & Produk Hukum Desa",
      "Tata Kelola Penyelenggaraan Pemerintahan & Administrasi Desa",
      "Kepemimpinan & SOTK Pemerintahan Desa bagi Kepala Desa & BPD",
      "Manajemen Keuangan Desa, Aset Desa & Pengadaan Barang/Jasa",
      "Aplikasi SISKEUDES & SIPADES bagi Perangkat Desa",
      "Penguatan Kelembagaan PKK, LPM, RT, Posyandu & Karang Taruna"
    ],
    organizer: "PT Harapan Amar Jaya",
    picPerson: "Drs. Harun Arsyad, S.H, M.H (Direktur Utama)"
  }
];

export function ProgramCatalogSection() {
  const router = useRouter();
  const [selectedProgram, setSelectedProgram] = useState<ProgramDetailData | null>(null);

  const handleRegister = () => {
    router.push("/admin");
  };

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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-[#F97316] font-semibold text-xs mb-3 w-fit">
              <BookOpen className="w-3.5 h-3.5" /> Program Unggulan Diklat
            </span>

            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1E1B4B] mb-5 leading-tight">
              Katalog Program Pelatihan
            </h2>

            <p className="text-slate-600 text-base sm:text-lg mb-8 leading-relaxed">
              Beragam pilihan program diklat berkualitas yang disusun berdasarkan standar kompetensi kerja nasional (SKKNI) dan regulasi pemerintah untuk penguatan SDM instansi dan korporasi.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button 
                onClick={handleRegister}
                className="bg-[#F97316] hover:bg-[#EA580C] text-white px-6 py-3 h-auto rounded-xl font-semibold shadow-md shadow-orange-500/20 flex items-center gap-2 group transition-all"
              >
                Daftar Pelatihan Sekarang 
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

      {/* Abstract SVG Wave/Pattern Divider */}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {PROGRAM_LIST.map((program) => (
            <motion.div 
              key={program.id} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
            >
              {/* Card Image */}
              <div className="h-56 w-full relative overflow-hidden bg-slate-900">
                <Image
                  src={program.image}
                  alt={program.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/20 to-transparent" />
                <Badge className="absolute top-4 left-4 bg-white/95 text-slate-800 hover:bg-white border-0 shadow-md font-semibold">
                  {program.category}
                </Badge>
                <span className="absolute bottom-3 right-4 bg-[#F97316] text-white px-3 py-1 rounded-lg text-xs font-bold shadow">
                  {program.price}
                </span>
              </div>
              
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-bold text-xl text-[#1E1B4B] mb-3 leading-snug group-hover:text-[#F97316] transition-colors">
                    {program.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mb-6 line-clamp-3 leading-relaxed">
                    {program.overview}
                  </p>
                </div>
                
                <div className="space-y-2.5 mb-6 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-600">
                    <Clock className="h-4 w-4 text-[#F97316] shrink-0" />
                    <span><strong>Durasi:</strong> {program.duration}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-600">
                    <MapPin className="h-4 w-4 text-[#F97316] shrink-0" />
                    <span><strong>Metode:</strong> {program.method}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-600">
                    <Award className="h-4 w-4 text-[#F97316] shrink-0" />
                    <span><strong>Sertifikat:</strong> {program.certification}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 pt-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedProgram(program)}
                    className="flex-1 border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold"
                  >
                    Detail
                  </Button>
                  <Button 
                    onClick={handleRegister}
                    className="flex-1 bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold shadow-md shadow-orange-500/20"
                  >
                    Daftar
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Program Detail Modal */}
      <ProgramDetailModal
        program={selectedProgram}
        open={selectedProgram !== null}
        onClose={() => setSelectedProgram(null)}
      />

      {/* Abstract SVG Bottom Curve */}
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
