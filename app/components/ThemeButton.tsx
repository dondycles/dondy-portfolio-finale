"use client";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useThemeStore } from "@/store";

export default function ThemeButton() {
  const theme = useThemeStore();

  return (
    <label className="swap swap-rotate text-2xl join-item group fixed bottom-4 right-4 sm:right-auto sm:bottom-auto sm:relative text-accent">
      <input
        defaultChecked={theme.mode === "light" ? false : true}
        onClick={() => {
          if (theme.mode === "dark") return theme.toggleMode("light");
          theme.toggleMode("dark");
        }}
        type="checkbox"
      />
      <>
        <span className={` swap-off`}>
          <MdDarkMode />
        </span>
        <span className={` swap-on`}>
          <MdLightMode />
        </span>
      </>
    </label>
  );
}
