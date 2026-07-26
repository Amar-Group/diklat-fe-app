import Image from "next/image";

export const metadata = {
  title: "Pengajar / Nara Sumber | PT Harapan Amar Jaya",
  description: "Daftar kategori pengajar dan narasumber profesional kami.",
};

export interface InstructorProfile {
  id: string;
  name: string;
  title: string;
  category: string;
  image: string;
  bio: string;
  badges: string[];
}

export default function InstructorsPage() {
  const categories = [
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

  // Default profile data (1 default item for initial/placeholder state)
  const defaultProfiles: InstructorProfile[] = [
    {
      id: "1",
      name: "Drs. Harun Arsyad, S.H, M.H.",
      title: "Widyaiswara Ahli Utama BKN",
      category: "Widyaiswara",
      image: "assets/images/profil/dirut-pak-amar.svg",
      bio: "Pengalaman 31+ tahun di BKN. Pakar hukum kepegawaian ASN, manajemen talenta, dan diklat kebudayaan kerja.",
      badges: ["Hukum ASN", "Diklat PNS", "Manajemen Talenta"]
    }
  ];

  return (
    <div className="pt-24 sm:pt-32 pb-0 bg-[#FAFAF9] min-h-[70vh]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        
        {/* Header Section: 2 Columns on md/lg */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center mb-14 sm:mb-18">
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

        {/* Instructors Category Grid - Frameless Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-16 sm:mb-20">
          {categories.map((item, index) => (
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

      {/* SVG Wave Divider Top */}
      <div className="w-full overflow-hidden leading-none -mb-1">
        <svg
          className="relative block w-full h-10 sm:h-14 md:h-18 lg:h-24"
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 Q600,0 1200,40 L1200,100 L0,100 Z"
            fill="#0F172A"
          ></path>
        </svg>
      </div>

      {/* Section Profile Pengajar & Narasumber (Dark Contrast Section) */}
      <section className="bg-[#0F172A] pt-8 pb-14 sm:pb-20 shadow-2xl relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white mb-3 leading-tight">
              Daftar Tenaga Pengajar & Instruktur
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              Mengenal lebih dekat para profesional, widyaiswara, dan akademisi kami.
            </p>
          </div>

          {/* Compact Profiles Grid: 6 Desktop / 4 Tablet / 2 HP */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
            {defaultProfiles.map((instructor) => (
              <div
                key={instructor.id}
                className="bg-white rounded-2xl p-2.5 sm:p-3 border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col group"
              >
                {/* Compact Photo Container */}
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden mb-2.5 bg-slate-900">
                  <Image
                    src={instructor.image}
                    alt={instructor.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Category Overlay */}
                  <div className="absolute top-1.5 left-1.5 z-10">
                    <span className="px-2 py-0.5 rounded-md bg-slate-950/80 backdrop-blur-md text-[9px] sm:text-[10px] font-semibold text-white border border-white/10">
                      {instructor.category}
                    </span>
                  </div>
                </div>

                {/* Compact Content */}
                <div className="flex flex-col flex-1">
                  <h3 className="font-display font-bold text-xs sm:text-sm text-[#1E1B4B] leading-snug mb-0.5 group-hover:text-[#F97316] transition-colors line-clamp-1">
                    {instructor.name}
                  </h3>
                  <p className="text-[10px] sm:text-xs font-semibold text-[#F97316] mb-1.5 line-clamp-1">
                    {instructor.title}
                  </p>

                  <p className="text-slate-500 text-[10px] sm:text-xs leading-normal mb-2.5 line-clamp-2 flex-1">
                    {instructor.bio}
                  </p>

                  {/* Compact Badges */}
                  <div className="flex flex-wrap gap-1 pt-2 border-t border-slate-100">
                    {instructor.badges.map((badge, idx) => (
                      <span
                        key={idx}
                        className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[9px] sm:text-[10px] font-medium"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SVG Wave Divider Bottom */}
      <div className="w-full overflow-hidden leading-none -mt-1 bg-[#0F172A]">
        <svg
          className="relative block w-full h-10 sm:h-14 md:h-18 lg:h-24"
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,15 Q600,0 1200,80 L1200,100 L0,100 Z"
            fill="#FAFAF9"
          ></path>
        </svg>
      </div>

      {/* New Light Section: Standar Kualitas & Kolaborasi Pengajaran (Frameless Responsive) */}
      <section className="bg-[#FAFAF9] py-14 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Image Asset ins-stand.webp */}
            <div className="lg:col-span-5 w-full flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md aspect-[4/3]">
                <Image
                  src="/assets/images/profil/instruktur/ins-stand.webp"
                  alt="Standar Pengajar Terakreditasi"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* Right Column: Text Content, Span Highlights & Mailto Button */}
            <div className="lg:col-span-7 text-left">
              <div className="inline-block px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-4">
                <span className="text-xs sm:text-sm font-semibold text-[#1E1B4B] tracking-wide uppercase">
                  Jaminan Mutu Pengajaran
                </span>
              </div>

              <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-[#1E1B4B] mb-4 leading-tight">
                Standar Pengajar Terakreditasi & Berpengalaman Industri
              </h2>

              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                <p>
                  Setiap narasumber kami melalui seleksi ketat untuk memastikan materi berkualitas tinggi yang sesuai dengan <span className="px-1.5 py-0.5 bg-amber-100/90 text-amber-950 font-semibold rounded-md border border-amber-200/70 inline-block my-0.5">Standar Kompetensi Kerja Nasional (SKKNI)</span> serta diampu oleh <span className="px-1.5 py-0.5 bg-indigo-100/90 text-[#1E1B4B] font-bold rounded-md border border-indigo-200/70 inline-block my-0.5">100% Praktisi Tersertifikasi BNSP & BKN</span>.
                </p>
                <p>
                  Metode pembelajaran dikemas dengan <span className="px-1.5 py-0.5 bg-orange-100 text-orange-950 font-bold rounded-md border border-orange-200/80 inline-block my-0.5">Metode Praktis & Simulasi Riil</span>, diskusi interaktif, serta evaluasi mutu secara berkala guna mendukung peningkatan kinerja nyata.
                </p>
              </div>

              <div className="pt-5 border-t border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-base text-[#1E1B4B]">
                    Ingin Mengajukan Pelatihan Kustom Instansi?
                  </h4>
                  <p className="text-xs text-slate-500">
                    Tim kami siap mendampingi perencanaan program sesuai kebutuhan organisasi Anda.
                  </p>
                </div>
                <a
                  href="mailto:ptharapanamarjaya@gmail.com"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#1E1B4B] hover:bg-[#312E81] text-white font-semibold text-xs sm:text-sm transition-all shadow-md shrink-0"
                >
                  Hubungi via Email
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}





