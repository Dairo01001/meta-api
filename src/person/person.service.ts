import { CreatePerson, UpdatePerson } from './person.model';
import { create, update } from './person.repository';

export const createPerson = async (data: CreatePerson) => {
  return await create(data);
};

export const updatePerson = async (id: number, data: UpdatePerson) => {
  return await update({ id }, data);
};
