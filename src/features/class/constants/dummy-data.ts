import type { Class } from "../types";

export const DUMMY_COMPANYS: Class[] = [
  { id: 1, course_id: 1, batch_name: "Batch 1 - 2025", method: "online", start_date: "2025-01-15", end_date: "2025-02-15", price: 500000, created_at: "2025-01-15T08:00:00Z", updated_at: "2025-01-15T08:00:00Z" },
  { id: 2, course_id: 1, batch_name: "Batch 2 - 2025", method: "offline", start_date: "2025-03-01", end_date: "2025-04-01", price: 750000, created_at: "2025-01-15T08:00:00Z", updated_at: "2025-01-15T08:00:00Z" },
  { id: 3, course_id: 2, batch_name: "Batch 1 - 2025", method: "hybrid", start_date: "2025-02-10", end_date: "2025-03-10", price: 600000, created_at: "2025-02-10T10:30:00Z", updated_at: "2025-02-10T10:30:00Z" },
  { id: 4, course_id: 2, batch_name: "Batch 2 - 2025", method: "online", start_date: "2025-04-01", end_date: "2025-05-01", price: 500000, created_at: "2025-03-05T14:00:00Z", updated_at: "2025-03-05T14:00:00Z" },
  { id: 5, course_id: 3, batch_name: "Batch 1 - 2025", method: "offline", start_date: "2025-03-20", end_date: "2025-04-20", price: 800000, created_at: "2025-03-20T09:15:00Z", updated_at: "2025-03-20T09:15:00Z" },
  { id: 6, course_id: 3, batch_name: "Batch 2 - 2025", method: "online", start_date: "2025-05-01", end_date: "2025-06-01", price: 550000, created_at: "2025-04-01T11:00:00Z", updated_at: "2025-04-01T11:00:00Z" },
];

