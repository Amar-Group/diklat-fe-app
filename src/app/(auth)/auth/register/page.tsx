"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, User, Mail, Phone, Lock, Check } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNotification } from "@/components/ui/notification";
import { AuthService } from "@/features/auth/services/auth-service";

const registerSchema = z.object({
  name: z.string().min(1, "Nama Lengkap wajib diisi"),
  email: z.string().email("Format email tidak valid"),
  phone_number: z.string().min(10, "Nomor WhatsApp tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  confirm_password: z.string(),
}).refine((data) => data.password === data.confirm_password, {
  message: "Konfirmasi password tidak cocok",
  path: ["confirm_password"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const notification = useNotification();
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      setLoading(true);
      const res = await AuthService.register({
        name: data.name,
        email: data.email,
        phone_number: data.phone_number,
        password: data.password,
      });

      if (res.success) {
        notification.add("Berhasil mendaftar! Mengarahkan ke halaman verifikasi email...", "success");
        router.push(`/auth/verify-email?email=${encodeURIComponent(data.email)}`);
      } else {
        notification.add(res.message || "Gagal melakukan registrasi", "error");
      }
    } catch (error: any) {
      notification.add(error.message || "Terjadi kesalahan pada server", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] flex items-center justify-center p-6 py-10">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="flex items-center gap-3 mb-6 justify-center">
          <div className="size-10 rounded-lg flex items-center justify-center overflow-hidden">
            <Image
              src="/assets/brand/PT-Harapan-Amar.svg"
              alt="Amar Diklat"
              width={40}
              height={40}
              className="w-full h-auto object-contain"
            />
          </div>
          <span className="font-display font-bold text-xl text-[#1E1B4B]">
            Amar Diklat
          </span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-display font-bold text-slate-800">Daftar Akun Baru</h2>
            <p className="text-slate-500 mt-1 text-sm">Bergabunglah dan tingkatkan kompetensi Anda bersama kami.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Nama Lengkap</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-4 w-4 text-slate-400" />
                </div>
                <input 
                  {...register("name")}
                  placeholder="Masukkan nama lengkap" 
                  className={`w-full border ${errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-[#F97316] focus:ring-[#F97316]/20'} rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors bg-white`} 
                />
              </div>
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-slate-400" />
                </div>
                <input 
                  type="email"
                  {...register("email")}
                  placeholder="contoh@email.com" 
                  className={`w-full border ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-[#F97316] focus:ring-[#F97316]/20'} rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors bg-white`} 
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">No. WhatsApp</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-4 w-4 text-slate-400" />
                </div>
                <input 
                  type="tel"
                  {...register("phone_number")}
                  placeholder="081234567890" 
                  className={`w-full border ${errors.phone_number ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-[#F97316] focus:ring-[#F97316]/20'} rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors bg-white`} 
                />
              </div>
              {errors.phone_number && <p className="mt-1 text-xs text-red-500">{errors.phone_number.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-400" />
                </div>
                <input 
                  type={showPass ? "text" : "password"} 
                  {...register("password")}
                  placeholder="Min. 6 karakter" 
                  className={`w-full border ${errors.password ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-[#F97316] focus:ring-[#F97316]/20'} rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors bg-white`} 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPass(!showPass)} 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPass ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Konfirmasi Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-slate-400" />
                </div>
                <input 
                  type={showConfirm ? "text" : "password"} 
                  {...register("confirm_password")}
                  placeholder="Ulangi password" 
                  className={`w-full border ${errors.confirm_password ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-[#F97316] focus:ring-[#F97316]/20'} rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors bg-white`} 
                />
                <button 
                  type="button" 
                  onClick={() => setShowConfirm(!showConfirm)} 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showConfirm ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
              {errors.confirm_password && <p className="mt-1 text-xs text-red-500">{errors.confirm_password.message}</p>}
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-2.5 bg-[#F97316] hover:bg-[#EA580C] text-white font-semibold rounded-xl text-sm transition-all focus:ring-2 focus:ring-[#F97316] focus:ring-offset-2 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                  Mendaftar...
                </>
              ) : (
                "Daftar Sekarang"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500">
              Sudah memiliki akun?{' '}
              <Link href="/auth/login" className="text-[#F97316] font-semibold hover:text-[#EA580C]">
                Masuk di sini
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
