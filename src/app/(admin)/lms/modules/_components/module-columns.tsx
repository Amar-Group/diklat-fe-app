"use client";

import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Module } from "@/features/module/types";
import { useModuleStore } from "@/features/module/store";

type UseModuleColumnsProps = {
  courses: { id: number; title: string }[];
  permissions: {
    can_update: boolean;
    can_delete: boolean;
  };
};

export function useModuleColumns({ permissions, courses }: UseModuleColumnsProps) {
  const { openEdit, openDelete } = useModuleStore();

  return useMemo<ColumnDef<Module, any>[]>(
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
        accessorKey: "title",
        header: "Judul",
        cell: (info) => (
          <span className="font-medium text-foreground">
            {info.getValue() as string}
          </span>
        ),
        size: 200,
      },
      {
        id: "course",
        header: "Program Diklat",
        cell: ({ row }) => {
          const course = courses.find((c) => c.id === row.original.course_id);
          return (
            <span className="text-muted-foreground text-sm">
              {course ? course.title : "ID: " + row.original.course_id}
            </span>
          );
        },
        size: 150,
      },
      {
        accessorKey: "order_sequence",
        header: "Urutan",
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
    [permissions, courses, openEdit, openDelete]
  );
}
