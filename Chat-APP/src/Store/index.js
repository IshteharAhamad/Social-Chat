// Store.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAppStore = create(
  persist(
    (set, get) => ({
      userInfo: undefined,
      setUserInfo: (userInfo) => set({ userInfo }),
      
    }),
    {
      name: "accessToken", 
      getStorage: () => localStorage, 
    }
  )
);

