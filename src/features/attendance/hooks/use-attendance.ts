import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AttendanceService } from "../services/attendance-service";
import type { CreateAttendanceRequest, UpdateAttendanceRequest } from "../types";

export const ATTENDANCE_KEYS = {
  all: ["attendances"] as const,
  lists: () => [...ATTENDANCE_KEYS.all, "list"] as const,
  detail: (id: number) => [...ATTENDANCE_KEYS.all, "detail", id] as const,
};

export function useAttendances() {
  return useQuery({
    queryKey: ATTENDANCE_KEYS.lists(),
    queryFn: async () => {
      const res = await AttendanceService.getAll();
      return res.data;
    },
  });
}

export function useCreateAttendance() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateAttendanceRequest) => AttendanceService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ATTENDANCE_KEYS.lists() });
    },
  });
}

export function useUpdateAttendance() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateAttendanceRequest }) =>
      AttendanceService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ATTENDANCE_KEYS.lists() });
    },
  });
}

export function useDeleteAttendance() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => AttendanceService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ATTENDANCE_KEYS.lists() });
    },
  });
}
