
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useStore } from "@/stores/StoreContext";
import { LogOut, User } from "lucide-react";
import { observer } from "mobx-react-lite";
import React from "react";

const UserProfileMenu: React.FC = observer(() => {
  const { authStore } = useStore();

  if (!authStore.user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className="relative h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 p-0.5"
        >
          <span className="sr-only">Open menu</span>
          <div className="flex h-full w-full items-center justify-center rounded-full text-xl font-semibold uppercase text-primary-foreground">
            {authStore.user.username.charAt(0)}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-white/95 backdrop-blur-sm border border-gray-200">
        <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>{authStore.user.username}</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-sm text-gray-500">
          {authStore.user.email}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          className="text-red-500 focus:text-red-500 cursor-pointer" 
          onClick={() => authStore.logout()}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

export default UserProfileMenu;
