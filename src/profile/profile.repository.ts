import { PrismaService } from '../services';
import { CreateProfile } from './profile.models';

const prisma = PrismaService.getInstance();

export const create = (data: CreateProfile) => {
  return prisma.profile.create({
    data,
  });
};
