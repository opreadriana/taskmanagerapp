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
      <body className="min-h-screen flex flex-col transition-colors duration-300"
      >
        <TasksProvider>
         <ThemeToggle />
          {children}
        </TasksProvider>
      </body>
    </html>
  );
}
