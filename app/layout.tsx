import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Para vos, Mar ♥",
  description: "Feliz San Valentín mi amor",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-dvh bg-blush-50 text-gray-800 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
