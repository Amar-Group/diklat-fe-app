"use client";

import Image from "next/image";
import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { RegistrationChoiceModal } from "@/components/shared/registration-choice-modal";
import { DemoVideoModal } from "@/components/shared/demo-video-modal";

export function PublicNavbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
  const [showRegModal, setShowRegModal] = React.useState(false);
  const [showDemoModal, setShowDemoModal] = React.useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  const isActive = (path: string) => {
    if (path === '/' && pathname !== '/') return false;
    return pathname.startsWith(path);
  };

  const navLinkClass = (path: string) => `text-sm font-medium transition-colors ${isActive(path) ? 'text-[#F97316]' : 'text-slate-600 hover:text-[#F97316]'}`;
  const mobNavLinkClass = (path: string) => `block px-3 py-2 text-base font-medium ${isActive(path) ? 'text-[#F97316] bg-slate-50' : 'text-slate-800 hover:text-[#F97316]'}`;

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const toggleDropdown = (name: string) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  return (
    <>
    <motion.header 
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled || isOpen
          ? "border-b border-slate-200 bg-white/90 backdrop-blur-md shadow-sm"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isScrolled ? "py-0" : "py-2"}`}>
        <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? "h-16" : "h-20"}`}>
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg flex items-center justify-center">
                <Image
                  src="/assets/brand/PT-Harapan-Amar.svg"
                  alt="Harapan Amar Jaya"
                  width={40}
                  height={40}
                  className="w-full h-auto object-contain rounded-md drop-shadow-md"
                  priority
                />
              </div>
              <span className="font-display font-bold text-lg tracking-tight text-[#1E1B4B]">
                PT Harapan Amar Jaya
              </span>
            </Link>
          </div>

          <nav className="hidden xl:flex items-center gap-6">
            <Link href="/" className={navLinkClass("/")}>Home</Link>
            
            {/* Profil */}
            <div className="relative group">
              <button className={`flex items-center gap-1 transition-colors py-2 ${isActive("/about") || isActive("/instructors") ? 'text-[#F97316] font-semibold text-sm' : 'text-sm font-medium text-slate-600 hover:text-[#F97316]'}`}>
                Profil <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-48 rounded-md bg-white shadow-lg border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  <Link href="/about" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#F97316]">Tentang Kami & Visi Misi</Link>
                  <Link href="/instructors" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#F97316]">Pengajar / Narasumber</Link>
                </div>
              </div>
            </div>

            {/* Akademik & Layanan */}
            <div className="relative group">
              <button className={`flex items-center gap-1 transition-colors py-2 ${isActive("/programs") || isActive("/solutions") || isActive("/curriculum") ? 'text-[#F97316] font-semibold text-sm' : 'text-sm font-medium text-slate-600 hover:text-[#F97316]'}`}>
                Program & Akademik <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-48 rounded-md bg-white shadow-lg border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  <Link href="/programs" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#F97316]">Katalog Program</Link>
                  <Link href="/curriculum" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#F97316]">Kurikulum Pelatihan</Link>
                  <Link href="/solutions" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#F97316]">Metode Pelatihan</Link>
                </div>
              </div>
            </div>

            {/* Informasi & Pusat Bantuan */}
            <div className="relative group">
              <button className={`flex items-center gap-1 transition-colors py-2 ${isActive("/certificate") || isActive("/faq") ? 'text-[#F97316] font-semibold text-sm' : 'text-sm font-medium text-slate-600 hover:text-[#F97316]'}`}>
                Informasi <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-48 rounded-md bg-white shadow-lg border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  <Link href="/faq" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#F97316]">FAQ & Testimoni</Link>
                  <Link href="/certificate" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#F97316]">Validasi Sertifikat</Link>
                </div>
              </div>
            </div>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden xl:flex items-center gap-3">
            <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50" onClick={() => setShowRegModal(true)}>Daftar Peserta</Button>
            <Button className="bg-[#F97316] hover:bg-[#EA580C] text-white shadow-md shadow-orange-500/20" onClick={() => setShowDemoModal(true)}>Jadwalkan Demo</Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex xl:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          exit={{ opacity: 0, y: -10 }}
          className="xl:hidden bg-white border-b border-slate-200"
        >
          <div className="px-4 pt-2 pb-6 space-y-1 overflow-y-auto max-h-[calc(100vh-80px)]">
            <Link href="/" onClick={toggleMenu} className={mobNavLinkClass("/")}>Home</Link>
            {/* Profil */}
            <div>
              <button 
                onClick={() => toggleDropdown('profil')}
                className={`flex items-center justify-between w-full px-3 py-2 text-base font-medium ${isActive("/about") || isActive("/instructors") ? 'text-[#F97316]' : 'text-slate-800 hover:text-[#F97316]'}`}
              >
                Profil <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === 'profil' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'profil' && (
                <div className="pl-6 pb-2 space-y-1">
                  <Link href="/about" onClick={toggleMenu} className="block px-3 py-2 text-sm text-slate-600 hover:text-[#F97316]">Tentang Kami & Visi Misi</Link>
                  <Link href="/instructors" onClick={toggleMenu} className="block px-3 py-2 text-sm text-slate-600 hover:text-[#F97316]">Pengajar / Narasumber</Link>
                </div>
              )}
            </div>
            
            {/* Akademik */}
            <div>
              <button 
                onClick={() => toggleDropdown('akademik')}
                className={`flex items-center justify-between w-full px-3 py-2 text-base font-medium ${isActive("/programs") || isActive("/solutions") || isActive("/curriculum") ? 'text-[#F97316]' : 'text-slate-800 hover:text-[#F97316]'}`}
              >
                Program & Akademik <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === 'akademik' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'akademik' && (
                <div className="pl-6 pb-2 space-y-1">
                  <Link href="/programs" onClick={toggleMenu} className="block px-3 py-2 text-sm text-slate-600 hover:text-[#F97316]">Katalog Program</Link>
                  <Link href="/curriculum" onClick={toggleMenu} className="block px-3 py-2 text-sm text-slate-600 hover:text-[#F97316]">Kurikulum Pelatihan</Link>
                  <Link href="/solutions" onClick={toggleMenu} className="block px-3 py-2 text-sm text-slate-600 hover:text-[#F97316]">Metode Pelatihan</Link>
                </div>
              )}
            </div>

            {/* Informasi */}
            <div>
              <button 
                onClick={() => toggleDropdown('info')}
                className={`flex items-center justify-between w-full px-3 py-2 text-base font-medium ${isActive("/faq") || isActive("/certificate") ? 'text-[#F97316]' : 'text-slate-800 hover:text-[#F97316]'}`}
              >
                Informasi <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === 'info' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'info' && (
                <div className="pl-6 pb-2 space-y-1">
                  <Link href="/faq" onClick={toggleMenu} className="block px-3 py-2 text-sm text-slate-600 hover:text-[#F97316]">FAQ & Testimoni</Link>
                  <Link href="/certificate" onClick={toggleMenu} className="block px-3 py-2 text-sm text-slate-600 hover:text-[#F97316]">Validasi Sertifikat</Link>
                </div>
              )}
            </div>
            
            <div className="pt-6 flex flex-col gap-3 px-3">
              <Button variant="outline" className="w-full justify-center" onClick={() => { toggleMenu(); setShowRegModal(true); }}>Daftar Peserta</Button>
              <Button className="w-full justify-center bg-[#F97316] hover:bg-[#EA580C] text-white" onClick={() => { toggleMenu(); setShowDemoModal(true); }}>Jadwalkan Demo</Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>

    {/* Modals */}
    <RegistrationChoiceModal open={showRegModal} onClose={() => setShowRegModal(false)} />
    <DemoVideoModal open={showDemoModal} onClose={() => setShowDemoModal(false)} />
    </>
  );
}
