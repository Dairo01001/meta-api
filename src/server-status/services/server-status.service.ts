import { CreateServerStatus } from '../models'
import { findAll, update, upsert } from '../repository'

export const upsertServerStatus = (upsertData: CreateServerStatus) => {
  return upsert(upsertData)
}

export const findAllServerStatus = () => {
  return findAll()
}

export const findAllServerStatusActive = () => {
  return findAll({ status: true })
}

export const updateServerStatus = (id: number, status: boolean) => {
  return update({ id }, { status })
}
