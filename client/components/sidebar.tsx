import Services from "@/components/services";
import User from "@/components/user";
import { House } from "lucide-react";
import Link from "next/link";

export default function Sidebar({
  name,
  picture,
}: {
  name: string;
  picture?: string;
}) {
  return (
    <div className="h-full w-60 bg-accent p-3 flex flex-col gap-2 border-r">
      <User name={name} picture={picture} />
      <Link
        href="/"
        className="flex items-center gap-1 rounded-lg py-1 px-2 hover:bg-muted"
      >
        <House size={20} />
        Dashboard
      </Link>
      <div className="font-bold text-accent-foreground">Services</div>
      <Services />
    </div>
  );
}
