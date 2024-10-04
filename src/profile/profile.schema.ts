import { object, string, TypeOf } from 'zod';

export const CreateProfileSchema = object({
  body: object({
    birthDate: string({
      required_error: 'Birth date is required',
    }).datetime(),
    phone: string({
      required_error: 'phone is required',
    }).min(10, 'phone must be at least 10 characters'),
    photo: string({
      required_error: 'photo is required',
    }).url('photo must be a valid url'),
  }),
});

export type CreateProfileInput = TypeOf<typeof CreateProfileSchema>;
