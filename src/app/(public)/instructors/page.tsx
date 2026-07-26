import Image from "next/image";

export const metadata = {
  title: "Pengajar / Nara Sumber | PT Harapan Amar Jaya",
  description: "Daftar kategori pengajar dan narasumber profesional kami.",
};

export default function InstructorsPage() {
  const instructors = [
    {
      title: "Pakar/Professional dalam bidang keahliannya",
      description: "Praktisi berpengalaman luas yang ahli dalam memecahkan masalah nyata di dunia kerja.",
      image: "/assets/images/profil/instruktur/ins-Profesional.webp"
    },
    {
      title: "Akademisi PTN/PTS",
      description: "Dosen dan peneliti ahli dari berbagai Perguruan Tinggi terkemuka dengan dasar teoretis yang kuat.",
      image: "/assets/images/profil/instruktur/Ins-akademik.webp"
    },
    {
      title: "Widyaiswara dalam bidang keahliannya",
      description: "Pegawai Negeri Sipil yang diangkat sebagai pejabat fungsional dengan tugas mendidik, mengajar, dan melatih.",
      image: "/assets/images/profil/instruktur/Ins-widya.webp"
    }
  ];

  return (
    <div className="pt-24 sm:pt-32 pb-16 sm:pb-24 bg-[#FAFAF9] min-h-[70vh]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Header Section: 2 Columns on md/lg */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center mb-16 sm:mb-20">
          {/* Text Side (Left) */}
          <div className="md:col-span-7 text-left">
            <div className="inline-block px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-4">
              <span className="text-xs sm:text-sm font-semibold text-[#1E1B4B] tracking-wide uppercase">
                Tim Pengajar
              </span>
            </div>
            
            <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#1E1B4B] mb-4 sm:mb-6 leading-tight">
              Pengajar & Nara Sumber
            </h1>
            
            <div className="h-1.5 w-20 bg-[#F97316] rounded-full mb-6"></div>
            
            <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl">
              Pelatihan kami dipandu oleh tenaga pendidik dan narasumber pilihan yang terbagi dalam kategori unggulan.
            </p>
          </div>

          {/* Image Side (Right) */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/3] sm:aspect-square md:aspect-square">
              <Image
                src="/assets/images/profil/instruktur/core-Instuktur.webp"
                alt="Pengajar & Nara Sumber"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* Instructors Grid - Frameless Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {instructors.map((item, index) => (
            <div 
              key={index} 
              className="flex flex-col group transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-2xl"
                />
              </div>

              {/* Title & Description */}
              <h3 className="font-display font-bold text-[#1E1B4B] text-lg sm:text-xl leading-snug mb-2 sm:mb-3 group-hover:text-[#F97316] transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

