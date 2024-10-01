import { Faculty } from '../faculty';

export interface Program {
  id: string;
  name: string;
  faculty?: Faculty;
  facultyId: number;
}
