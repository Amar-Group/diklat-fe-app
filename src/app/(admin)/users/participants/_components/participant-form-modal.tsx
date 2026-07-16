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
  useCreateParticipant,
  useUpdateParticipant,
} from "@/features/participant/hooks/use-participant";
import { useParticipantStore } from "@/features/participant/store";
import { useCompanies } from "@/features/company/hooks/use-company";

const inputCls =
  "w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-card";

export function ParticipantFormModal() {
  const { isModalOpen, editingItem: editingParticipant, closeModal } = useParticipantStore();
  const { data: companies = [] } = useCompanies();
  const { add } = useNotification();
  const createParticipant = useCreateParticipant();
  const updateParticipant = useUpdateParticipant();

  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formCompany, setFormCompany] = useState("");
  const [formNik, setFormNik] = useState("");
  const [formJobTitle, setFormJobTitle] = useState("");
  const [formStatus, setFormStatus] = useState("true");

  useEffect(() => {
    if (isModalOpen) {
      if (editingParticipant) {
        setFormName(editingParticipant.name || "");
        setFormEmail(editingParticipant.email || "");
        setFormPassword("");
        setFormCompany(editingParticipant.company_id ? String(editingParticipant.company_id) : "");
        setFormNik(editingParticipant.nik || "");
        setFormJobTitle(editingParticipant.job_title || "");
        setFormStatus(editingParticipant.is_active ? "true" : "false");
      } else {
        setFormName("");
        setFormEmail("");
        setFormPassword("");
        setFormCompany("");
        setFormNik("");
        setFormJobTitle("");
        setFormStatus("true");
      }
    }
  }, [isModalOpen, editingParticipant]);

  const handleSave = async () => {
    if (!formName.trim() || !formEmail.trim()) return;
    try {
      const payload: any = {
        name: formName,
        email: formEmail,
        company_id: formCompany ? Number(formCompany) : null,
        nik: formNik || null,
        job_title: formJobTitle || null,
        is_active: formStatus === "true",
      };

      if (!editingParticipant) {
          payload.password = formPassword;
      }

      if (editingParticipant) {
        await updateParticipant.mutateAsync({
          id: editingParticipant.id,
          data: payload,
        });
        add({
          title: "Berhasil",
          message: "Peserta berhasil diperbarui.",
          variant: "success",
        });
      } else {
        await createParticipant.mutateAsync(payload);
        add({
          title: "Berhasil",
          message: "Peserta berhasil ditambahkan.",
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

  const isSaving = createParticipant.isPending || updateParticipant.isPending;

  return (
    <Modal
      open={isModalOpen}
      onClose={() => !isSaving && closeModal()}
      className="max-w-md"
    >
      <ModalHeader>
        <ModalTitle>
          {editingParticipant ? "Edit Peserta" : "Tambah Peserta"}
        </ModalTitle>
        <ModalClose onClose={() => !isSaving && closeModal()} />
      </ModalHeader>
      <ModalBody className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">
            Nama Peserta <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            className={inputCls}
            disabled={isSaving}
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={formEmail}
            onChange={(e) => setFormEmail(e.target.value)}
            className={inputCls}
            disabled={isSaving}
          />
        </div>
        {!editingParticipant && (
            <div className="space-y-1.5">
            <label className="block text-sm font-medium text-foreground">
                Password <span className="text-red-500">*</span>
            </label>
            <input
                type="password"
                value={formPassword}
                onChange={(e) => setFormPassword(e.target.value)}
                className={inputCls}
                disabled={isSaving}
            />
            </div>
        )}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">
            Perusahaan (Asal)
          </label>
          <select
              className={inputCls}
              value={formCompany}
              onChange={(e) => setFormCompany(e.target.value)}
              disabled={isSaving}
          >
              <option value="">- Pribadi / Tidak ada -</option>
              {companies.map((c: any) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
              ))}
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">
            NIK
          </label>
          <input
            type="text"
            value={formNik}
            onChange={(e) => setFormNik(e.target.value)}
            className={inputCls}
            disabled={isSaving}
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">
            Jabatan
          </label>
          <input
            type="text"
            value={formJobTitle}
            onChange={(e) => setFormJobTitle(e.target.value)}
            className={inputCls}
            disabled={isSaving}
          />
        </div>
        {editingParticipant && (
            <div className="space-y-1.5">
            <label className="block text-sm font-medium text-foreground">
                Status
            </label>
            <select
                value={formStatus}
                onChange={(e) => setFormStatus(e.target.value)}
                className={inputCls}
                disabled={isSaving}
            >
                <option value="true">Aktif</option>
                <option value="false">Non-aktif</option>
            </select>
            </div>
        )}
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
          disabled={!formName.trim() || !formEmail.trim() || (!editingParticipant && !formPassword.trim()) || isSaving}
        >
          {isSaving
            ? "Menyimpan..."
            : editingParticipant
            ? "Simpan Perubahan"
            : "Tambah"}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
