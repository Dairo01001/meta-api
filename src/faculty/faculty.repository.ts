import { Prisma } from '@prisma/client'
import { PrismaService } from '../services'

const prisma = PrismaService.getInstance()

export const create = (data: Prisma.FacultyCreateInput) => {
  return prisma.faculty.create({
    data,
  })
}

export const getFacultyById = (id: Prisma.FacultyWhereUniqueInput['id']) => {
  return prisma.faculty.findUniqueOrThrow({
    where: {
      id,
    },
    include: {
      programs: true,
    },
  })
}

export const deleteF = (id: Prisma.FacultyWhereUniqueInput['id']) => {
  return prisma.faculty.update({
    where: {
      id,
    },
    data: {
      status: false,
    },
  })
}

export const getAll = (where?: Prisma.FacultyWhereInput) => {
  return prisma.faculty.findMany({
    where,
  })
}

export const update = (
  id: Prisma.FacultyWhereUniqueInput['id'],
  data: Prisma.FacultyUpdateInput,
) => {
  return prisma.faculty.update({
    where: {
      id,
    },
    data,
  })
}

export const getProgramsByFaculty = (
  id: Prisma.FacultyWhereUniqueInput['id'],
) => {
  return prisma.program.findMany({
    where: {
      facultyId: id,
    },
  })
}
