import { CreateProfile } from './profile.models';
import { create } from './profile.repository';

export const createProfile = async (data: CreateProfile) => {
  return await create(data);
};
