import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { InstructorService } from "../services/instructor-service";
import type { CreateInstructorDto, UpdateInstructorDto } from "../types";

export const INSTRUCTOR_KEYS = {
  all: ["instructors"] as const,
  lists: () => [...INSTRUCTOR_KEYS.all, "list"] as const,
  list: (filters: string) => [...INSTRUCTOR_KEYS.lists(), { filters }] as const,
  details: () => [...INSTRUCTOR_KEYS.all, "detail"] as const,
  detail: (id: number) => [...INSTRUCTOR_KEYS.details(), id] as const,
};

export function useInstructors() {
  return useQuery({
    queryKey: INSTRUCTOR_KEYS.lists(),
    queryFn: async () => {
      const res = await InstructorService.getAll();
      return res.data;
    },
  });
}

export function useInstructor(id: number, enabled = true) {
  return useQuery({
    queryKey: INSTRUCTOR_KEYS.detail(id),
    queryFn: async () => {
      const res = await InstructorService.getById(id);
      return res.data;
    },
    enabled: !!id && enabled,
  });
}

export function useCreateInstructor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateInstructorDto) => InstructorService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INSTRUCTOR_KEYS.lists() });
    },
  });
}

export function useUpdateInstructor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateInstructorDto }) =>
      InstructorService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: INSTRUCTOR_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: INSTRUCTOR_KEYS.detail(variables.id) });
    },
  });
}

export function useDeleteInstructor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => InstructorService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INSTRUCTOR_KEYS.lists() });
    },
  });
}
