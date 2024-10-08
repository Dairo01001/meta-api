import { CreateProfile, UpdateProfile } from './profile.models';
import { create, update, updateByUserId } from './profile.repository';

export const createProfile = async (data: CreateProfile) => {
  return await create(data);
};

export const updateProfile = async (id: number, data: UpdateProfile) => {
  return await update({ id }, data);
};

export const createOrUpdateProfile = async (data: CreateProfile) => {
  return await updateByUserId(data);
};
