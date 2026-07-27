import type { Metadata } from "next";
import "./globals.css";
import TRPCProvider from "./_trpc/Provider";

export const metadata: Metadata = {
  title: "Intent-Driven UI | AI-Native Dashboard",
  description: "AI-powered dynamic interface that generates UI components from natural language instructions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="bg-slate-950 text-slate-100 antialiased">
        <TRPCProvider>{children}</TRPCProvider>
      </body>
    </html>
  );
}
