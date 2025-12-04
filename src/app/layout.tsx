import type { Metadata } from "next";
import "./globals.css";
import ThemeToggle from "./ThemedToggle";
import { TasksProvider } from "./context/TasksContext";


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
      <body className="min-h-screen flex flex-col bg-blue-50 text-blue-900 dark:bg-blue-900 dark:text-blue-100"
      >
        <TasksProvider>
         <ThemeToggle />
          {children}
        </TasksProvider>
      </body>
    </html>
  );
}
