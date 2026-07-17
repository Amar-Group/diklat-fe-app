"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Clock, Calendar, Video, MapPin, CheckCircle, AlertCircle } from "lucide-react";
import { useMyLearningSessions } from "@/features/session/hooks/use-session-participant";
import { useCheckIn } from "@/features/attendance/hooks/use-attendance-participant";

export default function MyLearningSessionsPage() {
  const { classId } = useParams();
  const { data: sessions, isLoading } = useMyLearningSessions(Number(classId));
  const { mutate: checkIn, isPending } = useCheckIn();

  if (isLoading) {
    return <div className="p-10 text-center animate-pulse text-muted-foreground font-medium">Memuat Jadwal Sesi...</div>;
  }

  const handleCheckIn = (sessionId: number) => {
    checkIn(
      { sessionId, method: 'manual' },
      {
        onSuccess: () => {
          alert("Absensi berhasil dicatat!");
        },
        onError: (err: any) => {
          alert(err.message || "Gagal melakukan absensi");
        }
      }
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href={`/my-learning/${classId}`} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ChevronLeft className="size-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Jadwal Sesi & Absensi</h1>
          <p className="text-slate-500 text-sm">Lihat jadwal kegiatan dan lakukan check-in kehadiran.</p>
        </div>
      </div>

      <div className="grid gap-4">
        {(!sessions || sessions.length === 0) ? (
          <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-300">
            <Calendar className="size-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500">Belum ada jadwal sesi untuk kelas ini.</p>
          </div>
        ) : (
          sessions.map((session: any, idx: number) => {
            const startDate = new Date(session.start_time);
            const endDate = new Date(session.end_time);
            const now = new Date();
            
            // Logika sederhana: sesi aktif jika sekarang >= startDate - 30 menit dan <= endDate
            const isSessionActive = now >= new Date(startDate.getTime() - 30 * 60000) && now <= endDate;
            const isPastSession = now > endDate;
            
            const hasAttended = !!session.attendance;

            return (
              <div key={session.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all hover:border-primary/30 shadow-sm">
                <div className="p-6 bg-slate-50/50 border-b border-slate-100 flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-slate-900">{session.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2.5 py-0.5 text-xs font-bold rounded-md uppercase tracking-wider ${
                          session.type === 'online' ? 'bg-blue-500/10 text-blue-600' :
                          session.type === 'offline' ? 'bg-orange-500/10 text-orange-600' :
                          'bg-green-500/10 text-green-600'
                        }`}>
                          {session.type}
                        </span>
                        {isSessionActive && (
                          <span className="flex items-center text-xs font-bold text-red-500 animate-pulse">
                            <span className="size-2 bg-red-500 rounded-full mr-1.5"></span> Sedang Berlangsung
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 text-sm text-slate-500">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="size-4" />
                        {startDate.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="size-4" />
                        {startDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} - {endDate.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>

                    {session.type === 'online' && session.meeting_url && (
                      <div className="flex items-center gap-1.5 text-sm">
                        <Video className="size-4 text-primary" />
                        <a href={session.meeting_url} target="_blank" rel="noreferrer" className="text-primary hover:underline font-medium">
                          Link Video Conference (Meeting)
                        </a>
                      </div>
                    )}
                    {session.type === 'offline' && (
                      <div className="flex items-center gap-1.5 text-sm">
                        <MapPin className="size-4 text-orange-500" />
                        <span className="font-medium text-orange-600">Lokasi Terjadwal (Tatap Muka)</span>
                      </div>
                    )}
                  </div>

                  <div className="w-full md:w-auto pt-4 md:pt-0 md:pl-6 flex flex-col items-end md:items-center justify-center min-w-[180px]">
                    {hasAttended ? (
                      <div className="flex flex-col items-end md:items-center text-green-600">
                        <div className="flex items-center gap-2 mb-1">
                          <CheckCircle className="size-6" />
                          <span className="font-bold text-lg">Sudah Hadir</span>
                        </div>
                        <span className="text-xs font-medium bg-green-500/10 px-2 py-1 rounded">
                          Waktu Absen: {new Date(session.attendance.check_in_time).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    ) : isSessionActive ? (
                      <button 
                        onClick={() => handleCheckIn(session.id)}
                        disabled={isPending}
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-8 rounded-xl shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5 disabled:opacity-50"
                      >
                        {isPending ? "Memproses..." : "Hadir / Check-In"}
                      </button>
                    ) : isPastSession ? (
                      <div className="flex flex-col items-end md:items-center text-slate-400">
                        <div className="flex items-center gap-2 mb-1">
                          <AlertCircle className="size-6 opacity-50" />
                          <span className="font-bold text-lg">Sesi Berakhir</span>
                        </div>
                        <span className="text-xs font-medium text-red-500 bg-red-50 px-2 py-1 rounded">Tidak Hadir (Alpa)</span>
                      </div>
                    ) : (
                      <div className="text-center text-slate-500 text-sm font-medium bg-slate-100 py-2 px-6 rounded-lg w-full">
                        Belum Waktunya
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
