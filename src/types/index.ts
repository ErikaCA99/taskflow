export interface Profile {
  id: string;
  updated_at: string | null;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  website: string | null;
}

export interface Project {
  projectId: string;
  name: string;
  description: string | null;
  color: string;
  userId: string;
  createdBy: string | null;
  updatedBy: string | null;
  createdAt: string;
  updatedAt: string;
}

export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH';
  
export interface Task {
  taskId: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  userId: string;
  createdBy: string | null;
  updatedBy: string | null;
  createdAt: string;
  updatedAt: string;
  projectId: string;
}

export interface TaskStatusCount {
  pending: number;
  in_progress: number;
  completed: number;
}

export interface DashboardStats {
  totalProjects: number;
  totalTasks: number;
  tasksByStatus: TaskStatusCount;
  recentTasks: Task[];
  topProjects: (Project & { pendingCount: number })[];
}

export interface AuthFormState {
  error: string | null;
  success: boolean;
}

export interface ProjectFormData {
  name: string;
  description?: string;
  color: string;
}

export interface TaskFormData {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  projectId: string;
}