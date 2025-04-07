import TaskApp from "@/components/TaskApp";
import { StoreProvider } from "@/stores/StoreContext";

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
