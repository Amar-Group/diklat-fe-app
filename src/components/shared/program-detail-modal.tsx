"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, ModalClose } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Award, Calendar, Phone, CheckCircle2, Building2, UserCheck, Shield, FileText, ArrowRight } from "lucide-react";

export interface ProgramDetailData {
  id: string;
  title: string;
  category: string;
  duration: string;
  method: string;
  certification: string;
  price: string;
  image: string;
  bgGradient?: string;
  overview: string;
  regulations?: string[];
  objectives: string[];
  scheduleLocations?: { city: string; date: string }[];
  scheduleNote?: string;
  curriculum: string[];
  contactPersons?: { name: string; phone: string }[];
  organizer?: string;
  picPerson?: string;
}

interface ProgramDetailModalProps {
  program: ProgramDetailData | null;
  open: boolean;
  onClose: () => void;
}

export function ProgramDetailModal({ program, open, onClose }: ProgramDetailModalProps) {
  const router = useRouter();

  if (!program) return null;

  const handleRegister = () => {
    onClose();
    router.push("/admin");
  };

  return (
    <Modal open={open} onClose={onClose} className="max-w-3xl max-h-[90vh]">
      <ModalHeader className="bg-slate-900 text-white rounded-t-xl border-slate-800">
        <div className="flex items-center gap-3">
          <Badge className="bg-[#F97316] text-white border-0">{program.category}</Badge>
          <ModalTitle className="text-lg font-display font-bold text-white line-clamp-1">
            {program.title}
          </ModalTitle>
        </div>
        <ModalClose onClose={onClose} className="text-slate-400 hover:text-white hover:bg-slate-800" />
      </ModalHeader>

      <ModalBody className="p-0 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)]">
        {/* Banner / Visual Header */}
        <div className="relative w-full h-52 sm:h-60 bg-slate-900 overflow-hidden flex items-center justify-center">
          <Image
            src={program.image}
            alt={program.title}
            fill
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent" />
          <div className="absolute bottom-4 left-6 right-6 z-10 text-white">
            <h2 className="text-xl sm:text-2xl font-display font-bold mb-2 drop-shadow-md">
              {program.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-200">
              <span className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-lg backdrop-blur-sm border border-slate-700">
                <Clock className="w-4 h-4 text-[#F97316]" /> {program.duration}
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-lg backdrop-blur-sm border border-slate-700">
                <MapPin className="w-4 h-4 text-[#F97316]" /> {program.method}
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900/80 px-2.5 py-1 rounded-lg backdrop-blur-sm border border-slate-700">
                <Award className="w-4 h-4 text-[#F97316]" /> {program.certification}
              </span>
            </div>
          </div>
        </div>

        <div className="px-6 space-y-6 pb-4">
          {/* Latar Belakang / Deskripsi */}
          <div>
            <h4 className="font-display font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#F97316]" /> Latar Belakang & Deskripsi
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
              {program.overview}
            </p>
          </div>

          {/* Regulasi Dasar (jika ada) */}
          {program.regulations && program.regulations.length > 0 && (
            <div>
              <h4 className="font-display font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4 text-indigo-600" /> Dasar Hukum & Regulasi
              </h4>
              <ul className="space-y-1.5 bg-indigo-50/50 p-4 rounded-xl border border-indigo-100">
                {program.regulations.map((reg, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                    <span>{reg}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tujuan Pelatihan */}
          <div>
            <h4 className="font-display font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-emerald-600" /> Maksud & Tujuan
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {program.objectives.map((obj, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 bg-white p-3 rounded-lg border border-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Kurikulum & Materi */}
          <div>
            <h4 className="font-display font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#F97316]" /> Ringkasan Materi & Kurikulum
            </h4>
            <div className="space-y-2 bg-slate-900 text-slate-100 p-4 rounded-xl">
              {program.curriculum.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                  <span className="w-5 h-5 rounded-full bg-[#F97316] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Waktu & Lokasi Pelaksanaan */}
          <div>
            <h4 className="font-display font-bold text-slate-900 text-base mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" /> Waktu & Tempat Pelaksanaan
            </h4>
            {program.scheduleLocations && program.scheduleLocations.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {program.scheduleLocations.map((loc, idx) => (
                  <div key={idx} className="p-3 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
                    <span className="font-semibold text-xs sm:text-sm text-slate-800 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#F97316]" /> {loc.city}
                    </span>
                    <span className="text-xs text-slate-600 bg-white px-2 py-1 rounded border border-slate-200">
                      {loc.date}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs sm:text-sm text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
                {program.scheduleNote || "Dapat disesuaikan dengan permintaan/kebutuhan instansi."}
              </p>
            )}
          </div>

          {/* Biaya & Penyelenggara */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-orange-50 border border-orange-200">
              <span className="text-xs font-semibold text-orange-800 uppercase tracking-wider block mb-1">
                Biaya Pelatihan
              </span>
              <p className="text-xl sm:text-2xl font-display font-extrabold text-[#F97316]">
                {program.price}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                Termasuk sertifikat, modul pelatihan & fasilitas diklat.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-[#F97316]" /> Penyelenggara Resmi
              </span>
              <p className="font-display font-bold text-sm text-white">
                {program.organizer || "PT Harapan Amar Jaya"}
              </p>
              {program.picPerson && (
                <p className="text-xs text-slate-300 mt-1">
                  Penanggung Jawab: {program.picPerson}
                </p>
              )}
            </div>
          </div>

          {/* Narahubung jika ada */}
          {program.contactPersons && program.contactPersons.length > 0 && (
            <div>
              <h4 className="font-display font-bold text-slate-900 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#F97316]" /> Contact Person & Informan
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {program.contactPersons.map((cp, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                    <p className="font-semibold text-slate-800 line-clamp-1">{cp.name}</p>
                    <p className="text-[#F97316] font-mono mt-0.5">{cp.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </ModalBody>

      <ModalFooter className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-slate-500 text-center sm:text-left">
          Tertarik mengikuti pelatihan ini? Silakan login atau buat akun.
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Button variant="outline" onClick={onClose} className="flex-1 sm:flex-none border-slate-300">
            Tutup
          </Button>
          <Button onClick={handleRegister} className="flex-1 sm:flex-none bg-[#F97316] hover:bg-[#EA580C] text-white shadow-md shadow-orange-500/20 gap-2">
            Daftar Sekarang <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  );
}
