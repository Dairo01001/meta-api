import { Prisma } from '@prisma/client';
import { PrismaService } from '../../services';
import { CreateServerStatus } from '../models';

const prisma = PrismaService.getInstance();

export const upsert = ({ name, status }: CreateServerStatus) => {
  return prisma.serverStatus.upsert({
    where: {
      name,
    },
    create: {
      name,
      status: true,
    },
    update: {
      status,
    },
  });
};

export const findAll = (where?: Prisma.ServerStatusWhereInput) => {
  return prisma.serverStatus.findMany({
    where,
  });
};
