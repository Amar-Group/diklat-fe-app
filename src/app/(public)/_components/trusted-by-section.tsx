"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export interface MitraData {
  id: string;
  name: string;
  logoUrl: string;
}

interface TrustedBySectionProps {
  mitraList?: MitraData[];
}

const DEFAULT_MITRA_LIST: MitraData[] = [
  {
    id: "bkn",
    name: "BKN",
    logoUrl: "/assets/mitra/BKN.png",
  },
  {
    id: "bumn",
    name: "BUMN",
    logoUrl: "/assets/mitra/BUMN.webp",
  },
  {
    id: "pemda",
    name: "Pemda",
    logoUrl: "/assets/mitra/Pemda.png",
  },
];

export function TrustedBySection({ mitraList }: TrustedBySectionProps) {
  // Prioritas data dari admin (jika ada), jika tidak ada gunakan data default /assets/mitra/
  const activeMitra = mitraList && mitraList.length > 0 ? mitraList : DEFAULT_MITRA_LIST;

  // Duplikasi item 4x agar animasi scrolling seamless & tanpa jeda kosong
  const marqueeItems = [
    ...activeMitra,
    ...activeMitra,
    ...activeMitra,
    ...activeMitra,
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-y border-slate-100 overflow-hidden relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <p className="text-center text-xs sm:text-sm font-semibold text-slate-500 tracking-wider uppercase">
            Dipercaya Oleh Berbagai Mitra
          </p>
        </motion.div>

        {/* Marquee Ticker Container dengan Efek Fade / Gradient Tembus di Sisi Kiri & Kanan */}
        <div className="relative w-full overflow-hidden">
          {/* Gradient Masks (Efek Tembus / Seamless Blend) */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

          {/* Marquee Track: Animasi perlahan Bergerak Kiri ke Kanan */}
          <motion.div
            className="flex items-center gap-12 sm:gap-20 w-max"
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {marqueeItems.map((mitra, index) => (
              <div
                key={`${mitra.id}-${index}`}
                className="flex items-center justify-center h-12 sm:h-16 w-32 sm:w-40 shrink-0 opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 transform hover:scale-105"
              >
                <Image
                  src={mitra.logoUrl}
                  alt={mitra.name}
                  width={160}
                  height={64}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

