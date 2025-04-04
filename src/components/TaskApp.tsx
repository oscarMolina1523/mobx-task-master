
import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores/StoreContext";
import TaskHeader from "./TaskHeader";
import TaskForm from "./TaskForm";
import TaskFilter from "./TaskFilter";
import TaskList from "./TaskList";

const TaskApp: React.FC = observer(() => {
  const { taskStore } = useStore();

  useEffect(() => {
    taskStore.fetchTasks();
  }, [taskStore]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <TaskHeader />
      <TaskForm />
      <TaskFilter />
      <TaskList />
    </div>
  );
});

export default TaskApp;
