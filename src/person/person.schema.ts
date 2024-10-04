import { number, object, string, TypeOf } from 'zod';

export const CreatePersonSchema = object({
  body: object({
    firstName: string({
      required_error: 'First name is required',
    }).min(4, 'First name must be at least 4 characters'),
    secondName: string({
      required_error: 'Second name is required',
    })
      .min(4, 'Second name must be at least 4 characters')
      .optional(),
    firstSurname: string({
      required_error: 'Fist surname is required',
    }).min(4, 'Fist surname must be at least 4 characters'),
    secondSurname: string({
      required_error: 'Second surname is required',
    })
      .min(4, 'Second surname must be at least 4 characters')
      .optional(),
    email: string({
      required_error: 'Email is required',
    }).email('Email is invalid'),
    programId: number({
      required_error: 'Program id is required',
      invalid_type_error: 'Program id is invalid',
    }),
  }),
});

export type CreatePersonInput = TypeOf<typeof CreatePersonSchema>;
