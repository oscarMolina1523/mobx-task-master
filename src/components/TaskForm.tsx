import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useStore } from "@/stores/StoreContext";
import { PlusCircle } from "lucide-react";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";

const TaskForm = observer(() => {
  const { taskStore, authStore } = useStore(); 
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSimpleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.trim()) {
      const token = authStore.token; 
      taskStore.addTask(title, token); 
      setTitle("");
    }
  };

  const handleDetailedSubmit = () => {
    if (title.trim()) {
      const token = authStore.token;
      taskStore.addTask(title, token, description); 
      setTitle("");
      setDescription("");
      setIsDialogOpen(false);
    }
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSimpleSubmit} className="flex space-x-2">
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
      </form>

      <div className="mt-2 flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className="text-gray-400 hover:text-white border-gray-700/30 hover:border-gray-600/50"
            >
              Tarea con detalles
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-700/30">
            <DialogHeader>
              <DialogTitle className="text-white">Crear nueva tarea</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Título</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Título de la tarea"
                  className="bg-gray-800/30 border-gray-700/30 text-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Descripción</label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descripción detallada de la tarea"
                  className="bg-gray-800/30 border-gray-700/30 text-white resize-none h-24"
                />
              </div>
              <div className="flex justify-end mt-4">
                <Button
                  onClick={handleDetailedSubmit}
                  disabled={!title.trim()}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all"
                >
                  <PlusCircle className="h-5 w-5 mr-1" />
                  Guardar tarea
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
});

export default TaskForm;