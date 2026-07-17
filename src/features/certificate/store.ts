import { create } from "zustand";
import type { Certificate } from "./types";

interface CertificateState {
  isModalOpen: boolean;
  editingItem: Certificate | null;
  deleteId: number | null;
  openCreate: () => void;
  openEdit: (item: Certificate) => void;
  openDelete: (id: number) => void;
  closeModal: () => void;
  closeDelete: () => void;
}

export const useCertificateStore = create<CertificateState>((set) => ({
  isModalOpen: false,
  editingItem: null,
  deleteId: null,
  openCreate: () => set({ isModalOpen: true, editingItem: null }),
  openEdit: (item) => set({ isModalOpen: true, editingItem: item }),
  openDelete: (id) => set({ deleteId: id }),
  closeModal: () => set({ isModalOpen: false, editingItem: null }),
  closeDelete: () => set({ deleteId: null }),
}));
