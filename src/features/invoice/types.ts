export interface Invoice {
  id: number;
  invoice_number: string;
  company_id?: number;
  user_id?: number;
  class_id: number;
  total_amount: number;
  status: 'unpaid' | 'pending_validation' | 'paid';
  payment_proof_url?: string;
  due_date?: string;
  created_at?: string;
  updated_at?: string;
}

export type CreateInvoiceRequest = Omit<Invoice, "id" | "created_at" | "updated_at">;
export type UpdateInvoiceRequest = Partial<CreateInvoiceRequest>;
