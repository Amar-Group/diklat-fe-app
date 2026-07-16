"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
  ModalClose,
} from "@/components/ui/modal";
import { useNotification } from "@/components/ui/notification";
import {
  useCreateCourse,
  useUpdateCourse,
} from "@/features/course/hooks/use-course";
import { useCourseStore } from "@/features/course/store";

const inputCls =
  "w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-card";

export function CourseFormModal() {
  const { isModalOpen, editingItem: editingCourse, closeModal } = useCourseStore();
  const { add } = useNotification();
  const createCourse = useCreateCourse();
  const updateCourse = useUpdateCourse();

  const [formTitle, setFormTitle] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formComp, setFormComp] = useState("");
  const [formActive, setFormActive] = useState(true);

  useEffect(() => {
    if (isModalOpen) {
      if (editingCourse) {
        setFormTitle(editingCourse.title || "");
        setFormDesc(editingCourse.description || "");
        setFormComp(editingCourse.competencies || "");
        setFormActive(editingCourse.is_active ?? true);
      } else {
        setFormTitle("");
        setFormDesc("");
        setFormComp("");
        setFormActive(true);
      }
    }
  }, [isModalOpen, editingCourse]);

  const handleSave = async () => {
    if (!formTitle.trim()) return;
    try {
      const payload = {
        title: formTitle,
        description: formDesc || null,
        competencies: formComp || null,
        is_active: formActive,
      };

      if (editingCourse) {
        await updateCourse.mutateAsync({
          id: editingCourse.id,
          data: payload,
        });
        add({
          title: "Berhasil",
          message: "Course berhasil diperbarui.",
          variant: "success",
        });
      } else {
        await createCourse.mutateAsync(payload);
        add({
          title: "Berhasil",
          message: "Course berhasil ditambahkan.",
          variant: "success",
        });
      }
      closeModal();
    } catch (error: any) {
      add({
        title: "Gagal",
        message: error.message || "Terjadi kesalahan sistem.",
        variant: "danger",
      });
    }
  };

  const isSaving = createCourse.isPending || updateCourse.isPending;

  return (
    <Modal
      open={isModalOpen}
      onClose={() => !isSaving && closeModal()}
      className="max-w-md"
    >
      <ModalHeader>
        <ModalTitle>
          {editingCourse ? "Edit Course" : "Tambah Course"}
        </ModalTitle>
        <ModalClose onClose={() => !isSaving && closeModal()} />
      </ModalHeader>
      <ModalBody className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">
            Judul Course <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            placeholder="Contoh: Pelatihan Kepemimpinan Dasar"
            className={inputCls}
            disabled={isSaving}
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">
            Deskripsi
          </label>
          <textarea
            value={formDesc}
            onChange={(e) => setFormDesc(e.target.value)}
            placeholder="Deskripsi course..."
            className={inputCls}
            rows={3}
            disabled={isSaving}
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">
            Kompetensi
          </label>
          <input
            type="text"
            value={formComp}
            onChange={(e) => setFormComp(e.target.value)}
            placeholder="Contoh: Kepemimpinan, Komunikasi"
            className={inputCls}
            disabled={isSaving}
          />
        </div>
        <div className="flex items-center space-x-2 pt-2">
          <input
            type="checkbox"
            id="is_active"
            checked={formActive}
            onChange={(e) => setFormActive(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            disabled={isSaving}
          />
          <label htmlFor="is_active" className="cursor-pointer text-sm font-medium text-foreground">Course Aktif</label>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button
          variant="outline"
          onClick={() => closeModal()}
          disabled={isSaving}
        >
          Batal
        </Button>
        <Button
          onClick={handleSave}
          disabled={!formTitle.trim() || isSaving}
        >
          {isSaving
            ? "Menyimpan..."
            : editingCourse
            ? "Simpan Perubahan"
            : "Tambah"}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
