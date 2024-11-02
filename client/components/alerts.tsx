import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

export function generateContent() {
return {
        time: new Date(),
        level: "info",
        content: Math.random().toString(36).substring(2, 22),
      }
}
export type MessageLog = {
  level: "info" | "warning" | "error" | "critical";
  content: string;
  time: Date;
};

type DataLog = {
  name: string;
  value: number;
  time: Date;
};

type Alert = {
  severity: "low" | "medium" | "high" | "critical";
  time: Date;
  title: string;
  serviceId: string;
};

function AlertComp({ alert }: { alert: Alert }) {
  const map = {
    low: "ring-2 ring-green-400 bg-green-50",
    medium: "ring-2 ring-yellow-400 bg-yellow-50",
    high: "ring-2 ring-orange-400 bg-orange-50",
    critical: "ring-2 ring-red-400 bg-red-50",
  };

  const icons = {
    low: Info,
    medium: Info,
    high: Info,
    critical: Info,
  };

  const Icon = icons[alert.severity];

  return (
    <div className={`flex text-sm rounded-md py-1 px-2 ${map[alert.severity]}`}>
      <Icon size={20} className="mr-2" />
      <div className="font-bold">{alert.title}</div>
      <div className="ml-auto text-accent-foreground">{alert.serviceId}</div>
    </div>
  );
}

export default function Alerts({ className }: { className: string }) {
  const alerts: Alert[] = [
    {
      severity: "low",
      time: new Date(),
      title: "Service is running",
      serviceId: "service-1",
    },
    {
      severity: "medium",
      time: new Date(),
      title: "Service is running",
      serviceId: "service-2",
    },
    {
      severity: "high",
      time: new Date(),
      title: "Service is running",
      serviceId: "service-3",
    },
    {
      severity: "critical",
      time: new Date(),
      title: "Service is running",
      serviceId: "service-4",
    },
  ];

  return (
    <Card className={cn("w-full flex flex-col", className)}>
      <CardHeader>
        <CardTitle>Alerts</CardTitle>
      </CardHeader>
      <CardContent className=" flex flex-col gap-2 h-full overflow-auto pt-3">
        {alerts.map((alert, index) => (
          <AlertComp key={index} alert={alert} />
        ))}
      </CardContent>
    </Card>
  );
}
