"use client";

import { Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";
import { PageHeader } from "@/components/shared/page-header";
import { useNotification } from "@/components/ui/notification";
import { useCertificates, useDeleteCertificate } from "@/features/certificate/hooks/use-certificate";
import { usePermissions } from "@/features/rbac/user/hooks/use-user";
import { useCertificateStore } from "@/features/certificate/store";

import { useCertificateColumns } from "./_components/certificate-columns";
import { CertificateFormModal } from "./_components/certificate-form-modal";
import { DeleteConfirmModal } from "@/components/shared/delete-confirm-modal";

export default function CertificatePage() {
  const { data: records = [], isLoading } = useCertificates();
  const { add } = useNotification();
  const deleteRecord = useDeleteCertificate();
  const permissions = usePermissions();

  const { openCreate, deleteId, closeDelete } = useCertificateStore();

  const columns = useCertificateColumns({ permissions });

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteRecord.mutateAsync(deleteId);
      add({ title: "Berhasil", message: "Data berhasil dihapus.", variant: "success" });
      closeDelete();
    } catch (error: any) {
      add({ title: "Gagal", message: error.message || "Gagal menghapus data.", variant: "danger" });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Penerbitan Sertifikat"
        description="Kelola sertifikat kelulusan peserta diklat."
        breadcrumbs={[{ label: "Penerbitan Sertifikat" }]}
      />

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Data Penerbitan Sertifikat</CardTitle>
          {permissions.can_create && (
            <Button onClick={openCreate} size="sm" disabled={permissions.isLoading}>
              <Plus className="size-4 mr-1.5" /> Tambah Penerbitan Sertifikat
            </Button>
          )}
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            data={records}
            columns={columns}
            searchPlaceholder="Cari data..."
            isLoading={isLoading}
            canExport={permissions.can_report}
            exportFilename="certificate_data"
          />
        </CardContent>
      </Card>

      <CertificateFormModal />

      <DeleteConfirmModal
        open={deleteId !== null}
        onOpenChange={(open) => !open && closeDelete()}
        onConfirm={handleDelete}
        isPending={deleteRecord.isPending}
        description="Apakah kamu yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan."
      />
    </div>
  );
}
