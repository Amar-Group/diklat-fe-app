import { apiClient } from "@/services/api/client";
import type { ApiResponse, WriteResult } from "@/services/api/types";
import type { Course, CreateCourseRequest, UpdateCourseRequest } from "../types";

export class CourseService {
  static async getAll(): Promise<ApiResponse<Course[]>> {
    return apiClient<ApiResponse<Course[]>>("/api/courses");
  }

  static async getById(id: number): Promise<ApiResponse<Course>> {
    return apiClient<ApiResponse<Course>>(`/api/courses/${id}`);
  }

  static async create(payload: CreateCourseRequest): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>("/api/courses", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  static async update(id: number, payload: UpdateCourseRequest): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>(`/api/courses/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  }

  static async delete(id: number): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>(`/api/courses/${id}`, {
      method: "DELETE",
    });
  }
}
