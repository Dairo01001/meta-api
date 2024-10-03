import { CreateProgram } from './program.models';
import { create, getAll, getById } from './program.repository';

export const createProgram = async (data: CreateProgram) => {
  return await create(data);
};

export const getAllPrograms = async () => {
  return await getAll({ status: true }, { id: true, name: true });
};

export const getProgramById = async (id: number) => {
  return await getById({ id }, { id: true, name: true, faculty: true });
};
