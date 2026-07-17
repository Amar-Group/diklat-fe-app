"use client";

import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, ModalClose } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { useCreateQuestion, useUpdateQuestion } from "@/features/question/hooks/use-question";
import { Plus, Trash2 } from "lucide-react";

const formSchema = z.object({
  quiz_id: z.number(),
  question_text: z.string().min(1, "Pertanyaan harus diisi"),
  options: z.array(z.string().min(1, "Pilihan tidak boleh kosong")).min(2, "Minimal 2 pilihan"),
  correct_answer: z.string().min(1, "Kunci jawaban harus diisi"),
});

type FormValues = z.infer<typeof formSchema>;

interface QuestionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
  quizId: number;
}

export function QuestionFormModal({ isOpen, onClose, initialData, quizId }: QuestionFormModalProps) {
  const { mutate: createQuestion, isPending: isCreating } = useCreateQuestion();
  const { mutate: updateQuestion, isPending: isUpdating } = useUpdateQuestion();
  const isPending = isCreating || isUpdating;

  const defaultValues: FormValues = {
    quiz_id: quizId,
    question_text: "",
    options: ["", "", "", ""],
    correct_answer: "",
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options" as never,
  });

  useEffect(() => {
    if (initialData && isOpen) {
      const parsedOptions = typeof initialData.options === 'string' ? JSON.parse(initialData.options) : initialData.options;
      form.reset({
        quiz_id: initialData.quiz_id,
        question_text: initialData.question_text,
        options: parsedOptions || ["", "", "", ""],
        correct_answer: initialData.correct_answer,
      });
    } else {
      form.reset(defaultValues);
    }
  }, [initialData, isOpen, form]);

  const onSubmit = (data: FormValues) => {
    // Validasi correct answer ada di dalam options
    if (!data.options.includes(data.correct_answer)) {
      form.setError("correct_answer", { message: "Kunci jawaban harus sesuai dengan salah satu pilihan!" });
      return;
    }

    // Ubah options jadi JSON string karena tipe DB pakai varchar/json string
    const payload = {
      ...data,
      options: JSON.stringify(data.options)
    };

    if (initialData) {
      updateQuestion(
        { id: initialData.id, data: payload },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    } else {
      createQuestion(payload, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const optionsValues = form.watch("options");

  return (
    <Modal open={isOpen} onClose={onClose} className="sm:max-w-[600px] max-h-[90vh]">
      <ModalHeader>
        <div className="flex items-center justify-between w-full">
          <ModalTitle>{initialData ? "Edit Pertanyaan" : "Tambah Pertanyaan Baru"}</ModalTitle>
          <ModalClose onClose={onClose} />
        </div>
      </ModalHeader>
      <ModalBody>
        <form id="question-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-muted-foreground">Pertanyaan</label>
            <textarea
              {...form.register("question_text")}
              className="w-full p-3 rounded-xl border border-input bg-background min-h-[100px] focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              placeholder="Tuliskan pertanyaan di sini..."
            ></textarea>
            {form.formState.errors.question_text && (
              <p className="text-sm text-destructive">{form.formState.errors.question_text.message}</p>
            )}
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-muted-foreground">Pilihan Jawaban</label>
              <button 
                type="button" 
                onClick={() => append("")}
                className="text-xs text-primary font-semibold flex items-center hover:bg-primary/10 px-2 py-1 rounded transition-colors"
              >
                <Plus className="size-3 mr-1" /> Tambah Pilihan
              </button>
            </div>
            
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-muted-foreground font-bold">{String.fromCharCode(65 + index)}.</span>
                  </div>
                  <input
                    {...form.register(`options.${index}` as const)}
                    className="w-full py-2.5 pl-10 pr-4 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder={`Pilihan ${index + 1}`}
                  />
                </div>
                {fields.length > 2 && (
                  <button 
                    type="button" 
                    onClick={() => remove(index)}
                    className="p-2.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="size-4" />
                  </button>
                )}
              </div>
            ))}
            {form.formState.errors.options && (
              <p className="text-sm text-destructive">{form.formState.errors.options.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-muted-foreground">Kunci Jawaban</label>
            <select
              {...form.register("correct_answer")}
              className="w-full p-2.5 rounded-lg border border-input bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            >
              <option value="">-- Pilih Kunci Jawaban --</option>
              {optionsValues.map((opt, idx) => {
                if (!opt) return null;
                return (
                  <option key={idx} value={opt}>
                    {String.fromCharCode(65 + idx)}. {opt}
                  </option>
                );
              })}
            </select>
            {form.formState.errors.correct_answer && (
              <p className="text-sm text-destructive">{form.formState.errors.correct_answer.message}</p>
            )}
            <p className="text-xs text-muted-foreground">Pastikan untuk menulis pilihan terlebih dahulu sebelum memilih kunci jawaban.</p>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button type="button" variant="outline" onClick={onClose} disabled={isPending}>
          Batal
        </Button>
        <Button type="submit" form="question-form" disabled={isPending}>
          {isPending ? "Menyimpan..." : "Simpan Pertanyaan"}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
