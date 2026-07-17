import { create } from "zustand";
import type { Question } from "./types";

interface QuestionState {
  isModalOpen: boolean;
  editingItem: Question | null;
  deleteId: number | null;
  openCreate: () => void;
  openEdit: (item: Question) => void;
  openDelete: (id: number) => void;
  closeModal: () => void;
  closeDelete: () => void;
}

export const useQuestionStore = create<QuestionState>((set) => ({
  isModalOpen: false,
  editingItem: null,
  deleteId: null,
  openCreate: () => set({ isModalOpen: true, editingItem: null }),
  openEdit: (item) => set({ isModalOpen: true, editingItem: item }),
  openDelete: (id) => set({ deleteId: id }),
  closeModal: () => set({ isModalOpen: false, editingItem: null }),
  closeDelete: () => set({ deleteId: null }),
}));
