import "./globals.css";
import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import Hydrator from "./components/Hydrator";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "John Rod Dondoyano | Portfolio",
  description: "Portfolio I Created For Career Purposes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={outfit.className}>
      <Hydrator children={children} />
    </html>
  );
}
