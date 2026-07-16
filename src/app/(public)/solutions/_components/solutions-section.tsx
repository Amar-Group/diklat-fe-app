"use client";

import { GraduationCap, MonitorPlay, Building, RefreshCcw, Check } from "lucide-react";
import { motion } from "framer-motion";

export function SolutionsSection() {
  const solutions = [
    {
      icon: GraduationCap,
      title: "LMS Mandiri",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100",
      features: [
        "Video pembelajaran interaktif",
        "Sistem anti-skip learning",
        "Kuis & penugasan otomatis",
        "Tracking progress real-time"
      ]
    },
    {
      icon: MonitorPlay,
      title: "Kelas Online",
      color: "text-[#F97316]",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-100",
      features: [
        "Integrasi Zoom Meetings",
        "Integrasi Google Meet",
        "Absensi otomatis by sistem",
        "Akses rekaman kelas"
      ]
    },
    {
      icon: Building,
      title: "Kelas Tatap Muka",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-100",
      features: [
        "QR Attendance System",
        "Manajemen logistik peserta",
        "Field trip management",
        "Monitoring kehadiran fisik"
      ]
    },
    {
      icon: RefreshCcw,
      title: "Hybrid Learning",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-100",
      features: [
        "LMS + Online + Offline",
        "Progress terintegrasi penuh",
        "Penjadwalan otomatis",
        "Sertifikasi digital BNSP"
      ]
    }
  ];

  return (
    <section id="solutions" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#1E1B4B] mb-6">
            Solusi yang Kami Tawarkan
          </h2>
          <p className="text-slate-600 text-lg">
            Apapun kebutuhan bisnis Anda, kami menyediakan infrastruktur pelatihan yang fleksibel dan terukur untuk memastikan efektivitas pembelajaran.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {solutions.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group rounded-2xl border border-slate-200 bg-white p-8 hover:shadow-xl hover:border-slate-300 transition-all duration-300 relative overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 ${item.bgColor} rounded-bl-full -z-0 opacity-50 group-hover:scale-110 transition-transform`} />
              
              <div className="relative z-10">
                <div className={`h-14 w-14 rounded-xl ${item.bgColor} ${item.borderColor} border flex items-center justify-center mb-6`}>
                  <item.icon className={`h-7 w-7 ${item.color}`} />
                </div>
                
                <h3 className="font-display font-bold text-xl text-[#1E1B4B] mb-6">
                  {item.title}
                </h3>
                
                <ul className="space-y-3">
                  {item.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <div className="mt-1 shrink-0 h-4 w-4 rounded-full bg-slate-100 flex items-center justify-center">
                        <Check className="h-3 w-3 text-slate-600" strokeWidth={3} />
                      </div>
                      <span className="text-sm text-slate-600 leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
