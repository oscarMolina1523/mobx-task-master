
// Define las interfaces y tipos relacionados con el dominio de tareas

export interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
}

// Filtros de tareas
export type TaskFilter = "all" | "active" | "completed";

// DTOs para la comunicación con el backend
export interface CreateTaskDTO {
  title: string;
  description?: string;
}

export interface UpdateTaskDTO {
  title?: string;
  description?: string;
  completed?: boolean;
}

// Respuestas del servidor
export interface TaskResponseDTO {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string; // ISO date string
}
