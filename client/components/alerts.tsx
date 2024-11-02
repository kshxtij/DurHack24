import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type MessageLog = {
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

export default function Alerts({ className }: { className: string }) {
  const alerts = [
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
      <CardContent className=" flex flex-col gap-1 h-full overflow-auto">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className=" flex flex-col rounded-md py-2 px-3 shadow-sm border text-sm"
          >
            <div className="font-bold text-base">{alert.title}</div>
            <div className="text-accent-foreground">{alert.serviceId}</div>
            <div className="text-accent-foreground">{alert.severity} </div>
            <div className="text-accent-foreground">
              {alert.time.toISOString()}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
