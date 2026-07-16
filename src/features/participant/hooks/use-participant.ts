import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ParticipantService } from "../services/participant-service";
import type { CreateParticipantDto, UpdateParticipantDto } from "../types";

export const PARTICIPANT_KEYS = {
  all: ["participants"] as const,
  lists: () => [...PARTICIPANT_KEYS.all, "list"] as const,
  list: (filters: string) => [...PARTICIPANT_KEYS.lists(), { filters }] as const,
  details: () => [...PARTICIPANT_KEYS.all, "detail"] as const,
  detail: (id: number) => [...PARTICIPANT_KEYS.details(), id] as const,
};

export function useParticipants() {
  return useQuery({
    queryKey: PARTICIPANT_KEYS.lists(),
    queryFn: async () => {
      const res = await ParticipantService.getAll();
      return res.data;
    },
  });
}

export function useParticipant(id: number, enabled = true) {
  return useQuery({
    queryKey: PARTICIPANT_KEYS.detail(id),
    queryFn: async () => {
      const res = await ParticipantService.getById(id);
      return res.data;
    },
    enabled: !!id && enabled,
  });
}

export function useCreateParticipant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateParticipantDto) => ParticipantService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PARTICIPANT_KEYS.lists() });
    },
  });
}

export function useUpdateParticipant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateParticipantDto }) =>
      ParticipantService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: PARTICIPANT_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: PARTICIPANT_KEYS.detail(variables.id) });
    },
  });
}

export function useDeleteParticipant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => ParticipantService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PARTICIPANT_KEYS.lists() });
    },
  });
}
