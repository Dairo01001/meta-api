import { Prisma } from '@prisma/client';
import { PrismaService } from '../services';
import { CreatePerson, UpdatePerson } from './person.model';

const prisma = PrismaService.getInstance();

export const create = (data: CreatePerson) => {
  return prisma.person.create({
    data,
  });
};

export const update = (where: Prisma.PersonWhereUniqueInput, data: Prisma.PersonUpdateInput) => {
  return prisma.person.update({
    where,
    data,
  });
};
