import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/navbar/navbar";

export const metadata: Metadata = {
  title: "VUP Wildlife Diary",
  description: "A diary for wildlife sightings.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
