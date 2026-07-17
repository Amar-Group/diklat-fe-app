import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { SessionService } from "../services/session-service";
import type { CreateSessionRequest, UpdateSessionRequest } from "../types";

export const SESSION_KEYS = {
  all: ["sessions"] as const,
  lists: () => [...SESSION_KEYS.all, "list"] as const,
  detail: (id: number) => [...SESSION_KEYS.all, "detail", id] as const,
};

export function useSessions() {
  return useQuery({
    queryKey: SESSION_KEYS.lists(),
    queryFn: async () => {
      const res = await SessionService.getAll();
      return res.data;
    },
  });
}

export function useCreateSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateSessionRequest) => SessionService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SESSION_KEYS.lists() });
    },
  });
}

export function useUpdateSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateSessionRequest }) =>
      SessionService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SESSION_KEYS.lists() });
    },
  });
}

export function useDeleteSession() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => SessionService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SESSION_KEYS.lists() });
    },
  });
}
