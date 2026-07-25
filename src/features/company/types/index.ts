export type Company = {
  id: number;
  name: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  status: "active" | "inactive";
  created_at: string;
  updated_at: string;
};

export type CreateCompanyRequest = {
  name: string;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  status?: "active" | "inactive";
};

export type UpdateCompanyRequest = {
  name?: string;
  address?: string | null;
  phone?: string | null;
  email?: string | null;
  status?: "active" | "inactive";
};