import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/services/api/client";

// Participants
export function useClassParticipants(classId: number) {
  return useQuery({
    queryKey: ["class_participants", classId],
    queryFn: () => apiClient<any>(`/api/classes/${classId}/participants`),
    enabled: !!classId,
  });
}

export function useAddClassParticipant() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ classId, participant_id }: { classId: number, participant_id: number }) => 
      apiClient(`/api/classes/${classId}/participants`, {
        method: 'POST',
        body: JSON.stringify({ participant_id }),
      }),
    onSuccess: (_, { classId }) => {
      queryClient.invalidateQueries({ queryKey: ["class_participants", classId] });
    },
  });
}

export function useRemoveClassParticipant() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ classId, participantId }: { classId: number, participantId: number }) => 
      apiClient(`/api/classes/${classId}/participants/${participantId}`, {
        method: 'DELETE',
      }),
    onSuccess: (_, { classId }) => {
      queryClient.invalidateQueries({ queryKey: ["class_participants", classId] });
    },
  });
}

// Instructors
export function useClassInstructors(classId: number) {
  return useQuery({
    queryKey: ["class_instructors", classId],
    queryFn: () => apiClient<any>(`/api/classes/${classId}/instructors`),
    enabled: !!classId,
  });
}

export function useAddClassInstructor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ classId, instructor_id }: { classId: number, instructor_id: number }) => 
      apiClient(`/api/classes/${classId}/instructors`, {
        method: 'POST',
        body: JSON.stringify({ instructor_id }),
      }),
    onSuccess: (_, { classId }) => {
      queryClient.invalidateQueries({ queryKey: ["class_instructors", classId] });
    },
  });
}

export function useRemoveClassInstructor() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ classId, instructorId }: { classId: number, instructorId: number }) => 
      apiClient(`/api/classes/${classId}/instructors/${instructorId}`, {
        method: 'DELETE',
      }),
    onSuccess: (_, { classId }) => {
      queryClient.invalidateQueries({ queryKey: ["class_instructors", classId] });
    },
  });
}
