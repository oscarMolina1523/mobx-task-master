
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useStore } from "@/stores/StoreContext";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { ChevronDown, ChevronUp, Clock, Edit, Save, Trash, X } from "lucide-react";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";

interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
}

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = observer(({ task }) => {
  const { taskStore, authStore } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description || "");

  const token = authStore.token; 

  const handleSaveEdit = () => {
    if (editedTitle.trim()) {
      taskStore.updateTask(task._id, { 
        title: editedTitle,
        description: editedDescription 
      }, token);
      setIsEditing(false);
      console.log(task._id);
    }
  };

  const handleCancelEdit = () => {
    setEditedTitle(task.title);
    setEditedDescription(task.description || "");
    setIsEditing(false);
  };

  const formattedDate = format(new Date(task.createdAt), "dd MMM yyyy, HH:mm", { locale: es });

  return (
    <div className={`rounded-lg transition-all duration-200 ${task.completed ? 'bg-green-500/10 border border-green-500/20' : 'bg-gray-800/30 border border-gray-700/30 hover:border-gray-600/50'}`}>
      <div className="p-4">
        <div className="flex items-center">
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => taskStore.toggleTaskCompletion(task._id, token)}
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
                  onClick={() => setIsExpanded(!isExpanded)}
                  size="sm"
                  variant="ghost"
                  className="text-gray-400 hover:text-gray-300 hover:bg-gray-700/30"
                >
                  {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
                <Button
                  onClick={() => setIsEditing(true)}
                  size="sm"
                  variant="ghost"
                  className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => taskStore.deleteTask(task._id, token)}
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
      
      {(isExpanded || isEditing) && (
        <div className="px-4 pb-4 pt-0">
          {isEditing ? (
            <Textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              placeholder="Descripción de la tarea"
              className="w-full bg-gray-900/40 border-gray-700/30 text-white resize-none h-24 mt-2"
            />
          ) : (
            <>
              {task.description ? (
                <div className="mt-1 text-gray-300 text-sm pl-7">
                  {task.description}
                </div>
              ) : (
                <div className="mt-1 text-gray-500 text-sm italic pl-7">
                  Sin descripción
                </div>
              )}
              <div className="mt-3 text-gray-500 text-xs flex items-center pl-7">
                <Clock className="h-3 w-3 mr-1" />
                {formattedDate}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
});

export default TaskItem;
