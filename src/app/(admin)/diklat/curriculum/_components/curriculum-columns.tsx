"use client";

import { useMemo } from "react";
import type { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";
import type { Curriculum } from "@/features/curriculum/types";
import { useCurriculumStore } from "@/features/curriculum/store";

type UseCurriculumColumnsProps = {
  courses: { id: number; title: string }[];
  permissions: {
    can_update: boolean;
    can_delete: boolean;
  };
};

export function useCurriculumColumns({ permissions, courses }: UseCurriculumColumnsProps) {
  const { openEdit, openDelete } = useCurriculumStore();

  return useMemo<ColumnDef<Curriculum, any>[]>(
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
        header: "Judul Bab / Materi",
        cell: (info) => (
          <span className="font-medium text-foreground">
            {info.getValue() as string}
          </span>
        ),
        size: 250,
      },
      {
        id: "course",
        header: "Program Diklat",
        cell: ({ row }) => {
          const course = courses.find((c) => c.id === row.original.course_id);
          return (
            <span className="text-muted-foreground text-sm">
              {course ? course.title : `Course ID: ${row.original.course_id}`}
            </span>
          );
        },
        size: 200,
      },
      {
        accessorKey: "order_sequence",
        header: "Urutan Bab",
        cell: (info) => (
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm font-bold">
            {info.getValue() as number}
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
    [permissions, courses, openEdit, openDelete]
  );
}
