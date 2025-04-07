
import { Button } from "@/components/ui/button";
import { useStore } from "@/stores/StoreContext";
import { CheckCircle, Circle, ListFilter } from "lucide-react";
import { observer } from "mobx-react-lite";

const TaskFilter = observer(() => {
  const { taskStore } = useStore();
  
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-medium flex items-center gap-2">
          <ListFilter className="h-5 w-5 text-blue-400" />
          Filtrar tareas
        </h2>
      </div>
      <div className="flex flex-wrap gap-2 md:space-x-2">
        <Button
          variant={taskStore.filter === "all" ? "default" : "outline"}
          onClick={() => taskStore.setFilter("all")}
          className={`flex-1 ${taskStore.filter === "all" ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'border-gray-700/30 hover:bg-gray-700/20 text-gray-300'}`}
        >
          <Circle className="h-4 w-4 mr-2" />
          Todas
        </Button>
        <Button
          variant={taskStore.filter === "active" ? "default" : "outline"}
          onClick={() => taskStore.setFilter("active")}
          className={`flex-1 ${taskStore.filter === "active" ? 'bg-gradient-to-r from-blue-500 to-purple-600' : 'border-gray-700/30 hover:bg-gray-700/20 text-gray-300'}`}
        >
          <Circle className="h-4 w-4 mr-2" />
          Activas
        </Button>
        <Button
          variant={taskStore.filter === "completed" ? "default" : "outline"}
          onClick={() => taskStore.setFilter("completed")}
          className={`flex-1 ${taskStore.filter === "completed" ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'border-gray-700/30 hover:bg-gray-700/20 text-gray-300'}`}
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Completadas
        </Button>
      </div>
    </div>
  );
});

export default TaskFilter;
