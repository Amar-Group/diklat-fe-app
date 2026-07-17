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
  onManageMembers: (classData: Class) => void;
};

export function useClassColumns({ permissions, onManageMembers }: UseClassColumnsProps) {
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
          const val = info.getValue() as string;
          const map: Record<string, { label: string; cls: string }> = {
            online: { label: "Online", cls: "bg-blue-100 text-blue-700 hover:bg-blue-200" },
            offline: { label: "Offline", cls: "bg-purple-100 text-purple-700 hover:bg-purple-200" },
            hybrid: { label: "Hybrid", cls: "bg-orange-100 text-orange-700 hover:bg-orange-200" },
          };
          const badge = map[val] || { label: val, cls: "bg-slate-100 text-slate-700" };
          return <Badge className={`font-normal rounded-full ${badge.cls}`}>{badge.label}</Badge>;
        },
        size: 100,
      },
      {
        accessorKey: "start_date",
        header: "Mulai",
        cell: (info) => {
          const val = info.getValue() as string;
          if (!val) return "-";
          return <span className="text-sm text-muted-foreground">{new Date(val).toLocaleDateString("id-ID")}</span>;
        },
        size: 100,
      },
      {
        id: "actions",
        header: "Aksi",
        cell: ({ row }) => {
          return (
            <div className="flex items-center gap-1">
              {permissions.can_update && (
                <button
                  onClick={() => onManageMembers(row.original)}
                  className="p-1.5 rounded-md hover:bg-blue-50 text-blue-500 hover:text-blue-600 transition-colors flex items-center justify-center"
                  title="Kelola Member"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </button>
              )}
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
        size: 120,
      },
    ],
    [permissions, openEdit, openDelete, onManageMembers]
  );
}
