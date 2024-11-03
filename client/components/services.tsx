"use client";

import Link from "next/link";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getServices } from "@/actions";

export default function Services() {
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
          key={service.key}
          href={`/service/${service.key}`}
          className="flex flex-col rounded-lg py-1 px-2 hover:bg-muted"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full animate-pulse bg-green-500"></div>
            {service.key}
          </div>
        </Link>
      ))}
    </div>
  );
}
