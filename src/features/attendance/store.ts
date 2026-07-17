import { create } from "zustand";
import type { Attendance } from "./types";

interface AttendanceState {
  isModalOpen: boolean;
  editingItem: Attendance | null;
  deleteId: number | null;
  openCreate: () => void;
  openEdit: (item: Attendance) => void;
  openDelete: (id: number) => void;
  closeModal: () => void;
  closeDelete: () => void;
}

export const useAttendanceStore = create<AttendanceState>((set) => ({
  isModalOpen: false,
  editingItem: null,
  deleteId: null,
  openCreate: () => set({ isModalOpen: true, editingItem: null }),
  openEdit: (item) => set({ isModalOpen: true, editingItem: item }),
  openDelete: (id) => set({ deleteId: id }),
  closeModal: () => set({ isModalOpen: false, editingItem: null }),
  closeDelete: () => set({ deleteId: null }),
}));
