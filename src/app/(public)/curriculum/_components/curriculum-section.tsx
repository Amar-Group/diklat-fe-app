"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  Award, 
  ArrowRight
} from "lucide-react";

export function CurriculumSection() {
  const [activeTab, setActiveTab] = useState<"pensiun" | "desa" | "asn">("pensiun");

  const curriculumTabs = [
    {
      id: "pensiun" as const,
      label: "Persiapan Pensiun",
      badge: "3 Hari Pelatihan",
      title: "Kurikulum Masa Persiapan Pensiun (MPP)",
      description: "Membantu pegawai PNS dan Swasta menghadapi purna tugas secara mandiri, sejahtera, dan produktif melalui kesiapan mental, finansial, serta kewirausahaan.",
      schedule: [
        {
          day: "Hari 1: Pembekalan & Perencanaan Keuangan",
          topics: [
            "Pembukaan & Kebijakan Masa Pensiun",
            "Perencanaan Keuangan Masa Pensiun (Financial Planning)",
            "Strategi Manajemen Tabungan & Bebas Hutang",
            "Psikologi Masa Purna Tugas"
          ]
        },
        {
          day: "Hari 2: Kewirausahaan & Manajemen UMKM",
          topics: [
            "Kiat Sukses Memulai UMKM & Bisnis Mandiri",
            "Legalitas & Pendirian Badan Usaha (PT/CV)",
            "Peluang Usaha Ekspor & Industri Kuliner",
            "Studi Lapangan / Kunjungan Wirausaha"
          ]
        },
        {
          day: "Hari 3: Kesehatan & Rencana Tindak Lanjut",
          topics: [
            "Kemitraan Pemodalan & Akses Pendanaan",
            "Mengelola Perubahan & Stress Management",
            "Pola Hidup Sehat & Kebugaran Lansia",
            "Penyusunan Rencana Tindak Lanjut (RTL) Realistis"
          ]
        }
      ]
    },
    {
      id: "desa" as const,
      label: "Aparatur Desa",
      badge: "4 Hari • 33 Modul",
      title: "Kurikulum Peningkatan Kapasitas Aparatur Desa",
      description: "Dirancang sesuai UU No. 6 Tahun 2014 tentang Desa untuk mewujudkan Desa Mandiri melalui penguatan tata kelola, administrasi, dan E-Government.",
      schedule: [
        {
          day: "Modul Utama 1: Perencanaan & Produk Hukum",
          topics: [
            "Penyusunan RPJM Desa & RKP Desa Terpadu",
            "Penyusunan Peraturan & Produk Hukum Desa",
            "Tata Kelola Penyelenggaraan Pemerintahan Desa",
            "Reformasi Institusi & Pelayanan Publik Desa"
          ]
        },
        {
          day: "Modul Utama 2: E-Government & Keuangan Desa",
          topics: [
            "Penerapan Aplikasi SISKEUDES (Keuangan Desa)",
            "Penerapan Aplikasi SIPADES (Aset Desa)",
            "Pengadaan Barang dan Jasa di Desa",
            "Sistem Informasi Desa & Data Terpadu (E-Gov)"
          ]
        },
        {
          day: "Modul Utama 3: Kepemimpinan & Kelembagaan",
          topics: [
            "Kepemimpinan & SOTK bagi Kepala Desa & BPD",
            "Penguatan Kelembagaan PKK, LPM, RT/RW, Posyandu",
            "Pemberdayaan Pemuda & Karang Taruna Desa",
            "Supervisi, Monitoring & Evaluasi Kinerja Desa"
          ]
        }
      ]
    },
    {
      id: "asn" as const,
      label: "Manajemen ASN & Teknis",
      badge: "Hybrid / Offline",
      title: "Kurikulum Manajemen ASN & Spesialisasi Teknis",
      description: "Program berbasis Standar Kompetensi Kerja Nasional Indonesia (SKKNI) untuk meningkatkan efisiensi dan kapabilitas profesional korporasi & pemerintah.",
      schedule: [
        {
          day: "Pilar 1: Manajemen ASN & Kepemimpinan",
          topics: [
            "Manajemen Kompetensi & Karier ASN",
            "Pelatihan Motivasi & Pengembangan Diri",
            "IT Governance, Public Relation & Public Speaking",
            "Manajemen Kompensasi Karyawan & Perusahaan"
          ]
        },
        {
          day: "Pilar 2: Teknologi Informasi & Aplikasi",
          topics: [
            "Pemrograman Website & Aplikasi Modern",
            "Multimedia, Database & System Analyst",
            "Keamanan Informasi & Tata Kelola IT",
            "Sertifikasi Kompetensi BNSP / Internal"
          ]
        },
        {
          day: "Pilar 3: Keuangan & Perpajakan",
          topics: [
            "Pelatihan Pajak Perusahaan (Brevet)",
            "Manajemen Akuntansi & Laporan Keuangan",
            "Auditing & Pengawasan Internal"
          ]
        }
      ]
    }
  ];

  const currentTab = curriculumTabs.find((t) => t.id === activeTab) || curriculumTabs[0];

  return (
    <section className="pt-28 pb-16 sm:pb-24 bg-[#FAFAF9] relative overflow-hidden">
      {/* Soft Background Accents */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[300px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10">
        
        {/* 1. Header Text (Top Centered) */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-8 sm:mb-12"
        >
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1E1B4B] mb-4 sm:mb-6 leading-tight">
            Kurikulum Pelatihan & Diklat
          </h1>
          <div className="h-1.5 w-24 bg-[#F97316] mx-auto rounded-full mb-6"></div>
          <p className="text-slate-600 text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
            Kurikulum kami secara khusus <strong className="text-slate-800 font-semibold">disesuaikan dengan jenis Pendidikan dan pelatihan yang berbasis kompetensi</strong> untuk memastikan setiap program memberikan keterampilan yang relevan dan dapat langsung diaplikasikan di dunia kerja.
          </p>
        </motion.div>

        {/* 2. Large Centered Illustration Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="w-full max-w-3xl lg:max-w-4xl mx-auto mb-12 sm:mb-16"
        >
          <motion.div 
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
            className="relative w-full aspect-[16/9] sm:aspect-[16/9] max-h-[480px] overflow-hidden"
          >
            <Image
              src="/assets/images/program/dikusi.webp"
              alt="Diskusi Kurikulum Pelatihan PT Harapan Amar Jaya"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
            />
          </motion.div>
        </motion.div>

        {/* 3. Interactive Program Navigation Tabs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 p-1.5 bg-slate-200/70 backdrop-blur rounded-2xl mb-10 mx-auto w-full sm:w-fit max-w-md sm:max-w-none">
          {curriculumTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full sm:w-auto text-center px-4 sm:px-6 py-3 sm:py-2.5 rounded-xl font-semibold text-sm sm:text-sm md:text-base transition-all duration-300 ${
                activeTab === tab.id
                  ? "bg-[#1E1B4B] text-white shadow-md"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 4. Curriculum Content Detail (Frameless Clean Minimal Layout) */}
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-200">
            <div>
              <span className="inline-block text-[#F97316] font-bold text-xs sm:text-sm tracking-wider uppercase mb-1">
                {currentTab.badge}
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#1E1B4B]">
                {currentTab.title}
              </h2>
            </div>
          </div>

          <p className="text-slate-600 text-base sm:text-lg mb-8 leading-relaxed">
            {currentTab.description}
          </p>

          {/* Schedule / Modules Grid */}
          <div className="space-y-5 sm:space-y-6">
            {currentTab.schedule.map((block, idx) => (
              <div 
                key={idx} 
                className="p-5 sm:p-6 rounded-2xl bg-white/80 border border-slate-200/80 hover:border-orange-300 transition-all duration-300 shadow-sm"
              >
                <h3 className="font-display font-bold text-base sm:text-lg text-[#1E1B4B] mb-3.5 flex items-center gap-3">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#F97316]" />
                  {block.day}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {block.topics.map((topic, tIdx) => (
                    <div key={tIdx} className="flex items-start gap-2.5 text-xs sm:text-sm md:text-base text-slate-700">
                      <CheckCircle2 className="h-4 sm:h-5 w-4 sm:w-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Action Footer */}
          <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-600 font-medium">
              <Award className="h-5 w-5 text-[#F97316]" />
              <span>Sertifikasi Berstandar Kerja Nasional & Internasional</span>
            </div>
            <Button className="w-full sm:w-auto bg-[#F97316] hover:bg-[#EA580C] text-white px-7 py-3 h-auto rounded-xl font-semibold text-sm sm:text-base shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5">
              Daftar Program Pelatihan <ArrowRight className="h-4.5 w-4.5" />
            </Button>
          </div>

        </div>

      </div>
    </section>
  );
}
