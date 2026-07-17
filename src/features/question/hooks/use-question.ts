import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { QuestionService } from "../services/question-service";
import type { CreateQuestionRequest, UpdateQuestionRequest } from "../types";

export const QUESTION_KEYS = {
  all: ["questions"] as const,
  lists: () => [...QUESTION_KEYS.all, "list"] as const,
  detail: (id: number) => [...QUESTION_KEYS.all, "detail", id] as const,
};

export function useQuestions(quizId?: number) {
  return useQuery({
    queryKey: [...QUESTION_KEYS.lists(), quizId],
    queryFn: async () => {
      const res = await QuestionService.getAll(quizId);
      return res.data;
    },
  });
}

export function useCreateQuestion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateQuestionRequest) => QuestionService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUESTION_KEYS.lists() });
    },
  });
}

export function useUpdateQuestion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateQuestionRequest }) =>
      QuestionService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUESTION_KEYS.lists() });
    },
  });
}

export function useDeleteQuestion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => QuestionService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUESTION_KEYS.lists() });
    },
  });
}
