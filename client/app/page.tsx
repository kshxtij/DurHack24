import Link from "next/link";
import { House } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ProjectSwitcher from "@/components/project-switched";

export default function Home() {
  return (
    <div className="flex w-full h-full">
      <Sidebar />
      <Main />
    </div>
  );
}

function Sidebar() {
  const nodes = ["Go Server", "Python Process", "Rust Analysis Tool"];
  return (
    <div className="h-full w-52 bg-accent p-3 flex flex-col gap-2">
      <ProjectSwitcher />
      <Link
        href="/"
        className="flex items-center gap-1 rounded-lg bg-background py-2 px-3"
      >
        <House size={20} />
        Home
      </Link>
      <Separator />
      {nodes.map((node) => (
        <Link
          key={node}
          href="/"
          className="flex items-center gap-1 rounded-lg bg-background py-2 px-3"
        >
          {node}
          <div className="ml-auto w-2 h-2 rounded-full animate-pulse bg-green-500"></div>
        </Link>
      ))}
    </div>
  );
}

function Main() {
  return (
    <div className="flex-grow h-full p-3">
      <h1 className="text-2xl font-bold">Home</h1>
    </div>
  );
}
