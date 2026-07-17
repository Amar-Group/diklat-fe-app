"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, ModalClose } from "@/components/ui/modal";
import { useNotification } from "@/components/ui/notification";
import { useCreateSession, useUpdateSession } from "@/features/session/hooks/use-session";
import { useSessionStore } from "@/features/session/store";
import { useClasses } from "@/features/class/hooks/use-class";

const inputCls = "w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-card";

export function SessionFormModal() {
  const { isModalOpen, editingItem: editingRecord, closeModal } = useSessionStore();
  const { add } = useNotification();
  const createRecord = useCreateSession();
  const updateRecord = useUpdateSession();
  const { data: classes = [], isLoading: isLoadingClasses } = useClasses();

  const [formTitle, setFormTitle] = useState("");
  const [formClassId, setFormClassId] = useState("");
  const [formType, setFormType] = useState("online");
  const [formStartTime, setFormStartTime] = useState("");
  const [formEndTime, setFormEndTime] = useState("");
  const [formMeetingUrl, setFormMeetingUrl] = useState("");

  const formatDateTime = (dateStr: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0,16);
  };

  useEffect(() => {
    if (isModalOpen) {
      if (editingRecord) {
        setFormTitle(editingRecord.title || "");
        setFormClassId(String(editingRecord.class_id || ""));
        setFormType(editingRecord.type || "online");
        setFormStartTime(formatDateTime(editingRecord.start_time));
        setFormEndTime(formatDateTime(editingRecord.end_time));
        setFormMeetingUrl(editingRecord.meeting_url || "");
      } else {
        setFormTitle("");
        setFormClassId("");
        setFormType("online");
        setFormStartTime("");
        setFormEndTime("");
        setFormMeetingUrl("");
      }
    }
  }, [isModalOpen, editingRecord]);

  const handleSave = async () => {
    if (!formTitle.trim() || !formClassId || !formStartTime || !formEndTime) return;
    try {
      const payload: any = {
        title: formTitle,
        class_id: Number(formClassId),
        type: formType,
        start_time: formStartTime,
        end_time: formEndTime,
        meeting_url: formMeetingUrl || undefined,
      };

      if (editingRecord) {
        await updateRecord.mutateAsync({ id: editingRecord.id, data: payload });
        add({ title: "Berhasil", message: "Sesi berhasil diperbarui.", variant: "success" });
      } else {
        await createRecord.mutateAsync(payload);
        add({ title: "Berhasil", message: "Sesi berhasil ditambahkan.", variant: "success" });
      }
      closeModal();
    } catch (error: any) {
      add({ title: "Gagal", message: error.message || "Terjadi kesalahan sistem.", variant: "danger" });
    }
  };

  const isSaving = createRecord.isPending || updateRecord.isPending;

  return (
    <Modal open={isModalOpen} onClose={() => !isSaving && closeModal()} className="max-w-lg">
      <ModalHeader>
        <ModalTitle>{editingRecord ? "Edit Sesi" : "Tambah Sesi"}</ModalTitle>
        <ModalClose onClose={() => !isSaving && closeModal()} />
      </ModalHeader>
      <ModalBody className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">Judul Sesi <span className="text-red-500">*</span></label>
          <input type="text" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} className={inputCls} disabled={isSaving} />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-foreground">Kelas <span className="text-red-500">*</span></label>
            <select value={formClassId} onChange={(e) => setFormClassId(e.target.value)} className={inputCls} disabled={isSaving || isLoadingClasses}>
              <option value="" disabled>Pilih Kelas...</option>
              {classes.map(cls => <option key={cls.id} value={cls.id}>{cls.batch_name}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-foreground">Tipe <span className="text-red-500">*</span></label>
            <select value={formType} onChange={(e) => setFormType(e.target.value)} className={inputCls} disabled={isSaving}>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="field_trip">Field Trip</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-foreground">Waktu Mulai <span className="text-red-500">*</span></label>
            <input type="datetime-local" value={formStartTime} onChange={(e) => setFormStartTime(e.target.value)} className={inputCls} disabled={isSaving} />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-foreground">Waktu Selesai <span className="text-red-500">*</span></label>
            <input type="datetime-local" value={formEndTime} onChange={(e) => setFormEndTime(e.target.value)} className={inputCls} disabled={isSaving} />
          </div>
        </div>

        {formType === 'online' && (
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-foreground">URL Meeting (Zoom/GMeet)</label>
            <input type="url" value={formMeetingUrl} onChange={(e) => setFormMeetingUrl(e.target.value)} className={inputCls} disabled={isSaving} placeholder="https://..." />
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <Button variant="outline" onClick={() => closeModal()} disabled={isSaving}>Batal</Button>
        <Button onClick={handleSave} disabled={!formTitle.trim() || !formClassId || !formStartTime || !formEndTime || isSaving}>
          {isSaving ? "Menyimpan..." : editingRecord ? "Simpan Perubahan" : "Tambah"}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
