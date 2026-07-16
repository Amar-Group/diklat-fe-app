"use client";

import { Tabs, TabList, Tab, TabPanel } from "@/components/ui/tabs";
import { CheckCircle2, LayoutDashboard, UserCheck, Presentation } from "lucide-react";
import { motion } from "framer-motion";

export function DashboardsPreviewSection() {
  return (
    <section className="py-24 bg-[#0F172A] relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#1E1B4B] rounded-full blur-[120px] opacity-50 -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#F97316]/20 rounded-full blur-[100px] opacity-30 translate-y-1/2 -translate-x-1/4" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-6">
            Satu Platform, Multi-Akses
          </h2>
          <p className="text-slate-400 text-lg">
            Akses khusus yang dirancang sesuai kebutuhan peran masing-masing pengguna untuk pengalaman yang efisien.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Tabs defaultValue="hrd" className="w-full" onChange={() => {}}>
            <div className="flex justify-center mb-12">
            <TabList variant="pill" className="bg-slate-800/50 border border-slate-700 p-1">
              <Tab value="hrd" icon={LayoutDashboard} className="data-[state=active]:bg-[#F97316] data-[state=active]:text-white text-slate-300 gap-2">
                Dashboard HRD
              </Tab>
              <Tab value="peserta" icon={UserCheck} className="data-[state=active]:bg-[#F97316] data-[state=active]:text-white text-slate-300 gap-2">
                LMS Peserta
              </Tab>
              <Tab value="instruktur" icon={Presentation} className="data-[state=active]:bg-[#F97316] data-[state=active]:text-white text-slate-300 gap-2">
                Portal Instruktur
              </Tab>
            </TabList>
          </div>

          <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700 rounded-2xl p-6 lg:p-10 shadow-2xl">
            <TabPanel value="hrd" className="m-0 focus-visible:outline-none focus-visible:ring-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1 relative rounded-xl border border-slate-700 bg-slate-900 aspect-video overflow-hidden shadow-2xl">
                  {/* Mockup HRD */}
                  <div className="absolute inset-0 p-4">
                    <div className="flex gap-4 h-full">
                      <div className="w-1/4 bg-slate-800 rounded-lg hidden sm:block opacity-50" />
                      <div className="flex-1 flex flex-col gap-4">
                        <div className="h-8 bg-slate-800 rounded-md w-1/3 opacity-50" />
                        <div className="flex gap-4">
                          <div className="h-20 flex-1 bg-[#1E1B4B] rounded-lg border border-indigo-900/50" />
                          <div className="h-20 flex-1 bg-[#F97316]/20 rounded-lg border border-orange-900/50" />
                          <div className="h-20 flex-1 bg-emerald-900/30 rounded-lg border border-emerald-900/50" />
                        </div>
                        <div className="flex-1 bg-slate-800 rounded-lg opacity-50" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="order-1 lg:order-2 space-y-6">
                  <h3 className="font-display font-bold text-2xl text-white">Corporate HRD Portal</h3>
                  <p className="text-slate-400">Pusat kendali untuk memonitor seluruh aktivitas pelatihan karyawan secara komprehensif.</p>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-slate-300"><CheckCircle2 className="h-5 w-5 text-[#F97316]" /> Import peserta massal via Excel</li>
                    <li className="flex items-center gap-3 text-slate-300"><CheckCircle2 className="h-5 w-5 text-[#F97316]" /> Monitoring kehadiran & nilai realtime</li>
                    <li className="flex items-center gap-3 text-slate-300"><CheckCircle2 className="h-5 w-5 text-[#F97316]" /> Analytics dashboard komprehensif</li>
                    <li className="flex items-center gap-3 text-slate-300"><CheckCircle2 className="h-5 w-5 text-[#F97316]" /> Unduh laporan (PDF/Excel)</li>
                  </ul>
                </div>
              </div>
            </TabPanel>

            <TabPanel value="peserta" className="m-0 focus-visible:outline-none focus-visible:ring-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1 relative rounded-xl border border-slate-700 bg-slate-900 aspect-video overflow-hidden shadow-2xl">
                   {/* Mockup Peserta */}
                   <div className="absolute inset-0 p-4 flex flex-col gap-4">
                      <div className="h-10 bg-slate-800 rounded-lg opacity-50 flex items-center px-4">
                        <div className="w-8 h-8 rounded-full bg-slate-700" />
                        <div className="ml-auto w-24 h-4 bg-slate-700 rounded" />
                      </div>
                      <div className="flex-1 flex gap-4">
                        <div className="flex-1 bg-slate-800 rounded-lg opacity-50 flex items-center justify-center">
                           <div className="w-16 h-16 rounded-full bg-slate-700 flex items-center justify-center">
                             <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-slate-500 border-b-8 border-b-transparent ml-1" />
                           </div>
                        </div>
                        <div className="w-1/3 bg-slate-800 rounded-lg opacity-50 flex flex-col gap-2 p-3 hidden sm:flex">
                           <div className="h-4 bg-slate-700 rounded w-full" />
                           <div className="h-4 bg-slate-700 rounded w-5/6" />
                           <div className="h-4 bg-slate-700 rounded w-full mt-4" />
                        </div>
                      </div>
                   </div>
                </div>
                <div className="order-1 lg:order-2 space-y-6">
                  <h3 className="font-display font-bold text-2xl text-white">LMS Peserta Interaktif</h3>
                  <p className="text-slate-400">Pengalaman belajar mandiri yang terstruktur dengan tracking progress otomatis.</p>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-slate-300"><CheckCircle2 className="h-5 w-5 text-emerald-500" /> Video pembelajaran anti-skip</li>
                    <li className="flex items-center gap-3 text-slate-300"><CheckCircle2 className="h-5 w-5 text-emerald-500" /> Tracking progress belajar</li>
                    <li className="flex items-center gap-3 text-slate-300"><CheckCircle2 className="h-5 w-5 text-emerald-500" /> Kuis & evaluasi otomatis</li>
                    <li className="flex items-center gap-3 text-slate-300"><CheckCircle2 className="h-5 w-5 text-emerald-500" /> Akses sertifikat digital</li>
                  </ul>
                </div>
              </div>
            </TabPanel>

            <TabPanel value="instruktur" className="m-0 focus-visible:outline-none focus-visible:ring-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="order-2 lg:order-1 relative rounded-xl border border-slate-700 bg-slate-900 aspect-video overflow-hidden shadow-2xl">
                   {/* Mockup Instruktur */}
                   <div className="absolute inset-0 p-4">
                      <div className="h-10 bg-slate-800 rounded-lg opacity-50 mb-4" />
                      <div className="grid grid-cols-2 gap-4 h-[calc(100%-3.5rem)]">
                        <div className="bg-slate-800 rounded-lg opacity-50 p-4 flex flex-col gap-3">
                           <div className="h-6 w-1/2 bg-slate-700 rounded" />
                           <div className="h-12 w-full bg-slate-700 rounded" />
                           <div className="h-12 w-full bg-slate-700 rounded" />
                        </div>
                        <div className="bg-slate-800 rounded-lg opacity-50 flex items-center justify-center">
                          <div className="w-32 h-32 bg-slate-700 rounded-lg" />
                        </div>
                      </div>
                   </div>
                </div>
                <div className="order-1 lg:order-2 space-y-6">
                  <h3 className="font-display font-bold text-2xl text-white">Portal Instruktur</h3>
                  <p className="text-slate-400">Fasilitasi pengelolaan kelas dan peserta untuk para pengajar profesional.</p>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3 text-slate-300"><CheckCircle2 className="h-5 w-5 text-blue-400" /> Manajemen jadwal mengajar</li>
                    <li className="flex items-center gap-3 text-slate-300"><CheckCircle2 className="h-5 w-5 text-blue-400" /> Data dan logistik peserta</li>
                    <li className="flex items-center gap-3 text-slate-300"><CheckCircle2 className="h-5 w-5 text-blue-400" /> Generate QR Code absensi</li>
                    <li className="flex items-center gap-3 text-slate-300"><CheckCircle2 className="h-5 w-5 text-blue-400" /> Upload materi tambahan</li>
                  </ul>
                </div>
              </div>
            </TabPanel>
            </div>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}
