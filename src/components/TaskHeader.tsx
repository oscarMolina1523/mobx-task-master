
import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores/StoreContext";

const TaskHeader = observer(() => {
  const { taskStore, authStore } = useStore();
  const completedTasks = taskStore.completedTasksCount;
  const totalTasks = taskStore.totalTasksCount;
  
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        ¡Hola, {authStore.user?.username || "Usuario"}!
      </h1>
      <p className="text-gray-300">
        Has completado {completedTasks} de {totalTasks} tareas
      </p>
      <div className="w-full bg-gray-700/30 rounded-full h-2.5 mt-2">
        <div 
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: totalTasks > 0 ? `${(completedTasks / totalTasks) * 100}%` : '0%' }}
        ></div>
      </div>
    </div>
  );
});

export default TaskHeader;
