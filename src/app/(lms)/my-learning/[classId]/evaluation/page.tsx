"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Star, MessageSquare } from "lucide-react";
import { useMyLearningEvaluation, useSubmitEvaluation } from "@/features/evaluation/hooks/use-evaluation-participant";

export default function MyLearningEvaluationPage() {
  const { classId } = useParams();
  const router = useRouter();
  
  const { data: existingEvaluation, isLoading } = useMyLearningEvaluation(Number(classId));
  const { mutate: submitEval, isPending } = useSubmitEvaluation();

  const [instructorRating, setInstructorRating] = useState(0);
  const [materialRating, setMaterialRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  
  // Hover states
  const [hoverInstructor, setHoverInstructor] = useState(0);
  const [hoverMaterial, setHoverMaterial] = useState(0);

  if (isLoading) {
    return <div className="p-10 text-center animate-pulse text-slate-500 font-medium">Memuat Data...</div>;
  }

  const isSubmitted = !!existingEvaluation;
  
  const displayInstructorRating = isSubmitted ? existingEvaluation.instructor_rating : instructorRating;
  const displayMaterialRating = isSubmitted ? existingEvaluation.material_rating : materialRating;
  const displayReviewText = isSubmitted ? existingEvaluation.review_text : reviewText;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (instructorRating === 0 || materialRating === 0) {
      alert("Harap berikan rating bintang (1-5) untuk Instruktur dan Materi.");
      return;
    }
    
    submitEval(
      { classId: Number(classId), data: { instructor_rating: instructorRating, material_rating: materialRating, review_text: reviewText } },
      {
        onSuccess: () => {
          alert("Terima kasih! Ulasan Anda berhasil dikirim.");
        },
        onError: (err: any) => {
          alert(err.message || "Gagal mengirim ulasan");
        }
      }
    );
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4 mb-6">
        <Link href={`/my-learning/${classId}`} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
          <ChevronLeft className="size-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Ulasan & Testimoni Kelas</h1>
          <p className="text-slate-500 text-sm">Bagikan pengalaman belajar Anda di kelas ini.</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        {isSubmitted ? (
          <div className="bg-green-50/50 p-6 border-b border-green-100 flex items-center gap-4">
            <div className="size-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
              <MessageSquare className="size-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-green-800">Anda sudah memberikan ulasan</h2>
              <p className="text-sm text-green-600">Terima kasih telah membagikan pengalaman Anda!</p>
            </div>
          </div>
        ) : (
          <div className="bg-amber-50/50 p-6 border-b border-amber-100">
            <h2 className="text-lg font-bold text-slate-900 mb-1">Formulir Evaluasi</h2>
            <p className="text-sm text-slate-500">Nilai kualitas pengajaran dan materi. Ulasan Anda sangat berharga bagi kami.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
          <div className="space-y-4">
            <label className="block text-sm font-bold text-slate-700">1. Bagaimana penilaian Anda terhadap Instruktur?</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  disabled={isSubmitted}
                  className={`p-1 transition-all ${isSubmitted ? 'cursor-default' : 'hover:scale-110 cursor-pointer'}`}
                  onMouseEnter={() => !isSubmitted && setHoverInstructor(star)}
                  onMouseLeave={() => !isSubmitted && setHoverInstructor(0)}
                  onClick={() => !isSubmitted && setInstructorRating(star)}
                >
                  <Star 
                    className={`size-10 ${
                      star <= (hoverInstructor || displayInstructorRating) 
                        ? "fill-amber-400 text-amber-400" 
                        : "text-slate-200"
                    } transition-colors`} 
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-bold text-slate-700">2. Bagaimana penilaian Anda terhadap Materi Pembelajaran?</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  disabled={isSubmitted}
                  className={`p-1 transition-all ${isSubmitted ? 'cursor-default' : 'hover:scale-110 cursor-pointer'}`}
                  onMouseEnter={() => !isSubmitted && setHoverMaterial(star)}
                  onMouseLeave={() => !isSubmitted && setHoverMaterial(0)}
                  onClick={() => !isSubmitted && setMaterialRating(star)}
                >
                  <Star 
                    className={`size-10 ${
                      star <= (hoverMaterial || displayMaterialRating) 
                        ? "fill-amber-400 text-amber-400" 
                        : "text-slate-200"
                    } transition-colors`} 
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-bold text-slate-700">3. Ceritakan pengalaman Anda (Testimoni)</label>
            <textarea
              disabled={isSubmitted}
              value={displayReviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Sangat bermanfaat dan instruktur menjelaskan dengan sangat baik..."
              className="w-full min-h-[150px] p-4 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-y text-slate-700 disabled:opacity-70 disabled:bg-slate-100"
            />
          </div>

          {!isSubmitted && (
            <div className="pt-4 flex items-center gap-4 border-t border-slate-100">
              <button
                type="submit"
                disabled={isPending}
                className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all disabled:opacity-50"
              >
                {isPending ? "Mengirim..." : "Kirim Ulasan"}
              </button>
              <button
                type="button"
                onClick={() => router.push(`/my-learning/${classId}`)}
                className="text-slate-500 hover:text-slate-700 font-medium py-3 px-4"
              >
                Nanti Saja
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
