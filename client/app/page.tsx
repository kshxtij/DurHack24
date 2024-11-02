import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

export default async function Home() {
  return (
    <div className="w-full h-full">
      <h1 className="text-2xl font-bold">Home</h1>
      <div className="bg-red-100 w-full h-full">STUFF HERE</div>
    </div>
  );
}
