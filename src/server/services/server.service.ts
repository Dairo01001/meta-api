import { CreateServer } from '../models'
import { create, findAll, findById } from '../repository'

export const createServer = (data: CreateServer) => {
  return create(data)
}

export const findAllServer = async () => {
  return findAll()
}

export const findServerById = async (id: string) => {
  return findById({ id })
}
