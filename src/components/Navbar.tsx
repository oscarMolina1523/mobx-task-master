
import React from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores/StoreContext";
import { Button } from "@/components/ui/button";
import UserProfileMenu from "./auth/UserProfileMenu";
import { ListTodo } from "lucide-react";

const Navbar: React.FC = observer(() => {
  const { authStore } = useStore();
  
  return (
    <nav className="bg-black/5 backdrop-blur-lg border-b border-gray-800/20 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center gap-2">
                <ListTodo className="h-6 w-6 text-blue-500" />
                <span className="font-bold text-xl bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                  TaskMaster
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {authStore.isAuthenticated ? (
              <UserProfileMenu />
            ) : (
              <div className="flex gap-2">
                <Button 
                  variant="ghost"
                  className="text-gray-600 hover:text-gray-900"
                  onClick={() => window.location.hash = "#login"}
                >
                  Iniciar Sesión
                </Button>
                <Button 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                  onClick={() => window.location.hash = "#register"}
                >
                  Registrarse
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
});

export default Navbar;
