"use client";

import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import type { Logistic } from "@/features/logistic/types";
import { useLogisticStore } from "@/features/logistic/store";

type UseLogisticColumnsProps = {
  permissions: { can_update: boolean; can_delete: boolean; };
  classes: { id: number; batch_name: string }[];
};

export function useLogisticColumns({ permissions, classes }: UseLogisticColumnsProps) {
  const { openEdit, openDelete } = useLogisticStore();

  return useMemo<ColumnDef<Logistic, any>[]>(
    () => [
      {
        id: "no",
        header: "No",
        cell: ({ row, table }) => {
          const { pageIndex, pageSize } = table.getState().pagination;
          const idx = table.getRowModel().rows.findIndex((r) => r.id === row.id);
          return <span className="text-muted-foreground text-sm">{pageIndex * pageSize + idx + 1}</span>;
        },
        size: 50,
        enableSorting: false,
      },
      {
        id: "class",
        header: "Kelas",
        cell: ({ row }) => {
          const cls = classes.find((c) => c.id === row.original.class_id);
          return <span className="font-medium text-foreground">{cls ? cls.batch_name : "ID: " + row.original.class_id}</span>;
        },
        size: 200,
      },
      {
        accessorKey: "hotel_name",
        header: "Nama Hotel",
        cell: (info) => <span className="text-muted-foreground text-sm">{info.getValue() as string || "-"}</span>,
        size: 150,
      },
      {
        accessorKey: "field_trip_destination",
        header: "Tujuan Field Trip",
        cell: (info) => <span className="text-muted-foreground text-sm">{info.getValue() as string || "-"}</span>,
        size: 150,
      },
      {
        id: "actions",
        header: "Aksi",
        cell: ({ row }) => {
          if (!permissions.can_update && !permissions.can_delete) return <span className="text-muted-foreground text-xs">-</span>;
          return (
            <div className="flex items-center gap-1">
              {permissions.can_update && (
                <button onClick={() => openEdit(row.original)} className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" title="Edit">
                  <Edit className="size-3.5" />
                </button>
              )}
              {permissions.can_delete && (
                <button onClick={() => openDelete(row.original.id)} className="p-1.5 rounded-md hover:bg-red-50 text-muted-foreground hover:text-red-600 transition-colors" title="Hapus">
                  <Trash2 className="size-3.5" />
                </button>
              )}
            </div>
          );
        },
        enableSorting: false,
        size: 90,
      },
    ],
    [permissions, classes, openEdit, openDelete]
  );
}
