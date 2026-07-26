"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function FourPillarsSection() {
  const pillars = [
    {
      image: "/assets/images/profil/why/Mental.webp",
      title: "Pilar Mental",
      desc: "Menyiapkan ketahanan psikologis menghadapi masa pensiun atau transisi karir.",
      items: ["Persiapan masa purnabakti", "Adaptasi psikologis", "Manajemen stres"]
    },
    {
      image: "/assets/images/profil/why/finansial.webp",
      title: "Pilar Finansial",
      desc: "Edukasi pengelolaan aset untuk menjamin kebebasan finansial jangka panjang.",
      items: ["Perencanaan keuangan", "Instrumen investasi", "Manajemen dana pensiun"]
    },
    {
      image: "/assets/images/profil/why/Health.webp",
      title: "Pilar Kesehatan",
      desc: "Menjaga vitalitas fisik untuk mendukung aktivitas di usia lanjut atau produktif.",
      items: ["Gaya hidup sehat", "Pemeriksaan berkala", "Kesehatan lansia"]
    },
    {
      image: "/assets/images/profil/why/UMKM.webp",
      title: "Pilar Kewirausahaan",
      desc: "Membuka wawasan bisnis dan menciptakan sumber pendapatan baru yang mandiri.",
      items: ["Ide & validasi usaha", "Manajemen UMKM", "Digital marketing"]
    }
  ];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Abstract Top Curve Divider seamlessly integrating with section above */}
      <div className="w-full overflow-hidden leading-none bg-[#FAFAF9] -mb-1">
        <svg
          className="relative block w-full h-12 sm:h-16 md:h-20 lg:h-24"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C300,90 900,10 1200,80 L1200,120 L0,120 Z"
            fill="#FFFFFF"
          ></path>
        </svg>
      </div>

      <section className="py-16 sm:py-24 bg-white">
        <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16">
          
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-14 sm:mb-20"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1E1B4B] mb-5 leading-tight">
              Kenapa Memilih Kami?
            </h2>
            <div className="h-1.5 w-20 bg-[#F97316] mx-auto rounded-full mb-6"></div>
            <p className="text-slate-600 text-base sm:text-lg md:text-xl leading-relaxed">
              Kami membangun ekosistem pelatihan yang tidak hanya transfer knowledge, tapi juga memastikan terwujudnya perubahan kinerja yang nyata.
            </p>
          </motion.div>

          {/* Pillars Grid - Full Screen Width, Frameless */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            {pillars.map((pillar, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className="flex flex-col group transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* Illustration Image Box */}
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-6 bg-slate-50">
                  <Image 
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-2xl"
                  />
                </div>
                
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#1E1B4B] mb-3 group-hover:text-[#F97316] transition-colors">
                  {pillar.title}
                </h3>
                
                <p className="text-sm sm:text-base text-slate-600 mb-6 flex-1 leading-relaxed">
                  {pillar.desc}
                </p>
                
                <ul className="space-y-2 border-t border-slate-100 pt-5">
                  {pillar.items.map((item, iIdx) => (
                    <li key={iIdx} className="flex items-start gap-2.5 text-sm text-slate-700 font-medium">
                      <span className="text-[#F97316] font-bold">•</span> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}

