"use client";

import { Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";
import { PageHeader } from "@/components/shared/page-header";
import { useNotification } from "@/components/ui/notification";
import {
  useModules,
  useDeleteModule,
} from "@/features/module/hooks/use-module";
import { usePermissions } from "@/features/rbac/user/hooks/use-user";
import { useModuleStore } from "@/features/module/store";
import { useCourses } from "@/features/course/hooks/use-course";

import { useModuleColumns } from "./_components/module-columns";
import { ModuleFormModal } from "./_components/module-form-modal";
import { DeleteConfirmModal } from "@/components/shared/delete-confirm-modal";

export default function ModulesPage() {
  const { data: records = [], isLoading } = useModules();
  const { data: courses = [], isLoading: isLoadingCourses } = useCourses();
  const { add } = useNotification();
  const deleteRecord = useDeleteModule();
  const permissions = usePermissions();

  const { openCreate, deleteId, closeDelete } = useModuleStore();

  const columns = useModuleColumns({ permissions, courses });

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteRecord.mutateAsync(deleteId);
      add({
        title: "Berhasil",
        message: "Module berhasil dihapus.",
        variant: "success",
      });
      closeDelete();
    } catch (error: any) {
      add({
        title: "Gagal",
        message: error.message || "Gagal menghapus module.",
        variant: "danger",
      });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manajemen Module"
        description="Kelola data module."
        breadcrumbs={[
          { label: "LMS Studio", href: "#" },
          { label: "Module" },
        ]}
      />

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Daftar Module</CardTitle>
          {permissions.can_create && (
            <Button
              onClick={openCreate}
              size="sm"
              disabled={permissions.isLoading}
            >
              <Plus className="size-4 mr-1.5" />
              Tambah Module
            </Button>
          )}
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            data={records}
            columns={columns}
            searchPlaceholder="Cari module..."
            isLoading={isLoading || isLoadingCourses}
            canExport={permissions.can_report}
            exportFilename="modules"
          />
        </CardContent>
      </Card>

      <ModuleFormModal />

      <DeleteConfirmModal
        open={deleteId !== null}
        onOpenChange={(open) => !open && closeDelete()}
        onConfirm={handleDelete}
        isPending={deleteRecord.isPending}
        description="Apakah kamu yakin ingin menghapus module ini? Tindakan ini tidak dapat dibatalkan."
      />
    </div>
  );
}
