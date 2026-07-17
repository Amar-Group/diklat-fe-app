"use client";

import { Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";
import { PageHeader } from "@/components/shared/page-header";
import { useNotification } from "@/components/ui/notification";
import { useAttendances, useDeleteAttendance } from "@/features/attendance/hooks/use-attendance";
import { usePermissions } from "@/features/rbac/user/hooks/use-user";
import { useAttendanceStore } from "@/features/attendance/store";
import { useSessions } from "@/features/session/hooks/use-session";
import { useParticipants } from "@/features/participant/hooks/use-participant";

import { useAttendanceColumns } from "./_components/attendance-columns";
import { AttendanceFormModal } from "./_components/attendance-form-modal";
import { DeleteConfirmModal } from "@/components/shared/delete-confirm-modal";

export default function AttendancesPage() {
  const { data: records = [], isLoading } = useAttendances();
  const { data: sessions = [], isLoading: isLoadingSessions } = useSessions();
  const { data: participants = [], isLoading: isLoadingParticipants } = useParticipants();
  const { add } = useNotification();
  const deleteRecord = useDeleteAttendance();
  const permissions = usePermissions();

  const { openCreate, deleteId, closeDelete } = useAttendanceStore();

  const mappedParticipants = participants.map(p => ({ id: p.user_id, name: p.user?.name || "Peserta ID: " + p.user_id }));

  const columns = useAttendanceColumns({ permissions, sessions, participants: mappedParticipants });

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteRecord.mutateAsync(deleteId);
      add({ title: "Berhasil", message: "Data kehadiran berhasil dihapus.", variant: "success" });
      closeDelete();
    } catch (error: any) {
      add({ title: "Gagal", message: error.message || "Gagal menghapus data kehadiran.", variant: "danger" });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Data Kehadiran"
        description="Perekaman absensi/kehadiran peserta per sesi."
        breadcrumbs={[{ label: "Logistik & Operasional", href: "#" }, { label: "Data Kehadiran" }]}
      />

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Daftar Hadir</CardTitle>
          {permissions.can_create && (
            <Button onClick={openCreate} size="sm" disabled={permissions.isLoading}>
              <Plus className="size-4 mr-1.5" /> Catat Manual
            </Button>
          )}
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            data={records}
            columns={columns}
            searchPlaceholder="Cari data..."
            isLoading={isLoading || isLoadingSessions || isLoadingParticipants}
            canExport={permissions.can_report}
            exportFilename="attendances"
          />
        </CardContent>
      </Card>

      <AttendanceFormModal />

      <DeleteConfirmModal
        open={deleteId !== null}
        onOpenChange={(open) => !open && closeDelete()}
        onConfirm={handleDelete}
        isPending={deleteRecord.isPending}
        description="Apakah kamu yakin ingin menghapus data kehadiran ini? Tindakan ini tidak dapat dibatalkan."
      />
    </div>
  );
}
