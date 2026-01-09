import React from "react";
import type { Metadata } from "next";
import "./globals.css";
import ThemeToggle from "../features/theme/components/ThemeToggle";
import { TasksProvider } from "../features/tasks/context/TasksContext";

export const metadata: Metadata = {
  title: "Productivity App",
  description: "Personal Project - Productivity App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <TasksProvider>
          <ThemeToggle />
          {children}
        </TasksProvider>
      </body>
    </html>
  );
}
