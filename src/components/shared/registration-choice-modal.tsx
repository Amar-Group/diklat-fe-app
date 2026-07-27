"use client";

import { useRouter } from "next/navigation";
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalClose } from "@/components/ui/modal";
import { User, Building2, ArrowRight, Mail } from "lucide-react";

const COMPANY_EMAIL = "ptharapanamarjaya@gmail.com";

interface RegistrationChoiceModalProps {
  open: boolean;
  onClose: () => void;
}

export function RegistrationChoiceModal({ open, onClose }: RegistrationChoiceModalProps) {
  const router = useRouter();

  const handleIndividual = () => {
    onClose();
    router.push("/auth/register");
  };

  const handleHRD = () => {
    onClose();
    window.location.href = `mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent("Pendaftaran Peserta Diklat — Via HRD / Perusahaan")}&body=${encodeURIComponent(
      "Yth. Tim PT Harapan Amar Jaya,\n\nPerkenalkan, saya dari perusahaan [Nama Perusahaan].\nKami ingin mendaftarkan peserta untuk program pelatihan.\n\nBerikut informasi awal:\n- Nama Perusahaan: \n- Jumlah Peserta: \n- Program yang Diminati: \n- Kontak PIC (Nama & No. HP): \n\nMohon informasi lebih lanjut.\n\nTerima kasih."
    )}`;
  };

  return (
    <Modal open={open} onClose={onClose} className="max-w-lg">
      <ModalHeader>
        <ModalTitle className="text-lg font-display font-bold text-slate-800">
          Pilih Metode Pendaftaran
        </ModalTitle>
        <ModalClose onClose={onClose} />
      </ModalHeader>
      <ModalBody className="py-6">
        <p className="text-sm text-slate-500 mb-6">
          Silakan pilih metode pendaftaran yang sesuai dengan kebutuhan Anda.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Individu Card */}
          <button
            onClick={handleIndividual}
            className="group relative flex flex-col items-center text-center p-6 rounded-xl border-2 border-slate-200 bg-white hover:border-[#F97316] hover:shadow-lg hover:shadow-orange-500/10 transition-all duration-300 cursor-pointer"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F97316] to-[#EA580C] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <User className="h-7 w-7 text-white" />
            </div>
            <h3 className="font-display font-bold text-slate-800 text-base mb-2">
              Individu
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Daftar langsung sebagai peserta perorangan melalui form registrasi akun.
            </p>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#F97316] group-hover:gap-2.5 transition-all duration-300">
              Buat Akun <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </button>

          {/* HRD / Perusahaan Card */}
          <button
            onClick={handleHRD}
            className="group relative flex flex-col items-center text-center p-6 rounded-xl border-2 border-slate-200 bg-white hover:border-[#1E1B4B] hover:shadow-lg hover:shadow-indigo-900/10 transition-all duration-300 cursor-pointer"
          >
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1E1B4B] to-[#312E81] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Building2 className="h-7 w-7 text-white" />
            </div>
            <h3 className="font-display font-bold text-slate-800 text-base mb-2">
              HRD / Perusahaan
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Daftarkan karyawan melalui koordinasi HRD via email perusahaan kami.
            </p>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E1B4B] group-hover:gap-2.5 transition-all duration-300">
              <Mail className="h-3.5 w-3.5" /> Kirim Email
            </span>
          </button>
        </div>
      </ModalBody>
    </Modal>
  );
}
