"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, ModalClose } from "@/components/ui/modal";
import { useNotification } from "@/components/ui/notification";
import { useCreateQuiz, useUpdateQuiz } from "@/features/quiz/hooks/use-quiz";
import { useQuizStore } from "@/features/quiz/store";
import { useModules } from "@/features/module/hooks/use-module";

const inputCls = "w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-card";

export function QuizFormModal() {
  const { isModalOpen, editingItem: editingRecord, closeModal } = useQuizStore();
  const { add } = useNotification();
  const createRecord = useCreateQuiz();
  const updateRecord = useUpdateQuiz();
  const { data: modules = [] } = useModules();

  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (isModalOpen) {
      if (editingRecord) {
        setFormData(editingRecord);
      } else {
        setFormData({});
      }
    }
  }, [isModalOpen, editingRecord]);

  const handleSave = async () => {
    try {
      const payload = {
        module_id: Number(formData.module_id),
        title: formData.title,
        passing_grade: Number(formData.passing_grade),
      };

      if (editingRecord) {
        await updateRecord.mutateAsync({ id: editingRecord.id, data: payload });
        add({ title: "Berhasil", message: "Data berhasil diperbarui.", variant: "success" });
      } else {
        await createRecord.mutateAsync(payload);
        add({ title: "Berhasil", message: "Data berhasil ditambahkan.", variant: "success" });
      }
      closeModal();
    } catch (error: any) {
      add({ title: "Gagal", message: error.message || "Terjadi kesalahan sistem.", variant: "danger" });
    }
  };

  const isSaving = createRecord.isPending || updateRecord.isPending;

  return (
    <Modal open={isModalOpen} onClose={() => !isSaving && closeModal()} className="max-w-md">
      <ModalHeader>
        <ModalTitle>{editingRecord ? "Edit Bank Soal & Kuis" : "Tambah Bank Soal & Kuis"}</ModalTitle>
        <ModalClose onClose={() => !isSaving && closeModal()} />
      </ModalHeader>
      <ModalBody className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium">Modul ID</label>
          <select value={formData.module_id || ""} onChange={(e) => setFormData({...formData, module_id: e.target.value})} className={inputCls} disabled={isSaving}>
            <option value="">-- Pilih Modul --</option>
            {modules.map((m: any) => (
              <option key={m.id} value={m.id}>{m.title}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium">Judul Kuis</label>
          <input type="text" value={formData.title || ""} onChange={(e) => setFormData({...formData, title: e.target.value})} className={inputCls} disabled={isSaving} />
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium">Batas Lulus (0-100)</label>
          <input type="number" value={formData.passing_grade || ""} onChange={(e) => setFormData({...formData, passing_grade: e.target.value})} className={inputCls} disabled={isSaving} />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant="outline" onClick={() => closeModal()} disabled={isSaving}>Batal</Button>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? "Menyimpan..." : editingRecord ? "Simpan Perubahan" : "Tambah"}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
