import { PrismaService } from '../../services'
import { CreateServer } from '../models'

const prisma = PrismaService.getInstance()

export const create = async (data: CreateServer) => {
  const newStatus = await prisma.serverStatus.upsert({
    where: {
      name: 'ACTIVE',
    },
    create: {
      name: 'ACTIVE',
      status: true,
    },
    update: {},
  })

  return prisma.server.create({
    data: {
      ...data,
      statusId: newStatus.id,
    },
  })
}

export const findAll = async () => {
  return prisma.server.findMany({
    include: {
      status: true,
    },
  })
}
