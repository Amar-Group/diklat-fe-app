import { apiClient } from "@/services/api/client";
import type { LoginRequest, LoginResponse, RegisterRequest } from "../types";

/**
 * Auth API service — handles login call to BE.
 * Login endpoint is PUBLIC (no JWT required, but needs X-App-Token).
 */
export class AuthService {
  static async login(payload: LoginRequest): Promise<LoginResponse> {
    return apiClient<LoginResponse>("/api/users/login", {
      method: "POST",
      body: JSON.stringify(payload),
      skipAuth: true, // login is a public endpoint
    });
  }

  static async register(payload: RegisterRequest): Promise<any> {
    return apiClient<any>("/api/users/register", {
      method: "POST",
      body: JSON.stringify(payload),
      skipAuth: true, // register is a public endpoint
    });
  }

  static async verifyOtp(payload: { email: string; otp: string }): Promise<any> {
    return apiClient<any>("/api/users/verify-otp", {
      method: "POST",
      body: JSON.stringify(payload),
      skipAuth: true,
    });
  }

  static async resendOtp(payload: { email: string }): Promise<any> {
    return apiClient<any>("/api/users/resend-otp", {
      method: "POST",
      body: JSON.stringify(payload),
      skipAuth: true,
    });
  }
}
