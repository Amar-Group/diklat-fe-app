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
  useCreateInstructor,
  useUpdateInstructor,
} from "@/features/instructor/hooks/use-instructor";
import { useInstructorStore } from "@/features/instructor/store";

const inputCls =
  "w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-card";

export function InstructorFormModal() {
  const { isModalOpen, editingItem: editingInstructor, closeModal } = useInstructorStore();
  const { add } = useNotification();
  const createInstructor = useCreateInstructor();
  const updateInstructor = useUpdateInstructor();

  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formExpertise, setFormExpertise] = useState("");
  const [formBio, setFormBio] = useState("");
  const [formStatus, setFormStatus] = useState("true");

  useEffect(() => {
    if (isModalOpen) {
      if (editingInstructor) {
        setFormName(editingInstructor.name || "");
        setFormEmail(editingInstructor.email || "");
        setFormPassword("");
        setFormExpertise(editingInstructor.expertise || "");
        setFormBio(editingInstructor.bio || "");
        setFormStatus(editingInstructor.is_active ? "true" : "false");
      } else {
        setFormName("");
        setFormEmail("");
        setFormPassword("");
        setFormExpertise("");
        setFormBio("");
        setFormStatus("true");
      }
    }
  }, [isModalOpen, editingInstructor]);

  const handleSave = async () => {
    if (!formName.trim() || !formEmail.trim()) return;
    try {
      const payload: any = {
        name: formName,
        email: formEmail,
        expertise: formExpertise || null,
        bio: formBio || null,
        is_active: formStatus === "true",
      };

      if (!editingInstructor) {
          payload.password = formPassword;
      }

      if (editingInstructor) {
        await updateInstructor.mutateAsync({
          id: editingInstructor.id,
          data: payload,
        });
        add({
          title: "Berhasil",
          message: "Instruktur berhasil diperbarui.",
          variant: "success",
        });
      } else {
        await createInstructor.mutateAsync(payload);
        add({
          title: "Berhasil",
          message: "Instruktur berhasil ditambahkan.",
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

  const isSaving = createInstructor.isPending || updateInstructor.isPending;

  return (
    <Modal
      open={isModalOpen}
      onClose={() => !isSaving && closeModal()}
      className="max-w-md"
    >
      <ModalHeader>
        <ModalTitle>
          {editingInstructor ? "Edit Instruktur" : "Tambah Instruktur"}
        </ModalTitle>
        <ModalClose onClose={() => !isSaving && closeModal()} />
      </ModalHeader>
      <ModalBody className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">
            Nama Instruktur <span className="text-red-500">*</span>
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
        {!editingInstructor && (
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
            Keahlian
          </label>
          <input
            type="text"
            value={formExpertise}
            onChange={(e) => setFormExpertise(e.target.value)}
            className={inputCls}
            disabled={isSaving}
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">
            Bio Singkat
          </label>
          <textarea
            value={formBio}
            onChange={(e) => setFormBio(e.target.value)}
            className={inputCls}
            rows={3}
            disabled={isSaving}
          />
        </div>
        {editingInstructor && (
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
          disabled={!formName.trim() || !formEmail.trim() || (!editingInstructor && !formPassword.trim()) || isSaving}
        >
          {isSaving
            ? "Menyimpan..."
            : editingInstructor
            ? "Simpan Perubahan"
            : "Tambah"}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
