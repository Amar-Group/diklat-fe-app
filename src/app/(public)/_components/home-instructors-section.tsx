"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, ShieldCheck, UserCheck } from "lucide-react";
import { motion } from "framer-motion";

export function HomeInstructorsSection() {
  const highlights = [
    {
      icon: ShieldCheck,
      title: "Widyaiswara Ahli BKN & Pemerintah",
      desc: "Pengajar senior berpengalaman dari BKN dan kementerian terkait.",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-100",
      iconColor: "text-emerald-600"
    },
    {
      icon: GraduationCap,
      title: "Akademisi PTN/PTS Terkemuka",
      desc: "Dosen & peneliti senior bersertifikat pendidik nasional.",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-100",
      iconColor: "text-indigo-600"
    },
    {
      icon: UserCheck,
      title: "Praktisi & Konsultan Industri",
      desc: "Ekspert profesional dengan pengalaman menangani studi kasus nyata.",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-100",
      iconColor: "text-[#F97316]"
    }
  ];

  return (
    <section className="pt-20 sm:pt-24 pb-16 sm:pb-20 bg-white relative overflow-hidden">
      {/* Soft Background Accents */}
      <div className="absolute top-10 left-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 right-0 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* Main 2 Columns Layout (60:40 Ratio - Image Left, Content Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: core-Instuktur.webp Illustration (60% -> lg:col-span-7) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 flex justify-center items-center w-full relative order-2 lg:order-1"
          >
            {/* Ambient Soft Glow Behind Image */}
            <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-r from-indigo-500/15 via-orange-500/20 to-indigo-500/15 rounded-3xl blur-3xl opacity-80 pointer-events-none" />

            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              className="relative w-full aspect-[16/11] max-h-[520px] overflow-hidden"
            >
              <Image
                src="/assets/images/profil/instruktur/core-Instuktur.webp"
                alt="Pengajar & Nara Sumber PT Harapan Amar Jaya"
                fill
                className="object-contain drop-shadow-xl"
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
            </motion.div>
          </motion.div>

          {/* Right Column: Text Content & Highlights (40% -> lg:col-span-5) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col justify-center order-1 lg:order-2"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1E1B4B] mb-4 leading-tight">
              Diampu oleh Widyaiswara & Pakar Berpengalaman
            </h2>

            <div className="h-1.5 w-20 bg-[#F97316] rounded-full mb-6" />

            <p className="text-slate-600 text-base sm:text-lg mb-8 leading-relaxed">
              Kualitas diklat terjamin melalui bimbingan langsung narasumber tersertifikasi yang ahli dalam bidang pemerintahan, teknologi, manajemen, dan hukum.
            </p>

            {/* Highlights List */}
            <div className="space-y-4 mb-8">
              {highlights.map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-4 rounded-2xl bg-[#FAFAF9] border border-slate-200/80 shadow-sm flex items-start gap-4 hover:border-indigo-200 hover:shadow-md transition-all duration-300"
                >
                  <div className={`shrink-0 h-10 w-10 sm:h-11 sm:w-11 rounded-xl ${item.bgColor} ${item.borderColor} border flex items-center justify-center`}>
                    <item.icon className={`h-5 w-5 sm:h-5.5 sm:w-5.5 ${item.iconColor}`} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-[#1E1B4B] mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link href="/instructors" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-[#1E1B4B] hover:bg-[#312E81] text-white px-7 py-3 h-auto rounded-xl font-semibold text-sm sm:text-base shadow-lg shadow-indigo-950/20 flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5">
                  Jelajahi Profil Pengajar <ArrowRight className="h-4.5 w-4.5" />
                </Button>
              </Link>
            </div>
          </motion.div>

        </div>

      </div>

      {/* Smooth Solid Wave Transitioning directly into FinalCtaSection (#1E1B4B) */}
      <div className="w-full overflow-hidden leading-none pointer-events-none mt-16 sm:mt-24 -mb-20">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-10 sm:h-14 lg:h-16 text-[#1E1B4B] fill-current"
        >
          <path d="M0,0 Q600,60 1200,0 L1200,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  );
}
