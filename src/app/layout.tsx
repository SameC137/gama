import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";
import { Outfit } from "next/font/google";

export const metadata: Metadata = {
  title: "Gama",
  description: "Gama streaming site",
};

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
