"use client";
import { useEffect, useState } from "react";
import { useThemeStore } from "@/store";
import Nav from "./Nav";
export default function Hydrator({ children }: { children: React.ReactNode }) {
  const [hydrate, setHydrate] = useState<Boolean>(false);
  const theme = useThemeStore();
  useEffect(() => {
    setHydrate(true);
  }, []);
  return (
    <body
      data-theme={theme.mode}
      className=" p-4 sm:px-16 sm:py-8 min-h-[100dvh] text-base-content"
    >
      {hydrate ? (
        <main className=" mt-16 sm:mt-20 w-full h-screen max-h-[calc(100dvh-136px)] sm:max-h-[calc(100dvh-144px)] bg-base-300 rounded-box p-4 sm:p-8 flex items-center flex-col gap-4 sm:gap-8 justify-center">
          <Nav />
          {children}
        </main>
      ) : (
        <p>Loading...</p>
      )}
    </body>
  );
}
