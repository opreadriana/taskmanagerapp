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
<<<<<<< HEAD
      <body className="min-h-screen flex flex-col">
=======
      <body className="min-h-screen flex flex-col transition-colors duration-300">
>>>>>>> 1a0e21b7477de3421437cbb29739e2a1d66eb44d
        <TasksProvider>
          <ThemeToggle />
          {children}
        </TasksProvider>
      </body>
    </html>
  );
}
