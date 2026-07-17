import { apiClient } from "@/services/api/client";
import type { ApiResponse, WriteResult } from "@/services/api/types";
import type { Certificate, CreateCertificateRequest, UpdateCertificateRequest } from "../types";

export class CertificateService {
  static async getAll(): Promise<ApiResponse<Certificate[]>> {
    return apiClient<ApiResponse<Certificate[]>>("/api/certificates");
  }

  static async getById(id: number): Promise<ApiResponse<Certificate>> {
    return apiClient<ApiResponse<Certificate>>(`/api/certificates/${id}`);
  }

  static async create(payload: CreateCertificateRequest): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>("/api/certificates", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  static async update(id: number, payload: UpdateCertificateRequest): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>(`/api/certificates/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  }

  static async delete(id: number): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>(`/api/certificates/${id}`, {
      method: "DELETE",
    });
  }
}
