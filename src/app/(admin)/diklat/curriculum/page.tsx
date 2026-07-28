"use client";

import { Plus, BookOpen } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";
import { PageHeader } from "@/components/shared/page-header";
import { useNotification } from "@/components/ui/notification";
import {
  useCurriculums,
  useDeleteCurriculum,
} from "@/features/curriculum/hooks/use-curriculum";
import { useCurriculumStore } from "@/features/curriculum/store";
import { usePermissions } from "@/features/rbac/user/hooks/use-user";
import { useCourses } from "@/features/course/hooks/use-course";

import { useCurriculumColumns } from "./_components/curriculum-columns";
import { CurriculumFormModal } from "./_components/curriculum-form-modal";
import { DeleteConfirmModal } from "@/components/shared/delete-confirm-modal";

export default function CurriculumPage() {
  const { data: records = [], isLoading } = useCurriculums();
  const { data: courses = [], isLoading: isLoadingCourses } = useCourses();
  const { add } = useNotification();
  const deleteRecord = useDeleteCurriculum();
  const permissions = usePermissions();

  const { openCreate, deleteId, closeDelete } = useCurriculumStore();

  const columns = useCurriculumColumns({ permissions, courses });

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteRecord.mutateAsync(deleteId);
      add({
        title: "Berhasil",
        message: "Kurikulum berhasil dihapus.",
        variant: "success",
      });
      closeDelete();
    } catch (error: any) {
      add({
        title: "Gagal",
        message: error.message || "Gagal menghapus kurikulum.",
        variant: "danger",
      });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manajemen Kurikulum"
        description="Kelola bab dan materi kurikulum yang tampil di katalog program diklat."
        breadcrumbs={[
          { label: "Diklat Management", href: "#" },
          { label: "Kurikulum" },
        ]}
      />

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="size-5 text-primary" />
            <CardTitle>Daftar Kurikulum</CardTitle>
          </div>
          {permissions.can_create && (
            <Button
              onClick={openCreate}
              size="sm"
              disabled={permissions.isLoading}
            >
              <Plus className="size-4 mr-1.5" />
              Tambah Kurikulum
            </Button>
          )}
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            data={records}
            columns={columns}
            searchPlaceholder="Cari kurikulum..."
            isLoading={isLoading || isLoadingCourses}
            canExport={permissions.can_report}
            exportFilename="kurikulum"
          />
        </CardContent>
      </Card>

      <CurriculumFormModal />

      <DeleteConfirmModal
        open={deleteId !== null}
        onOpenChange={(open) => !open && closeDelete()}
        onConfirm={handleDelete}
        isPending={deleteRecord.isPending}
        description="Apakah kamu yakin ingin menghapus kurikulum ini? Bab ini akan hilang dari katalog program."
      />
    </div>
  );
}
