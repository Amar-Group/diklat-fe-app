import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { QuizService } from "../services/quiz-service";
import type { CreateQuizRequest, UpdateQuizRequest } from "../types";

export const QUIZ_KEYS = {
  all: ["quizs"] as const,
  lists: () => [...QUIZ_KEYS.all, "list"] as const,
  detail: (id: number) => [...QUIZ_KEYS.all, "detail", id] as const,
};

export function useQuizs() {
  return useQuery({
    queryKey: QUIZ_KEYS.lists(),
    queryFn: async () => {
      const res = await QuizService.getAll();
      return res.data;
    },
  });
}

export function useQuiz(id: number) {
  return useQuery({
    queryKey: QUIZ_KEYS.detail(id),
    queryFn: async () => {
      const res = await QuizService.getById(id);
      return res.data;
    },
    enabled: !!id,
  });
}

export function useCreateQuiz() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateQuizRequest) => QuizService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUIZ_KEYS.lists() });
    },
  });
}

export function useUpdateQuiz() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateQuizRequest }) =>
      QuizService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUIZ_KEYS.lists() });
    },
  });
}

export function useDeleteQuiz() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => QuizService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUIZ_KEYS.lists() });
    },
  });
}
