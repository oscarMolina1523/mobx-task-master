
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores/StoreContext";
import TaskHeader from "./TaskHeader";
import TaskForm from "./TaskForm";
import TaskFilter from "./TaskFilter";
import TaskList from "./TaskList";
import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";
import Navbar from "./Navbar";

const TaskApp: React.FC = observer(() => {
  const { taskStore, authStore } = useStore();
  const [route, setRoute] = useState<"tasks" | "login" | "register">("tasks");

  // Manejar rutas basadas en hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      
      if (hash === "login") {
        setRoute("login");
      } else if (hash === "register") {
        setRoute("register");
      } else {
        setRoute("tasks");
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // Comprobar el hash inicial
    
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  // Cargar tareas solo si el usuario está autenticado
  useEffect(() => {
    if (authStore.isAuthenticated) {
      taskStore.fetchTasks();
    }
  }, [taskStore, authStore.isAuthenticated]);

  const renderContent = () => {
    // Si el usuario no está autenticado y no está en una ruta de autenticación, redirigir a login
    if (!authStore.isAuthenticated && route === "tasks") {
      window.location.hash = "#login";
      return null;
    }

    // Si el usuario está autenticado y está en una ruta de autenticación, redirigir a tareas
    if (authStore.isAuthenticated && (route === "login" || route === "register")) {
      window.location.hash = "#tasks";
      return null;
    }

    switch (route) {
      case "login":
        return (
          <div className="flex items-center justify-center min-h-[80vh]">
            <LoginForm />
          </div>
        );
      case "register":
        return (
          <div className="flex items-center justify-center min-h-[80vh]">
            <RegisterForm />
          </div>
        );
      case "tasks":
        return (
          <div className="max-w-2xl mx-auto p-4 mt-8">
            <div className="bg-white/10 backdrop-blur-xl shadow-lg rounded-xl border border-gray-800/20 p-6">
              <TaskHeader />
              <TaskForm />
              <TaskFilter />
              <TaskList />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4">
        {renderContent()}
      </div>
      <footer className="mt-20 py-6 text-center text-gray-400 text-sm">
        <p>© 2025 TaskMaster. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
});

export default TaskApp;
