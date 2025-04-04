
import { User, LoginCredentials, RegisterData, LoginResponseDTO, RegisterResponseDTO } from "../domain/auth.types";

// Función auxiliar para simular retrasos en la red
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Usuarios mock para simulación
const mockUsers: Record<string, User & { password: string }> = {
  'user1@example.com': {
    id: '1',
    username: 'usuario1',
    email: 'user1@example.com',
    name: 'Usuario de Prueba',
    password: 'password123'
  }
};

// Simulación de API de autenticación
export const loginApi = async (credentials: LoginCredentials): Promise<LoginResponseDTO> => {
  // Simular retraso de red
  await delay(800);
  
  const user = Object.values(mockUsers).find(u => u.email === credentials.email);
  
  if (!user || user.password !== credentials.password) {
    throw new Error('Credenciales inválidas. Intenta nuevamente.');
  }
  
  // Generar un token falso
  const token = `mock-jwt-token-${Date.now()}`;
  
  // Devolver usuario sin la contraseña
  const { password, ...userWithoutPassword } = user;
  
  return {
    user: userWithoutPassword,
    token
  };
};

export const registerApi = async (data: RegisterData): Promise<RegisterResponseDTO> => {
  // Simular retraso de red
  await delay(1000);
  
  // Verificar si el usuario ya existe
  if (Object.values(mockUsers).some(u => u.email === data.email)) {
    throw new Error('Este correo electrónico ya está registrado.');
  }
  
  // Crear un nuevo usuario
  const newUser: User & { password: string } = {
    id: Date.now().toString(),
    username: data.username,
    email: data.email,
    name: data.name,
    password: data.password
  };
  
  // Almacenar en el mock
  mockUsers[data.email] = newUser;
  
  // Generar un token falso
  const token = `mock-jwt-token-${Date.now()}`;
  
  // Devolver usuario sin la contraseña
  const { password, ...userWithoutPassword } = newUser;
  
  return {
    user: userWithoutPassword,
    token
  };
};

export const logoutApi = async (): Promise<void> => {
  // Simular retraso de red
  await delay(300);
  
  // En una aplicación real, aquí se invalidaría el token en el servidor
  return Promise.resolve();
};

export const getCurrentUserApi = async (): Promise<User> => {
  // Simular retraso de red
  await delay(500);
  
  // En una aplicación real, aquí se verificaría el token con el servidor y se devolvería el usuario actual
  // Para la simulación, simplemente devolvemos un usuario de prueba
  return {
    id: '1',
    username: 'usuario1',
    email: 'user1@example.com',
    name: 'Usuario de Prueba'
  };
};
