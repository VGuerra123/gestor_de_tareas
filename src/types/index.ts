export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'manager' | 'developer' | 'designer';
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'on-hold' | 'planning';
  progress: number;
  startDate: string;
  endDate: string;
  teamMembers: User[];
  sprints: Sprint[];
  color: string;
}

export interface Sprint {
  id: string;
  name: string;
  projectId: string;
  status: 'planning' | 'active' | 'completed';
  startDate: string;
  endDate: string;
  goal: string;
  tasks: Task[];
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee?: User;
  sprintId: string;
  projectId: string;
  estimatedHours: number;
  actualHours?: number;
  createdAt: string;
  dueDate: string;
  tags: string[];
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AppContextType {
  auth: AuthState;
  projects: Project[];
  currentProject: Project | null;
  tasks: Task[];
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  setCurrentProject: (project: Project | null) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  createTask: (task: Omit<Task, 'id' | 'createdAt'>) => void;
  deleteTask: (taskId: string) => void;
}