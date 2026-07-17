import { apiClient } from "@/services/api/client";
import type { ApiResponse, WriteResult } from "@/services/api/types";
import type { Question, CreateQuestionRequest, UpdateQuestionRequest } from "../types";

export class QuestionService {
  static async getAll(): Promise<ApiResponse<Question[]>> {
    return apiClient<ApiResponse<Question[]>>("/api/questions");
  }

  static async getById(id: number): Promise<ApiResponse<Question>> {
    return apiClient<ApiResponse<Question>>(`/api/questions/${id}`);
  }

  static async create(payload: CreateQuestionRequest): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>("/api/questions", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  static async update(id: number, payload: UpdateQuestionRequest): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>(`/api/questions/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  }

  static async delete(id: number): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>(`/api/questions/${id}`, {
      method: "DELETE",
    });
  }
}
