export interface CreateProfile {
  birthDate: string;
  phone: string;
  photo: string;
  userId: string;
}

export type UpdateProfile = Partial<CreateProfile>;
