import { LmsNavbar } from "@/components/layout/lms-navbar";
import { AuthGuard } from "@/components/auth/auth-guard";

export const metadata = {
  title: "My Learning | LMS Portal",
};

export default function LmsLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans">
        <LmsNavbar />
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
