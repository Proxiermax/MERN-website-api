export interface User {
  id: string;
  name: string | null;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface CreateUserInput {
  name?: string | null;
  email: string;
  password: string;
}

export interface UpdateUserInput {
  name?: string | null;
  email?: string;
  password?: string;
}