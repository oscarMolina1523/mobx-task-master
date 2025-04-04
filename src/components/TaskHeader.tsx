
import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores/StoreContext";

const TaskHeader: React.FC = observer(() => {
  const { taskStore } = useStore();
  const { totalCount, completedCount } = taskStore;
  
  return (
    <div className="mb-8 text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-2">
        MobX Task Master
      </h1>
      <p className="text-gray-600">
        {totalCount === 0 ? (
          "No tasks yet. Add one to get started!"
        ) : (
          <>
            {completedCount} of {totalCount} tasks completed
          </>
        )}
      </p>
    </div>
  );
});

export default TaskHeader;
