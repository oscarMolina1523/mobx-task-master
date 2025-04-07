import React, { createContext, useContext } from "react";
import AuthStore from "./AuthStore";
import TaskStore from "./TaskStore";

interface StoreContextValue {
  taskStore: typeof TaskStore;
  authStore: typeof AuthStore;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const store = {
    taskStore: TaskStore,
    authStore: AuthStore
  };

  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};
