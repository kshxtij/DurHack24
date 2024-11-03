"use client";

import { getLogs } from "@/actions";
import { columns } from "@/components/console/columns";
import { ConsoleTable } from "@/components/console/console";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

export default function ServicePage({ params }: { params: { id: string } }) {
  const { id } = useParams();
  const router = useRouter();
  if (!id) router.push("/");

  const { data } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      return await getLogs(id);
    },
    refetchInterval: 2000,
  });

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <h1 className="text-2xl font-bold">{id}</h1>
      <div className="overflow-auto flex-grow min-h-0">
        <ConsoleTable data={data} columns={columns} />
      </div>
    </div>
  );
}
