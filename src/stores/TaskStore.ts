
import { makeAutoObservable, runInAction } from "mobx";

// Task interface
export interface Task {
  id: string;
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
      // Simulate API call with a delay
      const response = await new Promise<Task[]>(resolve => {
        setTimeout(() => {
          resolve([
            {
              id: "1",
              title: "Learn MobX",
              description: "Study MobX documentation and examples",
              completed: false,
              createdAt: new Date()
            },
            {
              id: "2",
              title: "Build Task Manager",
              description: "Create a task manager app using React and MobX",
              completed: false,
              createdAt: new Date()
            }
          ]);
        }, 500);
      });
      
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
      // Simulate API call
      const newTask: Task = {
        id: Date.now().toString(),
        title: title.trim(),
        description: description?.trim(),
        completed: false,
        createdAt: new Date()
      };
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
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

  async updateTask(id: string, updates: Partial<Omit<Task, "id" | "createdAt">>) {
    const task = this.tasks.find(task => task.id === id);
    if (!task) return;
    
    this.isLoading = true;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
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
