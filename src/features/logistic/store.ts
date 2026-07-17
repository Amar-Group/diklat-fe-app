import { create } from "zustand";
import type { Logistic } from "./types";

interface LogisticState {
  isModalOpen: boolean;
  editingItem: Logistic | null;
  deleteId: number | null;
  openCreate: () => void;
  openEdit: (item: Logistic) => void;
  openDelete: (id: number) => void;
  closeModal: () => void;
  closeDelete: () => void;
}

export const useLogisticStore = create<LogisticState>((set) => ({
  isModalOpen: false,
  editingItem: null,
  deleteId: null,
  openCreate: () => set({ isModalOpen: true, editingItem: null }),
  openEdit: (item) => set({ isModalOpen: true, editingItem: item }),
  openDelete: (id) => set({ deleteId: id }),
  closeModal: () => set({ isModalOpen: false, editingItem: null }),
  closeDelete: () => set({ deleteId: null }),
}));
