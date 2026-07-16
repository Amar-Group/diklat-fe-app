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
  useCreateCompany,
  useUpdateCompany,
} from "@/features/company/hooks/use-company";
import { useCompanyStore } from "@/features/company/store";

const inputCls =
  "w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-card";

export function CompanyFormModal() {
  const { isModalOpen, editingItem: editingCompany, closeModal } = useCompanyStore();
  const { add } = useNotification();
  const createCompany = useCreateCompany();
  const updateCompany = useUpdateCompany();

  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formAddress, setFormAddress] = useState("");
  const [formStatus, setFormStatus] = useState("active");

  useEffect(() => {
    if (isModalOpen) {
      if (editingCompany) {
        setFormName(editingCompany.name || "");
        setFormEmail(editingCompany.email || "");
        setFormPhone(editingCompany.phone || "");
        setFormAddress(editingCompany.address || "");
        setFormStatus(editingCompany.status || "active");
      } else {
        setFormName("");
        setFormEmail("");
        setFormPhone("");
        setFormAddress("");
        setFormStatus("active");
      }
    }
  }, [isModalOpen, editingCompany]);

  const handleSave = async () => {
    if (!formName.trim()) return;
    try {
      const payload = {
        name: formName,
        email: formEmail || null,
        phone: formPhone || null,
        address: formAddress || null,
        status: formStatus as "active" | "inactive",
      };

      if (editingCompany) {
        await updateCompany.mutateAsync({
          id: editingCompany.id,
          data: payload,
        });
        add({
          title: "Berhasil",
          message: "Perusahaan berhasil diperbarui.",
          variant: "success",
        });
      } else {
        await createCompany.mutateAsync(payload);
        add({
          title: "Berhasil",
          message: "Perusahaan berhasil ditambahkan.",
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

  const isSaving = createCompany.isPending || updateCompany.isPending;

  return (
    <Modal
      open={isModalOpen}
      onClose={() => !isSaving && closeModal()}
      className="max-w-md"
    >
      <ModalHeader>
        <ModalTitle>
          {editingCompany ? "Edit Perusahaan" : "Tambah Perusahaan"}
        </ModalTitle>
        <ModalClose onClose={() => !isSaving && closeModal()} />
      </ModalHeader>
      <ModalBody className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">
            Nama Perusahaan <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            placeholder="Contoh: PT Bangun Bersama"
            className={inputCls}
            disabled={isSaving}
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">
            Email
          </label>
          <input
            type="email"
            value={formEmail}
            onChange={(e) => setFormEmail(e.target.value)}
            placeholder="Contoh: info@perusahaan.com"
            className={inputCls}
            disabled={isSaving}
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">
            Telepon
          </label>
          <input
            type="text"
            value={formPhone}
            onChange={(e) => setFormPhone(e.target.value)}
            placeholder="Contoh: 021-12345678"
            className={inputCls}
            disabled={isSaving}
          />
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">
            Alamat
          </label>
          <textarea
            value={formAddress}
            onChange={(e) => setFormAddress(e.target.value)}
            placeholder="Alamat lengkap perusahaan"
            className={inputCls}
            rows={3}
            disabled={isSaving}
          />
        </div>
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
            <option value="active">Aktif</option>
            <option value="inactive">Non-aktif</option>
          </select>
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
          disabled={!formName.trim() || isSaving}
        >
          {isSaving
            ? "Menyimpan..."
            : editingCompany
            ? "Simpan Perubahan"
            : "Tambah"}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
