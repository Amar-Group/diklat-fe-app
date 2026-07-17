"use client";

import { Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";
import { PageHeader } from "@/components/shared/page-header";
import { useNotification } from "@/components/ui/notification";
import {
  useMaterials,
  useDeleteMaterial,
} from "@/features/material/hooks/use-material";
import { usePermissions } from "@/features/rbac/user/hooks/use-user";
import { useMaterialStore } from "@/features/material/store";
import { useModules } from "@/features/module/hooks/use-module";

import { useMaterialColumns } from "./_components/material-columns";
import { MaterialFormModal } from "./_components/material-form-modal";
import { DeleteConfirmModal } from "@/components/shared/delete-confirm-modal";

export default function MaterialsPage() {
  const { data: records = [], isLoading } = useMaterials();
  const { data: modules = [], isLoading: isLoadingModules } = useModules();
  const { add } = useNotification();
  const deleteRecord = useDeleteMaterial();
  const permissions = usePermissions();

  const { openCreate, deleteId, closeDelete } = useMaterialStore();

  const columns = useMaterialColumns({ permissions, modules });

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteRecord.mutateAsync(deleteId);
      add({
        title: "Berhasil",
        message: "Material berhasil dihapus.",
        variant: "success",
      });
      closeDelete();
    } catch (error: any) {
      add({
        title: "Gagal",
        message: error.message || "Gagal menghapus material.",
        variant: "danger",
      });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manajemen Material"
        description="Kelola data material."
        breadcrumbs={[
          { label: "LMS Studio", href: "#" },
          { label: "Material" },
        ]}
      />

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Daftar Material</CardTitle>
          {permissions.can_create && (
            <Button
              onClick={openCreate}
              size="sm"
              disabled={permissions.isLoading}
            >
              <Plus className="size-4 mr-1.5" />
              Tambah Material
            </Button>
          )}
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            data={records}
            columns={columns}
            searchPlaceholder="Cari material..."
            isLoading={isLoading || isLoadingModules}
            canExport={permissions.can_report}
            exportFilename="materials"
          />
        </CardContent>
      </Card>

      <MaterialFormModal />

      <DeleteConfirmModal
        open={deleteId !== null}
        onOpenChange={(open) => !open && closeDelete()}
        onConfirm={handleDelete}
        isPending={deleteRecord.isPending}
        description="Apakah kamu yakin ingin menghapus material ini? Tindakan ini tidak dapat dibatalkan."
      />
    </div>
  );
}
