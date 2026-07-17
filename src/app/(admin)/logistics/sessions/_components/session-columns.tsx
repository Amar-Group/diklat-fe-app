"use client";

import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Session } from "@/features/session/types";
import { useSessionStore } from "@/features/session/store";

type UseSessionColumnsProps = {
  permissions: {
    can_update: boolean;
    can_delete: boolean;
  };
  classes: { id: number; batch_name: string }[];
};

export function useSessionColumns({ permissions, classes }: UseSessionColumnsProps) {
  const { openEdit, openDelete } = useSessionStore();

  return useMemo<ColumnDef<Session, any>[]>(
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
        accessorKey: "title",
        header: "Judul Sesi",
        cell: (info) => <span className="font-medium text-foreground">{info.getValue() as string}</span>,
        size: 200,
      },
      {
        id: "class",
        header: "Kelas",
        cell: ({ row }) => {
          const cls = classes.find((c) => c.id === row.original.class_id);
          return <span className="text-muted-foreground text-sm">{cls ? cls.batch_name : "ID: " + row.original.class_id}</span>;
        },
        size: 150,
      },
      {
        accessorKey: "type",
        header: "Tipe",
        cell: (info) => <Badge variant="outline">{String(info.getValue()).toUpperCase()}</Badge>,
        size: 100,
      },
      {
        accessorKey: "start_time",
        header: "Mulai",
        cell: (info) => new Date(info.getValue() as string).toLocaleString(),
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
