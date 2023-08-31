"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useThemeStore } from "@/store";
import Nav from "./Nav";
export default function Hydrator({ children }: { children: React.ReactNode }) {
  const [hydrate, setHydrate] = useState<Boolean>(false);
  const theme = useThemeStore();
  useEffect(() => {
    setTimeout(() => {
      setHydrate(true);
    }, 1500);
  }, []);
  return (
    <AnimatePresence>
      <body>
        {hydrate ? (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            data-theme={theme.mode}
            key={String(hydrate)}
            className=" p-4 sm:px-16 sm:py-8 min-h-[100dvh] text-base-content"
          >
            <Nav />
            <div className=" sm:mt-20 w-full h-screen max-h-[calc(100dvh-82px)] sm:max-h-[calc(100dvh-144px)] bg-base-300 rounded-box p-4 sm:p-8">
              {children}
            </div>
          </motion.main>
        ) : (
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={String(hydrate)}
            className=" p-4 sm:px-16 sm:py-8 min-h-[100dvh] text-base-content flex items-center justify-center"
          >
            <p>Loading...</p>
          </motion.main>
        )}
      </body>
    </AnimatePresence>
  );
}
