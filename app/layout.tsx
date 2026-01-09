import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NYARTCC Controller Dashboard",
  description: "Quick reference dashboard for NYARTCC controllers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}