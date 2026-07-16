"use client";

import { Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";
import { PageHeader } from "@/components/shared/page-header";
import { useNotification } from "@/components/ui/notification";
import {
  useCompanies,
  useDeleteCompany,
} from "@/features/company/hooks/use-company";
import { usePermissions } from "@/features/rbac/user/hooks/use-user";
import { useCompanyStore } from "@/features/company/store";

import { useCompanyColumns } from "./_components/company-columns";
import { CompanyFormModal } from "./_components/company-form-modal";
import { DeleteConfirmModal } from "@/components/shared/delete-confirm-modal";

export default function CompaniesPage() {
  const { data: companies = [], isLoading } = useCompanies();
  const { add } = useNotification();
  const deleteCompany = useDeleteCompany();
  const permissions = usePermissions();

  const { openCreate, deleteId, closeDelete } = useCompanyStore();

  const columns = useCompanyColumns({ permissions });

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteCompany.mutateAsync(deleteId);
      add({
        title: "Berhasil",
        message: "Company berhasil dihapus.",
        variant: "success",
      });
      closeDelete();
    } catch (error: any) {
      add({
        title: "Gagal",
        message: error.message || "Gagal menghapus company.",
        variant: "danger",
      });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manajemen Company"
        description="Kelola company yang tersedia di sistem."
        breadcrumbs={[
          { label: "Master Data", href: "#" },
          { label: "Company" },
        ]}
      />

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Daftar Company</CardTitle>
          {permissions.can_create && (
            <Button
              onClick={openCreate}
              size="sm"
              disabled={permissions.isLoading}
            >
              <Plus className="size-4 mr-1.5" />
              Tambah Company
            </Button>
          )}
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            data={companies}
            columns={columns}
            searchPlaceholder="Cari company..."
            isLoading={isLoading}
            canExport={permissions.can_report}
            exportFilename="companies"
          />
        </CardContent>
      </Card>

      <CompanyFormModal />

      <DeleteConfirmModal
        open={deleteId !== null}
        onOpenChange={(open) => !open && closeDelete()}
        onConfirm={handleDelete}
        isPending={deleteCompany.isPending}
        description="Apakah kamu yakin ingin menghapus company ini? Tindakan ini tidak dapat dibatalkan."
      />
    </div>
  );
}
