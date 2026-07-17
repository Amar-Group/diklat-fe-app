"use client";

import { Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";
import { PageHeader } from "@/components/shared/page-header";
import { useNotification } from "@/components/ui/notification";
import { useLogistics, useDeleteLogistic } from "@/features/logistic/hooks/use-logistic";
import { usePermissions } from "@/features/rbac/user/hooks/use-user";
import { useLogisticStore } from "@/features/logistic/store";
import { useClasses } from "@/features/class/hooks/use-class";

import { useLogisticColumns } from "./_components/logistic-columns";
import { LogisticFormModal } from "./_components/logistic-form-modal";
import { DeleteConfirmModal } from "@/components/shared/delete-confirm-modal";

export default function FacilitiesPage() {
  const { data: records = [], isLoading } = useLogistics();
  const { data: classes = [], isLoading: isLoadingClasses } = useClasses();
  const { add } = useNotification();
  const deleteRecord = useDeleteLogistic();
  const permissions = usePermissions();

  const { openCreate, deleteId, closeDelete } = useLogisticStore();

  const columns = useLogisticColumns({ permissions, classes });

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteRecord.mutateAsync(deleteId);
      add({ title: "Berhasil", message: "Fasilitas berhasil dihapus.", variant: "success" });
      closeDelete();
    } catch (error: any) {
      add({ title: "Gagal", message: error.message || "Gagal menghapus fasilitas.", variant: "danger" });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manajemen Fasilitas"
        description="Kelola fasilitas akomodasi dan operasional kelas."
        breadcrumbs={[{ label: "Logistik & Operasional", href: "#" }, { label: "Manajemen Fasilitas" }]}
      />

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Fasilitas Kelas</CardTitle>
          {permissions.can_create && (
            <Button onClick={openCreate} size="sm" disabled={permissions.isLoading}>
              <Plus className="size-4 mr-1.5" /> Tambah Fasilitas
            </Button>
          )}
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            data={records}
            columns={columns}
            searchPlaceholder="Cari data..."
            isLoading={isLoading || isLoadingClasses}
            canExport={permissions.can_report}
            exportFilename="logistik_fasilitas"
          />
        </CardContent>
      </Card>

      <LogisticFormModal />

      <DeleteConfirmModal
        open={deleteId !== null}
        onOpenChange={(open) => !open && closeDelete()}
        onConfirm={handleDelete}
        isPending={deleteRecord.isPending}
        description="Apakah kamu yakin ingin menghapus data fasilitas ini? Tindakan ini tidak dapat dibatalkan."
      />
    </div>
  );
}
