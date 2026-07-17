import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ClassService } from "../services/class-service";
import type { CreateClassDto, UpdateClassDto } from "../types";

export const CLASS_KEYS = {
  all: ["classes"] as const,
  lists: () => [...CLASS_KEYS.all, "list"] as const,
  list: (filters: string) => [...CLASS_KEYS.lists(), { filters }] as const,
  myLearning: () => [...CLASS_KEYS.all, "myLearning"] as const,
  details: () => [...CLASS_KEYS.all, "detail"] as const,
  detail: (id: number) => [...CLASS_KEYS.details(), id] as const,
};

export function useClasses() {
  return useQuery({
    queryKey: CLASS_KEYS.lists(),
    queryFn: async () => {
      const res = await ClassService.getAll();
      return res.data;
    },
  });
}

export function useMyLearning() {
  return useQuery({
    queryKey: CLASS_KEYS.myLearning(),
    queryFn: async () => {
      const res = await ClassService.getMyLearning();
      return res.data;
    },
  });
}

export function useClass(id: number, enabled = true) {
  return useQuery({
    queryKey: CLASS_KEYS.detail(id),
    queryFn: async () => {
      const res = await ClassService.getById(id);
      return res.data;
    },
    enabled: !!id && enabled,
  });
}

export function useCreateClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateClassDto) => ClassService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CLASS_KEYS.lists() });
    },
  });
}

export function useUpdateClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateClassDto }) =>
      ClassService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: CLASS_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: CLASS_KEYS.detail(variables.id) });
    },
  });
}

export function useDeleteClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => ClassService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CLASS_KEYS.lists() });
    },
  });
}
