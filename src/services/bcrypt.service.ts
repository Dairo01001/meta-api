import * as bcrypt from 'bcrypt';
import { SALT_WORK_FACTOR } from '../config';

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  const isMatch = await bcrypt.compare(password, hash);
  return isMatch;
};
