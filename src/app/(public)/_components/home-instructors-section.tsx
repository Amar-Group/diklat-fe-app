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
      title: "Widyaiswara Ahli & Kedinasan",
      desc: "Pengajar senior berpengalaman dari kementerian dan instansi terkait.",
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
    <section className="pt-14 sm:pt-18 lg:pt-20 pb-14 sm:pb-16 bg-white relative overflow-hidden">
      {/* Soft Background Accents */}
      <div className="absolute top-10 left-0 w-[400px] h-[400px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-10 right-0 w-[350px] h-[350px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        {/* Main 2 Columns Layout (60:40 Ratio - Image Left, Content Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center">
          
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
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
              className="relative w-full aspect-[16/11] max-h-[420px] lg:max-h-[460px] overflow-hidden"
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
            <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-3xl xl:text-4xl text-[#1E1B4B] mb-2.5 leading-tight sm:leading-snug">
              Diampu oleh Widyaiswara & Pakar Berpengalaman
            </h2>

            <div className="h-1.5 w-16 bg-[#F97316] rounded-full mb-4" />

            <p className="text-slate-600 text-xs sm:text-sm lg:text-base mb-5 leading-relaxed">
              Kualitas diklat terjamin melalui bimbingan langsung narasumber tersertifikasi yang ahli dalam bidang pemerintahan, teknologi, manajemen, dan hukum.
            </p>

            {/* Highlights List */}
            <div className="space-y-3 mb-6">
              {highlights.map((item, idx) => (
                <div 
                  key={idx} 
                  className="p-3.5 rounded-xl bg-[#FAFAF9] border border-slate-200/80 shadow-sm flex items-start gap-3.5 hover:border-indigo-200 hover:shadow-md transition-all duration-300"
                >
                  <div className={`shrink-0 h-9 w-9 sm:h-10 sm:w-10 rounded-lg ${item.bgColor} ${item.borderColor} border flex items-center justify-center`}>
                    <item.icon className={`h-4.5 w-4.5 sm:h-5 sm:w-5 ${item.iconColor}`} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-[#1E1B4B] mb-0.5 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link href="/instructors" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-[#1E1B4B] hover:bg-[#312E81] text-white px-6 py-2.5 h-auto rounded-xl font-semibold text-xs sm:text-sm shadow-md shadow-indigo-950/20 flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5 cursor-pointer">
                  Jelajahi Profil Pengajar <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>

        </div>

      </div>

      {/* Smooth Solid Wave Transitioning directly into FinalCtaSection (#1E1B4B) */}
      <div className="w-full overflow-hidden leading-none pointer-events-none mt-12 sm:mt-16 -mb-16">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="relative block w-full h-8 sm:h-12 lg:h-14 text-[#1E1B4B] fill-current"
        >
          <path d="M0,0 Q600,60 1200,0 L1200,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  );
}
