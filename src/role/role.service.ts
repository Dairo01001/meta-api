import { PrismaService } from '../services'
import { CreateRole, Role } from './role.models'

const prisma = PrismaService.getInstance()

export const createRole = async (role: CreateRole): Promise<Role> => {
  const { name } = role

  const newRole = await prisma.role.upsert({
    create: {
      name,
    },
    where: {
      name,
    },
    update: {},
  })

  return newRole
}

export const getAllRoles = (): Promise<Role[]> => {
  return prisma.role.findMany()
}

export const getRoleById = (id: number): Promise<Role> => {
  return prisma.role.findFirstOrThrow({
    where: {
      id,
    },
  })
}

export const updateRole = (id: number, status: boolean): Promise<Role> => {
  return prisma.role.update({
    data: {
      status,
    },
    where: {
      id,
    },
  })
}
