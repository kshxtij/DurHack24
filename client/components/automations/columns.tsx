
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MessageLog } from "../alerts";
import { Automation } from "@prisma/client";
import { useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { deleteAutomation } from "@/actions";
import { useQueryClient } from "@tanstack/react-query";

const levelMap = {
    info: "ring-2 ring-neutral-400 bg-neutral-50",
    debug: "ring-2 ring-neutral-400 bg-neutral-50",
    warn: "ring-2 ring-yellow-400 bg-yellow-50",
    error: "ring-2 ring-orange-400 bg-orange-50",
    critical: "ring-2 ring-red-400 bg-red-50",
};

export const columns: ColumnDef<Automation>[] = [
    {
        id: "actions",
        cell: ({ row }) => {
            const automation = row.original;
            const [isClicked, setIsClicked] = useState(false);

            const queryClient = useQueryClient()
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={(event) => {
                                event.preventDefault();
                                setIsClicked(true);
                            }}
                        >
                            Delete
                        </DropdownMenuItem>

                        <AlertDialog
                            open={isClicked}
                            onOpenChange={(open) => setIsClicked(open)}
                        >
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone!
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel asChild>
                                        <Button variant={"outline"}>Cancel</Button>
                                    </AlertDialogCancel>
                                    <AlertDialogAction asChild>
                                        <Button
                                            variant={"destructive"}
                                            onClick={async () => {
                                                await deleteAutomation(automation.id);
                                                queryClient.invalidateQueries({
                                                    queryKey: ["automations"],
                                                })
                                            }}
                                        >
                                            Delete
                                        </Button>
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </DropdownMenuContent>
                </DropdownMenu >
            );
        },
    },
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => <div className="w-full">{row.original.title}</div>,
    },
    {
        accessorKey: "service",
        header: "Service",
        cell: ({ row }) => <div className="w-full">{row.original.service}</div>,
    },
    {
        accessorKey: "severity",
        header: "Severity",
        cell: ({ row }) => <div className="w-full">{row.original.severity}</div>,
    },
    {
        accessorKey: "cron",
        header: "Cron",
        cell: ({ row }) => <div className="w-full">{row.original.cron}</div>,
    },
];
