"use client";

import Link from "next/link";
import { BookOpen, LogOut, Search } from "lucide-react";
import { useAuthStore } from "@/stores/use-auth";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

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
    <header className="h-[60px] border-b border-border bg-white sticky top-0 z-40 shadow-sm shrink-0 flex items-center justify-between px-6">
      <div className="flex items-center gap-6">
        <Link href="/my-learning" className="flex items-center gap-2 text-primary font-bold text-xl">
          <div className="bg-primary/10 p-1.5 rounded-lg">
            <BookOpen className="size-5" />
          </div>
          Diklat
        </Link>

        {/* Search */}
        <div className="hidden md:flex relative w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Cari kelasku..." 
            className="w-full pl-9 pr-4 py-1.5 bg-slate-100 border-none rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-slate-700 hidden sm:block">
          Hi, {mounted ? (user?.name || "Peserta") : "Peserta"}
        </span>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-red-500 hover:text-red-600 hover:bg-red-50 px-3 py-1.5 rounded-md transition-colors font-medium"
        >
          <LogOut className="size-4" />
          Keluar
        </button>
      </div>
    </header>
  );
}
