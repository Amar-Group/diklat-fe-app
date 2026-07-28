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
  useCreateCurriculum,
  useUpdateCurriculum,
} from "@/features/curriculum/hooks/use-curriculum";
import { useCurriculumStore } from "@/features/curriculum/store";
import { useCourses } from "@/features/course/hooks/use-course";

const inputCls =
  "w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-card";

export function CurriculumFormModal() {
  const { isModalOpen, editingItem: editingRecord, closeModal } = useCurriculumStore();
  const { add } = useNotification();
  const createRecord = useCreateCurriculum();
  const updateRecord = useUpdateCurriculum();
  const { data: courses = [], isLoading: isLoadingCourses } = useCourses();

  const [formTitle, setFormTitle] = useState("");
  const [formCourseId, setFormCourseId] = useState("");
  const [formOrder, setFormOrder] = useState("0");

  useEffect(() => {
    if (isModalOpen) {
      if (editingRecord) {
        setFormTitle(editingRecord.title || "");
        setFormCourseId(String(editingRecord.course_id || ""));
        setFormOrder(String(editingRecord.order_sequence ?? 0));
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
      const payload = {
        title: formTitle,
        course_id: Number(formCourseId),
        order_sequence: Number(formOrder),
      };

      if (editingRecord) {
        await updateRecord.mutateAsync({ id: editingRecord.id, data: payload });
        add({ title: "Berhasil", message: "Kurikulum berhasil diperbarui.", variant: "success" });
      } else {
        await createRecord.mutateAsync(payload);
        add({ title: "Berhasil", message: "Kurikulum berhasil ditambahkan.", variant: "success" });
      }
      closeModal();
    } catch (error: any) {
      add({ title: "Gagal", message: error.message || "Terjadi kesalahan sistem.", variant: "danger" });
    }
  };

  const isSaving = createRecord.isPending || updateRecord.isPending;
  const isValid = formTitle.trim() && formCourseId;

  return (
    <Modal
      open={isModalOpen}
      onClose={() => !isSaving && closeModal()}
      className="max-w-md"
    >
      <ModalHeader>
        <ModalTitle>
          {editingRecord ? "Edit Kurikulum / Bab" : "Tambah Kurikulum / Bab"}
        </ModalTitle>
        <ModalClose onClose={() => !isSaving && closeModal()} />
      </ModalHeader>
      <ModalBody className="space-y-4">
        {/* Program Diklat */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">
            Program Diklat <span className="text-red-500">*</span>
          </label>
          <select
            value={formCourseId}
            onChange={(e) => setFormCourseId(e.target.value)}
            className={inputCls}
            disabled={isSaving || isLoadingCourses}
          >
            <option value="" disabled>
              {isLoadingCourses ? "Memuat program..." : "Pilih Program Diklat..."}
            </option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        {/* Judul Bab */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">
            Judul Bab / Materi <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            placeholder="Contoh: Keterampilan Dasar Komunikasi"
            className={inputCls}
            disabled={isSaving}
          />
        </div>

        {/* Urutan */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">
            Urutan Bab
          </label>
          <input
            type="number"
            min={0}
            value={formOrder}
            onChange={(e) => setFormOrder(e.target.value)}
            placeholder="Contoh: 1"
            className={inputCls}
            disabled={isSaving}
          />
          <p className="text-xs text-muted-foreground">
            Urutan menentukan urutan tampil kurikulum di katalog program.
          </p>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant="outline" onClick={() => closeModal()} disabled={isSaving}>
          Batal
        </Button>
        <Button onClick={handleSave} disabled={!isValid || isSaving}>
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
