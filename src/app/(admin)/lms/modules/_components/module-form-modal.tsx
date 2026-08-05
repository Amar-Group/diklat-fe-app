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
  useCreateModule,
  useUpdateModule,
} from "@/features/module/hooks/use-module";
import { useModuleStore } from "@/features/module/store";
import { useCourses } from "@/features/course/hooks/use-course";

const inputCls =
  "w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-card";

export function ModuleFormModal() {
  const { isModalOpen, editingItem: editingRecord, closeModal } = useModuleStore();
  const { add } = useNotification();
  const createRecord = useCreateModule();
  const updateRecord = useUpdateModule();
  const { data: courses = [], isLoading: isLoadingCourses } = useCourses();

  const [formTitle, setFormTitle] = useState("");
  const [formCourseId, setFormCourseId] = useState("");
  const [formOrder, setFormOrder] = useState("");

  useEffect(() => {
    if (isModalOpen) {
      if (editingRecord) {
        setFormTitle(editingRecord.title || "");
        setFormCourseId(String(editingRecord.course_id || ""));
        setFormOrder(String(editingRecord.order_sequence || 0));
      } else {
        setFormTitle("");
        setFormCourseId("");
        setFormOrder("0");
      }
    }
  }, [isModalOpen, editingRecord]);

  const handleSave = async () => {
    if (!formTitle.trim() || !formCourseId) return;
    try {
      const payload: any = {
        title: formTitle,
        course_id: Number(formCourseId),
        order_sequence: Number(formOrder),
      };

      if (editingRecord) {
        await updateRecord.mutateAsync({
          id: editingRecord.id,
          data: payload,
        });
        add({
          title: "Berhasil",
          message: "Module berhasil diperbarui.",
          variant: "success",
        });
      } else {
        await createRecord.mutateAsync(payload);
        add({
          title: "Berhasil",
          message: "Module berhasil ditambahkan.",
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

  const isSaving = createRecord.isPending || updateRecord.isPending;

  return (
    <Modal
      open={isModalOpen}
      onClose={() => !isSaving && closeModal()}
      className="max-w-md"
    >
      <ModalHeader>
        <ModalTitle>
          {editingRecord ? "Edit Module" : "Tambah Module"}
        </ModalTitle>
        <ModalClose onClose={() => !isSaving && closeModal()} />
      </ModalHeader>
      <ModalBody className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">
            Judul <span className="text-red-500">*</span>
          </label>
          <textarea
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            className={`${inputCls} min-h-[100px] resize-y whitespace-pre-wrap`}
            disabled={isSaving}
          />
        </div>
        
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">
            Program Diklat (Course) <span className="text-red-500">*</span>
          </label>
          <select
            value={formCourseId}
            onChange={(e) => setFormCourseId(e.target.value)}
            className={inputCls}
            disabled={isSaving || isLoadingCourses}
          >
            <option value="" disabled>Pilih Program Diklat...</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>{course.title}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">
            Urutan (Bab ke-)
          </label>
          <input
            type="number"
            value={formOrder}
            onChange={(e) => setFormOrder(e.target.value)}
            className={inputCls}
            disabled={isSaving}
          />
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
          disabled={!formTitle.trim() || !formCourseId || isSaving}
        >
          {isSaving
            ? "Menyimpan..."
            : editingRecord
            ? "Simpan Perubahan"
            : "Tambah"}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
