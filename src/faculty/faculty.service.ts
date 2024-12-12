import {
  create,
  CreateFaculty,
  deleteF,
  getAll,
  getFacultyById,
  getProgramsByFaculty,
  update,
  UpdateFaculty,
} from '.'
import { HttpRequestError } from '../utils'

export const createFaculty = async (data: CreateFaculty) => {
  try {
    const newFaculty = await create(data)
    return newFaculty
  } catch (error) {
    throw new HttpRequestError('Could not create faculty', 400)
  }
}

export const deleteFaculty = async (id: number) => {
  try {
    return await deleteF(id)
  } catch (error) {
    throw new HttpRequestError('Error to delete Faculty', 400)
  }
}

export const getFaculty = async (id: number) => {
  return await getFacultyById(id)
}

export const getAllFaculties = async () => {
  try {
    return await getAll()
  } catch (error) {
    throw new HttpRequestError('Could not get all faculties', 400)
  }
}

export const getAllStatusFaculties = async () => {
  try {
    return await getAll({ status: true })
  } catch (error) {
    throw new HttpRequestError('Could not get all faculties', 400)
  }
}

export const updateFaculty = async (id: number, data: UpdateFaculty) => {
  try {
    return await update(id, data)
  } catch (error) {
    throw new HttpRequestError('Error to update faculty', 400)
  }
}

export const getProgramsByFacultyService = async (id: number) => {
  try {
    return await getProgramsByFaculty(id)
  } catch (error) {
    throw new HttpRequestError('Error to get programs by faculty', 400)
  }
}
