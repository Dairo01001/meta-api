import { User } from '../user/models';

export interface CreateUserStatus {
  name: string;
}

export interface UserStatus {
  id: number;
  name: string;
  status: boolean;
  users?: User[];
}
