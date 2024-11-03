"use client";

import Services from "@/components/services";
import { Separator } from "@/components/ui/separator";
import User from "@/components/user";
import { cn } from "@/lib/utils";
import { Bell, House } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar({
  name,
  picture,
}: {
  name: string;
  picture?: string;
}) {
  const pathname = usePathname();

  return (
    <div className="h-full w-60 bg-accent p-3 flex flex-col gap-2 border-r">
      <User name={name} picture={picture} />
      <Separator />
      <div className="flex flex-col gap-1">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-1 rounded-lg py-1 px-2 hover:bg-muted",
            pathname === "/" && "bg-muted"
          )}
        >
          <House size={15} />
          Dashboard
        </Link>

        <Link
          href="/alerts"
          className={cn(
            "flex items-center gap-1 rounded-lg py-1 px-2 hover:bg-muted",
            pathname === "/alerts" && "bg-muted"
          )}
        >
          <Bell size={15} />
          Alerts
        </Link>
      </div>
      <Separator />
      <div>
        <div className="font-bold text-accent-foreground text-sm">Services</div>
        <Services />
      </div>
    </div>
  );
}
