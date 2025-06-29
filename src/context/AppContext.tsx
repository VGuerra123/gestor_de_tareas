import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { AppContextType, AuthState, Project, Task, User } from '../types';
import { mockProjects, mockUsers, mockTasks } from '../data/mockData';

interface AppState {
  auth: AuthState;
  projects: Project[];
  currentProject: Project | null;
  tasks: Task[];
}

type AppAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGIN_ERROR' }
  | { type: 'LOGOUT' }
  | { type: 'SET_CURRENT_PROJECT'; payload: Project | null }
  | { type: 'UPDATE_TASK'; payload: { taskId: string; updates: Partial<Task> } }
  | { type: 'CREATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'LOAD_DATA' };

const initialState: AppState = {
  auth: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
  },
  projects: [],
  currentProject: null,
  tasks: [],
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        auth: { ...state.auth, isLoading: true },
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        auth: {
          user: action.payload,
          isAuthenticated: true,
          isLoading: false,
        },
      };
    case 'LOGIN_ERROR':
      return {
        ...state,
        auth: { ...state.auth, isLoading: false },
      };
    case 'LOGOUT':
      return {
        ...state,
        auth: {
          user: null,
          isAuthenticated: false,
          isLoading: false,
        },
        currentProject: null,
      };
    case 'SET_CURRENT_PROJECT':
      return {
        ...state,
        currentProject: action.payload,
      };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId
            ? { ...task, ...action.payload.updates }
            : task
        ),
      };
    case 'CREATE_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    case 'LOAD_DATA':
      return {
        ...state,
        projects: mockProjects,
        tasks: mockTasks,
      };
    default:
      return state;
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    // Load mock data on app initialization
    dispatch({ type: 'LOAD_DATA' });
    
    // Check if user is already authenticated (localStorage)
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    }
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    dispatch({ type: 'LOGIN_START' });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - in real app, this would be an API call
    const user = mockUsers.find(u => u.email === email);
    if (user && password === 'password123') {
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    } else {
      dispatch({ type: 'LOGIN_ERROR' });
      throw new Error('Credenciales inválidas');
    }
  };

  const logout = (): void => {
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  const register = async (name: string, email: string, password: string): Promise<void> => {
    dispatch({ type: 'LOGIN_START' });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock registration
    const newUser: User = {
      id: Date.now().toString(),
      name,
      email,
      role: 'developer',
    };
    
    localStorage.setItem('user', JSON.stringify(newUser));
    dispatch({ type: 'LOGIN_SUCCESS', payload: newUser });
  };

  const setCurrentProject = (project: Project | null): void => {
    dispatch({ type: 'SET_CURRENT_PROJECT', payload: project });
  };

  const updateTask = (taskId: string, updates: Partial<Task>): void => {
    dispatch({ type: 'UPDATE_TASK', payload: { taskId, updates } });
  };

  const createTask = (taskData: Omit<Task, 'id' | 'createdAt'>): void => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    dispatch({ type: 'CREATE_TASK', payload: newTask });
  };

  const deleteTask = (taskId: string): void => {
    dispatch({ type: 'DELETE_TASK', payload: taskId });
  };

  const value: AppContextType = {
    auth: state.auth,
    projects: state.projects,
    currentProject: state.currentProject,
    tasks: state.tasks,
    login,
    logout,
    register,
    setCurrentProject,
    updateTask,
    createTask,
    deleteTask,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};