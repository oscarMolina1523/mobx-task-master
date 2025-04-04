
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores/StoreContext";
import MainLayout from "@/layouts/MainLayout";
import TaskAppView from "@/features/tasks/views/TaskAppView";
import LoginView from "@/features/auth/views/LoginView";
import RegisterView from "@/features/auth/views/RegisterView";

const TaskApp: React.FC = observer(() => {
  const { authStore } = useStore();
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
        return <LoginView />;
      case "register":
        return <RegisterView />;
      case "tasks":
        return <TaskAppView />;
    }
  };

  return (
    <MainLayout>
      {renderContent()}
    </MainLayout>
  );
});

export default TaskApp;
