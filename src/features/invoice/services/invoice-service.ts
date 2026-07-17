import { apiClient } from "@/services/api/client";
import type { ApiResponse, WriteResult } from "@/services/api/types";
import type { Invoice, CreateInvoiceRequest, UpdateInvoiceRequest } from "../types";

export class InvoiceService {
  static async getAll(): Promise<ApiResponse<Invoice[]>> {
    return apiClient<ApiResponse<Invoice[]>>("/api/invoices");
  }

  static async getById(id: number): Promise<ApiResponse<Invoice>> {
    return apiClient<ApiResponse<Invoice>>(`/api/invoices/${id}`);
  }

  static async create(payload: CreateInvoiceRequest): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>("/api/invoices", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  }

  static async update(id: number, payload: UpdateInvoiceRequest): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>(`/api/invoices/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
  }

  static async delete(id: number): Promise<ApiResponse<WriteResult>> {
    return apiClient<ApiResponse<WriteResult>>(`/api/invoices/${id}`, {
      method: "DELETE",
    });
  }
}
