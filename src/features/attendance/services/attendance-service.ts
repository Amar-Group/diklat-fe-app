import { apiClient } from "@/services/api/client";
import type { ApiResponse, WriteResult } from "@/services/api/types";
import type { Attendance, CreateAttendanceRequest, UpdateAttendanceRequest } from "../types";

export class AttendanceService {
  static async getAll(): Promise<ApiResponse<Attendance[]>> {
    return apiClient<ApiResponse<Attendance[]>>("/api/attendances");
  }

  static async getById(id: number): Promise<ApiResponse<Attendance>> {
    return apiClient<ApiResponse<Attendance>>(`/api/attendances/${id}`);
  }

  static async create(payload: CreateAttendanceRequest): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>("/api/attendances", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  static async update(id: number, payload: UpdateAttendanceRequest): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>(`/api/attendances/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  }

  static async delete(id: number): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>(`/api/attendances/${id}`, {
      method: "DELETE",
    });
  }
}
