export interface Attendance {
  id: number;
  session_id: number;
  participant_id: number;
  check_in_time: string;
  method: 'auto_zoom' | 'qr_scan' | 'manual';
}

export type CreateAttendanceRequest = Omit<Attendance, "id" | "created_at" | "updated_at">;
export type UpdateAttendanceRequest = Partial<CreateAttendanceRequest>;
