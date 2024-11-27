// Define the structure of a single User object
export interface User {
  id: number;
  email: string;
  name: string;
  profileImage: string;
  createdAt: string;
}

// Define the structure of the response that contains a list of Users
export interface UsersResponse {
  status: string;
  data: User[];
  meta: {
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrevious: boolean;
    };
    filters: Record<string, unknown>;
    includes: unknown[];
  };
  timestamp: string;
}
