import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/services/api/client";
import { ApiResponse } from "@/services/api/types";

export function useCheckIn() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ sessionId, method = 'manual' }: { sessionId: number, method?: string }) => {
      const res = await apiClient<ApiResponse<any>>(`/api/attendances/my-learning/check-in`, {
        method: "POST",
        body: JSON.stringify({ session_id: sessionId, method }),
      });
      return res;
    },
    onSuccess: () => {
      // Refresh session list to update attendance status
      queryClient.invalidateQueries({ queryKey: ["my-learning-sessions"] });
    },
  });
}
