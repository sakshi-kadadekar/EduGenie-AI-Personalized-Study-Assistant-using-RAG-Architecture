import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EduGenie AI",
  description: "AI-powered educational platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
