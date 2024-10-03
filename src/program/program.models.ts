import { Faculty } from '../faculty';

export interface CreateProgram {
  name: string;
  facultyId: number;
}

export interface Program {
  id: number;
  name: string;
  faculty?: Faculty;
  facultyId?: number;
}
