import "./globals.css";
import type { Metadata } from "next";
import { B612_Mono } from "next/font/google";
import Hydrator from "./components/Hydrator";

const myFont = B612_Mono({ weight: "400", subsets: ["latin"] });

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
    <html lang="en" className={`${myFont.className} text-sm`}>
      <Hydrator children={children} />
    </html>
  );
}
