"use client";
import { createContext, useContext, useState } from "react";

// ✅ Types
type AppContextType = {
  user: string | null;
  setUser: (user: string | null) => void;
  loading: boolean;
  setLoading: (val: boolean) => void;
};

// ✅ Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// ✅ Provider
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <AppContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AppContext.Provider>
  );
};

// ✅ Custom Hook
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
