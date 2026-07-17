"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, ModalClose } from "@/components/ui/modal";
import { useNotification } from "@/components/ui/notification";
import { useCreateLogistic, useUpdateLogistic } from "@/features/logistic/hooks/use-logistic";
import { useLogisticStore } from "@/features/logistic/store";
import { useClasses } from "@/features/class/hooks/use-class";

const inputCls = "w-full border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors bg-card";

export function LogisticFormModal() {
  const { isModalOpen, editingItem: editingRecord, closeModal } = useLogisticStore();
  const { add } = useNotification();
  const createRecord = useCreateLogistic();
  const updateRecord = useUpdateLogistic();
  const { data: classes = [], isLoading: isLoadingClasses } = useClasses();

  const [formClassId, setFormClassId] = useState("");
  const [formHotelName, setFormHotelName] = useState("");
  const [formHotelAddress, setFormHotelAddress] = useState("");
  const [formMapUrl, setFormMapUrl] = useState("");
  const [formFieldTrip, setFormFieldTrip] = useState("");

  useEffect(() => {
    if (isModalOpen) {
      if (editingRecord) {
        setFormClassId(String(editingRecord.class_id || ""));
        setFormHotelName(editingRecord.hotel_name || "");
        setFormHotelAddress(editingRecord.hotel_address || "");
        setFormMapUrl(editingRecord.map_url || "");
        setFormFieldTrip(editingRecord.field_trip_destination || "");
      } else {
        setFormClassId("");
        setFormHotelName("");
        setFormHotelAddress("");
        setFormMapUrl("");
        setFormFieldTrip("");
      }
    }
  }, [isModalOpen, editingRecord]);

  const handleSave = async () => {
    if (!formClassId) return;
    try {
      const payload: any = {
        class_id: Number(formClassId),
        hotel_name: formHotelName || undefined,
        hotel_address: formHotelAddress || undefined,
        map_url: formMapUrl || undefined,
        field_trip_destination: formFieldTrip || undefined,
      };

      if (editingRecord) {
        await updateRecord.mutateAsync({ id: editingRecord.id, data: payload });
        add({ title: "Berhasil", message: "Fasilitas berhasil diperbarui.", variant: "success" });
      } else {
        await createRecord.mutateAsync(payload);
        add({ title: "Berhasil", message: "Fasilitas berhasil ditambahkan.", variant: "success" });
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
        <ModalTitle>{editingRecord ? "Edit Fasilitas" : "Tambah Fasilitas"}</ModalTitle>
        <ModalClose onClose={() => !isSaving && closeModal()} />
      </ModalHeader>
      <ModalBody className="space-y-4">
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">Kelas <span className="text-red-500">*</span></label>
          <select value={formClassId} onChange={(e) => setFormClassId(e.target.value)} className={inputCls} disabled={isSaving || isLoadingClasses}>
            <option value="" disabled>Pilih Kelas...</option>
            {classes.map(c => <option key={c.id} value={c.id}>{c.batch_name}</option>)}
          </select>
        </div>
        
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">Nama Hotel/Penginapan</label>
          <input type="text" value={formHotelName} onChange={(e) => setFormHotelName(e.target.value)} className={inputCls} disabled={isSaving} placeholder="Contoh: Hotel XYZ" />
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">Alamat Hotel</label>
          <input type="text" value={formHotelAddress} onChange={(e) => setFormHotelAddress(e.target.value)} className={inputCls} disabled={isSaving} />
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-foreground">Tujuan Field Trip</label>
          <input type="text" value={formFieldTrip} onChange={(e) => setFormFieldTrip(e.target.value)} className={inputCls} disabled={isSaving} placeholder="Contoh: PT. Industri ABC" />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant="outline" onClick={() => closeModal()} disabled={isSaving}>Batal</Button>
        <Button onClick={handleSave} disabled={!formClassId || isSaving}>
          {isSaving ? "Menyimpan..." : editingRecord ? "Simpan Perubahan" : "Tambah"}
        </Button>
      </ModalFooter>
    </Modal>
  );
}
