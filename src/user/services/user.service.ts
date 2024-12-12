import { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { createRole } from '../../role'
import { hashPassword, PrismaService } from '../../services'
import { createUserStatus } from '../../user-status'
import { HttpRequestError } from '../../utils'
import { CreatedUser, CreateUser } from '../models'

const prisma = PrismaService.getInstance()

export const createUser = async (user: CreateUser): Promise<CreatedUser> => {
  const { username, password, role, status } = user

  const userExists = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (userExists) {
    throw new HttpRequestError('Username already exists', StatusCodes.CONFLICT)
  }
  const passwordHash = await hashPassword(password)
  const newRole = await createRole({ name: role || 'USER' })
  const newUserStatus = await createUserStatus({
    name: status || 'ACTIVE',
  })
  const newUser = await prisma.user.create({
    data: {
      username,
      password: passwordHash,
      roleId: newRole.id,
      statusId: newUserStatus.id,
    },
  })

  return {
    id: newUser.id,
    username: newUser.username,
    role: newRole.name,
    status: newUserStatus.name,
  }
}

export const findUniqueUser = async (
  where: Prisma.UserWhereUniqueInput,
  select?: Prisma.UserSelect,
) => {
  const user = await prisma.user.findUnique({
    where,
    select: {
      role: true,
      status: true,
      ...select,
    },
  })

  return user
}

export const findUniqueUserByUsername = async (
  username: string,
  select?: Prisma.UserSelect,
) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      username: true,
      ...select,
    },
  })

  return user
}
