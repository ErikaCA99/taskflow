import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/navBar";

export const metadata: Metadata = {
  title: "TaskFlow",
  description: "Gestión de proyectos y tareas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body suppressHydrationWarning>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
