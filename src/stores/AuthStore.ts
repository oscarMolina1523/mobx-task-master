
import { makeAutoObservable } from "mobx";
import { toast } from "sonner";

interface User {
  id: string;
  username: string;
  email: string;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

class AuthStore {
  user: User | null = null;
  isAuthenticated = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
    // Intentar recuperar usuario de localStorage al iniciar
    this.checkExistingSession();
  }

  checkExistingSession() {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        this.user = JSON.parse(savedUser);
        this.isAuthenticated = true;
      } catch (error) {
        localStorage.removeItem("user");
      }
    }
  }

  async login(credentials: LoginCredentials) {
    this.isLoading = true;
    try {
      // Simulamos una llamada a API
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Demo: verificación simple (en producción esto sería validado por el backend)
      if (credentials.email && credentials.password) {
        // Crear usuario demo
        const user = {
          id: Math.random().toString(36).substring(2, 9),
          username: credentials.email.split('@')[0],
          email: credentials.email
        };
        
        this.user = user;
        this.isAuthenticated = true;
        
        // Guardar en localStorage para persistencia
        localStorage.setItem("user", JSON.stringify(user));
        
        toast.success("Inicio de sesión exitoso");
        return true;
      } else {
        toast.error("Credenciales inválidas");
        return false;
      }
    } catch (error) {
      toast.error("Error al iniciar sesión");
      return false;
    } finally {
      this.isLoading = false;
    }
  }

  async register(credentials: RegisterCredentials) {
    this.isLoading = true;
    try {
      // Simulamos una llamada a API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (credentials.email && credentials.password && credentials.username) {
        const user = {
          id: Math.random().toString(36).substring(2, 9),
          username: credentials.username,
          email: credentials.email
        };
        
        this.user = user;
        this.isAuthenticated = true;
        
        localStorage.setItem("user", JSON.stringify(user));
        
        toast.success("Registro exitoso");
        return true;
      } else {
        toast.error("Por favor complete todos los campos");
        return false;
      }
    } catch (error) {
      toast.error("Error al registrarse");
      return false;
    } finally {
      this.isLoading = false;
    }
  }

  logout() {
    this.user = null;
    this.isAuthenticated = false;
    localStorage.removeItem("user");
    toast.info("Sesión cerrada");
  }
}

export default new AuthStore();
