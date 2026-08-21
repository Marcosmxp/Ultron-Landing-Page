import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ultron — AI that gets the work done",
  description:
    "Ultron is an AI assistant built to research, create, analyze and automate work from one intelligent workspace.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
