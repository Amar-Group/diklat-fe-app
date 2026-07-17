export interface Question {
  id: number;
  quiz_id: number;
  question_text: string;
  options: any;
  correct_answer: string;
}

export type CreateQuestionRequest = Omit<Question, "id" | "created_at" | "updated_at">;
export type UpdateQuestionRequest = Partial<CreateQuestionRequest>;
