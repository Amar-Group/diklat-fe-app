"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselSlide } from "@/components/ui/carousel";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

export function TestimonialsSliderSection() {
  const testimonials = [
    {
      name: "Andi Wijaya",
      position: "HR Manager",
      company: "PT Global Infrastruktur",
      text: "Platform ini sangat membantu tim HRD dalam melacak progress ribuan karyawan kami di seluruh site. Integrasinya luar biasa mulus dan laporannya sangat detail.",
    },
    {
      name: "Siti Nurhaliza",
      position: "Peserta Diklat",
      company: "Dinas Pendidikan Daerah",
      text: "LMS-nya sangat interaktif. Saya suka fitur anti-skip karena memastikan kita benar-benar menyimak. Download sertifikat digitalnya juga super cepat setelah lulus post-test.",
    },
    {
      name: "Budi Setiawan",
      position: "Instruktur Senior",
      company: "Asosiasi Profesional Manajemen",
      text: "Sebagai instruktur, fitur absensi QR code sangat menghemat waktu di kelas tatap muka. Saya bisa lebih fokus menyampaikan materi daripada sibuk mengabsen satu per satu.",
    },
    {
      name: "Ratna Sari",
      position: "Direktur Operasional",
      company: "BPR Sejahtera",
      text: "Program Hybrid Learning dari Harapan Amar benar-benar solusi di masa kini. Karyawan kami bisa belajar teori via LMS di waktu luang, lalu praktik di akhir pekan.",
    }
  ];

  return (
    <section id="testimonials" className="py-24 bg-[#FAFAF9]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#1E1B4B] mb-6">
            Dipercaya Oleh Profesional
          </h2>
          <p className="text-slate-600 text-lg">
            Dengarkan pengalaman langsung dari para mitra korporasi, peserta, dan instruktur yang telah menggunakan layanan kami.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-3xl mx-auto px-4 sm:px-10"
        >
          <Carousel
            showArrows={true}
            showDots={true}
            loop={true}
            className="w-full pb-12"
          >
            {testimonials.map((testimonial, index) => (
              <CarouselSlide key={index}>
                <div className="p-2 h-full">
                  <Card className="h-full bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow relative">
                    <CardContent className="p-6 sm:p-10 flex flex-col h-full">
                      <Quote className="h-10 w-10 text-[#F97316] opacity-20 absolute top-6 right-6" />
                      
                      <p className="text-slate-700 italic mb-8 relative z-10 flex-1 leading-relaxed text-base sm:text-lg">
                        "{testimonial.text}"
                      </p>
                      
                      <div className="flex items-center gap-4 mt-auto border-t border-slate-100 pt-6">
                        <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center font-display font-bold text-slate-500">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-bold text-[#1E1B4B] text-sm">{testimonial.name}</h4>
                          <p className="text-xs text-slate-500">{testimonial.position}, {testimonial.company}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselSlide>
            ))}
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}
