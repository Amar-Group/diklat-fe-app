export interface Participant {
  id: number;
  user_id: number;
  company_id: number | null;
  name: string;
  email: string;
  nik: string | null;
  birth_place: string | null;
  birth_date: string | null;
  job_title: string | null;
  department: string | null;
  phone_number: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateParticipantDto {
  name: string;
  email: string;
  password?: string;
  company_id?: number | null;
  nik?: string;
  birth_place?: string;
  birth_date?: string;
  job_title?: string;
  department?: string;
  phone_number?: string;
}

export interface UpdateParticipantDto {
  name?: string;
  email?: string;
  company_id?: number | null;
  nik?: string;
  birth_place?: string;
  birth_date?: string;
  job_title?: string;
  department?: string;
  phone_number?: string;
  is_active?: boolean;
}
