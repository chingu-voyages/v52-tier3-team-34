export type ApiResponse<T> = {
  status: 'success' | 'error';
  data?: T;
  message?: string;
  timestamp: string;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
} 