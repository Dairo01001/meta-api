import { PrismaService } from '../services'
import { CreateUserStatus, UserStatus } from './user-status.models'

const prisma = PrismaService.getInstance()

export const createUserStatus = async (
  userStatus: CreateUserStatus,
): Promise<UserStatus> => {
  const { name } = userStatus

  const newUserStatus = await prisma.userStatus.upsert({
    where: {
      name,
    },
    create: {
      name,
    },
    update: {},
  })

  return newUserStatus
}

export const updateUserStatus = async ({
  id,
  status,
}: {
  id: number
  status: boolean
}): Promise<UserStatus> => {
  return await prisma.userStatus.update({
    where: {
      id,
    },
    data: {
      status,
    },
  })
}

export const getAllUserStatus = async (): Promise<UserStatus[]> => {
  return await prisma.userStatus.findMany()
}
