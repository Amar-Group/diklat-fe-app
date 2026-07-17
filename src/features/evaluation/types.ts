export interface Evaluation {
  id: number;
  participant_id: number;
  class_id: number;
  instructor_rating?: number;
  material_rating?: number;
  review_text?: string;
  is_approved_for_landing_page: boolean;
  created_at?: string;
}

export type CreateEvaluationRequest = Omit<Evaluation, "id" | "created_at" | "updated_at">;
export type UpdateEvaluationRequest = Partial<CreateEvaluationRequest>;
