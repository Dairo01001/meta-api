import { PrismaService } from '../../services'
import { CreateServer } from '../models'

const prisma = PrismaService.getInstance()

export const create = (data: CreateServer) => {
  return prisma.server.create({
    data,
  })
}

export const findAll = async () => {
  return prisma.server.findMany({
    include: {
      status: true,
    },
  })
}
