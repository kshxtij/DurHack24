import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ProjectSwitcher from "@/components/project-switched";
import Link from "next/link";
import { House } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Providers from "@/components/providers";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased w-screen h-screen`}
        >
          <div className="flex w-full h-full">
            <Sidebar />
            <main className="flex-grow p-3">{children}</main>
          </div>
        </body>
      </Providers>
    </html>
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
