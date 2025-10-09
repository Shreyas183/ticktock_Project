import clsx from 'clsx';

export function cn(...inputs: (string | undefined | null | boolean)[]) {
  return clsx(inputs);
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateRange(startDate: string | Date, endDate: string | Date): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  return `${start.getDate()} - ${end.getDate()} ${end.toLocaleDateString('en-US', { 
    month: 'long',
    year: 'numeric' 
  })}`;
}

export function getWeekDates(weekStart: string): string[] {
  const startDate = new Date(weekStart);
  const dates: string[] = [];
  
  for (let i = 0; i < 7; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }
  
  return dates;
}

export function isWeekend(date: string): boolean {
  const d = new Date(date);
  const day = d.getDay();
  return day === 0 || day === 6; // Sunday = 0, Saturday = 6
}

export function getDayName(date: string): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', { weekday: 'short' });
}

export function getCurrentWeekStart(): string {
  const today = new Date();
  const monday = new Date(today);
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  monday.setDate(diff);
  return monday.toISOString().split('T')[0];
}