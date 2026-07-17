import { apiClient } from "@/services/api/client";
import type { ApiResponse, WriteResult } from "@/services/api/types";
import type { Logistic, CreateLogisticRequest, UpdateLogisticRequest } from "../types";

export class LogisticService {
  static async getAll(): Promise<ApiResponse<Logistic[]>> {
    return apiClient<ApiResponse<Logistic[]>>("/api/logistics");
  }

  static async getById(id: number): Promise<ApiResponse<Logistic>> {
    return apiClient<ApiResponse<Logistic>>(`/api/logistics/${id}`);
  }

  static async create(payload: CreateLogisticRequest): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>("/api/logistics", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  static async update(id: number, payload: UpdateLogisticRequest): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>(`/api/logistics/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  }

  static async delete(id: number): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>(`/api/logistics/${id}`, {
      method: "DELETE",
    });
  }
}
