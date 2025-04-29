// layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Genera tu Carta Astral",
  description: "Plataforma multiplataforma para cartas astrales personalizadas.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white min-h-screen">
        <div className="starry-background" />
        {children}
      </body>
    </html>
  );
}
