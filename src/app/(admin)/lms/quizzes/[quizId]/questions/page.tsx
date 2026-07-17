"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeft, Plus, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { useQuestions, useDeleteQuestion } from "@/features/question/hooks/use-question";
import { useQuiz } from "@/features/quiz/hooks/use-quiz";
import { QuestionFormModal } from "./_components/question-form-modal";

export default function QuestionManagementPage() {
  const { quizId } = useParams();
  const router = useRouter();
  
  const { data: questions = [], isLoading: isLoadingQuestions } = useQuestions(Number(quizId));
  const { data: quiz, isLoading: isLoadingQuiz } = useQuiz(Number(quizId));
  const { mutate: deleteQuestion } = useDeleteQuestion();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);

  if (isLoadingQuestions || isLoadingQuiz) {
    return <div className="p-8 text-center animate-pulse">Memuat Data...</div>;
  }

  if (!quiz) {
    return <div className="p-8 text-center text-red-500">Kuis tidak ditemukan.</div>;
  }

  const handleCreate = () => {
    setSelectedQuestion(null);
    setIsModalOpen(true);
  };

  const handleEdit = (question: any) => {
    setSelectedQuestion(question);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm("Apakah Anda yakin ingin menghapus pertanyaan ini?")) {
      deleteQuestion(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/lms/quizzes" className="p-2 hover:bg-muted rounded-full transition-colors">
          <ChevronLeft className="size-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Kelola Pertanyaan Kuis</h1>
          <p className="text-muted-foreground text-sm">Kuis: {quiz.title}</p>
        </div>
      </div>

      <div className="flex justify-between items-center bg-card p-4 rounded-xl border border-border shadow-sm">
        <div className="text-sm text-muted-foreground">
          Total Pertanyaan: <strong>{questions.length}</strong>
        </div>
        <button 
          onClick={handleCreate}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          <Plus className="size-4" /> Tambah Pertanyaan
        </button>
      </div>

      <div className="space-y-4">
        {questions.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-xl border border-dashed border-border">
            <p className="text-muted-foreground">Belum ada pertanyaan. Silakan tambahkan pertanyaan baru.</p>
          </div>
        ) : (
          questions.map((q: any, index: number) => {
            const options = Array.isArray(q.options) ? q.options : JSON.parse(q.options || "[]");
            return (
              <div key={q.id} className="bg-card p-6 rounded-xl border border-border shadow-sm relative group">
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEdit(q)} className="p-2 text-muted-foreground hover:text-primary bg-muted rounded-lg transition-colors">
                    <Edit className="size-4" />
                  </button>
                  <button onClick={() => handleDelete(q.id)} className="p-2 text-muted-foreground hover:text-destructive bg-muted rounded-lg transition-colors">
                    <Trash2 className="size-4" />
                  </button>
                </div>
                
                <div className="flex gap-4">
                  <div className="size-8 shrink-0 bg-primary/10 text-primary font-bold flex items-center justify-center rounded-full text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground text-lg mb-4 pr-20">{q.question_text}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {options.map((opt: string, i: number) => (
                        <div key={i} className={`p-3 rounded-lg border text-sm ${opt === q.correct_answer ? 'border-green-500 bg-green-500/10 text-green-600 font-medium' : 'border-border bg-muted/50'}`}>
                          <span className="font-bold mr-2 opacity-60">{String.fromCharCode(65 + i)}.</span> {opt}
                          {opt === q.correct_answer && <span className="float-right text-green-600 font-bold text-xs">Kunci Jawaban</span>}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {isModalOpen && (
        <QuestionFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          initialData={selectedQuestion}
          quizId={Number(quizId)}
        />
      )}
    </div>
  );
}
