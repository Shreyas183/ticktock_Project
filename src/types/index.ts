export interface User {
  id: string;
  email: string;
  name: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export interface Project {
  id: string;
  name: string;
}

export interface WorkType {
  id: string;
  name: string;
}

export interface TimesheetEntry {
  id: string;
  timesheetId: string;
  date: string;
  projectId: string;
  workTypeId: string;
  description: string;
  hours: number;
  createdAt: string;
  updatedAt: string;
}

export interface Timesheet {
  id: string;
  userId: string;
  weekStartDate: string;
  weekEndDate: string;
  status: 'completed' | 'incomplete' | 'missing';
  totalHours: number;
  entries: TimesheetEntry[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateTimesheetEntryRequest {
  timesheetId: string;
  date: string;
  projectId: string;
  workTypeId: string;
  description: string;
  hours: number;
}

export interface TimesheetFilters {
  dateRange?: {
    start: string;
    end: string;
  };
  status?: 'completed' | 'incomplete' | 'missing' | 'all';
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    current: number;
    total: number;
    pages: number;
    limit: number;
  };
}