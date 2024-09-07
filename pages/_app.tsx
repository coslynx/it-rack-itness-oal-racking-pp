"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { ZustandProvider } from "@/lib/store";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 font-sans">
        <ThemeProvider attribute="class">
          <SessionProvider>
            <ZustandProvider>
              <ErrorBoundary>{children}</ErrorBoundary>
            </ZustandProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}