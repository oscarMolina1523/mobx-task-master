import { addTaskApi, deleteTaskApi, getTasksApi, updateTaskApi } from "@/features/tasks/api/taskApi";
import { makeAutoObservable, runInAction } from "mobx";

// Task interface
export interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
}

// Filter types
export type TaskFilter = "all" | "active" | "completed";

class TaskStore {
  tasks: Task[] = [];
  isLoading: boolean = false;
  filter: TaskFilter = "all";
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
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

  async fetchTasks(token: string) {
    this.isLoading = true;
    this.error = null;
    
    try {
      const response = await getTasksApi(token);
      runInAction(() => {
        this.tasks = response;
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error.message || "Failed to fetch tasks";
        this.isLoading = false;
      });
    }
  }

  async addTask(title: string, token: string , description?: string) {
    if (!title.trim()) return;
    
    this.isLoading = true;
    
    try {
      const newTaskData = {
        title: title.trim(),
        description: description?.trim(),
        completed: false,
      };
      const newTask = await addTaskApi(newTaskData, token);
      
      runInAction(() => {
        this.tasks.push(newTask);
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error.message || "Failed to add task";
        this.isLoading = false;
      });
    }
  }

  async toggleTaskCompletion(id: string, token: string) {
    const task = this.tasks.find(task => task._id === id);
    if (!task) return;
    
    this.isLoading = true;
    
    try {
      const updatedTask = await updateTaskApi(id, { completed: !task.completed }, token);
      
      runInAction(() => {
        Object.assign(task, updatedTask);
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error.message || "Failed to update task";
        this.isLoading = false;
      });
    }
  }

  async updateTask(id: string, updates: Partial<Omit<Task, "id" | "createdAt">>, token: string) {
    const task = this.tasks.find(task => task._id === id);
    if (!task) return;
    
    this.isLoading = true;
    
    try {
      const updatedTask = await updateTaskApi(id, updates, token);
      
      runInAction(() => {
        Object.assign(task, updatedTask);
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error.message || "Failed to update task";
        this.isLoading = false;
      });
    }
  }

  async deleteTask(id: string, token: string) {
    this.isLoading = true;
    
    try {
      await deleteTaskApi(id, token);
      
      runInAction(() => {
        this.tasks = this.tasks.filter(task => task._id !== id);
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = error.message || "Failed to delete task";
        this.isLoading = false;
      });
    }
  }
}

export default new TaskStore();