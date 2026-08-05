"use client";

import Link from "next/link";
import { LogOut, Search, User } from "lucide-react";
import { useAuthStore } from "@/stores/use-auth";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

export function LmsNavbar() {
  const { user, clearAuth } = useAuthStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  const handleLogout = () => {
    clearAuth();
    queryClient.clear();
    router.push("/auth/login");
  };

  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="h-[72px] border-b border-slate-200 bg-white sticky top-0 z-40 shadow-sm shrink-0 flex items-center justify-between px-6 lg:px-10">
      <div className="flex items-center gap-8">
        <Link href="/my-learning" className="flex items-center gap-3">
          <div className="size-10 rounded-lg flex items-center justify-center overflow-hidden">
            <Image
              src="/assets/brand/PT-Harapan-Amar.svg"
              alt="Amar Diklat"
              width={40}
              height={40}
              className="w-full h-auto object-contain"
            />
          </div>
          <span className="font-display font-bold text-xl text-[#1E1B4B] hidden sm:block">
            Amar Diklat
          </span>
        </Link>

        {/* Search */}
        <div className="hidden md:flex relative w-[320px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Cari modul atau kelasku..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#F97316]/20 focus:border-[#F97316] transition-all text-slate-700 placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-full bg-[#1E1B4B]/5 flex items-center justify-center border border-[#1E1B4B]/10">
            <User className="size-4 text-[#1E1B4B]" />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-xs text-slate-500 font-medium">Peserta Diklat</span>
            <span className="text-sm font-bold text-[#1E1B4B] line-clamp-1 max-w-[150px]">
              {mounted ? (user?.name || "Guest") : "Guest"}
            </span>
          </div>
        </div>
        
        <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>
        
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-xl transition-colors font-medium group"
        >
          <LogOut className="size-4 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">Keluar</span>
        </button>
      </div>
    </header>
  );
}
