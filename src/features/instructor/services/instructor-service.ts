import { apiClient } from "@/services/api/client";
import type { ApiResponse, WriteResult } from "@/services/api/types";
import type { Instructor, CreateInstructorDto, UpdateInstructorDto } from "../types";

export class InstructorService {
  static async getAll(): Promise<ApiResponse<Instructor[]>> {
    return apiClient<ApiResponse<Instructor[]>>("/api/instructors");
  }

  static async getById(id: number): Promise<ApiResponse<Instructor>> {
    return apiClient<ApiResponse<Instructor>>(`/api/instructors/${id}`);
  }

  static async create(payload: CreateInstructorDto): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>("/api/instructors", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  static async update(id: number, payload: UpdateInstructorDto): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>(`/api/instructors/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  }

  static async delete(id: number): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>(`/api/instructors/${id}`, {
      method: "DELETE",
    });
  }
}
