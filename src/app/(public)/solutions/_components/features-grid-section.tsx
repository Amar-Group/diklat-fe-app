"use client";

import { QrCode, ShieldAlert, Video, Award, BarChart3, Building, FileSpreadsheet, MessageSquareQuote } from "lucide-react";
import { motion } from "framer-motion";

export function FeaturesGridSection() {
  const features = [
    {
      icon: QrCode,
      title: "QR Attendance",
      desc: "Absensi tatap muka lebih cepat dan akurat dengan sistem pemindaian QR Code peserta."
    },
    {
      icon: ShieldAlert,
      title: "LMS Anti-Skip",
      desc: "Sistem pengawasan cerdas memastikan video materi wajib ditonton hingga selesai oleh peserta."
    },
    {
      icon: Video,
      title: "Zoom Integration",
      desc: "Masuk ruang kelas virtual langsung dengan satu klik tanpa perlu mencari link terpisah."
    },
    {
      icon: Award,
      title: "Digital Certificate",
      desc: "Pembuatan sertifikat otomatis dengan QR verifikasi yang tervalidasi setelah lulus."
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      desc: "Pantau keseluruhan data performa dan engagement secara visual dan real-time."
    },
    {
      icon: Building,
      title: "Corporate Portal",
      desc: "Portal khusus berdedikasi bagi HRD untuk memanajemen staf perusahaannya."
    },
    {
      icon: FileSpreadsheet,
      title: "Bulk Import",
      desc: "Daftarkan ratusan peserta sekaligus hanya dengan mengunggah satu file Excel."
    },
    {
      icon: MessageSquareQuote,
      title: "Evaluation System",
      desc: "Modul survei dan pengumpulan testimoni digital pasca pelaksanaan pelatihan."
    }
  ];

  return (
    <section className="py-24 bg-[#FAFAF9]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#1E1B4B] mb-6">
            Fitur Unggulan Platform
          </h2>
          <p className="text-slate-600 text-lg">
            Dilengkapi dengan teknologi terkini untuk meminimalisir proses manual dan memaksimalkan pengalaman belajar mengajar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-12 w-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-5 group-hover:bg-[#F97316] transition-colors duration-300">
                <feature.icon className="h-6 w-6 text-[#1E1B4B] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#1E1B4B] mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
