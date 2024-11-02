import Alerts, { generateContent } from "@/components/alerts";
import { columns } from "@/components/console/columns";
import { ConsoleTable } from "@/components/console/console";
import Graph from "@/components/graph";

export default function Home() {
  return (
    <div className="w-full h-full">
      <h1 className="text-2xl font-bold">Home</h1>
      <div className="w-full h-full">
        <div className="h-96 w-full flex gap-2">
          <Graph className="flex-[2]" />
          <Alerts className="flex-1" />
        </div>
        <div className="overflow-auto">
        {/* <ConsoleTable data={Array.from({ length: 100 }, generateContent)} columns={columns} /> */}
        </div>
      </div>
    </div>
  );
}
