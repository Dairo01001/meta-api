import { Prisma } from '@prisma/client';
import { PrismaService } from '../services';
import { CreateProfile } from './profile.models';

const prisma = PrismaService.getInstance();

export const create = (data: CreateProfile) => {
  return prisma.profile.create({
    data,
  });
};

export const update = (where: Prisma.ProfileWhereUniqueInput, data: Prisma.ProfileUpdateInput) => {
  return prisma.profile.update({
    where,
    data,
  });
};

export const updateByUserId = (data: CreateProfile) => {
  return prisma.profile.upsert({
    where: {
      userId: data.userId,
    },
    update: data,
    create: data,
  });
};
