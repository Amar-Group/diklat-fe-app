export type Curriculum = {
  id: number;
  course_id: number;
  title: string;
  order_sequence: number;
};

export type CreateCurriculumRequest = {
  course_id: number;
  title: string;
  order_sequence?: number;
};

export type UpdateCurriculumRequest = {
  course_id?: number;
  title?: string;
  order_sequence?: number;
};
