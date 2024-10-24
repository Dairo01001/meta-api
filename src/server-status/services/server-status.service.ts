import { CreateServerStatus } from '../models';
import { findAll, upsert } from '../repository';

export const upsertServerStatus = (upsertData: CreateServerStatus) => {
  return upsert(upsertData);
};

export const findAllServerStatus = () => {
  return findAll();
};
