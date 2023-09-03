import { persist } from "zustand/middleware";
import { create } from "zustand";

type ThemeState = {
  mode: "light" | "dark";
  toggleMode: (theme: "light" | "dark") => void;
};
type User = {
  chatSession_Id: string | null;
  initiated: boolean;
  senderName: string | null;
  setInitiated: () => void;
  setSenderName: (name: string) => void;
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
      senderName: null,
      initiated: false,
      setInitiated: () => set({ initiated: true }),
      setSenderName: (name: string) => set({ senderName: name }),
    }),
    { name: "chat-store" }
  )
);
