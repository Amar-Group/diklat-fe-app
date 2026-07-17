"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, ModalClose } from "@/components/ui/modal";
import { useNotification } from "@/components/ui/notification";
import { useCreateCertificate, useUpdateCertificate } from "@/features/certificate/hooks/use-certificate";
import { useCertificateStore } from "@/features/certificate/store";
import { useClasses } from "@/features/class/hooks/use-class";
import { useUsers } from "@/features/rbac/user/hooks/use-user";

const inputCls = "w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-card";

export function CertificateFormModal() {
  const { isModalOpen, editingItem: editingRecord, closeModal } = useCertificateStore();
  const { add } = useNotification();
  const createRecord = useCreateCertificate();
  const updateRecord = useUpdateCertificate();
  const { data: classes = [] } = useClasses();
  const { data: users = [] } = useUsers();

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
        participant_id: Number(formData.participant_id),
        class_id: Number(formData.class_id),
        certificate_number: formData.certificate_number,
        bnsp_code: formData.bnsp_code,
        file_url: formData.file_url,
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
        <ModalTitle>{editingRecord ? "Edit Penerbitan Sertifikat" : "Tambah Penerbitan Sertifikat"}</ModalTitle>
        <ModalClose onClose={() => !isSaving && closeModal()} />
      </ModalHeader>
      <ModalBody className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium">Participant ID</label>
          <select value={formData.participant_id || ""} onChange={(e) => setFormData({...formData, participant_id: e.target.value})} className={inputCls} disabled={isSaving}>
            <option value="">-- Pilih Peserta --</option>
            {users.map((u: any) => (
              <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium">Class ID</label>
          <select value={formData.class_id || ""} onChange={(e) => setFormData({...formData, class_id: e.target.value})} className={inputCls} disabled={isSaving}>
            <option value="">-- Pilih Kelas --</option>
            {classes.map((c: any) => (
              <option key={c.id} value={c.id}>{c.batch_name}</option>
            ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium">Nomor Sertifikat</label>
          <input type="text" value={formData.certificate_number || ""} onChange={(e) => setFormData({...formData, certificate_number: e.target.value})} className={inputCls} disabled={isSaving} />
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium">Kode BNSP</label>
          <input type="text" value={formData.bnsp_code || ""} onChange={(e) => setFormData({...formData, bnsp_code: e.target.value})} className={inputCls} disabled={isSaving} />
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
