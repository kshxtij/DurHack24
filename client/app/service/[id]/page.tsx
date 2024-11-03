"use client";

import { getMessageLogs, getServices } from "@/actions";
import { columns } from "@/components/console/columns";
import { ConsoleTable } from "@/components/console/console";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

export default function ServicePage({ params }: { params: { id: string } }) {
  const { id } = useParams();

  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      return await getServices();
    },
  });

  const router = useRouter();
  if (!id) router.push("/");

  const { data } = useQuery({
    queryKey: ["data", id],
    queryFn: async () => {
      return await getMessageLogs(id);
    },
    refetchInterval: 2000,
    refetchIntervalInBackground: true,
  });

  if (!services) {
    return null;
  }

  const service = services.find((service) => service.key.id === id);
  if (!service) {
    return null;
  }

  return (
    <div className="w-full h-full flex flex-col gap-3">
      <h1 className="text-2xl font-bold">{service.key.service}</h1>
      <div className="overflow-auto flex-grow min-h-0">
        <ConsoleTable data={data ?? []} columns={columns} />
      </div>
    </div>
  );
}
