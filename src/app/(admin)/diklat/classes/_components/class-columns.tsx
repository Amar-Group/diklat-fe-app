"use client";

import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Class } from "@/features/class/types";
import { useClassStore } from "@/features/class/store";

type UseClassColumnsProps = {
  permissions: {
    can_update: boolean;
    can_delete: boolean;
  };
};

export function useClassColumns({ permissions }: UseClassColumnsProps) {
  const { openEdit, openDelete } = useClassStore();

  return useMemo<ColumnDef<Class, any>[]>(
    () => [
      {
        id: "no",
        header: "No",
        cell: ({ row, table }) => {
          const { pageIndex, pageSize } = table.getState().pagination;
          const idx = table
            .getRowModel()
            .rows.findIndex((r) => r.id === row.id);
          return (
            <span className="text-muted-foreground text-sm">
              {pageIndex * pageSize + idx + 1}
            </span>
          );
        },
        size: 50,
        enableSorting: false,
      },
      {
        accessorKey: "batch_name",
        header: "Nama Batch",
        cell: (info) => (
          <span className="font-medium text-foreground">
            {info.getValue() as string}
          </span>
        ),
        size: 150,
      },
      {
        accessorKey: "course_title",
        header: "Program / Course",
        cell: (info) => (
          <span className="text-muted-foreground">
            {(info.getValue() as string) || "-"}
          </span>
        ),
        size: 200,
      },
      {
        accessorKey: "method",
        header: "Metode",
        cell: (info) => {
          const method = String(info.getValue());
          const map: any = {
              'lms': 'primary',
              'online': 'success',
              'offline': 'warning',
              'hybrid': 'info'
          };
          return (
            <Badge variant={"soft-" + (map[method] || "secondary") as any} rounded="full" size="sm">
              {method.toUpperCase()}
            </Badge>
          );
        },
        size: 100,
      },
      {
        accessorKey: "start_date",
        header: "Mulai",
        cell: (info) => (
          <span className="text-muted-foreground">
            {(info.getValue() as string) || "-"}
          </span>
        ),
        size: 100,
      },
      {
        id: "actions",
        header: "Aksi",
        cell: ({ row }) => {
          if (!permissions.can_update && !permissions.can_delete)
            return (
              <span className="text-muted-foreground text-xs">-</span>
            );
          return (
            <div className="flex items-center gap-1">
              {permissions.can_update && (
                <button
                  onClick={() => openEdit(row.original)}
                  className="p-1.5 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  title="Edit"
                >
                  <Edit className="size-3.5" />
                </button>
              )}
              {permissions.can_delete && (
                <button
                  onClick={() => openDelete(row.original.id)}
                  className="p-1.5 rounded-md hover:bg-red-50 text-muted-foreground hover:text-red-600 transition-colors"
                  title="Hapus"
                >
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
    [permissions, openEdit, openDelete]
  );
}
