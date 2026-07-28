"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

export function FaqSection() {
  const faqs = [
    {
      question: "Bagaimana metode pelatihan yang tersedia?",
      answer: "Kami menawarkan fleksibilitas dengan 4 metode utama: LMS Mandiri (self-paced learning), Kelas Online (via Zoom/Meet), Kelas Tatap Muka (in-house/offline), dan Hybrid (kombinasi online & offline)."
    },
    {
      question: "Apakah peserta akan mendapatkan sertifikat?",
      answer: "Ya. Setiap peserta yang menyelesaikan program dan lulus evaluasi akan mendapatkan sertifikat digital resmi yang dilengkapi dengan QR Code untuk verifikasi keaslian."
    },
    {
      question: "Apakah platform ini bisa digunakan khusus untuk internal perusahaan (B2B)?",
      answer: "Tentu. Kami menyediakan Corporate Portal khusus untuk HRD di mana Anda bisa mendaftarkan karyawan secara massal (bulk import), melacak progress mereka, dan mengunduh laporan performa secara realtime."
    },
    {
      question: "Apakah individu (B2C) juga bisa mendaftar program diklat?",
      answer: "Ya, profesional mandiri maupun mahasiswa dapat mendaftar langsung pada kelas-kelas publik kami melalui katalog program."
    },
    {
      question: "Apakah tersedia laporan dan analitik untuk manajemen HRD?",
      answer: "Ya. Platform kami dilengkapi dengan Analytics Dashboard yang menyajikan data realtime mulai dari tingkat kehadiran, penyelesaian kelas, hingga hasil post-test. Laporan dapat diunduh dalam format PDF maupun Excel."
    },
    {
      question: "Apakah kelas online sudah mendukung integrasi Zoom?",
      answer: "Sangat mendukung. Peserta hanya perlu klik tombol 'Masuk Kelas' langsung dari LMS tanpa perlu repot mencari link atau memasukkan meeting ID dan password secara manual. Kehadiran juga akan dicatat secara otomatis."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#1E1B4B] mb-6">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-slate-600 text-lg">
            Temukan jawaban atas pertanyaan umum seputar program diklat dan fitur platform kami.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" defaultValue="" className="w-full space-y-4">
          {faqs.map((faq, index) => {
            const itemValue = `item-${index}`;
            return (
              <AccordionItem 
                key={index} 
                value={itemValue}
                className="border border-slate-200 bg-white rounded-lg px-6 shadow-sm hover:border-[#F97316]/50 transition-all duration-200"
              >
                <AccordionTrigger value={itemValue} icon={undefined} className="text-left font-semibold text-slate-800 hover:text-[#F97316] hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent value={itemValue} className="text-slate-600 leading-relaxed pb-6 pt-2 border-t border-slate-100">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            );
            })}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
