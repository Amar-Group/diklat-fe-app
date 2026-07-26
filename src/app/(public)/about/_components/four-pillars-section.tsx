"use client";

import { BrainCircuit, Wallet, HeartPulse, Rocket, Target, TrendingUp, Users, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export function FourPillarsSection() {
  const pillars = [
    {
      icon: BrainCircuit,
      title: "Pilar Mental",
      desc: "Menyiapkan ketahanan psikologis menghadapi masa pensiun atau transisi karir.",
      items: ["Persiapan masa purnabakti", "Adaptasi psikologis", "Manajemen stres"],
      color: "from-blue-500 to-indigo-600"
    },
    {
      icon: Wallet,
      title: "Pilar Finansial",
      desc: "Edukasi pengelolaan aset untuk menjamin kebebasan finansial jangka panjang.",
      items: ["Perencanaan keuangan", "Instrumen investasi", "Manajemen dana pensiun"],
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: HeartPulse,
      title: "Pilar Kesehatan",
      desc: "Menjaga vitalitas fisik untuk mendukung aktivitas di usia lanjut atau produktif.",
      items: ["Gaya hidup sehat", "Pemeriksaan berkala", "Kesehatan lansia"],
      color: "from-rose-500 to-red-600"
    },
    {
      icon: Rocket,
      title: "Pilar Kewirausahaan",
      desc: "Membuka wawasan bisnis dan menciptakan sumber pendapatan baru yang mandiri.",
      items: ["Ide & validasi usaha", "Manajemen UMKM", "Digital marketing"],
      color: "from-orange-500 to-amber-600"
    }
  ];

  return (
    <section className="py-24 bg-white border-y border-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#1E1B4B] mb-6 leading-tight">
            Kenapa Memilih Kami?
          </h2>
          <p className="text-slate-600 text-lg">
            Kami membangun ekosistem pelatihan yang tidak hanya transfer knowledge, tapi juga memastikan terwujudnya perubahan kinerja yang nyata.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="flex flex-col bg-white rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-6 shadow-lg`}>
                <pillar.icon className="h-7 w-7 text-white" />
              </div>
              
              <h3 className="font-display font-bold text-xl text-[#1E1B4B] mb-3">
                {pillar.title}
              </h3>
              
              <p className="text-sm text-slate-600 mb-6 flex-1">
                {pillar.desc}
              </p>
              
              <ul className="space-y-2 border-t border-slate-200 pt-6">
                {pillar.items.map((item, iIdx) => (
                  <li key={iIdx} className="flex items-start gap-2 text-sm text-slate-700 font-medium">
                    <span className="text-[#F97316]">•</span> {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
