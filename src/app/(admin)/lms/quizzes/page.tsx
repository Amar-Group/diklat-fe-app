"use client";

import { Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";
import { PageHeader } from "@/components/shared/page-header";
import { useNotification } from "@/components/ui/notification";
import { useQuizs, useDeleteQuiz } from "@/features/quiz/hooks/use-quiz";
import { usePermissions } from "@/features/rbac/user/hooks/use-user";
import { useQuizStore } from "@/features/quiz/store";

import { useQuizColumns } from "./_components/quiz-columns";
import { QuizFormModal } from "./_components/quiz-form-modal";
import { DeleteConfirmModal } from "@/components/shared/delete-confirm-modal";

export default function QuizPage() {
  const { data: records = [], isLoading } = useQuizs();
  const { add } = useNotification();
  const deleteRecord = useDeleteQuiz();
  const permissions = usePermissions();

  const { openCreate, deleteId, closeDelete } = useQuizStore();

  const columns = useQuizColumns({ permissions });

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
        title="Bank Soal & Kuis"
        description="Manajemen kuis dan soal untuk peserta."
        breadcrumbs={[{ label: "Bank Soal & Kuis" }]}
      />

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Data Bank Soal & Kuis</CardTitle>
          {permissions.can_create && (
            <Button onClick={openCreate} size="sm" disabled={permissions.isLoading}>
              <Plus className="size-4 mr-1.5" /> Tambah Bank Soal & Kuis
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
            exportFilename="quiz_data"
          />
        </CardContent>
      </Card>

      <QuizFormModal />

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
