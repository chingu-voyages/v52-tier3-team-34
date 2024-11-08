export type ApiResponse<T> = {
  status: 'success' | 'error';
  data?: T;
  message?: string;
  timestamp: string;
} 