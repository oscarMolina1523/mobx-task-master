
import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "@/stores/StoreContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, UserPlus } from "lucide-react";

const RegisterForm: React.FC = observer(() => {
  const { authStore } = useStore();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await authStore.register({ username, email, password });
  };

  return (
    <Card className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-gray-800/20 shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">
          Crear Cuenta
        </CardTitle>
        <CardDescription className="text-center text-gray-500">
          Regístrate para comenzar a usar la aplicación
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input 
              type="text" 
              placeholder="Nombre de usuario" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-900/10 border-gray-700/30 focus-visible:ring-blue-500"
              required 
            />
          </div>
          <div className="space-y-2">
            <Input 
              type="email" 
              placeholder="Correo electrónico" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-900/10 border-gray-700/30 focus-visible:ring-blue-500"
              required 
            />
          </div>
          <div className="space-y-2">
            <Input 
              type="password" 
              placeholder="Contraseña" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-900/10 border-gray-700/30 focus-visible:ring-blue-500"
              required 
            />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all"
            disabled={authStore.isLoading}
          >
            {authStore.isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cargando...
              </>
            ) : (
              <>
                <UserPlus className="mr-2 h-4 w-4" />
                Registrarse
              </>
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <p className="px-8 text-center text-sm text-gray-500">
          ¿Ya tienes una cuenta?{" "}
          <Button variant="link" className="p-0 text-blue-500" onClick={() => window.location.hash = "#login"}>
            Inicia sesión
          </Button>
        </p>
      </CardFooter>
    </Card>
  );
});

export default RegisterForm;
