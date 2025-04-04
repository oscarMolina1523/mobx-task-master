
import React from "react";
import { StoreProvider } from "@/stores/StoreContext";
import TaskApp from "@/components/TaskApp";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <StoreProvider>
        <TaskApp />
      </StoreProvider>
    </div>
  );
};

export default Index;
