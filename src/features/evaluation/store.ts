import { create } from "zustand";
import type { Evaluation } from "./types";

interface EvaluationState {
  isModalOpen: boolean;
  editingItem: Evaluation | null;
  deleteId: number | null;
  openCreate: () => void;
  openEdit: (item: Evaluation) => void;
  openDelete: (id: number) => void;
  closeModal: () => void;
  closeDelete: () => void;
}

export const useEvaluationStore = create<EvaluationState>((set) => ({
  isModalOpen: false,
  editingItem: null,
  deleteId: null,
  openCreate: () => set({ isModalOpen: true, editingItem: null }),
  openEdit: (item) => set({ isModalOpen: true, editingItem: item }),
  openDelete: (id) => set({ deleteId: id }),
  closeModal: () => set({ isModalOpen: false, editingItem: null }),
  closeDelete: () => set({ deleteId: null }),
}));
