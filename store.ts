import { persist } from "zustand/middleware";
import { create } from "zustand";

type ThemeState = {
  mode: "light" | "dark";
  toggleMode: (theme: "light" | "dark") => void;
};
type User = {
  chatSession_Id: string | null;
  initiated: boolean;
  setInitiated: () => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: "light",
      toggleMode: (theme) => set((state) => ({ mode: theme })),
    }),
    { name: "theme" }
  )
);

export const useChatStore = create<User>()(
  persist(
    (set) => ({
      chatSession_Id: crypto.randomUUID(),
      initiated: false,
      setInitiated: () => set({ initiated: true }),
    }),
    { name: "chat-store" }
  )
);
