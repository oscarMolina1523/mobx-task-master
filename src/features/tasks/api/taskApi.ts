
import { Task, CreateTaskDTO, UpdateTaskDTO, TaskResponseDTO } from "../domain/task.types";

// Función auxiliar para simular retrasos en la red
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Función para convertir respuesta del servidor a modelo de dominio
const mapTaskResponseToTask = (taskDto: TaskResponseDTO): Task => ({
  ...taskDto,
  createdAt: new Date(taskDto.createdAt)
});

// Simulación de una API
// Estas funciones serán reemplazadas por llamadas reales a la API en el futuro
export const getTasksApi = async (): Promise<Task[]> => {
  // Simular retraso de red
  await delay(500);
  
  // Datos de ejemplo
  const mockTasks: TaskResponseDTO[] = [
    {
      id: "1",
      title: "Learn MobX",
      description: "Study MobX documentation and examples for effective state management in React applications",
      completed: false,
      createdAt: new Date().toISOString()
    },
    {
      id: "2",
      title: "Build Task Manager",
      description: "Create a task manager app using React and MobX with clean architecture and backend integration",
      completed: false,
      createdAt: new Date().toISOString()
    },
    {
      id: "3",
      title: "Implement Authentication",
      description: "Add user authentication with login and registration features",
      completed: true,
      createdAt: new Date(Date.now() - 86400000).toISOString()
    }
  ];
  
  // Convertir a modelo de dominio
  return mockTasks.map(mapTaskResponseToTask);
};

export const addTaskApi = async (taskData: CreateTaskDTO): Promise<Task> => {
  // Simular retraso de red
  await delay(300);
  
  // Simulación de respuesta del servidor
  const mockResponse: TaskResponseDTO = {
    id: Date.now().toString(),
    title: taskData.title,
    description: taskData.description,
    completed: false,
    createdAt: new Date().toISOString()
  };
  
  return mapTaskResponseToTask(mockResponse);
};

export const updateTaskApi = async (id: string, updates: UpdateTaskDTO): Promise<Task> => {
  // Simular retraso de red
  await delay(300);
  
  // En una implementación real, aquí se haría una llamada PUT/PATCH a la API
  // Simulamos que el servidor devuelve los datos actualizados
  const mockUpdatedTask: TaskResponseDTO = {
    id,
    title: updates.title || "Tarea actualizada",
    description: updates.description,
    completed: updates.completed !== undefined ? updates.completed : false,
    createdAt: new Date().toISOString()
  };
  
  return mapTaskResponseToTask(mockUpdatedTask);
};

export const deleteTaskApi = async (id: string): Promise<void> => {
  // Simular retraso de red
  await delay(300);
  
  // En una implementación real, aquí se haría una llamada DELETE a la API
  // Como es simulado, no necesitamos devolver nada específico
  return Promise.resolve();
};
