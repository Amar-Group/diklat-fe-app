import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CertificateService } from "../services/certificate-service";
import type { CreateCertificateRequest, UpdateCertificateRequest } from "../types";

export const CERTIFICATE_KEYS = {
  all: ["certificates"] as const,
  lists: () => [...CERTIFICATE_KEYS.all, "list"] as const,
  detail: (id: number) => [...CERTIFICATE_KEYS.all, "detail", id] as const,
};

export function useCertificates() {
  return useQuery({
    queryKey: CERTIFICATE_KEYS.lists(),
    queryFn: async () => {
      const res = await CertificateService.getAll();
      return res.data;
    },
  });
}

export function useCreateCertificate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateCertificateRequest) => CertificateService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CERTIFICATE_KEYS.lists() });
    },
  });
}

export function useUpdateCertificate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateCertificateRequest }) =>
      CertificateService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CERTIFICATE_KEYS.lists() });
    },
  });
}

export function useDeleteCertificate() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => CertificateService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CERTIFICATE_KEYS.lists() });
    },
  });
}
