
import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Task } from "@/stores/TaskStore";
import { useStore } from "@/stores/StoreContext";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash, Edit, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = observer(({ task }) => {
  const { taskStore } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || "");

  const handleToggleCompletion = () => {
    taskStore.toggleTaskCompletion(task.id);
  };

  const handleDelete = () => {
    taskStore.deleteTask(task.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditTitle(task.title);
    setEditDescription(task.description || "");
  };

  const handleSaveEdit = () => {
    if (!editTitle.trim()) return;
    
    taskStore.updateTask(task.id, {
      title: editTitle.trim(),
      description: editDescription.trim() || undefined
    });
    
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow p-4 mb-3 border border-gray-200">
        <Input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="mb-2 w-full"
          placeholder="Task title"
        />
        <Textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          className="mb-2 w-full resize-none"
          placeholder="Task description (optional)"
          rows={3}
        />
        <div className="flex justify-end space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handleCancelEdit}
            className="text-gray-500"
          >
            <X className="h-4 w-4 mr-1" /> Cancel
          </Button>
          <Button
            size="sm"
            onClick={handleSaveEdit}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Check className="h-4 w-4 mr-1" /> Save
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "bg-white rounded-lg shadow p-4 mb-3 border transition-all duration-200",
        task.completed ? "border-green-200 bg-green-50" : "border-gray-200"
      )}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 pt-1">
          <Checkbox 
            checked={task.completed} 
            onCheckedChange={handleToggleCompletion}
            className={cn(
              task.completed && "bg-green-500 border-green-500"
            )}
          />
        </div>
        <div className="ml-3 flex-1">
          <h3 
            className={cn(
              "font-medium text-gray-900 text-base break-words",
              task.completed && "line-through text-gray-500"
            )}
          >
            {task.title}
          </h3>
          {task.description && (
            <p 
              className={cn(
                "text-gray-600 text-sm mt-1 break-words",
                task.completed && "text-gray-400"
              )}
            >
              {task.description}
            </p>
          )}
          <div className="text-xs text-gray-400 mt-1">
            {new Date(task.createdAt).toLocaleDateString()}
          </div>
        </div>
        <div className="flex-shrink-0 flex space-x-1 ml-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleEdit} 
            className="h-8 w-8 p-0 text-gray-500 hover:text-purple-600"
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleDelete} 
            className="h-8 w-8 p-0 text-gray-500 hover:text-red-600"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
});

export default TaskItem;
