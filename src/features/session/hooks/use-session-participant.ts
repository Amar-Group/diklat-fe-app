import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/services/api/client";
import { ApiResponse } from "@/services/api/types";

export function useMyLearningSessions(classId: number) {
  return useQuery({
    queryKey: ["my-learning-sessions", classId],
    queryFn: async () => {
      const res = await apiClient<ApiResponse<any[]>>(`/api/sessions/my-learning/${classId}`);
      return res.data;
    },
    enabled: !!classId,
  });
}
