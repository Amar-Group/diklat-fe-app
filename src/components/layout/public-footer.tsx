import Link from "next/link";
import Image from "next/image";
import { Tv, MapPin, Mail, Phone, MessageCircle } from "lucide-react";

export function PublicFooter() {
  return (
    <footer className="bg-[#0F172A] text-slate-300 py-16 border-t border-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl flex items-center justify-center">
                <Image
                  src="/assets/brand/PT-Harapan-Amar.svg"
                  alt="Harapan Amar Jaya"
                  width={40}
                  height={40}
                  className="w-full h-auto object-contain rounded-md drop-shadow-md"
                  priority
                />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl tracking-tight text-white">
                  PT Harapan Amar Jaya
                </h3>
              </div>
            </Link>
            <div className="text-slate-400 text-sm leading-relaxed max-w-sm space-y-2">
              <p>NIB: 0411240089853</p>
              <p>Bidang Keahlian: Pengembangan Kompetensi</p>
              <p>
                Platform Diklat Terintegrasi untuk Pelatihan, Sertifikasi, dan Pengembangan Kompetensi Karyawan. 
                Membangun SDM unggul untuk masa depan bisnis yang berkelanjutan.
              </p>
            </div>
          </div>

          {/* Perusahaan */}
          <div className="space-y-6">
            <h4 className="text-white font-display font-semibold text-lg">Perusahaan</h4>
            <ul className="space-y-4">
              <li><Link href="#about" className="hover:text-[#F97316] transition-colors">Tentang Kami</Link></li>
              <li><Link href="#programs" className="hover:text-[#F97316] transition-colors">Program Diklat</Link></li>
              <li><Link href="#instructors" className="hover:text-[#F97316] transition-colors">Instruktur</Link></li>
              <li><Link href="#blog" className="hover:text-[#F97316] transition-colors">Blog</Link></li>
              <li><Link href="#faq" className="hover:text-[#F97316] transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Layanan */}
          <div className="space-y-6">
            <h4 className="text-white font-display font-semibold text-lg">Layanan</h4>
            <ul className="space-y-4">
              <li><Link href="#lms" className="hover:text-[#F97316] transition-colors">LMS Mandiri</Link></li>
              <li><Link href="#online" className="hover:text-[#F97316] transition-colors">Kelas Online</Link></li>
              <li><Link href="#offline" className="hover:text-[#F97316] transition-colors">Kelas Tatap Muka</Link></li>
              <li><Link href="#hybrid" className="hover:text-[#F97316] transition-colors">Hybrid Learning</Link></li>
            </ul>
          </div>

          {/* Kontak */}
          <div className="space-y-6">
            <h4 className="text-white font-display font-semibold text-lg">Kontak</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#F97316] shrink-0 mt-0.5" />
                <span>Perumahan Telaga Kahuripan BIP A7 No. 26 Jl. Parung Raya Bogor</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#F97316] shrink-0" />
                <span>ptharapanamarjaya@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#F97316] shrink-0" />
                <span>082210414091</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} PT Harapan Amar Jaya. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4">
            <a href="#" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-400 hover:bg-[#F97316] hover:text-white transition-all">
              IG
            </a>
            <a href="#" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-400 hover:bg-[#F97316] hover:text-white transition-all">
              FB
            </a>
            <a href="#" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-400 hover:bg-[#F97316] hover:text-white transition-all">
              IN
            </a>
            <a href="#" className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-400 hover:bg-[#F97316] hover:text-white transition-all">
              YT
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
