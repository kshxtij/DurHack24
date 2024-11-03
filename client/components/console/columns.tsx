"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MessageLog } from "../alerts";

const levelMap = {
  info: "ring-2 ring-neutral-400 bg-neutral-50",
  debug: "ring-2 ring-neutral-400 bg-neutral-50",
  warn: "ring-2 ring-yellow-400 bg-yellow-50",
  error: "ring-2 ring-orange-400 bg-orange-50",
  critical: "ring-2 ring-red-400 bg-red-50",
};

export const columns: ColumnDef<MessageLog>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => new Date(row.original.time).toDateString(),
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) => new Date(row.original.time).toLocaleTimeString(),
  },
  {
    accessorKey: "level",
    header: "Level",
    cell: ({ row }) => (
      <div>
        <div
          className={`w-fit  rounded-md text-sm py-1 px-2 ${
            levelMap[row.original.level]
          }`}
        >
          <div className="font-bold">{row.original.level}</div>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "service",
    header: "Service",
    cell: ({ row }) => <div className="w-full">{row.original.service}</div>,
  },
  {
    accessorKey: "content",
    header: "Content",
    cell: ({ row }) => <div className="w-full">{row.original.content}</div>,
  },
];
