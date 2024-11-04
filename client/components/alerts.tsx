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
  low: "bg-neutral-100",
  medium: "bg-yellow-100",
  high: "bg-orange-100",
  critical: "bg-red-100",
};

function AlertComp({ alert }: { alert: Alert }) {
  return (
    <div
      className={`flex items-center text-sm rounded-md py-1 px-2 ${colorMap[alert.severity as keyof typeof colorMap] ?? colorMap["low"]
        }`}
    >
      <Info size={25} className="mr-2" />
      <div className="flex flex-col">
        <div className="font-bold w-full flex items-center">{alert.title}
        </div>
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
        <div className=" flex flex-col gap-2 overflow-auto h-full w-full rounded-md">
          {data &&
            data.map((alert, index) => <AlertComp key={index} alert={alert} />)}
        </div>
      </CardContent>
    </Card>
  );
}
