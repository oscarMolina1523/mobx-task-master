export interface User {
  id: string;
  username: string;
  email: string;
  name?: string;
  avatar?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  name?: string;
}

// DTOs para la comunicación con el backend
export interface LoginResponseDTO {
  user: User;
  token: string;
}

export interface RegisterResponseDTO {
  user: User;
  token: string;
}

// Errores de autenticación
export type AuthErrorType = 
  | 'invalid-credentials'
  | 'user-exists'
  | 'weak-password'
  | 'network-error'
  | 'unknown';

export interface AuthError {
  type: AuthErrorType;
  message: string;
}
