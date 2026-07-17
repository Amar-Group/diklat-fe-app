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
  useCreateMaterial,
  useUpdateMaterial,
} from "@/features/material/hooks/use-material";
import { useMaterialStore } from "@/features/material/store";
import { useModules } from "@/features/module/hooks/use-module";

const inputCls =
  "w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-card";

export function MaterialFormModal() {
  const { isModalOpen, editingItem: editingRecord, closeModal } = useMaterialStore();
  const { add } = useNotification();
  const createRecord = useCreateMaterial();
  const updateRecord = useUpdateMaterial();
  const { data: modules = [], isLoading: isLoadingModules } = useModules();

  const [formTitle, setFormTitle] = useState("");
  const [formModuleId, setFormModuleId] = useState("");
  const [formType, setFormType] = useState("video");
  const [formFileUrl, setFormFileUrl] = useState("");
  const [formDuration, setFormDuration] = useState("");
  const [formSkippable, setFormSkippable] = useState("false");

  useEffect(() => {
    if (isModalOpen) {
      if (editingRecord) {
        setFormTitle(editingRecord.title || "");
        setFormModuleId(String(editingRecord.module_id || ""));
        setFormType(editingRecord.type || "video");
        setFormFileUrl(editingRecord.file_url || "");
        setFormDuration(String(editingRecord.duration_seconds || 0));
        setFormSkippable(editingRecord.is_skippable ? "true" : "false");
      } else {
        setFormTitle("");
        setFormModuleId("");
        setFormType("video");
        setFormFileUrl("");
        setFormDuration("0");
        setFormSkippable("false");
      }
    }
  }, [isModalOpen, editingRecord]);

  const handleSave = async () => {
    if (!formTitle.trim() || !formModuleId) return;
    try {
      const payload: any = {
        title: formTitle,
        module_id: Number(formModuleId),
        type: formType,
        file_url: formFileUrl,
        duration_seconds: Number(formDuration),
        is_skippable: formSkippable === "true",
      };

      if (editingRecord) {
        await updateRecord.mutateAsync({
          id: editingRecord.id,
          data: payload,
        });
        add({
          title: "Berhasil",
          message: "Material berhasil diperbarui.",
          variant: "success",
        });
      } else {
        await createRecord.mutateAsync(payload);
        add({
          title: "Berhasil",
          message: "Material berhasil ditambahkan.",
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
          {editingRecord ? "Edit Material" : "Tambah Material"}
        </ModalTitle>
        <ModalClose onClose={() => !isSaving && closeModal()} />
      </ModalHeader>
      <ModalBody className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">
            Judul <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            className={inputCls}
            disabled={isSaving}
          />
        </div>
        
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">
            Pilih Modul Induk <span className="text-red-500">*</span>
          </label>
          <select
            value={formModuleId}
            onChange={(e) => setFormModuleId(e.target.value)}
            className={inputCls}
            disabled={isSaving || isLoadingModules}
          >
            <option value="" disabled>Pilih Modul Induk...</option>
            {modules.map(mod => (
              <option key={mod.id} value={mod.id}>{mod.title}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">
            Tipe Materi <span className="text-red-500">*</span>
          </label>
          <select
            value={formType}
            onChange={(e) => setFormType(e.target.value)}
            className={inputCls}
            disabled={isSaving}
          >
            <option value="video">Video</option>
            <option value="document">Dokumen / PDF</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">
            URL File <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            value={formFileUrl}
            onChange={(e) => setFormFileUrl(e.target.value)}
            className={inputCls}
            disabled={isSaving}
            placeholder="https://..."
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-foreground">
              Durasi (Detik)
            </label>
            <input
              type="number"
              value={formDuration}
              onChange={(e) => setFormDuration(e.target.value)}
              className={inputCls}
              disabled={isSaving}
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-foreground">
              Bisa Dilewati?
            </label>
            <select
              value={formSkippable}
              onChange={(e) => setFormSkippable(e.target.value)}
              className={inputCls}
              disabled={isSaving}
            >
              <option value="true">Ya</option>
              <option value="false">Tidak</option>
            </select>
          </div>
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
          disabled={!formTitle.trim() || !formModuleId || isSaving}
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
