import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useStore } from "@/stores/StoreContext";
import { Loader2, LogIn } from "lucide-react";
import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { toast } from "sonner";

const LoginForm: React.FC = observer(() => {
  const { authStore } = useStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await authStore.login({ email, password });

    if (!success && authStore.error) {
      toast.error(authStore.error.message); 
    }
  };

  return (
    <Card className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-gray-800/20 shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
          Inicio de Sesión
        </CardTitle>
        <CardDescription className="text-center text-gray-500">
          Ingresa tus credenciales para acceder a la aplicación
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                authStore.clearError(); 
              }}
              className="bg-gray-900/10 border-gray-700/30 focus-visible:ring-blue-500"
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                authStore.clearError(); 
              }}
              className="bg-gray-900/10 border-gray-700/30 focus-visible:ring-blue-500"
              required
            />
          </div>

          {authStore.error && (
            <div className="text-red-500 text-sm text-center mt-2">
              {authStore.error.message}
            </div>
          )}

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all"
            disabled={authStore.isLoading}
          >
            {authStore.isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cargando...
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" />
                Iniciar Sesión
              </>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <p className="px-8 text-center text-sm text-gray-500">
          ¿No tienes una cuenta?{" "}
          <Button
            variant="link"
            className="p-0 text-blue-500"
            onClick={() => (window.location.hash = "#register")}
          >
            Regístrate
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
});

export default LoginForm;
