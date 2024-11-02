"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { HiChevronUpDown } from "react-icons/hi2";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings } from "lucide-react";

type Props = {
  name: string;
  picture?: string;
}
export default function User({ name, picture }: Props) {
  const [open, setOpen] = useState(false);
  const role = "admin";

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div className="p-1">
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className="h-12 w-full items-center gap-2 p-2 bg-background hover:bg-background shadow-sm"
          >
            <>
              <img src={picture} className="w-8 h-8 rounded-full" />
              <div className="truncate text-left">
                <div className="truncate font-bold">{name}</div>
                <p className="text-xs text-muted-foreground/60">{role}</p>
              </div>
              <HiChevronUpDown className="ml-auto" />
            </>
          </Button>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="ml-2 w-[--radix-dropdown-menu-trigger-width]">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Settings />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {
            window.location.href = "/api/auth/logout";
          }}>
            <LogOut /> Sign out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
