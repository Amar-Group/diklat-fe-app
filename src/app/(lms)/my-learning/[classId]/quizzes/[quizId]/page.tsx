"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { useMyLearningQuiz, useSubmitQuiz } from "@/features/quiz/hooks/use-quiz-participant";

export default function QuizTakingPage() {
  const { classId, quizId } = useParams();
  const router = useRouter();
  
  const { data: quizData, isLoading } = useMyLearningQuiz(Number(quizId));
  const { mutate: submitQuiz, isPending } = useSubmitQuiz();
  
  const [answers, setAnswers] = useState<Record<number, string>>({});
  
  if (isLoading || !quizData) {
    return <div className="p-10 text-center animate-pulse">Memuat Kuis...</div>;
  }

  const { quiz, questions, last_attempt } = quizData;

  const handleOptionSelect = (questionId: number, option: string) => {
    if (last_attempt) return; // Prevent changing if already attempted
    setAnswers(prev => ({
      ...prev,
      [questionId]: option
    }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      alert("Harap jawab semua pertanyaan sebelum mengumpulkan.");
      return;
    }
    
    const formattedAnswers = Object.entries(answers).map(([qId, ans]) => ({
      question_id: Number(qId),
      answer: ans
    }));

    submitQuiz({ quizId: Number(quizId), answers: formattedAnswers }, {
      onSuccess: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  };

  if (last_attempt) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4">
        <Link href={`/my-learning/${classId}`} className="inline-flex items-center text-sm text-slate-500 hover:text-primary transition-colors font-medium mb-6">
          <ChevronLeft className="size-4 mr-1" /> Kembali ke Silabus
        </Link>
        
        <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-slate-100">
            <div className={`h-full ${last_attempt.is_passed ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: `${last_attempt.score}%` }}></div>
          </div>
          
          <div className="mt-4 mb-6 flex justify-center">
            {last_attempt.is_passed ? (
              <div className="size-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <CheckCircle2 className="size-12" />
              </div>
            ) : (
              <div className="size-24 bg-red-100 text-red-600 rounded-full flex items-center justify-center">
                <AlertCircle className="size-12" />
              </div>
            )}
          </div>
          
          <h1 className="text-3xl font-black text-slate-900 mb-2">
            {last_attempt.is_passed ? "Selamat, Anda Lulus!" : "Maaf, Anda Belum Lulus"}
          </h1>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">
            Anda telah menyelesaikan kuis <strong>{quiz.title}</strong>. Batas nilai kelulusan adalah {quiz.passing_grade}.
          </p>
          
          <div className="bg-slate-50 rounded-2xl p-6 inline-block min-w-[200px]">
            <div className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Nilai Anda</div>
            <div className={`text-5xl font-black ${last_attempt.is_passed ? 'text-green-600' : 'text-red-600'}`}>
              {last_attempt.score}
            </div>
          </div>
          
          <div className="mt-10">
            <Link href={`/my-learning/${classId}`} className="inline-flex items-center justify-center bg-slate-900 text-white font-bold px-8 py-3 rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
              Kembali Belajar
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Link href={`/my-learning/${classId}`} className="inline-flex items-center text-sm text-slate-500 hover:text-primary transition-colors font-medium mb-6">
        <ChevronLeft className="size-4 mr-1" /> Kembali ke Silabus
      </Link>
      
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900">{quiz.title}</h1>
            <p className="text-slate-500 mt-1">Jawablah semua pertanyaan di bawah ini dengan tepat.</p>
          </div>
          <div className="bg-primary/10 text-primary px-4 py-2 rounded-xl text-center">
            <div className="text-xs font-bold uppercase tracking-wider">Passing Grade</div>
            <div className="text-xl font-black">{quiz.passing_grade}</div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {questions.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-2xl border border-slate-200">
             <p className="text-slate-500">Belum ada pertanyaan untuk kuis ini.</p>
          </div>
        ) : (
          questions.map((q: any, index: number) => {
            const options = Array.isArray(q.options) ? q.options : JSON.parse(q.options || "[]");
            
            return (
              <div key={q.id} className="bg-white rounded-2xl p-6 md:p-8 border border-slate-200 shadow-sm">
                <div className="flex gap-4">
                  <div className="size-10 shrink-0 bg-slate-100 text-slate-700 font-bold flex items-center justify-center rounded-full">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900 mb-6">{q.question_text}</h3>
                    <div className="space-y-3">
                      {options.map((opt: string, i: number) => (
                        <label 
                          key={i} 
                          className={`flex items-start p-4 border rounded-xl cursor-pointer transition-all ${answers[q.id] === opt ? 'border-primary bg-primary/5 shadow-sm' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}
                        >
                          <div className="flex items-center h-5">
                            <input
                              type="radio"
                              name={`question-${q.id}`}
                              value={opt}
                              checked={answers[q.id] === opt}
                              onChange={() => handleOptionSelect(q.id, opt)}
                              className="w-4 h-4 text-primary bg-slate-100 border-slate-300 focus:ring-primary"
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <span className="font-medium text-slate-900">{opt}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {questions.length > 0 && (
        <div className="mt-8 flex justify-end">
          <button 
            onClick={handleSubmit}
            disabled={isPending || Object.keys(answers).length < questions.length}
            className="bg-primary text-white font-bold px-10 py-4 rounded-xl hover:bg-primary/90 transition-all shadow-lg shadow-primary/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Mengumpulkan..." : "Kumpulkan Jawaban"}
          </button>
        </div>
      )}
    </div>
  );
}
