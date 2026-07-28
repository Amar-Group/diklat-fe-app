import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/services/api/client";
import type { ApiResponse } from "@/services/api/types";
import type { Curriculum, CreateCurriculumRequest, UpdateCurriculumRequest } from "../types";

export const CURRICULUM_KEYS = {
  all: ["curriculum"] as const,
  lists: () => [...CURRICULUM_KEYS.all, "list"] as const,
};

/**
 * Fetch semua kurikulum (course_modules) — reuse /api/modules endpoint
 */
export function useCurriculums() {
  return useQuery({
    queryKey: CURRICULUM_KEYS.lists(),
    queryFn: async () => {
      const res = await apiClient<ApiResponse<Curriculum[]>>("/api/modules");
      return res.data;
    },
  });
}

export function useCreateCurriculum() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateCurriculumRequest) => {
      const res = await apiClient<ApiResponse<Curriculum>>("/api/modules", {
        method: "POST",
        body: JSON.stringify(data),
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CURRICULUM_KEYS.lists() });
    },
  });
}

export function useUpdateCurriculum() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: UpdateCurriculumRequest }) => {
      const res = await apiClient<ApiResponse<Curriculum>>(`/api/modules/${id}`, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CURRICULUM_KEYS.lists() });
    },
  });
}

export function useDeleteCurriculum() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await apiClient(`/api/modules/${id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CURRICULUM_KEYS.lists() });
    },
  });
}
