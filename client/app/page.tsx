"use client";

import { getMessageLogs } from "@/actions";
import Alerts, { generateContent, MessageLog } from "@/components/alerts";
import { columns } from "@/components/console/columns";
import { ConsoleTable } from "@/components/console/console";
import Graph from "@/components/graph";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      return await getMessageLogs(undefined);
    },
    refetchInterval: 2000,
  });

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="w-full flex flex-col gap-3 flex-grow min-h-0">
        <div className="h-96 w-full flex gap-3">
          <Graph className="flex-[2]" />
          <Alerts className="flex-1" />
        </div>
        <div className="flex-grow min-h-0">
          {data && <ConsoleTable data={data} columns={columns} />}
        </div>
      </div>
    </div>
  );
}
