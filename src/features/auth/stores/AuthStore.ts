
import { makeAutoObservable, runInAction } from "mobx";
import { User, LoginCredentials, RegisterData, AuthError } from "../domain/auth.types";
import { loginApi, registerApi, logoutApi, getCurrentUserApi } from "../api/authApi";

class AuthStore {
  user: User | null = null;
  token: string | null = null;
  isLoading: boolean = false;
  error: AuthError | null = null;

  constructor() {
    makeAutoObservable(this);
    this.initializeAuthentication();
  }

  get isAuthenticated(): boolean {
    return !!this.user && !!this.token;
  }

  async initializeAuthentication() {
    // Verificar si hay un token en localStorage
    const token = localStorage.getItem('auth_token');
    if (!token) return;

    this.token = token;
    this.isLoading = true;

    try {
      // Obtener el usuario actual usando el token
      const user = await getCurrentUserApi();
      runInAction(() => {
        this.user = user;
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.token = null;
        localStorage.removeItem('auth_token');
        this.isLoading = false;
      });
    }
  }

  async login(credentials: LoginCredentials) {
    this.isLoading = true;
    this.error = null;

    try {
      const { user, token } = await loginApi(credentials);
      
      // Guardar el token en localStorage
      localStorage.setItem('auth_token', token);
      
      runInAction(() => {
        this.user = user;
        this.token = token;
        this.isLoading = false;
      });
      
      return true;
    } catch (error) {
      runInAction(() => {
        if (error instanceof Error) {
          this.error = {
            type: 'invalid-credentials',
            message: error.message
          };
        } else {
          this.error = {
            type: 'unknown',
            message: 'Error desconocido al intentar iniciar sesión'
          };
        }
        this.isLoading = false;
      });
      
      return false;
    }
  }

  async register(data: RegisterData) {
    this.isLoading = true;
    this.error = null;

    try {
      const { user, token } = await registerApi(data);
      
      // Guardar el token en localStorage
      localStorage.setItem('auth_token', token);
      
      runInAction(() => {
        this.user = user;
        this.token = token;
        this.isLoading = false;
      });
      
      return true;
    } catch (error) {
      runInAction(() => {
        if (error instanceof Error) {
          this.error = {
            type: 'user-exists',
            message: error.message
          };
        } else {
          this.error = {
            type: 'unknown',
            message: 'Error desconocido al intentar registrarse'
          };
        }
        this.isLoading = false;
      });
      
      return false;
    }
  }

  async logout() {
    this.isLoading = true;

    try {
      // Llamar al endpoint de logout
      await logoutApi();
      
      // Remover el token del localStorage
      localStorage.removeItem('auth_token');
      
      runInAction(() => {
        this.user = null;
        this.token = null;
        this.isLoading = false;
      });
    } catch (error) {
      // Aún si hay error, cerramos la sesión localmente
      localStorage.removeItem('auth_token');
      
      runInAction(() => {
        this.user = null;
        this.token = null;
        this.isLoading = false;
      });
    }
  }

  clearError() {
    this.error = null;
  }
}

export default new AuthStore();
