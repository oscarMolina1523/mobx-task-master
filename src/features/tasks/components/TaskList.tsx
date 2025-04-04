
import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores/StoreContext";
import TaskItem from "./TaskItem";
import { Loader2 } from "lucide-react";

const TaskList = observer(() => {
  const { taskStore } = useStore();
  
  if (taskStore.isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (taskStore.filteredTasks.length === 0) {
    return (
      <div className="text-center py-8 border border-dashed border-gray-700 rounded-lg bg-gray-800/20">
        <p className="text-gray-400">No hay tareas disponibles</p>
        <p className="text-gray-500 text-sm mt-1">
          {taskStore.filter === "all" 
            ? "Añade tu primera tarea usando el formulario de arriba" 
            : "Cambia el filtro para ver otras tareas"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3 mt-6">
      {taskStore.filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
});

export default TaskList;
