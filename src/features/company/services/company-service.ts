import { apiClient } from "@/services/api/client";
import type { ApiResponse, WriteResult } from "@/services/api/types";
import type { Company, CreateCompanyRequest, UpdateCompanyRequest } from "../types";

export class CompanyService {
  static async getAll(): Promise<ApiResponse<Company[]>> {
    return apiClient<ApiResponse<Company[]>>("/api/companies");
  }

  static async getById(id: number): Promise<ApiResponse<Company>> {
    return apiClient<ApiResponse<Company>>(`/api/companies/${id}`);
  }

  static async create(payload: CreateCompanyRequest): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>("/api/companies", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  static async update(id: number, payload: UpdateCompanyRequest): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>(`/api/companies/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  }

  static async delete(id: number): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>(`/api/companies/${id}`, {
      method: "DELETE",
    });
  }
}
