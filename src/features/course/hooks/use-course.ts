import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CourseService } from "../services/course-service";
import type { CreateCourseRequest, UpdateCourseRequest } from "../types";

export const COURSE_KEYS = {
  all: ["courses"] as const,
  lists: () => [...COURSE_KEYS.all, "list"] as const,
  list: (filters: string) => [...COURSE_KEYS.lists(), { filters }] as const,
  details: () => [...COURSE_KEYS.all, "detail"] as const,
  detail: (id: number) => [...COURSE_KEYS.details(), id] as const,
};

export function useCourses() {
  return useQuery({
    queryKey: COURSE_KEYS.lists(),
    queryFn: async () => {
      const res = await CourseService.getAll();
      return res.data;
    },
  });
}

export function useCourse(id: number, enabled = true) {
  return useQuery({
    queryKey: COURSE_KEYS.detail(id),
    queryFn: async () => {
      const res = await CourseService.getById(id);
      return res.data;
    },
    enabled: !!id && enabled,
  });
}

export function useCreateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCourseRequest) => CourseService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COURSE_KEYS.lists() });
    },
  });
}

export function useUpdateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCourseRequest }) =>
      CourseService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: COURSE_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: COURSE_KEYS.detail(variables.id) });
    },
  });
}

export function useDeleteCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => CourseService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COURSE_KEYS.lists() });
    },
  });
}
