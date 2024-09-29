export interface CreatedUser {
  id: string;
  username: string;
  role?: string;
  status?: string;
}

export interface CreateUser {
  username: string;
  password: string;
  role?: string;
  status?: string;
}

export interface User {
  id: string;
  username: string;
  password: string;
  roleId: number;
  statusId: number;
}
