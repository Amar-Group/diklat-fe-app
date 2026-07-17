import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/services/api/client";
import type { ApiResponse } from "@/services/api/types";
import type { Module } from "../types";

export function useModules() {
  return useQuery({
    queryKey: ["modules"],
    queryFn: async () => {
      const res = await apiClient<ApiResponse<Module[]>>("/api/modules/my-learning");
      return res.data;
    },
  });
}

export function useCreateModule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: Partial<Module>) => {
      const res = await apiClient<ApiResponse<Module>>("/api/modules", {
        method: "POST",
        body: JSON.stringify(data),
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["modules"] });
    },
  });
}

export function useUpdateModule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: number; data: Partial<Module> }) => {
      const res = await apiClient<ApiResponse<Module>>("/api/modules/" + id, {
        method: "PUT",
        body: JSON.stringify(data),
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["modules"] });
    },
  });
}

export function useDeleteModule() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await apiClient("/api/modules/" + id, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["modules"] });
    },
  });
}
