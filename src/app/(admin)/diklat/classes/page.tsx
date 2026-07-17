"use client";

import { Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";
import { PageHeader } from "@/components/shared/page-header";
import { useNotification } from "@/components/ui/notification";
import {
  useClasses,
  useDeleteClass,
} from "@/features/class/hooks/use-class";
import { usePermissions } from "@/features/rbac/user/hooks/use-user";
import { useClassStore } from "@/features/class/store";

import { useClassColumns } from "./_components/class-columns";
import { ClassFormModal } from "./_components/class-form-modal";
import { DeleteConfirmModal } from "@/components/shared/delete-confirm-modal";
import { ClassMembersModal } from "./_components/class-members-modal";
import { useState } from "react";

export default function ClassesPage() {
  const { data: classes = [], isLoading } = useClasses();
  const { add } = useNotification();
  const deleteClass = useDeleteClass();
  const permissions = usePermissions();

  const { openCreate, deleteId, closeDelete } = useClassStore();
  
  const [membersModalData, setMembersModalData] = useState<any>(null);

  const columns = useClassColumns({ permissions, onManageMembers: setMembersModalData });

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteClass.mutateAsync(deleteId);
      add({
        title: "Berhasil",
        message: "Kelas berhasil dihapus.",
        variant: "success",
      });
      closeDelete();
    } catch (error: any) {
      add({
        title: "Gagal",
        message: error.message || "Gagal menghapus kelas.",
        variant: "danger",
      });
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manajemen Kelas"
        description="Kelola batch pelatihan dan kelas."
        breadcrumbs={[
          { label: "Diklat", href: "#" },
          { label: "Kelas" },
        ]}
      />

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Daftar Kelas</CardTitle>
          {permissions.can_create && (
            <Button
              onClick={openCreate}
              size="sm"
              disabled={permissions.isLoading}
            >
              <Plus className="size-4 mr-1.5" />
              Tambah Kelas
            </Button>
          )}
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            data={classes}
            columns={columns}
            searchPlaceholder="Cari kelas..."
            isLoading={isLoading}
            canExport={permissions.can_report}
            exportFilename="classes"
          />
        </CardContent>
      </Card>

      <ClassFormModal />
      <ClassMembersModal isOpen={!!membersModalData} onClose={() => setMembersModalData(null)} classData={membersModalData} />

      <DeleteConfirmModal
        open={deleteId !== null}
        onOpenChange={(open) => !open && closeDelete()}
        onConfirm={handleDelete}
        isPending={deleteClass.isPending}
        description="Apakah kamu yakin ingin menghapus kelas ini? Tindakan ini tidak dapat dibatalkan."
      />
    </div>
  );
}
