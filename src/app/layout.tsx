import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Task Manager App",
  description: "Personal Project - Task Manager App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        {children}
      </body>
    </html>
  );
}
