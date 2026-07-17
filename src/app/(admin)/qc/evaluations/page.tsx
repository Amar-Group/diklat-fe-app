"use client";

import { Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";
import { PageHeader } from "@/components/shared/page-header";
import { useNotification } from "@/components/ui/notification";
import { useEvaluations, useDeleteEvaluation } from "@/features/evaluation/hooks/use-evaluation";
import { usePermissions } from "@/features/rbac/user/hooks/use-user";
import { useEvaluationStore } from "@/features/evaluation/store";

import { useEvaluationColumns } from "./_components/evaluation-columns";
import { EvaluationFormModal } from "./_components/evaluation-form-modal";
import { DeleteConfirmModal } from "@/components/shared/delete-confirm-modal";

export default function EvaluationPage() {
  const { data: records = [], isLoading } = useEvaluations();
  const { add } = useNotification();
  const deleteRecord = useDeleteEvaluation();
  const permissions = usePermissions();

  const { openCreate, deleteId, closeDelete } = useEvaluationStore();

  const columns = useEvaluationColumns({ permissions });

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
        title="Testimoni & Ulasan"
        description="Evaluasi dari peserta terhadap sistem kelas."
        breadcrumbs={[{ label: "Testimoni & Ulasan" }]}
      />

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Data Testimoni & Ulasan</CardTitle>
          {permissions.can_create && (
            <Button onClick={openCreate} size="sm" disabled={permissions.isLoading}>
              <Plus className="size-4 mr-1.5" /> Tambah Testimoni & Ulasan
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
            exportFilename="evaluation_data"
          />
        </CardContent>
      </Card>

      <EvaluationFormModal />

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
