import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CompanyService } from "../services/company-service";
import type { CreateCompanyRequest, UpdateCompanyRequest } from "../types";

export const COMPANY_KEYS = {
  all: ["companies"] as const,
  lists: () => [...COMPANY_KEYS.all, "list"] as const,
  list: (filters: string) => [...COMPANY_KEYS.lists(), { filters }] as const,
  details: () => [...COMPANY_KEYS.all, "detail"] as const,
  detail: (id: number) => [...COMPANY_KEYS.details(), id] as const,
};

export function useCompanies() {
  return useQuery({
    queryKey: COMPANY_KEYS.lists(),
    queryFn: async () => {
      const res = await CompanyService.getAll();
      return res.data;
    },
  });
}

export function useCompany(id: number, enabled = true) {
  return useQuery({
    queryKey: COMPANY_KEYS.detail(id),
    queryFn: async () => {
      const res = await CompanyService.getById(id);
      return res.data;
    },
    enabled: !!id && enabled,
  });
}

export function useCreateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCompanyRequest) => CompanyService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMPANY_KEYS.lists() });
    },
  });
}

export function useUpdateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCompanyRequest }) =>
      CompanyService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: COMPANY_KEYS.lists() });
      queryClient.invalidateQueries({ queryKey: COMPANY_KEYS.detail(variables.id) });
    },
  });
}

export function useDeleteCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => CompanyService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMPANY_KEYS.lists() });
    },
  });
}
