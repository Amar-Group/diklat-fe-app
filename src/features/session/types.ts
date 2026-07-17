export interface Session {
  id: number;
  class_id: number;
  title: string;
  type: 'online' | 'offline' | 'field_trip';
  start_time: string;
  end_time: string;
  meeting_url?: string;
  qr_token?: string;
}

export type CreateSessionRequest = Omit<Session, "id" | "created_at" | "updated_at">;
export type UpdateSessionRequest = Partial<CreateSessionRequest>;
