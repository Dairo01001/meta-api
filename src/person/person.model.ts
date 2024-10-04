export interface CreatePerson {
  firstName: string;
  secondName?: string;
  firstSurname: string;
  secondSurname?: string;
  email: string;
  programId: number;
  userId: string;
}

export type UpdatePerson = Omit<CreatePerson, 'userId'>;
