import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/services/api/client";
import { ApiResponse } from "@/services/api/types";

export function useMyLearningEvaluation(classId: number) {
  return useQuery({
    queryKey: ["my-learning-evaluation", classId],
    queryFn: async () => {
      const res = await apiClient<ApiResponse<any>>(`/api/evaluations/my-learning/${classId}`);
      return res.data;
    },
    enabled: !!classId,
  });
}

export function useSubmitEvaluation() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ classId, data }: { classId: number, data: { instructor_rating: number, material_rating: number, review_text: string } }) => {
      const res = await apiClient<ApiResponse<any>>(`/api/evaluations/my-learning/${classId}`, {
        method: "POST",
        body: JSON.stringify(data),
      });
      return res;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["my-learning-evaluation", variables.classId] });
    },
  });
}
