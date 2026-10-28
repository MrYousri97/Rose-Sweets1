import type { Metadata } from "next";
import { Cairo, Amiri } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
});

const amiri = Amiri({
  variable: "--font-amiri",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "محرر منيو Rose Sweets",
  description: "تطبيق لتعديل منيو الحلويات وإضافة الأصناف والأسعار وطباعة PDF",
  keywords: ["محرر منيو", "Rose Sweets", "حلويات", "PDF", "مطبوعات"],
  authors: [{ name: "Rose Sweets" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body
        className={`${cairo.variable} ${amiri.variable} antialiased bg-background text-foreground font-cairo`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
