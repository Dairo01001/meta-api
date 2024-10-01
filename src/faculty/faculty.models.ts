import { Program } from '../program';

export interface Faculty {
  id: string;
  name: string;
  status?: boolean;
  programs?: Program[];
}

export interface CreateFaculty {
  name: string;
}

export interface UpdateFaculty {
  name?: string;
  status?: boolean;
}
