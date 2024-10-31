import { CreateServer } from '../models'
import { create, findAll } from '../repository'

export const createServer = (data: CreateServer) => {
  return create(data)
}

export const findAllServer = async () => {
  return findAll()
}
