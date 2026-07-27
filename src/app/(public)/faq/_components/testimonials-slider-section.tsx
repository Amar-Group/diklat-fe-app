"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselSlide } from "@/components/ui/carousel";
import { Quote, ArrowRight, HelpCircle, Star, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function TestimonialsSliderSection() {
  const testimonials = [
    {
      name: "Andi Wijaya",
      position: "HR Manager",
      company: "PT Global Infrastruktur",
      rating: 5,
      text: "Platform ini sangat membantu tim HRD dalam melacak progress ribuan karyawan kami di seluruh site. Integrasinya luar biasa mulus dan laporannya sangat detail.",
    },
    {
      name: "Siti Nurhaliza",
      position: "Peserta Diklat",
      company: "Dinas Pendidikan Daerah",
      rating: 5,
      text: "LMS-nya sangat interaktif. Saya suka fitur anti-skip karena memastikan kita benar-benar menyimak. Download sertifikat digitalnya juga super cepat setelah lulus post-test.",
    },
    {
      name: "Budi Setiawan",
      position: "Instruktur Senior",
      company: "Asosiasi Profesional Manajemen",
      rating: 5,
      text: "Sebagai instruktur, fitur absensi QR code sangat menghemat waktu di kelas tatap muka. Saya bisa lebih fokus menyampaikan materi daripada sibuk mengabsen satu per satu.",
    },
    {
      name: "Ratna Sari",
      position: "Direktur Operasional",
      company: "BPR Sejahtera",
      rating: 5,
      text: "Program Hybrid Learning dari Harapan Amar benar-benar solusi di masa kini. Karyawan kami bisa belajar teori via LMS di waktu luang, lalu praktik di akhir pekan.",
    }
  ];

  return (
    <div className="w-full">
      {/* SECTION 1: QnA Hero Banner (2 Columns 40:60 Ratio with qna.webp Illustration) */}
      <section className="pt-28 pb-16 sm:pb-20 bg-[#FAFAF9] relative overflow-hidden">
        {/* Background Soft Accents */}
        <div className="absolute top-10 right-0 w-[500px] h-[500px] bg-[#1E1B4B]/5 rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="absolute bottom-0 -left-20 w-[400px] h-[400px] bg-[#F97316]/5 rounded-full blur-3xl pointer-events-none -z-0" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: QnA Text Content (40% -> lg:col-span-5) */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 flex flex-col justify-center"
            >
              <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1E1B4B] mb-5 leading-tight">
                Punya Pertanyaan Seputar Diklat?
              </h1>

              <div className="h-1.5 w-20 bg-[#F97316] rounded-full mb-6" />

              <p className="text-slate-600 text-base sm:text-lg mb-8 leading-relaxed">
                Kami memahami bahwa memilih program pelatihan yang tepat memerlukan kejelasan. Temukan jawaban cepat di bawah ini atau konsultasikan kebutuhan spesifik instansi Anda bersama tim ahli kami.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Button className="bg-[#F97316] hover:bg-[#EA580C] text-white px-6 py-3 h-auto rounded-xl font-semibold shadow-md shadow-orange-500/20 flex items-center gap-2 group transition-all">
                  Tanyakan Langsung <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </motion.div>

            {/* Right Column: QnA Illustration Image qna.webp (60% -> lg:col-span-7) */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-7 flex justify-center items-center w-full"
            >
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
                className="relative w-full aspect-[16/10] max-h-[480px] rounded-2xl overflow-hidden"
              >
                <Image
                  src="/assets/images/program/qna.webp"
                  alt="Ilustrasi Pertanyaan & QnA Pelatihan Diklat"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </motion.div>
            </motion.div>

          </div>
        </div>

        {/* Abstract SVG Wave/Pattern Divider between Section 1 & Section 2 */}
        <div className="w-full relative mt-12 sm:mt-16 overflow-hidden pointer-events-none">
          <svg 
            viewBox="0 0 1200 80" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className="w-full h-10 sm:h-14 lg:h-16 opacity-90"
            preserveAspectRatio="none"
          >
            <path 
              d="M0,0 C300,60 600,10 900,50 C1050,70 1150,20 1200,30 L1200,80 L0,80 Z" 
              fill="url(#qna-abstract-gradient)"
            />
            <path 
              d="M0,20 C400,80 700,30 1000,70 C1100,80 1170,40 1200,50" 
              stroke="url(#qna-stroke-gradient)"
              strokeWidth="2.5"
              strokeDasharray="6 6"
            />
            <defs>
              <linearGradient id="qna-abstract-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1E1B4B" stopOpacity="0.05" />
                <stop offset="50%" stopColor="#F97316" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0.04" />
              </linearGradient>
              <linearGradient id="qna-stroke-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1E1B4B" stopOpacity="0.25" />
                <stop offset="50%" stopColor="#F97316" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0.15" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>

      {/* SECTION 2: Testimonials Slider Section ("Dipercaya Oleh Profesional") */}
      <section id="testimonials" className="py-20 sm:py-24 bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-14"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1E1B4B] mb-5 leading-tight">
              Dipercaya Oleh Profesional & Mitra
            </h2>
            <div className="h-1.5 w-20 bg-[#F97316] mx-auto rounded-full mb-6" />
            <p className="text-slate-600 text-base sm:text-lg md:text-xl leading-relaxed">
              Dengarkan pengalaman langsung dari para mitra korporasi, peserta diklat, dan instruktur yang telah berkembang bersama layanan kami.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative max-w-4xl mx-auto px-2 sm:px-8"
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
                    <Card className="h-full bg-slate-50/80 border-slate-200/90 shadow-sm hover:shadow-lg transition-all duration-300 relative overflow-hidden rounded-3xl">
                      <CardContent className="p-6 sm:p-10 flex flex-col h-full">
                        <Quote className="h-12 w-12 text-[#F97316] opacity-15 absolute top-6 right-6" />
                        
                        {/* Rating Stars */}
                        <div className="flex items-center gap-1 mb-6 text-amber-400">
                          {[...Array(testimonial.rating)].map((_, rIdx) => (
                            <Star key={rIdx} className="h-4 w-4 fill-amber-400" />
                          ))}
                        </div>

                        <p className="text-slate-700 italic mb-8 relative z-10 flex-1 leading-relaxed text-base sm:text-lg">
                          "{testimonial.text}"
                        </p>
                        
                        <div className="flex items-center gap-4 mt-auto border-t border-slate-200/70 pt-6">
                          <div className="h-12 w-12 rounded-full bg-[#1E1B4B] text-white flex items-center justify-center font-display font-bold text-base shadow-sm">
                            {testimonial.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-bold text-[#1E1B4B] text-base">{testimonial.name}</h4>
                            <p className="text-xs sm:text-sm text-slate-500">{testimonial.position}, {testimonial.company}</p>
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
    </div>
  );
}
