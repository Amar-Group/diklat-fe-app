import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/services/api/client";
import type { ApiResponse } from "@/services/api/types";
import type { Material } from "../types";

export function useMaterials() {
  return useQuery({
    queryKey: ["materials"],
    queryFn: async () => {
      const res = await apiClient<ApiResponse<Material[]>>("/api/materials/my-learning");
      return res.data;
    },
  });
}

export function useMarkMaterialCompleted() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (materialId: number) => {
      const res = await apiClient<ApiResponse<any>>(`/api/materials/my-learning/${materialId}/progress`, {
        method: "POST",
      });
      return res.data;
    },
    onSuccess: () => {
      // Invalidate class syllabus query to refresh progress
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
}

export function useCreateMaterial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Material>) => {
      const res = await apiClient<ApiResponse<Material>>("/api/materials", {
        method: "POST",
        body: JSON.stringify(data),
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials"] });
    },
  });
}

export function useUpdateMaterial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<Material> }) => {
      const res = await apiClient<ApiResponse<Material>>("/api/materials/" + id, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials"] });
    },
  });
}

export function useDeleteMaterial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await apiClient("/api/materials/" + id, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["materials"] });
    },
  });
}
