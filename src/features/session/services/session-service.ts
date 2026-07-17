import { apiClient } from "@/services/api/client";
import type { ApiResponse, WriteResult } from "@/services/api/types";
import type { Session, CreateSessionRequest, UpdateSessionRequest } from "../types";

export class SessionService {
  static async getAll(): Promise<ApiResponse<Session[]>> {
    return apiClient<ApiResponse<Session[]>>("/api/sessions");
  }

  static async getById(id: number): Promise<ApiResponse<Session>> {
    return apiClient<ApiResponse<Session>>(`/api/sessions/${id}`);
  }

  static async create(payload: CreateSessionRequest): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>("/api/sessions", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  static async update(id: number, payload: UpdateSessionRequest): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>(`/api/sessions/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  }

  static async delete(id: number): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>(`/api/sessions/${id}`, {
      method: "DELETE",
    });
  }
}
