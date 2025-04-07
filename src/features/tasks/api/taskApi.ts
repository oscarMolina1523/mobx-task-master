import axios from 'axios';
import { CreateTaskDTO, Task, TaskResponseDTO, UpdateTaskDTO } from "../domain/task.types";

const API_BASE_URL = 'https://mobx-backend-production.up.railway.app/api/tasks';


const mapTaskResponseToTask = (taskDto: TaskResponseDTO): Task => ({
  ...taskDto,
  createdAt: new Date(taskDto.createdAt),
});

// Obtener todas las tareas del usuario
export const getTasksApi = async (token: string): Promise<Task[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.map(mapTaskResponseToTask);
  } catch (error) {
    throw new Error(error?.response?.data?.message || 'Error al obtener tareas.');
  }
};

// Crear una nueva tarea
export const addTaskApi = async (taskData: CreateTaskDTO, token: string): Promise<Task> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}`,
      taskData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return mapTaskResponseToTask(response.data);
  } catch (error) {
    throw new Error(error?.response?.data?.message || 'Error al crear tarea.');
  }
};

// Actualizar una tarea existente
export const updateTaskApi = async (id: string, updates: UpdateTaskDTO, token: string): Promise<Task> => {
  if (!id) {
    throw new Error('ID de la tarea no proporcionado');
  }

  try {
    const response = await axios.put(
      `${API_BASE_URL}/${id}`,
      updates,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return mapTaskResponseToTask(response.data);
  } catch (error) {
    throw new Error(error?.response?.data?.message || 'Error al actualizar tarea.');
  }
};

// Eliminar una tarea
export const deleteTaskApi = async (id: string, token: string): Promise<void> => {
  if (!id) {
    throw new Error('ID de la tarea no proporcionado');
  }

  try {
    await axios.delete(
      `${API_BASE_URL}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    throw new Error(error?.response?.data?.message || 'Error al eliminar tarea.');
  }
};
