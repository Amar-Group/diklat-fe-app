export interface Quiz {
  id: number;
  module_id: number;
  title: string;
  passing_grade: number;
}

export type CreateQuizRequest = Omit<Quiz, "id" | "created_at" | "updated_at">;
export type UpdateQuizRequest = Partial<CreateQuizRequest>;
