import TaskFilter from "@/components/TaskFilter";
import { useStore } from "@/stores/StoreContext";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import TaskForm from "../../../components/TaskForm";
import TaskHeader from "../../../components/TaskHeader";
import TaskList from "../../../components/TaskList";

const TaskAppView: React.FC = observer(() => {
  const { taskStore, authStore } = useStore();

  // Cargar tareas solo si el usuario está autenticado
  useEffect(() => {
    if (authStore.isAuthenticated) {
      const token = localStorage.getItem('auth_token'); 
      if (token) {
        taskStore.fetchTasks(token); 
      }
    }
  }, [taskStore, authStore.isAuthenticated]);

  if (!authStore.isAuthenticated) {
    return null;
  }

  return (
    <div className="w-full md:max-w-2xl mx-auto p-4 mt-8 overflow-hidden">
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
