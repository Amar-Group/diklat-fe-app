"use client";

import { Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";
import { PageHeader } from "@/components/shared/page-header";
import { useNotification } from "@/components/ui/notification";
import { useSessions, useDeleteSession } from "@/features/session/hooks/use-session";
import { usePermissions } from "@/features/rbac/user/hooks/use-user";
import { useSessionStore } from "@/features/session/store";
import { useClasses } from "@/features/class/hooks/use-class";

import { useSessionColumns } from "./_components/session-columns";
import { SessionFormModal } from "./_components/session-form-modal";
import { DeleteConfirmModal } from "@/components/shared/delete-confirm-modal";

export default function SessionsPage() {
  const { data: records = [], isLoading } = useSessions();
  const { data: classes = [], isLoading: isLoadingClasses } = useClasses();
  const { add } = useNotification();
  const deleteRecord = useDeleteSession();
  const permissions = usePermissions();

  const { openCreate, deleteId, closeDelete } = useSessionStore();

  const columns = useSessionColumns({ permissions, classes });

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteRecord.mutateAsync(deleteId);
      add({ title: "Berhasil", message: "Session berhasil dihapus.", variant: "success" });
      closeDelete();
    } catch (error: any) {
      add({ title: "Gagal", message: error.message || "Gagal menghapus Session.", variant: "danger" });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Jadwal Sesi"
        description="Kelola jadwal sesi (online/offline)."
        breadcrumbs={[{ label: "Logistik & Operasional", href: "#" }, { label: "Jadwal Sesi" }]}
      />

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Daftar Sesi</CardTitle>
          {permissions.can_create && (
            <Button onClick={openCreate} size="sm" disabled={permissions.isLoading}>
              <Plus className="size-4 mr-1.5" /> Tambah Sesi
            </Button>
          )}
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            data={records}
            columns={columns}
            searchPlaceholder="Cari sesi..."
            isLoading={isLoading || isLoadingClasses}
            canExport={permissions.can_report}
            exportFilename="sessions"
          />
        </CardContent>
      </Card>

      <SessionFormModal />

      <DeleteConfirmModal
        open={deleteId !== null}
        onOpenChange={(open) => !open && closeDelete()}
        onConfirm={handleDelete}
        isPending={deleteRecord.isPending}
        description="Apakah kamu yakin ingin menghapus session ini? Tindakan ini tidak dapat dibatalkan."
      />
    </div>
  );
}
