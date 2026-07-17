import { create } from "zustand";
import type { Session } from "./types";

interface SessionState {
  isModalOpen: boolean;
  editingItem: Session | null;
  deleteId: number | null;
  openCreate: () => void;
  openEdit: (item: Session) => void;
  openDelete: (id: number) => void;
  closeModal: () => void;
  closeDelete: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  isModalOpen: false,
  editingItem: null,
  deleteId: null,
  openCreate: () => set({ isModalOpen: true, editingItem: null }),
  openEdit: (item) => set({ isModalOpen: true, editingItem: item }),
  openDelete: (id) => set({ deleteId: id }),
  closeModal: () => set({ isModalOpen: false, editingItem: null }),
  closeDelete: () => set({ deleteId: null }),
}));
