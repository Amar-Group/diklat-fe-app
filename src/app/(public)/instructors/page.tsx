import { Users, CheckCircle } from "lucide-react";

export const metadata = {
  title: "Pengajar / Nara Sumber | PT Harapan Amar Jaya",
  description: "Daftar kategori pengajar dan narasumber profesional kami.",
};

export default function InstructorsPage() {
  const instructors = [
    {
      title: "Pakar/Professional dalam bidang keahliannya",
      description: "Praktisi berpengalaman luas yang ahli dalam memecahkan masalah nyata di dunia kerja."
    },
    {
      title: "Akademisi PTN/PTS",
      description: "Dosen dan peneliti ahli dari berbagai Perguruan Tinggi terkemuka dengan dasar teoretis yang kuat."
    },
    {
      title: "Widyaiswara dalam bidang keahliannya",
      description: "Pegawai Negeri Sipil yang diangkat sebagai pejabat fungsional dengan tugas mendidik, mengajar, dan melatih."
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-[#FAFAF9] min-h-[70vh]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center h-20 w-20 rounded-2xl bg-indigo-50 text-indigo-600 mb-8">
            <Users className="h-10 w-10" />
          </div>
          <h1 className="font-display font-bold text-3xl md:text-5xl text-[#1E1B4B] mb-6">
            Pengajar & Nara Sumber
          </h1>
          <div className="h-1 w-20 bg-[#F97316] mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Pelatihan kami dipandu oleh tenaga pendidik dan narasumber pilihan yang terbagi dalam kategori unggulan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {instructors.map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-10 w-10 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <h3 className="font-bold text-[#1E1B4B] text-lg leading-tight">{item.title}</h3>
              </div>
              <p className="text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
