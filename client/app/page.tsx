import Alerts from "@/components/alerts";
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
      </div>
    </div>
  );
}
