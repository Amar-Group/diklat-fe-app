export type Course = {
  id: number;
  title: string;
  description: string | null;
  competencies: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type CreateCourseRequest = {
  title: string;
  description?: string | null;
  competencies?: string | null;
  is_active?: boolean;
};

export type UpdateCourseRequest = {
  title?: string;
  description?: string | null;
  competencies?: string | null;
  is_active?: boolean;
};\n