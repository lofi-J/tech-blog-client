"use client";

import { createContext, ReactNode, useContext, useState } from "react";

type SearchModalContextValue = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  setIsOpen: (isOpen: boolean) => void;
};

const SearchModalContext = createContext<SearchModalContextValue | undefined>(
  undefined,
);

type SearchModalProviderProps = {
  children: ReactNode;
};

export const SearchModalProvider = ({ children }: SearchModalProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const value: SearchModalContextValue = {
    isOpen,
    openModal,
    closeModal,
    setIsOpen,
  };

  return (
    <SearchModalContext.Provider value={value}>
      {children}
    </SearchModalContext.Provider>
  );
};

export const useSearchModal = () => {
  const context = useContext(SearchModalContext);
  if (!context) {
    throw new Error("useSearchModal must be used within SearchModalProvider");
  }
  return context;
};
