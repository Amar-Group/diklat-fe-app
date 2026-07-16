export interface Instructor {
  id: number;
  user_id: number;
  name: string;
  email: string;
  bio: string | null;
  expertise: string | null;
  cv_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CreateInstructorDto {
  name: string;
  email: string;
  password?: string;
  bio?: string;
  expertise?: string;
  cv_url?: string;
}

export interface UpdateInstructorDto {
  name?: string;
  email?: string;
  bio?: string;
  expertise?: string;
  cv_url?: string;
  is_active?: boolean;
}
