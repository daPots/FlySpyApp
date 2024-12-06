import React, { createContext, useState, useContext, ReactNode } from "react";

interface GuestContextType {
  isGuest: boolean;
  setIsGuest: React.Dispatch<React.SetStateAction<boolean>>;
}

const GuestContext = createContext<GuestContextType | undefined>(undefined);

interface GuestProviderProps {
  children: ReactNode;
}

export const GuestProvider = ({ children }: GuestProviderProps) => {
  const [isGuest, setIsGuest] = useState<boolean>(false);

  return (
    <GuestContext.Provider value={{ isGuest, setIsGuest }}>{children}</GuestContext.Provider>
  );
};

export const useGuest = () => {
  const context = useContext(GuestContext);
  if (!context) {
    throw new Error("useGuest must be used within a GuestProvider");
  }
  return context;
};
