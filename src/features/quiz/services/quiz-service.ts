import { apiClient } from "@/services/api/client";
import type { ApiResponse, WriteResult } from "@/services/api/types";
import type { Quiz, CreateQuizRequest, UpdateQuizRequest } from "../types";

export class QuizService {
  static async getAll(): Promise<ApiResponse<Quiz[]>> {
    return apiClient<ApiResponse<Quiz[]>>("/api/quizzes/my-learning");
  }

  static async getById(id: number): Promise<ApiResponse<Quiz>> {
    return apiClient<ApiResponse<Quiz>>(`/api/quizzes/${id}`);
  }

  static async create(payload: CreateQuizRequest): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>("/api/quizzes", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  static async update(id: number, payload: UpdateQuizRequest): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>(`/api/quizzes/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  }

  static async delete(id: number): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>(`/api/quizzes/${id}`, {
      method: "DELETE",
    });
  }
}
