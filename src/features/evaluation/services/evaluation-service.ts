import { apiClient } from "@/services/api/client";
import type { ApiResponse, WriteResult } from "@/services/api/types";
import type { Evaluation, CreateEvaluationRequest, UpdateEvaluationRequest } from "../types";

export class EvaluationService {
  static async getAll(): Promise<ApiResponse<Evaluation[]>> {
    return apiClient<ApiResponse<Evaluation[]>>("/api/evaluations");
  }

  static async getById(id: number): Promise<ApiResponse<Evaluation>> {
    return apiClient<ApiResponse<Evaluation>>(`/api/evaluations/${id}`);
  }

  static async create(payload: CreateEvaluationRequest): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>("/api/evaluations", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  static async update(id: number, payload: UpdateEvaluationRequest): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>(`/api/evaluations/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  }

  static async delete(id: number): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>(`/api/evaluations/${id}`, {
      method: "DELETE",
    });
  }
}
