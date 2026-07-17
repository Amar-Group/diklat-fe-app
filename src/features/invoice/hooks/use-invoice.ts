import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { InvoiceService } from "../services/invoice-service";
import type { CreateInvoiceRequest, UpdateInvoiceRequest } from "../types";

export const INVOICE_KEYS = {
  all: ["invoices"] as const,
  lists: () => [...INVOICE_KEYS.all, "list"] as const,
  detail: (id: number) => [...INVOICE_KEYS.all, "detail", id] as const,
};

export function useInvoices() {
  return useQuery({
    queryKey: INVOICE_KEYS.lists(),
    queryFn: async () => {
      const res = await InvoiceService.getAll();
      return res.data;
    },
  });
}

export function useCreateInvoice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateInvoiceRequest) => InvoiceService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVOICE_KEYS.lists() });
    },
  });
}

export function useUpdateInvoice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateInvoiceRequest }) =>
      InvoiceService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVOICE_KEYS.lists() });
    },
  });
}

export function useDeleteInvoice() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => InvoiceService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: INVOICE_KEYS.lists() });
    },
  });
}
