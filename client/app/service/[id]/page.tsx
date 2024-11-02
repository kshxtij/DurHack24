import { generateContent } from "@/components/alerts";
import { columns } from "@/components/console/columns";
import { ConsoleTable } from "@/components/console/console";


export default function ServicePage({ params }: { params: { id: string } }) {
  const id = params.id;

  // 100 contents
  const data = Array.from({ length: 100 }, generateContent);

  return (
    <div>
      <h1 className="text-2xl font-bold">{id}</h1>
      <ConsoleTable data={data} columns={columns} />
      {id}
    </div>
  );
}
