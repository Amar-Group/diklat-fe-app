import { create } from "zustand";
import type { Quiz } from "./types";

interface QuizState {
  isModalOpen: boolean;
  editingItem: Quiz | null;
  deleteId: number | null;
  openCreate: () => void;
  openEdit: (item: Quiz) => void;
  openDelete: (id: number) => void;
  closeModal: () => void;
  closeDelete: () => void;
}

export const useQuizStore = create<QuizState>((set) => ({
  isModalOpen: false,
  editingItem: null,
  deleteId: null,
  openCreate: () => set({ isModalOpen: true, editingItem: null }),
  openEdit: (item) => set({ isModalOpen: true, editingItem: item }),
  openDelete: (id) => set({ deleteId: id }),
  closeModal: () => set({ isModalOpen: false, editingItem: null }),
  closeDelete: () => set({ deleteId: null }),
}));
