import { Prisma } from '@prisma/client';
import { PrismaService } from '../services';
import { CreateProgram } from './program.models';

const prisma = PrismaService.getInstance();

export const create = (data: CreateProgram) => {
  return prisma.program.create({
    data,
  });
};

export const getAll = (where: Prisma.ProgramWhereInput, select?: Prisma.ProgramSelect) => {
  return prisma.program.findMany({ where, select });
};

export const getById = (where: Prisma.ProgramWhereUniqueInput, select?: Prisma.ProgramSelect) => {
  return prisma.program.findUnique({ where, select });
};
