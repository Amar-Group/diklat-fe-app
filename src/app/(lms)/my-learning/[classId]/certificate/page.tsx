"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Award, FileText, Download, ShieldCheck } from "lucide-react";
import { useMyLearningCertificate } from "@/features/certificate/hooks/use-certificate-participant";

export default function MyLearningCertificatePage() {
  const { classId } = useParams();
  const { data: certificate, isLoading } = useMyLearningCertificate(Number(classId));

  if (isLoading) {
    return <div className="p-10 text-center animate-pulse text-slate-500 font-medium">Memuat Data Sertifikat...</div>;
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href={`/my-learning/${classId}`} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ChevronLeft className="size-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Sertifikat Kelulusan</h1>
          <p className="text-slate-500 text-sm">Unduh sertifikat kelulusan Anda untuk kelas ini.</p>
        </div>
      </div>

      {!certificate ? (
        <div className="py-20 text-center bg-white border border-dashed border-slate-300 rounded-2xl">
          <FileText className="size-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-slate-700">Sertifikat Belum Diterbitkan</h3>
          <p className="text-slate-500 mt-1 max-w-md mx-auto">
            Selamat telah menyelesaikan kelas! Sertifikat Anda sedang dalam proses penerbitan oleh Admin/Instruktur. Silakan periksa kembali nanti.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="p-8 md:p-12 text-center bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl -ml-20 -mb-20"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center size-20 rounded-full bg-green-100 text-green-600 mb-6">
                <Award className="size-10" />
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">Sertifikat Penghargaan</h2>
              <p className="text-lg text-slate-600 mb-8">Telah menyelesaikan pelatihan dengan rincian berikut:</p>
              
              <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl border border-slate-200 shadow-sm text-left grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Nama Program / Kelas</span>
                  <p className="font-semibold text-slate-800">{certificate.class_name || certificate.course_title}</p>
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Mata Diklat</span>
                  <p className="font-semibold text-slate-800">{certificate.course_title}</p>
                </div>
                <div>
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Nomor Sertifikat</span>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="size-4 text-green-500" />
                    <p className="font-mono font-bold text-slate-800">{certificate.certificate_number}</p>
                  </div>
                </div>
                {certificate.bnsp_code && (
                  <div>
                    <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Kode BNSP</span>
                    <p className="font-mono font-bold text-slate-800">{certificate.bnsp_code}</p>
                  </div>
                )}
                <div>
                  <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Tanggal Terbit</span>
                  <p className="font-medium text-slate-800">
                    {new Date(certificate.issued_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </p>
                </div>
              </div>

              <div className="mt-10 flex justify-center">
                {certificate.file_url ? (
                  <a 
                    href={certificate.file_url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-4 px-10 rounded-xl shadow-lg shadow-primary/30 transition-all hover:-translate-y-1"
                  >
                    <Download className="size-5" />
                    Unduh File Sertifikat (PDF)
                  </a>
                ) : (
                  <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-500 font-bold py-4 px-10 rounded-xl">
                    <FileText className="size-5" />
                    File Belum Diunggah
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
