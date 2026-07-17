export interface Certificate {
  id: number;
  participant_id: number;
  class_id: number;
  certificate_number: string;
  bnsp_code?: string;
  file_url?: string;
  issued_date?: string;
}

export type CreateCertificateRequest = Omit<Certificate, "id" | "created_at" | "updated_at">;
export type UpdateCertificateRequest = Partial<CreateCertificateRequest>;
