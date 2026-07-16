export interface Class {
  id: number;
  course_id: number;
  batch_name: string;
  method: string;
  start_date: string | null;
  end_date: string | null;
  price: number | null;
  course_title?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateClassDto {
  course_id: number;
  batch_name: string;
  method: string;
  start_date?: string;
  end_date?: string;
  price?: number;
}

export interface UpdateClassDto {
  course_id?: number;
  batch_name?: string;
  method?: string;
  start_date?: string;
  end_date?: string;
  price?: number;
}
