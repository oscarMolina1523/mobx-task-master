
import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores/StoreContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

const TaskForm: React.FC = observer(() => {
  const { taskStore } = useStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    await taskStore.addTask(title, description);
    setTitle("");
    setDescription("");
    setExpanded(false);
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow p-4 mb-6 border border-gray-200"
    >
      <div className="flex items-center">
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1"
          onFocus={() => setExpanded(true)}
        />
        <Button type="submit" size="sm" className="ml-2 bg-purple-600 hover:bg-purple-700">
          <Plus className="h-5 w-5" />
        </Button>
      </div>
      
      {expanded && (
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add description (optional)"
          className="mt-2 w-full resize-none"
          rows={3}
        />
      )}
    </form>
  );
});

export default TaskForm;
