import type { Metadata, Viewport } from "next";
import { AppProvider } from "@/lib/app";
import { Shell } from "@/components/Shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "MySureGuy",
  description: "Find a tradesperson in Buea your neighbours already trust.",
};
export const viewport: Viewport = { themeColor: "#953f15" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-dvh font-sans antialiased">
        <AppProvider>
          <Shell>{children}</Shell>
        </AppProvider>
      </body>
    </html>
  );
}
