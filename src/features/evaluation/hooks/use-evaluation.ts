import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { EvaluationService } from "../services/evaluation-service";
import type { CreateEvaluationRequest, UpdateEvaluationRequest } from "../types";

export const EVALUATION_KEYS = {
  all: ["evaluations"] as const,
  lists: () => [...EVALUATION_KEYS.all, "list"] as const,
  detail: (id: number) => [...EVALUATION_KEYS.all, "detail", id] as const,
};

export function useEvaluations() {
  return useQuery({
    queryKey: EVALUATION_KEYS.lists(),
    queryFn: async () => {
      const res = await EvaluationService.getAll();
      return res.data;
    },
  });
}

export function useCreateEvaluation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateEvaluationRequest) => EvaluationService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EVALUATION_KEYS.lists() });
    },
  });
}

export function useUpdateEvaluation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateEvaluationRequest }) =>
      EvaluationService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EVALUATION_KEYS.lists() });
    },
  });
}

export function useDeleteEvaluation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => EvaluationService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EVALUATION_KEYS.lists() });
    },
  });
}
