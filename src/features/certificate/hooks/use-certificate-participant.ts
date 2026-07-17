import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/services/api/client";
import { ApiResponse } from "@/services/api/types";

export function useMyLearningCertificate(classId: number) {
  return useQuery({
    queryKey: ["my-learning-certificate", classId],
    queryFn: async () => {
      const res = await apiClient<ApiResponse<any>>(`/api/certificates/my-learning/${classId}`);
      return res.data;
    },
    enabled: !!classId,
  });
}
