import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { LogisticService } from "../services/logistic-service";
import type { CreateLogisticRequest, UpdateLogisticRequest } from "../types";

export const LOGISTIC_KEYS = {
  all: ["logistics"] as const,
  lists: () => [...LOGISTIC_KEYS.all, "list"] as const,
  detail: (id: number) => [...LOGISTIC_KEYS.all, "detail", id] as const,
};

export function useLogistics() {
  return useQuery({
    queryKey: LOGISTIC_KEYS.lists(),
    queryFn: async () => {
      const res = await LogisticService.getAll();
      return res.data;
    },
  });
}

export function useCreateLogistic() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateLogisticRequest) => LogisticService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LOGISTIC_KEYS.lists() });
    },
  });
}

export function useUpdateLogistic() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateLogisticRequest }) =>
      LogisticService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LOGISTIC_KEYS.lists() });
    },
  });
}

export function useDeleteLogistic() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => LogisticService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: LOGISTIC_KEYS.lists() });
    },
  });
}
