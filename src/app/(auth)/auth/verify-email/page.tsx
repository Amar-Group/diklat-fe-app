"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Hexagon, Mail, ArrowRight, Loader2, RefreshCw } from "lucide-react";
import { useNotification } from "@/components/ui/notification";
import { AuthService } from "@/features/auth/services/auth-service";

function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email");
  const notification = useNotification();

  const [email, setEmail] = useState(emailParam || "");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [successRedirectCountdown, setSuccessRedirectCountdown] = useState(0);
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (!email) {
      router.push("/auth/register");
    }
  }, [email, router]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  useEffect(() => {
    if (successRedirectCountdown > 0) {
      const timer = setTimeout(() => setSuccessRedirectCountdown(successRedirectCountdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [successRedirectCountdown]);

  useEffect(() => {
    if (isVerified && successRedirectCountdown === 0) {
      router.push("/auth/login");
    }
  }, [isVerified, successRedirectCountdown, router]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");
    
    if (otpValue.length < 6) {
      notification.add("Masukkan 6 digit kode OTP", "error");
      return;
    }

    try {
      setLoading(true);
      const res = await AuthService.verifyOtp({ email, otp: otpValue });
      if (res.success) {
        notification.add("Email berhasil diverifikasi! Silakan login.", "success");
        setSuccessRedirectCountdown(3);
        setIsVerified(true);
      } else {
        setLoading(false);
        notification.add(res.message || "Gagal verifikasi OTP", "error");
      }
    } catch (err: any) {
      setLoading(false);
      notification.add(err.message || "Terjadi kesalahan pada server", "error");
    }
  };

  const handleResend = async () => {
    if (countdown > 0) return;
    
    try {
      setResending(true);
      const res = await AuthService.resendOtp({ email });
      if (res.success) {
        notification.add("Kode OTP baru telah dikirim ke email Anda.", "success");
        setCountdown(60); // 60 seconds cooldown
      } else {
        notification.add(res.message || "Gagal mengirim ulang OTP", "error");
      }
    } catch (err: any) {
      notification.add(err.message || "Terjadi kesalahan saat mengirim OTP", "error");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="flex items-center gap-3 mb-8 justify-center">
        <div className="bg-[#1E1B4B] rounded-xl p-2 shadow-lg shadow-blue-900/20">
          <Hexagon className="size-8 text-white fill-[#F97316]" />
        </div>
        <span className="font-display font-bold text-2xl text-[#1E1B4B]">
          Amar Diklat
        </span>
      </div>

      <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 p-8 sm:p-10 border border-slate-100">
        <div className="size-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="size-8 text-blue-600" />
        </div>
        
        <h1 className="text-2xl font-display font-bold text-[#1E1B4B] mb-2 text-center">Verifikasi Email</h1>
        <p className="text-slate-500 text-sm mb-8 text-center leading-relaxed">
          Kami telah mengirimkan kode OTP ke email <br/><strong className="text-slate-800">{email}</strong>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between gap-2 sm:gap-4">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-${idx}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                disabled={loading}
                onChange={(e) => handleChange(idx, e.target.value.replace(/[^0-9]/g, ''))}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="w-12 h-14 text-center text-2xl font-bold text-[#1E1B4B] bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#F97316]/20 focus:border-[#F97316] transition-all disabled:opacity-50"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={loading || otp.join("").length < 6}
            className={`w-full text-white font-semibold rounded-xl px-4 py-3.5 flex items-center justify-center transition-all group shadow-lg ${
              successRedirectCountdown > 0 
                ? "bg-green-600 hover:bg-green-700 shadow-green-600/20" 
                : "bg-[#1E1B4B] hover:bg-blue-900 shadow-[#1E1B4B]/20 disabled:opacity-50 disabled:cursor-not-allowed"
            }`}
          >
            {successRedirectCountdown > 0 ? (
              <>
                Berhasil! Ke Login ({successRedirectCountdown}s)
              </>
            ) : loading ? (
              <Loader2 className="size-5 animate-spin" />
            ) : (
              <>
                Verifikasi Kode
                <ArrowRight className="size-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-500 mb-4">Tidak menerima email?</p>
          <button 
            onClick={handleResend}
            disabled={resending || countdown > 0}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#F97316] hover:text-[#EA580C] disabled:text-slate-400 disabled:cursor-not-allowed transition-colors"
          >
            {resending ? <Loader2 className="size-4 animate-spin" /> : <RefreshCw className={`size-4 ${countdown > 0 ? "opacity-50" : ""}`} />}
            {countdown > 0 ? `Kirim ulang dalam ${countdown}s` : 'Kirim Ulang Kode OTP'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FD] flex items-center justify-center p-6 py-10 relative overflow-hidden">
      {/* Background Ornaments */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-50 rounded-full blur-3xl opacity-60 translate-y-1/3 -translate-x-1/4"></div>
      
      <div className="relative z-10 w-full max-w-md">
        <Suspense fallback={<div className="flex items-center justify-center h-64"><Loader2 className="size-8 animate-spin text-[#1E1B4B]" /></div>}>
          <VerifyEmailForm />
        </Suspense>
      </div>
    </div>
  );
}
