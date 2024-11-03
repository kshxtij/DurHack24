"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getHistogram } from "@/actions";

const chartConfig = {
  doc_count: {
    label: "Log Count",
    color: "#2563eb",
  },
} satisfies ChartConfig;

export default function Graph({ className }: { className?: string }) {
  const { data } = useQuery({
    queryKey: ["histogram"],
    queryFn: async () => {
      return await getHistogram();
    },
    refetchInterval: 2000,
  });

  return (
    <Card className={cn("flex flex-col h-full", className)}>
      <CardHeader>
        <CardTitle>Graph</CardTitle>
      </CardHeader>
      <CardContent className=" flex flex-col gap-1 flex-grow min-h-0">
        <ChartContainer config={chartConfig} className="w-full h-full">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="key"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => new Date(value).toLocaleTimeString()}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="doc_count" fill="var(--color-doc_count)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
