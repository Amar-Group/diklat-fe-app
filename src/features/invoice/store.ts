import { create } from "zustand";
import type { Invoice } from "./types";

interface InvoiceState {
  isModalOpen: boolean;
  editingItem: Invoice | null;
  deleteId: number | null;
  openCreate: () => void;
  openEdit: (item: Invoice) => void;
  openDelete: (id: number) => void;
  closeModal: () => void;
  closeDelete: () => void;
}

export const useInvoiceStore = create<InvoiceState>((set) => ({
  isModalOpen: false,
  editingItem: null,
  deleteId: null,
  openCreate: () => set({ isModalOpen: true, editingItem: null }),
  openEdit: (item) => set({ isModalOpen: true, editingItem: item }),
  openDelete: (id) => set({ deleteId: id }),
  closeModal: () => set({ isModalOpen: false, editingItem: null }),
  closeDelete: () => set({ deleteId: null }),
}));
