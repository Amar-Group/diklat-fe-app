import { apiClient } from "@/services/api/client";
import type { ApiResponse, WriteResult } from "@/services/api/types";
import type { Class, CreateClassDto, UpdateClassDto } from "../types";

export class ClassService {
  static async getAll(): Promise<ApiResponse<Class[]>> {
    return apiClient<ApiResponse<Class[]>>("/api/classes");
  }

  static async getById(id: number): Promise<ApiResponse<Class>> {
    return apiClient<ApiResponse<Class>>(`/api/classes/${id}`);
  }

  static async create(payload: CreateClassDto): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>("/api/classes", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  static async update(id: number, payload: UpdateClassDto): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>(`/api/classes/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  }

  static async delete(id: number): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>(`/api/classes/${id}`, {
      method: "DELETE",
    });
  }
}
