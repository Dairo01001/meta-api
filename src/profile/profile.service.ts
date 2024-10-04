import { CreateProfile, UpdateProfile } from './profile.models';
import { create, update } from './profile.repository';

export const createProfile = async (data: CreateProfile) => {
  return await create(data);
};

export const updateProfile = async (id: number, data: UpdateProfile) => {
  return await update({ id }, data);
};
