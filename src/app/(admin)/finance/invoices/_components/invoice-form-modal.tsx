"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, ModalClose } from "@/components/ui/modal";
import { useNotification } from "@/components/ui/notification";
import { useCreateInvoice, useUpdateInvoice } from "@/features/invoice/hooks/use-invoice";
import { useInvoiceStore } from "@/features/invoice/store";
import { useClasses } from "@/features/class/hooks/use-class";

const inputCls = "w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-card";

export function InvoiceFormModal() {
  const { isModalOpen, editingItem: editingRecord, closeModal } = useInvoiceStore();
  const { add } = useNotification();
  const createRecord = useCreateInvoice();
  const updateRecord = useUpdateInvoice();
  const { data: classes = [] } = useClasses();

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
        invoice_number: formData.invoice_number,
        class_id: Number(formData.class_id),
        total_amount: Number(formData.total_amount),
        status: formData.status || 'unpaid',
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
        <ModalTitle>{editingRecord ? "Edit Manajemen Invoice" : "Tambah Manajemen Invoice"}</ModalTitle>
        <ModalClose onClose={() => !isSaving && closeModal()} />
      </ModalHeader>
      <ModalBody className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium">Nomor Invoice</label>
          <input type="text" value={formData.invoice_number || ""} onChange={(e) => setFormData({...formData, invoice_number: e.target.value})} className={inputCls} disabled={isSaving} />
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
          <label className="block text-sm font-medium">Total Harga</label>
          <input type="number" value={formData.total_amount || ""} onChange={(e) => setFormData({...formData, total_amount: e.target.value})} className={inputCls} disabled={isSaving} />
        </div>
        <div className="space-y-1.5">
          <label className="block text-sm font-medium">Status</label>
          <select value={formData.status || "unpaid"} onChange={(e) => setFormData({...formData, status: e.target.value})} className={inputCls} disabled={isSaving}>
            <option value="unpaid">Unpaid</option>
            <option value="pending_validation">Pending Validation</option>
            <option value="paid">Paid</option>
          </select>
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
