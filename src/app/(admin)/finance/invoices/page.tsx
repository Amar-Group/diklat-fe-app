"use client";

import { Plus } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/data-table";
import { PageHeader } from "@/components/shared/page-header";
import { useNotification } from "@/components/ui/notification";
import { useInvoices, useDeleteInvoice } from "@/features/invoice/hooks/use-invoice";
import { usePermissions } from "@/features/rbac/user/hooks/use-user";
import { useInvoiceStore } from "@/features/invoice/store";

import { useInvoiceColumns } from "./_components/invoice-columns";
import { InvoiceFormModal } from "./_components/invoice-form-modal";
import { DeleteConfirmModal } from "@/components/shared/delete-confirm-modal";

export default function InvoicePage() {
  const { data: records = [], isLoading } = useInvoices();
  const { add } = useNotification();
  const deleteRecord = useDeleteInvoice();
  const permissions = usePermissions();

  const { openCreate, deleteId, closeDelete } = useInvoiceStore();

  const columns = useInvoiceColumns({ permissions });

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
        title="Manajemen Invoice"
        description="Kelola tagihan dan pembayaran peserta."
        breadcrumbs={[{ label: "Manajemen Invoice" }]}
      />

      <Card>
        <CardHeader className="flex-row items-center justify-between">
          <CardTitle>Data Manajemen Invoice</CardTitle>
          {permissions.can_create && (
            <Button onClick={openCreate} size="sm" disabled={permissions.isLoading}>
              <Plus className="size-4 mr-1.5" /> Tambah Manajemen Invoice
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
            exportFilename="invoice_data"
          />
        </CardContent>
      </Card>

      <InvoiceFormModal />

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
