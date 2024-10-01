import { boolean, object, string, TypeOf } from 'zod';

export const CreateFacultySchema = object({
  body: object({
    name: string({
      required_error: 'Name faculty is required',
    }).min(4, 'Username must be at least 4 characters'),
  }),
});

export const DeleteFacultySchema = object({
  params: object({
    id: string({
      required_error: 'Id faculty is required',
    }).refine((id) => !isNaN(+id), { message: 'Id faculty must be a number' }),
  }),
});

export const UpdateFacultySchema = object({
  body: object({
    name: string({
      required_error: 'Name faculty is required',
    })
      .min(4, 'Username must be at least 4 characters')
      .optional(),
    status: boolean().optional(),
  }),
});

export type UpdateFacultyInput = TypeOf<typeof UpdateFacultySchema>;
export type CreateFacultyInput = TypeOf<typeof CreateFacultySchema>;
export type DeleteFacultyInput = TypeOf<typeof DeleteFacultySchema>;
