"use client";

import { Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";
import { PageHeader } from "@/components/shared/page-header";
import { useNotification } from "@/components/ui/notification";
import {
  useParticipants,
  useDeleteParticipant,
} from "@/features/participant/hooks/use-participant";
import { usePermissions } from "@/features/rbac/user/hooks/use-user";
import { useParticipantStore } from "@/features/participant/store";

import { useParticipantColumns } from "./_components/participant-columns";
import { ParticipantFormModal } from "./_components/participant-form-modal";
import { DeleteConfirmModal } from "@/components/shared/delete-confirm-modal";

export default function ParticipantsPage() {
  const { data: participants = [], isLoading } = useParticipants();
  const { add } = useNotification();
  const deleteParticipant = useDeleteParticipant();
  const permissions = usePermissions();

  const { openCreate, deleteId, closeDelete } = useParticipantStore();

  const columns = useParticipantColumns({ permissions });

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteParticipant.mutateAsync(deleteId);
      add({
        title: "Berhasil",
        message: "Peserta berhasil dihapus.",
        variant: "success",
      });
      closeDelete();
    } catch (error: any) {
      add({
        title: "Gagal",
        message: error.message || "Gagal menghapus peserta.",
        variant: "danger",
      });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manajemen Peserta"
        description="Kelola data peserta (perorangan/karyawan)."
        breadcrumbs={[
          { label: "Master Data", href: "#" },
          { label: "Peserta" },
        ]}
      />

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Daftar Peserta</CardTitle>
          {permissions.can_create && (
            <Button
              onClick={openCreate}
              size="sm"
              disabled={permissions.isLoading}
            >
              <Plus className="size-4 mr-1.5" />
              Tambah Peserta
            </Button>
          )}
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            data={participants}
            columns={columns}
            searchPlaceholder="Cari peserta..."
            isLoading={isLoading}
            canExport={permissions.can_report}
            exportFilename="participants"
          />
        </CardContent>
      </Card>

      <ParticipantFormModal />

      <DeleteConfirmModal
        open={deleteId !== null}
        onOpenChange={(open) => !open && closeDelete()}
        onConfirm={handleDelete}
        isPending={deleteParticipant.isPending}
        description="Apakah kamu yakin ingin menghapus peserta ini? Tindakan ini tidak dapat dibatalkan."
      />
    </div>
  );
}
