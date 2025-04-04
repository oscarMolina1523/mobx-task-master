
import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores/StoreContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";

const TaskForm = observer(() => {
  const { taskStore } = useStore();
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim()) {
      taskStore.addTask(title);
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex space-x-2">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Añadir nueva tarea..."
          className="flex-grow bg-gray-800/30 border-gray-700/30 text-white placeholder-gray-400 focus-visible:ring-blue-500"
        />
        <Button 
          type="submit" 
          disabled={!title.trim()}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all"
        >
          <PlusCircle className="h-5 w-5 mr-1" />
          Añadir
        </Button>
      </div>
    </form>
  );
});

export default TaskForm;
