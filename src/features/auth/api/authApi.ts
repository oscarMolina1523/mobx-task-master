import axios from 'axios';
import { LoginCredentials, LoginResponseDTO, RegisterData, RegisterResponseDTO } from "../domain/auth.types";

const API_BASE_URL = 'https://mobx-backend-production.up.railway.app/api/auth';


export const loginApi = async (credentials: LoginCredentials): Promise<LoginResponseDTO> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al iniciar sesión.');
  }
};

export const registerApi = async (data: RegisterData): Promise<RegisterResponseDTO> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error al registrar usuario.');
  }
};

// export const logoutApi = async (): Promise<void> => {
//   ///por ahora en el backend no poseo este endpoint lo creare luego lo primordial es el login y register
//   return Promise.resolve();
// };

// export const getCurrentUserApi = async (): Promise<User> => {
//   ///por ahora en el backend no poseo este endpoint lo creare luego lo primordial es el login y register
//   return {
//     id: '1',
//     username: 'usuario1',
//     email: 'user1@example.com',
//     name: 'Usuario de Prueba'
//   };
// };
