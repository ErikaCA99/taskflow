export interface User {
  id: string;        // UUID de Supabase Auth
  fullName: string | null;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  projectId: string;
  name: string;
  description: string | null;
  color: string;
  userId: string;
  createdBy: string;
  updatedBy: string | null;
  createdAt: string;
  updatedAt: string;
  tasks?: Task[];
  user?: User;
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
  createdBy: string;
  updatedBy: string | null;
  createdAt: string;
  updatedAt: string;
  projectId: string;
  project?: Project;
  user?: User;
}

export interface TaskStatusCount {
  PENDING: number;
  IN_PROGRESS: number;
  COMPLETED: number;
}

export interface DashboardStats {
  totalProjects: number;
  totalTasks: number;
  tasksByStatus: TaskStatusCount;
  recentTasks: Task[];
  topProjects: (Project & { pendingCount: number })[];
}

// ─── Forms ───────────────────────────────────────────────
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