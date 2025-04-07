import LoginView from "@/features/auth/views/LoginView";
import RegisterView from "@/features/auth/views/RegisterView";
import TaskAppView from "@/features/tasks/views/TaskAppView";
import MainLayout from "@/layouts/MainLayout";
import { useStore } from "@/stores/StoreContext";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";

const TaskApp: React.FC = observer(() => {
  const { authStore } = useStore();
  const [route, setRoute] = useState<"tasks" | "login" | "register">("tasks");

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
    handleHashChange(); 
    
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    if (!authStore.isAuthenticated && route === "tasks") {
      window.location.hash = "#login";
    } else if (authStore.isAuthenticated && (route === "login" || route === "register")) {
      window.location.hash = "#tasks";
    }
  }, [route, authStore.isAuthenticated]);

  const renderContent = () => {
    switch (route) {
      case "login":
        return <LoginView />;
      case "register":
        return <RegisterView />;
      case "tasks":
        return <TaskAppView />;
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      {renderContent()}
    </MainLayout>
  );
});

export default TaskApp;
