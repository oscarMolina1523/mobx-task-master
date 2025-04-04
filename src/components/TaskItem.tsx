
import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores/StoreContext";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Trash, Edit, Save, X } from "lucide-react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = observer(({ task }) => {
  const { taskStore } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);

  const handleSaveEdit = () => {
    if (editedTitle.trim()) {
      taskStore.updateTask(task.id, { title: editedTitle });
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditedTitle(task.title);
    setIsEditing(false);
  };

  return (
    <div className={`p-4 rounded-lg transition-all duration-200 ${task.completed ? 'bg-green-500/10 border border-green-500/20' : 'bg-gray-800/30 border border-gray-700/30 hover:border-gray-600/50'}`}>
      <div className="flex items-center">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => taskStore.toggleTaskCompletion(task.id)}
          className={`mr-3 ${task.completed ? 'bg-green-500 border-green-500' : 'border-gray-600'}`}
        />
        
        {isEditing ? (
          <div className="flex-grow flex items-center gap-2">
            <Input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="flex-grow bg-gray-900/40 border-gray-700/30 text-white"
              autoFocus
            />
            <div className="flex gap-1">
              <Button
                onClick={handleSaveEdit}
                size="sm"
                variant="outline"
                className="text-green-500 border-green-500/30 hover:bg-green-500/10"
              >
                <Save className="h-4 w-4" />
              </Button>
              <Button
                onClick={handleCancelEdit}
                size="sm"
                variant="outline"
                className="text-red-500 border-red-500/30 hover:bg-red-500/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <>
            <span className={`flex-grow ${task.completed ? 'line-through text-gray-400' : 'text-white'}`}>
              {task.title}
            </span>
            <div className="flex gap-1">
              <Button
                onClick={() => setIsEditing(true)}
                size="sm"
                variant="ghost"
                className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => taskStore.deleteTask(task.id)}
                size="sm"
                variant="ghost"
                className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
});

export default TaskItem;
