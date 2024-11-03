"use client";

import Link from "next/link";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getServices } from "@/actions";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Services() {
  const pathname = usePathname();

  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      return await getServices();
    },
    refetchInterval: 5000,
  });

  return (
    <div>
      {services?.map((service) => (
        <Link
          key={service.key.id}
          href={`/service/${service.key.id}`}
          className={cn(
            "flex items-center gap-1 rounded-lg py-1 px-2 hover:bg-muted",
            pathname.includes(service.key.id) && "bg-muted"
          )}
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse bg-green-500"></div>
            {service.key.service}
          </div>
        </Link>
      ))}
    </div>
  );
}
