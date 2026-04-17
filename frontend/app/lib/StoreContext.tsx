'use client';
import { createContext, useContext, ReactNode } from "react";
import { useMachines } from "@/lib/store";

type StoreReturn = ReturnType<typeof useMachines>;
const StoreContext = createContext<StoreReturn | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const store = useMachines();
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreReturn {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
