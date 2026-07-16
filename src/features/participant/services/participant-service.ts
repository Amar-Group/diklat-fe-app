import { apiClient } from "@/services/api/client";
import type { ApiResponse, WriteResult } from "@/services/api/types";
import type { Participant, CreateParticipantDto, UpdateParticipantDto } from "../types";

export class ParticipantService {
  static async getAll(): Promise<ApiResponse<Participant[]>> {
    return apiClient<ApiResponse<Participant[]>>("/api/participants");
  }

  static async getById(id: number): Promise<ApiResponse<Participant>> {
    return apiClient<ApiResponse<Participant>>(`/api/participants/${id}`);
  }

  static async create(payload: CreateParticipantDto): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>("/api/participants", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  static async update(id: number, payload: UpdateParticipantDto): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>(`/api/participants/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  }

  static async delete(id: number): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>(`/api/participants/${id}`, {
      method: "DELETE",
    });
  }
}
