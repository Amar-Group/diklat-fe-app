"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export function PublicNavbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);
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
              <div className="h-10 w-10 rounded-lg bg-[#1E1B4B] flex items-center justify-center">
                <span className="text-white font-bold font-display text-xl leading-none">HA</span>
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-[#1E1B4B]">
                Harapan Amar
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-6">
            <Link href="/" className={navLinkClass("/")}>Home</Link>
            <Link href="/about" className={navLinkClass("/about")}>Tentang Kami</Link>
            
            {/* Dropdown Program Diklat */}
            <div className="relative group">
              <button className={`flex items-center gap-1 transition-colors py-2 ${isActive("/programs") ? 'text-[#F97316] font-semibold text-sm' : 'text-sm font-medium text-slate-600 hover:text-[#F97316]'}`}>
                Program Diklat <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-48 rounded-md bg-white shadow-lg border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  <Link href="/programs" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#F97316]">Semua Program</Link>
                  <Link href="/programs" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#F97316]">Detail Program</Link>
                </div>
              </div>
            </div>

            {/* Dropdown Metode Pelatihan */}
            <div className="relative group">
              <button className={`flex items-center gap-1 transition-colors py-2 ${isActive("/solutions") ? 'text-[#F97316] font-semibold text-sm' : 'text-sm font-medium text-slate-600 hover:text-[#F97316]'}`}>
                Metode Pelatihan <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-48 rounded-md bg-white shadow-lg border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  <Link href="/solutions" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#F97316]">LMS</Link>
                  <Link href="/solutions" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#F97316]">Online</Link>
                  <Link href="/solutions" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#F97316]">Offline</Link>
                  <Link href="/solutions" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#F97316]">Hybrid</Link>
                </div>
              </div>
            </div>

            <Link href="/certificate" className={navLinkClass("/certificate")}>Sertifikat</Link>
            <Link href="/faq" className={navLinkClass("/faq")}>FAQ & Testimoni</Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden xl:flex items-center gap-3">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-slate-600 hover:text-[#1E1B4B]">Login</Button>
            </Link>
            <Button variant="outline" className="border-slate-200 text-slate-700 hover:bg-slate-50">Daftar Peserta</Button>
            <Button className="bg-[#F97316] hover:bg-[#EA580C] text-white shadow-md shadow-orange-500/20">Jadwalkan Demo</Button>
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
            <Link href="/about" onClick={toggleMenu} className={mobNavLinkClass("/about")}>Tentang Kami</Link>
            
            {/* Mobile Dropdown 1 */}
            <div>
              <button 
                onClick={() => toggleDropdown('program')}
                className={`flex items-center justify-between w-full px-3 py-2 text-base font-medium ${isActive("/programs") ? 'text-[#F97316]' : 'text-slate-800 hover:text-[#F97316]'}`}
              >
                Program Diklat <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === 'program' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'program' && (
                <div className="pl-6 pb-2 space-y-1">
                  <Link href="/programs" onClick={toggleMenu} className="block px-3 py-2 text-sm text-slate-600 hover:text-[#F97316]">Semua Program</Link>
                  <Link href="/programs" onClick={toggleMenu} className="block px-3 py-2 text-sm text-slate-600 hover:text-[#F97316]">Detail Program</Link>
                </div>
              )}
            </div>

            {/* Mobile Dropdown 2 */}
            <div>
              <button 
                onClick={() => toggleDropdown('metode')}
                className={`flex items-center justify-between w-full px-3 py-2 text-base font-medium ${isActive("/solutions") ? 'text-[#F97316]' : 'text-slate-800 hover:text-[#F97316]'}`}
              >
                Metode Pelatihan <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === 'metode' ? 'rotate-180' : ''}`} />
              </button>
              {activeDropdown === 'metode' && (
                <div className="pl-6 pb-2 space-y-1">
                  <Link href="/solutions" onClick={toggleMenu} className="block px-3 py-2 text-sm text-slate-600 hover:text-[#F97316]">LMS</Link>
                  <Link href="/solutions" onClick={toggleMenu} className="block px-3 py-2 text-sm text-slate-600 hover:text-[#F97316]">Online</Link>
                  <Link href="/solutions" onClick={toggleMenu} className="block px-3 py-2 text-sm text-slate-600 hover:text-[#F97316]">Offline</Link>
                  <Link href="/solutions" onClick={toggleMenu} className="block px-3 py-2 text-sm text-slate-600 hover:text-[#F97316]">Hybrid</Link>
                </div>
              )}
            </div>

            <Link href="/certificate" onClick={toggleMenu} className={mobNavLinkClass("/certificate")}>Sertifikat</Link>
            <Link href="/faq" onClick={toggleMenu} className={mobNavLinkClass("/faq")}>FAQ & Testimoni</Link>
            
            <div className="pt-6 flex flex-col gap-3 px-3">
              <Link href="/auth/login" className="w-full">
                <Button variant="outline" className="w-full justify-center">Login</Button>
              </Link>
              <Button variant="outline" className="w-full justify-center">Daftar Peserta</Button>
              <Button className="w-full justify-center bg-[#F97316] hover:bg-[#EA580C] text-white">Jadwalkan Demo</Button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
