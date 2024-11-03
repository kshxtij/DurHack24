import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import { House } from "lucide-react";
import Providers from "@/components/providers";
import User from "@/components/user";
import { Separator } from "@/components/ui/separator";
import { Service } from "@/lib/service";
import { getSession } from "@auth0/nextjs-auth0";
import { redirect } from "next/navigation";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Logging",
  description: "", // TODO:
};

type User = {
  nickname: string;
  picture: string;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const s = await getSession()
  if (!s) {
    redirect("/api/auth/login")
    return null
  }

  const { nickname, picture } = s.user as User
  
  return (
    <html lang="en">
      <Providers>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased w-screen h-screen`}
        >
          <div className="flex w-full h-full">
            <Sidebar name={nickname} picture={picture} />
            <main className="flex-grow p-3">{children}</main>
          </div>
        </body>
      </Providers>
    </html>
  );
}

async function Sidebar({ name, picture }: { name: string; picture?: string }) {
  const services: Service[] = [
    {
      id: "1",
      name: "Go Server",
    },
    {
      id: "2",
      name: "Python Process",
    },
    {
      id: "3",
      name: "Rust Analysis"
    }
  ]
  return (
    <div className="h-full w-60 bg-muted p-3 flex flex-col gap-2">
      <User name={name} picture={picture}/>
      <Link
        href="/"
        className="flex items-center gap-1 rounded-lg bg-background py-2 px-3 shadow-sm"
      >
        <House size={20} />
        Home
      </Link>
      {services.map((service) => (
        <Link
          key={service.id}
          href={`/service/${service.id}`}
          className="flex items-center gap-1 rounded-lg bg-background py-2 px-3 shadow-sm"
        >
          {service.name}
          <div className="ml-auto w-2 h-2 rounded-full animate-pulse bg-green-500"></div>
        </Link>
      ))}
    </div>
  );
}