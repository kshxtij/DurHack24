import { getAlerts } from "@/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Alert } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Info } from "lucide-react";

export function generateContent() {
  return {
    time: new Date(),
    level: "info",
    content: Math.random().toString(36).substring(2, 22),
  };
}
export type MessageLog = {
  level: "info" | "warning" | "error" | "critical";
  content: string;
  time: Date;
};

const colorMap = {
  low: "ring-2 ring-neutral-400 bg-neutral-50",
  medium: "ring-2 ring-yellow-400 bg-yellow-50",
  high: "ring-2 ring-orange-400 bg-orange-50",
  critical: "ring-2 ring-red-400 bg-red-50",
};

function AlertComp({ alert }: { alert: Alert }) {
  return (
    <div
      className={`flex items-center text-sm rounded-md py-1 px-2 ${
        colorMap[alert.severity as keyof typeof colorMap] ?? colorMap["low"]
      }`}
    >
      <Info size={25} className="mr-2" />
      <div className="flex flex-col">
        <div className="font-bold flex items-center">{alert.title}</div>
      </div>
    </div>
  );
}

export default function Alerts({ className }: { className?: string }) {
  const { data } = useQuery({
    queryKey: ["alerts"],
    queryFn: async () => {
      return getAlerts();
    },
    refetchInterval: 1000,
  });

  return (
    <Card className={cn("w-full flex flex-col", className)}>
      <CardHeader>
        <CardTitle>Alerts</CardTitle>
      </CardHeader>
      <CardContent className="min-h-0 relative">
        <div className=" flex flex-col gap-2 overflow-auto h-full w-full p-1 rounded-md">
          {data &&
            data.map((alert, index) => <AlertComp key={index} alert={alert} />)}
        </div>
      </CardContent>
    </Card>
  );
}
