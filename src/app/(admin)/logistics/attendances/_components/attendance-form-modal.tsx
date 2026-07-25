"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, ModalClose } from "@/components/ui/modal";
import { useNotification } from "@/components/ui/notification";
import { useCreateAttendance, useUpdateAttendance } from "@/features/attendance/hooks/use-attendance";
import { useAttendanceStore } from "@/features/attendance/store";
import { useSessions } from "@/features/session/hooks/use-session";
import { useParticipants } from "@/features/participant/hooks/use-participant";

const inputCls = "w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-card";

export function AttendanceFormModal() {
  const { isModalOpen, editingItem: editingRecord, closeModal } = useAttendanceStore();
  const { add } = useNotification();
  const createRecord = useCreateAttendance();
  const updateRecord = useUpdateAttendance();
  const { data: sessions = [], isLoading: isLoadingSessions } = useSessions();
  const { data: participants = [], isLoading: isLoadingParticipants } = useParticipants();

  const [formSessionId, setFormSessionId] = useState("");
  const [formParticipantId, setFormParticipantId] = useState("");
  const [formCheckInTime, setFormCheckInTime] = useState("");
  const [formMethod, setFormMethod] = useState("manual");

  const formatDateTime = (dateStr: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0,16);
  };

  useEffect(() => {
    if (isModalOpen) {
      if (editingRecord) {
        setFormSessionId(String(editingRecord.session_id || ""));
        setFormParticipantId(String(editingRecord.participant_id || ""));
        setFormCheckInTime(formatDateTime(editingRecord.check_in_time));
        setFormMethod(editingRecord.method || "manual");
      } else {
        setFormSessionId("");
        setFormParticipantId("");
        setFormCheckInTime(formatDateTime(new Date().toISOString()));
        setFormMethod("manual");
      }
    }
  }, [isModalOpen, editingRecord]);

  const handleSave = async () => {
    if (!formSessionId || !formParticipantId || !formCheckInTime) return;
    try {
      const payload: any = {
        session_id: Number(formSessionId),
        participant_id: Number(formParticipantId),
        check_in_time: formCheckInTime,
        method: formMethod,
      };

      if (editingRecord) {
        await updateRecord.mutateAsync({ id: editingRecord.id, data: payload });
        add({ title: "Berhasil", message: "Kehadiran berhasil diperbarui.", variant: "success" });
      } else {
        await createRecord.mutateAsync(payload);
        add({ title: "Berhasil", message: "Kehadiran berhasil dicatat.", variant: "success" });
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
        <ModalTitle>{editingRecord ? "Edit Kehadiran" : "Catat Kehadiran (Manual)"}</ModalTitle>
        <ModalClose onClose={() => !isSaving && closeModal()} />
      </ModalHeader>
      <ModalBody className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">Sesi <span className="text-red-500">*</span></label>
          <select value={formSessionId} onChange={(e) => setFormSessionId(e.target.value)} className={inputCls} disabled={isSaving || isLoadingSessions}>
            <option value="" disabled>Pilih Sesi...</option>
            {sessions.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
          </select>
        </div>
        
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">Peserta <span className="text-red-500">*</span></label>
          <select value={formParticipantId} onChange={(e) => setFormParticipantId(e.target.value)} className={inputCls} disabled={isSaving || isLoadingParticipants}>
            <option value="" disabled>Pilih Peserta...</option>
            {participants.map(p => <option key={p.id} value={p.user_id}>{p.name || "Peserta ID: " + p.user_id}</option>)}
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">Waktu Hadir <span className="text-red-500">*</span></label>
          <input type="datetime-local" value={formCheckInTime} onChange={(e) => setFormCheckInTime(e.target.value)} className={inputCls} disabled={isSaving} />
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">Metode <span className="text-red-500">*</span></label>
          <select value={formMethod} onChange={(e) => setFormMethod(e.target.value)} className={inputCls} disabled={isSaving}>
            <option value="manual">Manual Input</option>
            <option value="qr_scan">QR Scan</option>
            <option value="auto_zoom">Auto Zoom (API)</option>
          </select>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant="outline" onClick={() => closeModal()} disabled={isSaving}>Batal</Button>
        <Button onClick={handleSave} disabled={!formSessionId || !formParticipantId || !formCheckInTime || isSaving}>
          {isSaving ? "Menyimpan..." : editingRecord ? "Simpan Perubahan" : "Catat"}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
