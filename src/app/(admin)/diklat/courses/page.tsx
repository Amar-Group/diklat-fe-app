"use client";

import { Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";
import { PageHeader } from "@/components/shared/page-header";
import { useNotification } from "@/components/ui/notification";
import {
  useCourses,
  useDeleteCourse,
} from "@/features/course/hooks/use-course";
import { usePermissions } from "@/features/rbac/user/hooks/use-user";
import { useCourseStore } from "@/features/course/store";

import { useCourseColumns } from "./_components/course-columns";
import { CourseFormModal } from "./_components/course-form-modal";
import { DeleteConfirmModal } from "@/components/shared/delete-confirm-modal";

export default function CoursesPage() {
  const { data: courses = [], isLoading } = useCourses();
  const { add } = useNotification();
  const deleteCourse = useDeleteCourse();
  const permissions = usePermissions();

  const { openCreate, deleteId, closeDelete } = useCourseStore();

  const columns = useCourseColumns({ permissions });

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteCourse.mutateAsync(deleteId);
      add({
        title: "Berhasil",
        message: "Course berhasil dihapus.",
        variant: "success",
      });
      closeDelete();
    } catch (error: any) {
      add({
        title: "Gagal",
        message: error.message || "Gagal menghapus course.",
        variant: "danger",
      });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manajemen Course"
        description="Kelola course yang tersedia di sistem."
        breadcrumbs={[
          { label: "Master Data", href: "#" },
          { label: "Course" },
        ]}
      />

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Daftar Course</CardTitle>
          {permissions.can_create && (
            <Button
              onClick={openCreate}
              size="sm"
              disabled={permissions.isLoading}
            >
              <Plus className="size-4 mr-1.5" />
              Tambah Course
            </Button>
          )}
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            data={courses}
            columns={columns}
            searchPlaceholder="Cari course..."
            isLoading={isLoading}
            canExport={permissions.can_report}
            exportFilename="courses"
          />
        </CardContent>
      </Card>

      <CourseFormModal />

      <DeleteConfirmModal
        open={deleteId !== null}
        onOpenChange={(open) => !open && closeDelete()}
        onConfirm={handleDelete}
        isPending={deleteCourse.isPending}
        description="Apakah kamu yakin ingin menghapus course ini? Tindakan ini tidak dapat dibatalkan."
      />
    </div>
  );
}
