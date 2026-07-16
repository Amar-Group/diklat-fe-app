"use client";

import { Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";
import { PageHeader } from "@/components/shared/page-header";
import { useNotification } from "@/components/ui/notification";
import {
  useInstructors,
  useDeleteInstructor,
} from "@/features/instructor/hooks/use-instructor";
import { usePermissions } from "@/features/rbac/user/hooks/use-user";
import { useInstructorStore } from "@/features/instructor/store";

import { useInstructorColumns } from "./_components/instructor-columns";
import { InstructorFormModal } from "./_components/instructor-form-modal";
import { DeleteConfirmModal } from "@/components/shared/delete-confirm-modal";

export default function InstructorsPage() {
  const { data: instructors = [], isLoading } = useInstructors();
  const { add } = useNotification();
  const deleteInstructor = useDeleteInstructor();
  const permissions = usePermissions();

  const { openCreate, deleteId, closeDelete } = useInstructorStore();

  const columns = useInstructorColumns({ permissions });

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteInstructor.mutateAsync(deleteId);
      add({
        title: "Berhasil",
        message: "Instruktur berhasil dihapus.",
        variant: "success",
      });
      closeDelete();
    } catch (error: any) {
      add({
        title: "Gagal",
        message: error.message || "Gagal menghapus instruktur.",
        variant: "danger",
      });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manajemen Instruktur"
        description="Kelola instruktur dan pemateri."
        breadcrumbs={[
          { label: "Master Data", href: "#" },
          { label: "Instruktur" },
        ]}
      />

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Daftar Instruktur</CardTitle>
          {permissions.can_create && (
            <Button
              onClick={openCreate}
              size="sm"
              disabled={permissions.isLoading}
            >
              <Plus className="size-4 mr-1.5" />
              Tambah Instruktur
            </Button>
          )}
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            data={instructors}
            columns={columns}
            searchPlaceholder="Cari instruktur..."
            isLoading={isLoading}
            canExport={permissions.can_report}
            exportFilename="instructors"
          />
        </CardContent>
      </Card>

      <InstructorFormModal />

      <DeleteConfirmModal
        open={deleteId !== null}
        onOpenChange={(open) => !open && closeDelete()}
        onConfirm={handleDelete}
        isPending={deleteInstructor.isPending}
        description="Apakah kamu yakin ingin menghapus instruktur ini? Tindakan ini tidak dapat dibatalkan."
      />
    </div>
  );
}
