
import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores/StoreContext";
import TaskHeader from "../components/TaskHeader";
import TaskForm from "../components/TaskForm";
import TaskFilter from "@/components/TaskFilter"; // Mantiene la ruta original por ser de solo lectura
import TaskList from "../components/TaskList";

const TaskAppView: React.FC = observer(() => {
  const { taskStore, authStore } = useStore();

  // Cargar tareas solo si el usuario está autenticado
  useEffect(() => {
    if (authStore.isAuthenticated) {
      taskStore.fetchTasks();
    }
  }, [taskStore, authStore.isAuthenticated]);

  if (!authStore.isAuthenticated) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 mt-8">
      <div className="bg-white/10 backdrop-blur-xl shadow-lg rounded-xl border border-gray-800/20 p-6">
        <TaskHeader />
        <TaskForm />
        <TaskFilter />
        <TaskList />
      </div>
    </div>
  );
});

export default TaskAppView;
