export type TaskPriority = 'high' | 'medium' | 'low';
export type TaskStatus = 'todo' | 'in-progress' | 'done';
export type RecurringInterval = 'daily' | 'weekly' | 'monthly';

export interface Task {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  priority: TaskPriority;
  status: TaskStatus;
  tags: string[];
  isRecurring: boolean;
  recurringInterval?: RecurringInterval;
  reminder?: Date;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string; // Will be used when Supabase auth is integrated
}

export interface TaskFilters {
  priority?: TaskPriority;
  status?: TaskStatus;
  tags?: string[];
  search?: string;
}

export interface TaskSortOption {
  field: 'createdAt' | 'deadline' | 'title' | 'priority';
  order: 'asc' | 'desc';
}