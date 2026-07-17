import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/services/api/client";
import { ApiResponse } from "@/services/api/types";

export function useMyLearningQuiz(quizId: number) {
  return useQuery({
    queryKey: ["my-learning-quiz", quizId],
    queryFn: async () => {
      const res = await apiClient<ApiResponse<any>>(`/api/quizzes/my-learning/${quizId}`);
      return res.data;
    },
    enabled: !!quizId,
  });
}

export function useSubmitQuiz() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ quizId, answers }: { quizId: number; answers: { question_id: number; answer: string }[] }) => {
      const res = await apiClient<ApiResponse<any>>(`/api/quizzes/my-learning/${quizId}/submit`, {
        method: "POST",
        body: JSON.stringify({ answers }),
      });
      return res.data;
    },
    onSuccess: (_, { quizId }) => {
      queryClient.invalidateQueries({ queryKey: ["my-learning-quiz", quizId] });
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
  });
}
