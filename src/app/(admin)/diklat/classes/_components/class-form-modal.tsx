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
  useCreateClass,
  useUpdateClass,
} from "@/features/class/hooks/use-class";
import { useClassStore } from "@/features/class/store";
import { useCourses } from "@/features/course/hooks/use-course";

const inputCls =
  "w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-card";

export function ClassFormModal() {
  const { isModalOpen, editingItem: editingClass, closeModal } = useClassStore();
  const { data: courses = [] } = useCourses();
  const { add } = useNotification();
  const createClass = useCreateClass();
  const updateClass = useUpdateClass();

  const [formBatchName, setFormBatchName] = useState("");
  const [formCourseId, setFormCourseId] = useState("");
  const [formMethod, setFormMethod] = useState("lms");
  const [formStartDate, setFormStartDate] = useState("");
  const [formEndDate, setFormEndDate] = useState("");
  const [formPrice, setFormPrice] = useState("");

  useEffect(() => {
    if (isModalOpen) {
      if (editingClass) {
        setFormBatchName(editingClass.batch_name || "");
        setFormCourseId(editingClass.course_id ? String(editingClass.course_id) : "");
        setFormMethod(editingClass.method || "lms");
        setFormStartDate(editingClass.start_date ? editingClass.start_date.split("T")[0] : "");
        setFormEndDate(editingClass.end_date ? editingClass.end_date.split("T")[0] : "");
        setFormPrice(editingClass.price ? String(editingClass.price) : "");
      } else {
        setFormBatchName("");
        setFormCourseId("");
        setFormMethod("lms");
        setFormStartDate("");
        setFormEndDate("");
        setFormPrice("");
      }
    }
  }, [isModalOpen, editingClass]);

  const handleSave = async () => {
    if (!formBatchName.trim() || !formCourseId.trim()) return;
    try {
      const payload: any = {
        batch_name: formBatchName,
        course_id: Number(formCourseId),
        method: formMethod,
        start_date: formStartDate || null,
        end_date: formEndDate || null,
        price: formPrice ? Number(formPrice) : null,
      };

      if (editingClass) {
        await updateClass.mutateAsync({
          id: editingClass.id,
          data: payload,
        });
        add({
          title: "Berhasil",
          message: "Kelas berhasil diperbarui.",
          variant: "success",
        });
      } else {
        await createClass.mutateAsync(payload);
        add({
          title: "Berhasil",
          message: "Kelas berhasil ditambahkan.",
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

  const isSaving = createClass.isPending || updateClass.isPending;

  return (
    <Modal
      open={isModalOpen}
      onClose={() => !isSaving && closeModal()}
      className="max-w-md"
    >
      <ModalHeader>
        <ModalTitle>
          {editingClass ? "Edit Kelas" : "Tambah Kelas"}
        </ModalTitle>
        <ModalClose onClose={() => !isSaving && closeModal()} />
      </ModalHeader>
      <ModalBody className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">
            Nama Batch <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formBatchName}
            onChange={(e) => setFormBatchName(e.target.value)}
            className={inputCls}
            disabled={isSaving}
          />
        </div>
        
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">
            Program / Course <span className="text-red-500">*</span>
          </label>
          <select
              className={inputCls}
              value={formCourseId}
              onChange={(e) => setFormCourseId(e.target.value)}
              disabled={isSaving}
          >
              <option value="">- Pilih Course -</option>
              {courses.map((c: any) => (
                  <option key={c.id} value={c.id}>{c.title}</option>
              ))}
          </select>
        </div>
        
        <div className="space-y-1.5">
            <label className="block text-sm font-medium text-foreground">
                Metode Pembelajaran
            </label>
            <select
                value={formMethod}
                onChange={(e) => setFormMethod(e.target.value)}
                className={inputCls}
                disabled={isSaving}
            >
                <option value="lms">LMS (Mandiri)</option>
                <option value="online">Online (Zoom/Meet)</option>
                <option value="offline">Offline (Tatap Muka)</option>
                <option value="hybrid">Hybrid</option>
            </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-foreground">
                Tanggal Mulai
              </label>
              <input
                type="date"
                value={formStartDate}
                onChange={(e) => setFormStartDate(e.target.value)}
                className={inputCls}
                disabled={isSaving}
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-foreground">
                Tanggal Selesai
              </label>
              <input
                type="date"
                value={formEndDate}
                onChange={(e) => setFormEndDate(e.target.value)}
                className={inputCls}
                disabled={isSaving}
              />
            </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">
            Harga (Opsional)
          </label>
          <input
            type="number"
            value={formPrice}
            onChange={(e) => setFormPrice(e.target.value)}
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
          disabled={!formBatchName.trim() || !formCourseId.trim() || isSaving}
        >
          {isSaving
            ? "Menyimpan..."
            : editingClass
            ? "Simpan Perubahan"
            : "Tambah"}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
