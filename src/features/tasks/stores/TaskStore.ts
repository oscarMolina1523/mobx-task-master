
import { makeAutoObservable, runInAction } from "mobx";
import { Task, TaskFilter, CreateTaskDTO, UpdateTaskDTO } from "../domain/task.types";

// Simulación del servicio de API que luego se reemplazará con llamadas reales
import { getTasksApi, addTaskApi, updateTaskApi, deleteTaskApi } from "../api/taskApi";

class TaskStore {
  tasks: Task[] = [];
  isLoading: boolean = false;
  filter: TaskFilter = "all";
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
    this.fetchTasks();
  }

  // Computed properties
  get filteredTasks() {
    switch (this.filter) {
      case "active":
        return this.tasks.filter(task => !task.completed);
      case "completed":
        return this.tasks.filter(task => task.completed);
      default:
        return this.tasks;
    }
  }

  get completedCount() {
    return this.tasks.filter(task => task.completed).length;
  }

  get activeCount() {
    return this.tasks.filter(task => !task.completed).length;
  }

  get totalCount() {
    return this.tasks.length;
  }

  // Actions
  setFilter(filter: TaskFilter) {
    this.filter = filter;
  }

  async fetchTasks() {
    this.isLoading = true;
    this.error = null;
    
    try {
      const response = await getTasksApi();
      
      runInAction(() => {
        this.tasks = response;
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = "Failed to fetch tasks";
        this.isLoading = false;
      });
    }
  }

  async addTask(title: string, description?: string) {
    if (!title.trim()) return;
    
    this.isLoading = true;
    
    try {
      const newTaskData: CreateTaskDTO = {
        title: title.trim(),
        description: description?.trim()
      };
      
      const newTask = await addTaskApi(newTaskData);
      
      runInAction(() => {
        this.tasks.push(newTask);
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = "Failed to add task";
        this.isLoading = false;
      });
    }
  }

  async toggleTaskCompletion(id: string) {
    const task = this.tasks.find(task => task.id === id);
    if (!task) return;
    
    this.isLoading = true;
    
    try {
      const updatedData: UpdateTaskDTO = {
        completed: !task.completed
      };
      
      await updateTaskApi(id, updatedData);
      
      runInAction(() => {
        task.completed = !task.completed;
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = "Failed to update task";
        this.isLoading = false;
      });
    }
  }

  async updateTask(id: string, updates: UpdateTaskDTO) {
    const task = this.tasks.find(task => task.id === id);
    if (!task) return;
    
    this.isLoading = true;
    
    try {
      await updateTaskApi(id, updates);
      
      runInAction(() => {
        Object.assign(task, updates);
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = "Failed to update task";
        this.isLoading = false;
      });
    }
  }

  async deleteTask(id: string) {
    this.isLoading = true;
    
    try {
      await deleteTaskApi(id);
      
      runInAction(() => {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = "Failed to delete task";
        this.isLoading = false;
      });
    }
  }
}

export default new TaskStore();
