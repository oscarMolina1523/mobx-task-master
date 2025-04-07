import { loginApi, registerApi } from "@/features/auth/api/authApi";
import { AuthError, RegisterData } from "@/features/auth/domain/auth.types";
import { makeAutoObservable, runInAction } from "mobx";

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
  token: string | null = null; 
  isLoading: boolean = false; 
  error: AuthError | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isAuthenticated(): boolean {
    return !!this.user && !!this.token; 
  }

  async login(credentials: LoginCredentials) {
    this.isLoading = true;
    this.error = null; 

    try {
      const { user, token } = await loginApi(credentials); 
      
      localStorage.setItem('auth_token', token);
      
      runInAction(() => {
        this.user = user; 
        this.token = token; 
        this.isLoading = false; 
      });
      
      return true; 
    } catch (error) {
      runInAction(() => {
        this.error = {
          type: 'invalid-credentials',
          message: error.message 
        };
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

      localStorage.setItem('auth_token', token);
      
      runInAction(() => {
        this.user = user; 
        this.token = token;
        this.isLoading = false;
      });
      
      return true; 
    } catch (error) {
      runInAction(() => {
        this.error = {
          type: 'user-exists',
          message: error.message 
        };
        this.isLoading = false; 
      });
      
      return false; 
    }
  }

  async logout() {
    this.isLoading = true; 

    localStorage.removeItem('auth_token'); 
    
    runInAction(() => {
      this.user = null;
      this.token = null; 
      this.isLoading = false; 
    });
  }

  clearError() {
    this.error = null; 
  }
}

export default new AuthStore();
