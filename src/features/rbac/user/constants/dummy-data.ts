import type { User } from "../types";

export const DUMMY_USERS: User[] = [
  { id: 1, email: "admin@diklat.com", name: "Super Admin", role_id: 1, role_name: "Administrator", created_at: "2025-01-15T08:00:00Z", updated_at: "2025-01-15T08:00:00Z" },
  { id: 2, email: "user@diklat.com", name: "Regular User", role_id: 2, role_name: "User", created_at: "2025-01-20T10:00:00Z", updated_at: "2025-01-20T10:00:00Z" },
  { id: 3, email: "rina@diklat.com", name: "Rina Sari", role_id: 3, role_name: "Kasir", created_at: "2025-02-14T09:30:00Z", updated_at: "2025-02-14T09:30:00Z" },
  { id: 4, email: "budi@diklat.com", name: "Budi Santoso", role_id: 4, role_name: "Manajer", created_at: "2025-03-01T08:00:00Z", updated_at: "2025-03-01T08:00:00Z" },
  { id: 5, email: "dewi@diklat.com", name: "Dewi Lestari", role_id: 5, role_name: "Pelayan", created_at: "2025-03-10T14:00:00Z", updated_at: "2025-03-10T14:00:00Z" },
  { id: 6, email: "agus@diklat.com", name: "Agus Pratama", role_id: 6, role_name: "Koki", created_at: "2025-04-01T11:00:00Z", updated_at: "2025-04-01T11:00:00Z" },
  { id: 7, email: "siti@diklat.com", name: "Siti Nurhaliza", role_id: 3, role_name: "Kasir", created_at: "2025-04-15T08:30:00Z", updated_at: "2025-04-15T08:30:00Z" },
  { id: 8, email: "joko@diklat.com", name: "Joko Widodo", role_id: 5, role_name: "Pelayan", created_at: "2025-05-01T09:00:00Z", updated_at: "2025-05-01T09:00:00Z" },
];
