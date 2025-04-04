
import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores/StoreContext";
import TaskItem from "./TaskItem";
import { Skeleton } from "@/components/ui/skeleton";

const TaskList: React.FC = observer(() => {
  const { taskStore } = useStore();
  const { filteredTasks, isLoading, error } = taskStore;

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (isLoading && filteredTasks.length === 0) {
    return (
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-4 animate-pulse">
            <div className="flex items-start">
              <Skeleton className="h-5 w-5 rounded-sm" />
              <div className="ml-3 flex-1">
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (filteredTasks.length === 0) {
    return (
      <div className="text-center p-6">
        <p className="text-gray-500">No tasks found</p>
        {taskStore.filter !== "all" && (
          <p className="text-sm text-gray-400 mt-1">
            Try selecting a different filter
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filteredTasks.map(task => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
});

export default TaskList;
