import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MoneyPilot-AI | Financial Freedom",
  description: "Intelligent financial planning and investment advisory platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <div style={{ display: 'flex' }}>
          <Sidebar />
          <main style={{ flex: 1, marginLeft: '280px', padding: '2.5rem', minHeight: '100vh', background: 'var(--background)' }}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
