"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Award, ShieldCheck, GraduationCap, Briefcase, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

interface AboutSectionProps {
  /** Admin data photo URL */
  photoUrl?: string;
  /** Custom data container from admin */
  adminData?: {
    photoUrl?: string;
    leaderName?: string;
    leaderTitle?: string;
  };
}

export function AboutSection({ photoUrl, adminData }: AboutSectionProps = {}) {
  const displayPhotoUrl =
    adminData?.photoUrl ||
    photoUrl ||
    "/assets/images/profil/dirut-pak-amar.svg";

  const leaderName = adminData?.leaderName || "Drs Harun Arsyad, S.H, M.H.";
  const leaderTitle = adminData?.leaderTitle || "Direktur Utama (Purnabakti)";

  return (
    <section id="about" className="pt-24 sm:pt-22 lg:pt-20 pb-16 sm:pb-20 lg:pb-24 bg-[#FAFAF9] relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* Main Grid: Visual Left & Content Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16 lg:mb-20">

          {/* Visual Side (Left) - Clean & Structured */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 w-full"
          >
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-md overflow-hidden">
              {/* Photo Container */}
              <div className="relative h-[280px] sm:h-[500px] lg:h-[500px] w-full bg-slate-900 overflow-hidden">
                <Image
                  src={displayPhotoUrl}
                  alt={leaderName}
                  fill
                  className="object-cover object-top"
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>

              {/* Leader Info Card Footer */}
              <div className="p-5 sm:p-6 bg-white border-t border-slate-100 flex items-center justify-between gap-4">
                <div>
                  <h4 className="font-display font-bold text-base sm:text-lg text-[#1E1B4B] leading-tight">
                    {leaderName}
                  </h4>
                  <p className="text-xs sm:text-sm font-medium text-[#F97316] mt-1">
                    ({leaderTitle})
                  </p>
                </div>
                <div className="px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-950 font-bold text-xs shrink-0">
                  31+ Thn Pengabdian
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Side (Right) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1E1B4B] mb-6 leading-tight">
              Mitra Terpercaya untuk Pengembangan Kompetensi SDM
            </h2>

            {/* 1 Row 2 Columns: Column 1 Description (Left) & Column 2 Logo (Right, Larger & Responsive) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-center mb-8">
              {/* Column 1 (Left): Company Description Text */}
              <div className="md:col-span-7 lg:col-span-8 order-2 md:order-1">
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                  <strong className="text-slate-900 font-semibold">PT HARAPAN AMAR JAYA</strong> adalah Badan Hukum yang bergerak dalam Penyedia Sumber Daya Manusia dan Manajemen Fungsi Sumber Daya Manusia, Pelatihan Kerja Teknologi Informasi dan Komunikasi Perusahaan, Pelatihan Kerja Bisnis dan Manajemen Perusahaan, Pelatihan Kerja Perusahaan Lainnya, serta Pendidikan dan Pelatihan Pemerintah.
                </p>
              </div>

              {/* Column 2 (Right): Company Logo (Frameless, Larger, Responsive) */}
              <div className="md:col-span-5 lg:col-span-4 flex justify-center md:justify-end order-1 md:order-2">
                <div className="relative w-full max-w-[200px] sm:max-w-[280px] md:max-w-[440px] lg:max-w-[500px]">
                  <Image
                    src="/assets/brand/PT-Harapan-Amar-clear.svg"
                    alt="PT Harapan Amar Jaya Logo"
                    width={400}
                    height={150}
                    className="w-full h-auto object-contain"
                    priority
                  />
                </div>
              </div>
            </div>

            <div className="mb-8 space-y-4 border-t border-slate-200/80 pt-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#F97316] shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-[#1E1B4B] text-base sm:text-lg mb-1">
                    Visi
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    Menjadi lembaga pelatihan terdepan yang menghasilkan sumber daya manusia kompeten, kreatif, dan berdaya saing tinggi.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#1E1B4B] shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-[#1E1B4B] text-base sm:text-lg mb-1">
                    Misi
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    Menyelenggarakan program pelatihan berkualitas sesuai standar industri, membekali peserta dengan keterampilan praktis, dan memperluas jaringan penempatan kerja.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button className="bg-[#1E1B4B] hover:bg-[#312E81] text-white px-6 py-2.5 rounded-xl shadow-sm">
                Profil Perusahaan
              </Button>
              <Button variant="outline" className="text-slate-700 border-slate-300 hover:bg-slate-50 flex items-center gap-2 px-6 py-2.5 rounded-xl">
                Hubungi Kami <ArrowRight className="h-4 w-4 text-[#F97316]" />
              </Button>
            </div>
          </motion.div>

        </div>

        {/* Dedicated Profile Section: Drs. Harun Arsyad, S.H, M.H. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-md"
        >
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-xl bg-[#1E1B4B] text-white shrink-0">
                <Award className="h-6 w-6 text-[#F97316]" />
              </div>
              <div>
                <span className="text-xs font-bold text-[#F97316] uppercase tracking-wider block">Profil Direktur Utama</span>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#1E1B4B]">
                  Drs. Harun Arsyad, S.H, M.H.
                </h3>
                <p className="text-xs sm:text-sm font-medium text-slate-500">
                  Direktur Utama (Purnabakti WIDYAISWARA AHLI UTAMA)
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-900 text-xs font-semibold border border-indigo-100">
                <ShieldCheck className="h-3.5 w-3.5 text-[#F97316]" /> 31+ Tahun Pengabdian ASN
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-50 text-orange-900 text-xs font-semibold border border-orange-100">
                <GraduationCap className="h-3.5 w-3.5 text-[#F97316]" /> Alumni IMMIM & UMI
              </span>
            </div>
          </div>

          {/* Profile Detailed Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Profile Narrative Sentences */}
            <div className="lg:col-span-7 space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
              <p>
                <span className="px-1.5 py-0.5 bg-indigo-100/90 text-[#1E1B4B] font-bold rounded-md border border-indigo-200/70 inline-block my-0.5">Drs. Harun Arsyad, S.H, M.H.</span> lahir di Makassar pada 07 Juni 1961, merupakan putra dari pasangan M. Arsyad Atu dan Hj. Siti Aisyah yang berasal dari <span className="px-1.5 py-0.5 bg-slate-100 text-slate-800 font-semibold rounded-md inline-block my-0.5">Desa Lamakera, Flores Timur</span>. Tumbuh di lingkungan PNS TNI AL Makassar, nilai-nilai disiplin tinggi dan fondasi keislaman yang kental telah tertanam sejak usia dini.
              </p>
              <p>
                Beliau menempuh pendidikan 6 tahun di <span className="px-1.5 py-0.5 bg-amber-100/90 text-amber-950 font-semibold rounded-md border border-amber-200/70 inline-block my-0.5">Pesantren Modern Pendidikan Al-Quran IMMIM Makassar</span>, dilanjutkan studi Sarjana di <span className="px-1.5 py-0.5 bg-amber-100/90 text-amber-950 font-semibold rounded-md border border-amber-200/70 inline-block my-0.5">Fakultas Hukum & Fakultas Syariah Universitas Muslim Indonesia (UMI) Makassar</span>. Semasa muda, beliau sangat aktif membina organisasi kepemudaan (KNPI, AMPI, FKPPI, Remaja Masjid) hingga dipercaya sebagai Pimpinan Kampus Pesantren IMMIM (1990–1995).
              </p>
              <p>
                Mengabdi sebagai Pegawai Negeri Sipil selama <span className="px-1.5 py-0.5 bg-orange-100 text-orange-950 font-bold rounded-md border border-orange-200/80 inline-block my-0.5">31 tahun 4 bulan</span>, perjalanan karir beliau dihiasi pengalaman kepemimpinan yang sangat kaya baik di jabatan struktural maupun fungsional kedinasan (termasuk sebagai <span className="px-1.5 py-0.5 bg-indigo-100/90 text-[#1E1B4B] font-semibold rounded-md border border-indigo-200/70 inline-block my-0.5">Widyaiswara Ahli Utama (Purnabakti)</span>). Dedikasi dan keahlian beliau dalam menyelenggarakan diklat, bimtek, serta karya ilmiah menjadi pilar utama dalam pengembangan standar kompetensi SDM di institusi kami.
              </p>
            </div>

            {/* Career Highlights Cards */}
            <div className="lg:col-span-5 bg-slate-50 p-5 sm:p-6 rounded-xl border border-slate-200/80 space-y-4">
              <h4 className="font-display font-bold text-base text-[#1E1B4B] flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-[#F97316]" />
                Rekam Jejak Karir Strategis
              </h4>

              <ul className="space-y-2.5 text-xs sm:text-sm">
                <li className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-200/60 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#F97316] mt-1.5 shrink-0" />
                  <div>
                    <span className="font-bold text-[#1E1B4B]">Widyaiswara Ahli Utama (Purnabakti)</span>
                    <p className="text-slate-500 text-xs">Pangkat Pembina Utama IV/e</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-200/60 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#1E1B4B] mt-1.5 shrink-0" />
                  <div>
                    <span className="font-bold text-[#1E1B4B]">Kepala Kantor Regional IV BKN Makassar</span>
                    <p className="text-slate-500 text-xs">Mengawasi & Mengelola Manajerial Regional (2019 – 2021)</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-200/60 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#1E1B4B] mt-1.5 shrink-0" />
                  <div>
                    <span className="font-bold text-[#1E1B4B]">Direktur Status & Kedudukan Pegawai BKN</span>
                    <p className="text-slate-500 text-xs">Direktorat Jakarta (2018)</p>
                  </div>
                </li>
                <li className="flex items-start gap-3 bg-white p-3 rounded-xl border border-slate-200/60 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#1E1B4B] mt-1.5 shrink-0" />
                  <div>
                    <span className="font-bold text-[#1E1B4B]">Kepala Pusat Konsultasi Bantuan Hukum BKN</span>
                    <p className="text-slate-500 text-xs">Jabatan Pimpinan Tinggi Pratama (2016 – 2018)</p>
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}

